package com.sr.platform.server.activity.service;
import com.sr.platform.server.activity.bean.WxBirthdayDiscount;
import java.util.List;
import java.util.Map;

public interface IWxBirthdayDiscountService {
    //

    /**
     * 查询生日折扣
     * @return
     */
    public List<WxBirthdayDiscount> findBirthdayDiscount();

    /**
     *
     * @param id
     * @return
     */
    public List<WxBirthdayDiscount> findBirthdayDiscountById(String id);

    /**
     * 插入生日折扣
     * @param discount
     * @return
     */
    public Map<String,Object> insertBirthdayDiscount(WxBirthdayDiscount discount);

    /**
     * 更新生日折扣
     * @param discount
     * @return
     */
    public Map<String,Object> updateBirthdayDiscount(WxBirthdayDiscount discount);

    public Map<String,Object> getNewBirthdayDiscount();
}
