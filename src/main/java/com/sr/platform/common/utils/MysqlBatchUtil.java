package com.sr.platform.common.utils;
import com.mysql.jdbc.Connection;
import com.sr.platform.datasource.DruidSource;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;

public class MysqlBatchUtil {

    Showflsake showflsake;
    DruidSource druidSource;
    private String sql = "INSERT into  wx_coupondetails (couponType,couponBatch,couponId,status,\n" +
            "openId,memberId,memberName,source,sourceDate,bookingId,useDate,startDate,\n" +
            "endDate,ref1,ref2,ref3,remark,createUser,createDate,lastUpdateUser,lastUpdateDate) \n" +
            "VALUES(?,?,?,'99','','','','',sysdate(),'',\n" +
            "sysdate(),sysdate(),sysdate(),'','','','','',sysdate(),'',sysdate())";
    private void doStore(Integer couponType,String couponBatch,Integer maxPublishQuantity) throws ClassNotFoundException, SQLException, IOException {
        Class.forName("com.mysql.jdbc.Driver");
        Properties p=new Properties();
        p.load(MysqlBatchUtil.class.getClassLoader().getResourceAsStream("application.properties"));
        String connectStr=p.getProperty("spring.datasource.url");
        String username=p.getProperty("spring.datasource.username");
        String password=p.getProperty("spring.datasource.password");

        Connection conn = (Connection) DriverManager.getConnection(connectStr, username, password);
        conn.setAutoCommit(false);
        int count = 0;
        PreparedStatement psts = conn.prepareStatement(sql);
        long start = System.currentTimeMillis();
        ArrayList twitterId=new  ArrayList();
        twitterId=showflsake.twitterId(maxPublishQuantity);
        for (int i = 0; i < maxPublishQuantity; i++) {
            psts.setInt(1,couponType);
            psts.setString(2,couponBatch);
            psts.setString(3, (String) twitterId.get(i));
            psts.addBatch();   // 加入批量处理
            count++;
        }
        psts.executeBatch(); // 执行批量处理
        conn.commit(); // 提交
        long end = System.currentTimeMillis();
        System.out.println("数量=" + count);
        System.out.println("运行时间=" + (end - start));
        conn.close();
    }

    public static void creatCoupondetail(Integer couponType,String couponBatch,Integer maxPublishQuantity) {
        try {
            new MysqlBatchUtil().doStore(couponType,couponBatch,maxPublishQuantity);
        } catch (ClassNotFoundException | SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}