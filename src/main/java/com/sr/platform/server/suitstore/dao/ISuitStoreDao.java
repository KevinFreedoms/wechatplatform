package com.sr.platform.server.suitstore.dao;

import com.sr.platform.server.suitstore.bean.WxBasicCategories;
import com.sr.platform.server.suitstore.bean.WxLoc;

import java.util.List;

public interface ISuitStoreDao {
    /**
     * 获取网点全部
     * @return
     */
    List<WxLoc> getLocAll();

    /**
     * 根据网点编码获取网点信息
     * @param id
     * @return
     */
    List<WxLoc> getLocById(String id);

    /**
     * 插入网点信息
     * @param loc
     */
    void insertLoc(WxLoc loc);

    /**
     * 更新网点信息
     * @param loc
     */
    void updateLoc(WxLoc loc);

    /**
     *
     * @param loc
     */
    void updateLocPoi(WxLoc loc);

    /**
     * 删除门店
     * @param id
     */
    void deleteLoc(String id);

    /**
     * 获取基础类别
     * @return
     */
    List<WxBasicCategories> getCateIndex();

    /**
     * 获取类别下类别
     * @param id
     * @return
     */
    List<WxBasicCategories> getCateList(String id);
}
