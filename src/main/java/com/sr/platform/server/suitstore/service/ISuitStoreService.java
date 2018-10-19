package com.sr.platform.server.suitstore.service;

import com.sr.platform.server.suitstore.bean.WxLoc;

import java.util.List;
import java.util.Map;

public interface ISuitStoreService {
    /**
     * 获取所有适用门店
     * @return
     */
    public List<WxLoc> getLocAll();

    /**
     * 根据reckey查询门店信息
     * @param id
     * @return
     */
    public List<WxLoc> getLocById(String id);

    /**
     * 插入适用门店
     * @param loc
     */
    public Map<String,Object> insertSuitLoc(WxLoc loc);

    /**
     * 更新适用门店
     * @param loc
     */
    public Map<String,Object> updateSuitLoc(WxLoc loc);

    /**
     * 获取门店类型信息
     */
    public Map<String,Object> getCateList();

    public Map<String,Object> deleteSuit(String id);
}
