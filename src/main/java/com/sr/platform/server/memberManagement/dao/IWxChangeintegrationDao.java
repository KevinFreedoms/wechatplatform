package com.sr.platform.server.memberManagement.dao;

import com.sr.platform.server.memberManagement.bean.WxChangeintegration;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IWxChangeintegrationDao {
        /**
         * 获得所有会员信息
         * @return
         */
        List<WxChangeintegration> getWxChangeintegrations(
                @Param("startDate") String startDate,
                @Param("endDate") String endDate
        );
        List<WxChangeintegration> getFreeDay(
            @Param("startDate") String startDate,
            @Param("endDate") String endDate);
}
