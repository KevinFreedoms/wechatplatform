package com.sr.platform.server.coupon.dao;
import com.sr.platform.server.coupon.bean.Wxcouponcollect;
import com.sr.platform.server.coupon.bean.Wxcoupondetails;
import java.util.List;
import java.util.Map;

public interface CouponDao {
    /**
     * 根据条件查询优惠券汇总
     * @param data
     * @return
     */
    List<Wxcouponcollect> findCollectByquery(Map<String,Object> data);

    /**
     * 根据条件查询优惠券汇总
     * @param id
     * @return
     */
    List<Wxcouponcollect> findCollectById(String id);


    /**
     * 根据条件查询优惠券汇总
     * @param data
     * @return
     */
    Map<String, Object> findCollectByqueryCount(Map<String,Object> data);
    /**
     * 根据条件筛选优惠券明细
     * @param data
     * @return
     */
    List<Wxcoupondetails> findDetailByquery(Map<String,Object> data);
    /**
     * 根据条件筛选优惠券明细总数
     * @param data
     * @return
     */

    Map<String,Object> findDetailByqueryCount(Map<String, Object> data);
    /**
     * 根据条件筛选优惠券明细总数
     * @param data
     * @return
     */

    Map<String,Object> findCouponbtch(Map<String, Object> data);

    /**
     * 插入优惠券汇总
     *@param data
     * @return
     */
    void insertWXcouponcollect(Map<String,Object> data);
    /**
     * 更新优惠券汇总
     *@param data
     * @return
     */
    void updateWXcouponcollect(Map<String, Object> data);
}
