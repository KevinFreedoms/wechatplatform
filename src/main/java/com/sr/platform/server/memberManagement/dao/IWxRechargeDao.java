package com.sr.platform.server.memberManagement.dao;

import com.sr.platform.server.memberManagement.bean.WxRecharge;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IWxRechargeDao {
        /**
         * 获得所有会员信息
         * @return
         */
        List<WxRecharge> getWxRecharges(
                @Param("startDate") String startDate,
                @Param("endDate") String endDate
        );
}
