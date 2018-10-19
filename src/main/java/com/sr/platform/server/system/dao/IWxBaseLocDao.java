package com.sr.platform.server.system.dao;

import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.system.bean.EpAppSetting;
import com.sr.platform.server.system.bean.WxBaseLoc;

import java.util.List;
import java.util.Map;

public interface IWxBaseLocDao {
    /**
     * 获取微信所有门店
     * @return
     */
    List<WxBaseLoc>getlocAll();

    /**
     * 获取启用门店
     * @return
     */
    List<EpLoc> getlocLimit();

    /**
     * 获取C服传输的所有门店
     * @return
     */
    List<WxBaseLoc>getbaselocAll();


    /**
     * 根据门店编号获取门店
     * @return id
     */
    List<WxBaseLoc>getbaselocById(String id);

    /**
     *插入微信门店
     * @param data
     */
    void insertLoc(Map<String, Object> data);


    /**
     * 更新微信门店
     * @param loc
     */
    void updateLoc(EpLoc loc);

    /**
     * 更新C服门店
     * @param loc
     */
    void updateBaseLoc(WxBaseLoc loc);

    /**
     * 获取系统设置
     * @param type
     * @return
     */
    List<EpAppSetting> getconfig(String type);
}

