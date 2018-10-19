package com.sr.platform.server.customer.dao;

import com.sr.platform.server.customer.bean.WxLocPay;

import java.util.List;

public interface IWxLocPayDao {
    /**
     * 根据门店编号查询是否设置支付密码
     * @param id
     * @return
     */
    List<WxLocPay> findLocPay(String id);

    /**
     * 插入门店支付
     * @param pay
     */
    void insertLocPay(WxLocPay pay);

    /**
     * 更新门店支付
     * @param pay
     */
    void updateLocPay(WxLocPay pay);
}
