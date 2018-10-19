package com.sr.platform.server.integration.dao;

import com.sr.platform.server.integration.bean.WxCommodity;

import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/4/25.
 */
public interface IWxCommodityDao {
    /**
     * 根据所有单品
     * @return
     */
    List<WxCommodity> queryGiftAll();

    /**
     * 根据类别查询单品
     * @param id
     * @return
     */
    List<WxCommodity> queryGiftById(String id);

    /**
     * 生成商品编码
     * @return
     */
    List<WxCommodity> getMaxNum(String id);

    /**
     * 根据Id获取单品明细
     * @param id
     * @return
     */
    List<WxCommodity> queryCommodityById(String id);

    /**
     * 插入礼品
     * @param data
     */
    void insertCommodity(WxCommodity data);

    /**
     * 更新礼品
     * @param data
     */
    void updateCommodity(WxCommodity data);

    /**
     * 删除礼品
     * @param id
     */
    void deleteCommidity(String id);

}
