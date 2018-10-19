package com.sr.platform.server.orderManagement.service;

import java.util.Map;

public interface IOrderService {
    //获取汇总
    Map<String,Object> getOrderCollect(
          String startDate,
          String endDate,
          String bookingType,
          String bookingStatus,
          String locId,
          int pageSize,
          int start,
          String search
    );
    //excel下载
    Map<String, Object> downLoadExcel(
           String startDate,
           String endDate,
           String bookingType,
           String bookingStatus,
           String locId,
           String search
    );
    //获取明细及消费信息
    Map<String,Object>getDetailAndSelling(String bookingId);
}
