package com.sr.platform.server.orderManagement.service.impl;

import com.sr.platform.server.company.util.NewExcel;
import com.sr.platform.server.orderManagement.bean.WxOrderCollect;
import com.sr.platform.server.orderManagement.dao.IWxLocDao;
import com.sr.platform.server.orderManagement.dao.IWxOrderCollectDao;
import com.sr.platform.server.orderManagement.dao.IWxOrderDetailDao;
import com.sr.platform.server.orderManagement.dao.IWxSellingOtherPaymentDao;
import com.sr.platform.server.orderManagement.service.IOrderService;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class OrderService implements IOrderService {
    @Autowired
    HttpServletRequest request;
    @Autowired
    HttpServletResponse response;
    @Autowired
    private IWxOrderCollectDao iocd;
    @Autowired
    private IWxOrderDetailDao iodd;
    @Autowired
    private IWxSellingOtherPaymentDao isopd;

    @Override
    public Map<String, Object> getOrderCollect(String startDate, String endDate, String bookingType, String bookingStatus, String locId, int pageSize, int start, String search) {
        Map<String,Object> reMap =new HashMap();
        try {
            List<String> list = new ArrayList();
            String[] bs =bookingStatus.split(",");
            for(String s : bs){
                if("9999".equals(s)) {
                    break;
                }
                list.add(s);
            }
            reMap.put("rows",iocd.getOrderCollect(startDate, endDate, bookingType, list, locId, pageSize, start,search));
            reMap.put("total",iocd.reCount(startDate, endDate, bookingType, list, locId,search));
            return  reMap;
        }catch (Exception e){
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }

    }

    @Override
    public Map<String, Object> getDetailAndSelling(String bookingId) {
        Map<String,Object> reMap =new HashMap();
        try {
            reMap.put("status","success");
            reMap.put("detail",iodd.getOrderDetail(bookingId));
            reMap.put("selling",isopd.getSellingOtherPayment(bookingId));
            return reMap;


        }catch (Exception e){
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String, Object> downLoadExcel(String startDate, String endDate, String bookingType, String bookingStatus, String locId, String search) {
        Map<String, Object> reMap =new HashMap<>();

        try {
            //excel标题
            String[] title = {"订单编号","门店名称","门店编码","来源","状态","下单时间",	"配送地址","顾客姓名","顾客电话","订单总额","会员编码","会员名称","备注"};


            //sheet名
            String sheetName = "微信订单";
            List<WxOrderCollect> collectList = new ArrayList<WxOrderCollect>();
            List<String> list = new ArrayList();
            String[] bs =bookingStatus.split(",");
            for(String s : bs){
                if("9999".equals(s)){
                    break;
                }
                list.add(s);
            }
            collectList=iocd. getOrderCollectEx(startDate,endDate,bookingType,list,locId,search);
            String locName="";
            String [][] content = new String[5000][12];
            for (int i =0;i<collectList.size();i++) {
                content[i] = new String[title.length];
                content[i][0] = collectList.get(i).getBookingId();
                content[i][1] = collectList.get(i).getLocName();
                if("".equals(locName)){
                   locName= collectList.get(i).getLocName();
                }
                content[i][2] = collectList.get(i).getLocId();
                content[i][3] = collectList.get(i).getBookingSource();
                int statu=collectList.get(i).getBookingStatus();
                String temp="";
                if (statu == 0) temp = "未付款";
                if (statu == 1) temp = "已付款";
                if (statu == 2) temp = "已获取";
                if (statu == 3) temp = "已确认";
                if (statu == 4) temp = "已递送";
                if (statu == 5) temp = "已结单";
                if (statu == 6) temp = "已退单";
                if (statu == 10) temp = "退单中";
                content[i][4] = temp;
                content[i][5] = collectList.get(i).getCreateDate();
                content[i][6] = collectList.get(i).getCompany()+collectList.get(i).getAddress();
                content[i][7] = collectList.get(i).getRef1();
                content[i][8] = collectList.get(i).getPhone();
                content[i][9] = collectList.get(i).getPrice()+"";
                content[i][10] = collectList.get(i).getMemberId();
                content[i][11] = collectList.get(i).getMemberName();
                content[i][12] = collectList.get(i).getRemark();
            }
            //excel文件名
            String fileName = "微信订单-"+locName+ startDate+"至"+endDate+".xls";
            //创建HSSFWorkbook
            HSSFWorkbook wb = NewExcel.getHSSFWorkbook(sheetName, title, content, null);
            //响应到客户端
            this.setResponseHeader(response, fileName);
            OutputStream os = response.getOutputStream();
            wb.write(os);
            os.flush();
            os.close();
            reMap.put("status",1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }
    public void setResponseHeader(HttpServletResponse response, String fileName) {
        try {
            try {
                fileName = new String(fileName.getBytes(),"ISO8859-1");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            response.setContentType("application/octet-stream;charset=ISO8859-1");
            response.setHeader("Content-Disposition", "attachment;filename="+ fileName);
            response.addHeader("Pargam", "no-cache");
            response.addHeader("Cache-Control", "no-cache");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
