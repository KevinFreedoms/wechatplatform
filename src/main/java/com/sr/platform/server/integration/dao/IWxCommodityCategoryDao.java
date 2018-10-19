package com.sr.platform.server.integration.dao;

import com.sr.platform.server.company.bean.WxCompany;
import com.sr.platform.server.integration.bean.WxCommodity;
import com.sr.platform.server.integration.bean.WxCommodityCategory;

import java.util.List;

/**
 * Created by xxx on 2018/4/25.
 */
public interface IWxCommodityCategoryDao {

    /**
     * 查询类别
     * @return
     */
    List<WxCommodityCategory> queryGiftCategory();

    /**
     * 查询类别是否存在
     * @return
     */
    List<WxCommodityCategory> queryCategoryById(String id);


    /**
     * 获取类别编码
     * @return
     */
    List<WxCommodityCategory> getCategoryMaxNum();

    /**
     *插入类别
     * @param data
     */
    void insertCategory(WxCommodityCategory data);

    /**
     *删除类别
     * @param id
     */
    void deleteCategory(String id);


    /**
     * 更新类别
     * @param data
     */
    void updateCategory(WxCommodityCategory data);

    /**
     * 更新类别下类别名称
     * @param data
     */
    void updateCommondityCategory(WxCommodityCategory data);
}
