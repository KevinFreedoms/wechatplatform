package com.sr.platform.server.activity.dao;
import com.sr.platform.server.activity.bean.WxBirthdayDiscount;
import java.util.List;
import java.util.Map;

public interface IWxBirthdayDiscountDao {
    /**
     * 获取生日活动
     * @return
     */
    List<WxBirthdayDiscount> findBirthdayDiscount();

    /**
     * 新增活动批次 批次号
     * @return
     */
    List<WxBirthdayDiscount> getPrivilegeBatch();

    /**
     *
     * @param batch
     * @return
     */
    List<WxBirthdayDiscount> getBirthdayDiscountById(String batch);

    /**
     *
     * @param id
     * @return
     */
    List<WxBirthdayDiscount> getBirthdayDiscountByReckey(String id);

    /**
     * 插入生日活动
     * @param discount
     */
    void insertBirthdayDiscount(WxBirthdayDiscount discount);

    /**
     * 更新生日活动
     * @param discount
     */
    void updateBirthdayDiscount(WxBirthdayDiscount discount);

}
