package com.sr.platform.server.orderManagement.dao;

import com.sr.platform.server.orderManagement.bean.WxOrderDetail;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IWxSellingOtherPaymentDao {
   List<WxOrderDetail> getSellingOtherPayment(@Param("bookingId") String bookingId);
}
