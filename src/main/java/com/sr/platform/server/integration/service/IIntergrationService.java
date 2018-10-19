package com.sr.platform.server.integration.service;

import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.integration.bean.WxCommodity;
import com.sr.platform.server.integration.bean.WxCommodityCategory;

import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/4/26.
 */
public interface IIntergrationService {
    //查询积分商品类别
    public List<WxCommodityCategory> queryGiftCategory();

    //获取新增的商品类别
    public Map<String,Object> createCategoryId();

    //更新类别信息 新增插入
    public Map<String,Object> modifyCategory(WxCommodityCategory category);

    //删除类别
    public Map<String,Object> deleteCategory(String id);

    //根据类别查询单品
    public List<WxCommodity> queryCommodity(String categoryId);

    //新增单品
    public Map<String,Object> createCommodityId(String id,String cateid);

    //获取单品信息
    public WxCommodity getCommondity(String id);

    //保存更新单品
    public Map<String,Object> modifyCommodity(WxCommodity commodity);

    //查询门店
    public List<EpLoc> queryLoc();
}
