package com.sr.platform.server.orderManagement.dao;

import com.sr.platform.server.orderManagement.bean.WxOrderCollect;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IWxOrderCollectDao {
    List<WxOrderCollect> getOrderCollect(
            @Param("startDate") String startDate,
            @Param("endDate") String endDate,
            @Param("bookingType") String bookingType,
            @Param("list") List<String> list,
            @Param("locId") String locId,
            @Param("pageSize") int pageSize,
            @Param("start") int start,
            @Param("search") String search
            );
    List<WxOrderCollect> getOrderCollectEx(
            @Param("startDate") String startDate,
            @Param("endDate") String endDate,
            @Param("bookingType") String bookingType,
            @Param("list") List<String> list,
            @Param("locId") String locId,
            @Param("search") String search
            );
    Integer reCount(
            @Param("startDate") String startDate,
            @Param("endDate") String endDate,
            @Param("bookingType") String bookingType,
            @Param("list") List<String> list,
            @Param("locId") String locId,
            @Param("search") String search
    );
}
