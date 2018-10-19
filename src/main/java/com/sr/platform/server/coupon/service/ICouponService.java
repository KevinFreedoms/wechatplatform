package com.sr.platform.server.coupon.service;
import com.sr.platform.server.coupon.bean.Wxcouponcollect;
import com.sr.platform.server.coupon.bean.Wxcoupondetails;
import java.util.List;
import java.util.Map;

/**
 *
 */
public interface ICouponService {


    /**
     * 根据条件筛选优惠券汇总
     * @param couponType 优惠券类型
     * @param ref2 启用状态
     * @param receiveType 领取类型s
     * @return
     */
     List<Wxcouponcollect> getCouponselect(Integer couponType, String ref2, String receiveType);

     /**
     *
     * @param id
     * @return
     */
     List<Wxcouponcollect> getCouponById(String id);

    /**
     * 根据条件筛选优惠券明细
     * @param couponBatch 优惠券批次
     * @param status 状态
     * @return
     */
    List<Wxcoupondetails> getCoupondetail(String couponBatch, Integer status);// Integer currPage, Integer pageSize

    /**
     *生成优惠券批次
     * @param headtype
     * @return
     */
    Map<String,Object> createCouponBatch(String headtype);


    /**
     *添加优惠券汇总
     * @param collectjson
     * @return
     */
    Map<String,Object> insertCollect(Map<String, Object> collectjson);

    /**
     *更新优惠券明细
     * @param collectjson
     * @return
     */
    Map<String,Object> updateCollect(Map<String, Object> collectjson);
}
