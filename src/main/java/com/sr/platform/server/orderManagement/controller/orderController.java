package com.sr.platform.server.orderManagement.controller;

import com.sr.platform.server.orderManagement.dao.IWxLocDao;
import com.sr.platform.server.orderManagement.service.impl.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
public class orderController {
    /**
     * 进入wx订单管理界面
     *
     * @return
     */
    @Autowired
    HttpServletRequest request;
    @Autowired
    private IWxLocDao iwd;
    @Autowired
    private OrderService os;
    //进入微信订单页面
    @RequestMapping(value = "/platform/orderManagement/wxOrder")
    public ModelAndView toWxOrder() {
        request.setAttribute("wxLoc", iwd.getLoc());
        return new ModelAndView("wetchatorder");
    }
    //获取汇总信息
    @RequestMapping(value = "/platform/orderManagement/getOrder", method = RequestMethod.POST)
    public Map<String, Object> getWxOrder(
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String bookingType,
            @RequestParam String bookingStatus,
            @RequestParam String locId,
            @RequestParam int pageSize,
            @RequestParam int start,
            @RequestParam String search

    ) {
        System.out.println("测试切换member");
        System.out.println("member");
        return os.getOrderCollect(startDate, endDate, bookingType, bookingStatus, locId, pageSize, start, search);
    }

    @RequestMapping(value = "/platform/orderManagement/downLoadExcel", method = RequestMethod.GET)
    public Map<String, Object> getWxOrderEx(
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String bookingType,
            @RequestParam String bookingStatus,
            @RequestParam String locId,
            @RequestParam String search

    ) {

        return os.downLoadExcel(startDate, endDate, bookingType, bookingStatus, locId, search);
    }
    //获取明细信息
    @RequestMapping(value = "/platform/orderManagement/getDetailAndSelling", method = RequestMethod.POST)
    public Map<String, Object> getDetailAndSelling(@RequestParam String bookingId) {
        return os.getDetailAndSelling(bookingId);
    }
}
