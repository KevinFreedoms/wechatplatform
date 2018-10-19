package com.sr.platform.server.coupon.controller;

import com.google.gson.Gson;
import com.sr.platform.server.coupon.bean.Wxcouponcollect;
import com.sr.platform.server.coupon.bean.Wxcoupondetails;
import com.sr.platform.server.coupon.service.ICouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
public class CouponController {
    @Autowired
    HttpServletRequest request;
    @Autowired
    private ICouponService couponService;
    /**
     * 获取所有优惠券信息
     * @return
     */
    @RequestMapping(value = "/platform/coupon/collect",method = RequestMethod.GET)
    @ResponseBody
    public List<Wxcouponcollect> getCouponAll(@RequestParam Integer couponType, @RequestParam String ref2 , @RequestParam String receiveType){
        return couponService.getCouponselect(couponType,ref2,receiveType);
    }

    /**
     *查询优惠券明细
     * @param couponBatch
     * @param status
     * @return
     */
    @RequestMapping(value = "/platform/coupon/detail",method = RequestMethod.GET)
    @ResponseBody
    public List<Wxcoupondetails> getCoupondetail(@RequestParam String couponBatch, @RequestParam Integer status){
        return couponService.getCoupondetail(couponBatch,status);
    }

    /**
     *新增优惠券汇总和明细
     * @param collectjson
     * @return
     */
    @RequestMapping(value = "/platform/coupon/addCoupon",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> addCouponcollect(@RequestBody Map<String,Object> collectjson){
        return couponService.insertCollect(collectjson);
    }

    /**
     *修改优惠券汇总和明细
     * @param collectjson
     * @return
     */
    @RequestMapping(value = "/platform/coupon/updateCoupon",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> modifyCouponcollect(@RequestBody Map<String,Object> collectjson){
        return couponService.updateCollect(collectjson);
    }


    /**
     * 进入新增
     * @return
     */
    @RequestMapping(value="/platform/coupon/add",method = RequestMethod.GET)
    public ModelAndView toAddcoupon(){

        return new ModelAndView("addcoupon");
    }

    /**
     * 进入修改
     * @return
     */
    @RequestMapping(value="/platform/coupon/modify",method = RequestMethod.GET)
    public ModelAndView toModifycoupon(@RequestParam String id){
        List<Wxcouponcollect> list = couponService.getCouponById(id);
        Wxcouponcollect wxcouponcollect = new Wxcouponcollect();
        if(list.size()>0){
            wxcouponcollect = list.get(0);
        }
        request.setAttribute("collect",wxcouponcollect);
        request.setAttribute("wxcouponcollect",new Gson().toJson(wxcouponcollect));
        return new ModelAndView("modifycoupon");
    }

    /**
     * 创造优惠券批次
     * @param headtype
     * @return
     */
    @RequestMapping(value="/platform/coupon/couponbatch",method = RequestMethod.GET)
    public Map<String,Object>  createCouponBatch(@RequestParam String headtype){
        return couponService.createCouponBatch(headtype);
    }
}
