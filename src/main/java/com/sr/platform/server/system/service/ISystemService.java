package com.sr.platform.server.system.service;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.system.bean.WxBaseLoc;
import java.util.List;
import java.util.Map;

public interface ISystemService {
    //获取基础门店
    public List<WxBaseLoc> getLocAll();

    /**
     * 获取启用的基础门店
     * @return
     */
    public List<EpLoc> getLocLimit();

    //获取C服门店
    public List<WxBaseLoc> getBaseLocAll();

    /**
     * 根据门店编号获取门店信息
     * @param id
     * @return
     */
    public List<WxBaseLoc> getBaseLocById(String id);

    /**
     * 获取可修改的门店
     * @param id 门店编号
     * @return
     */
    public Map<String,Object> getBaseLocCan(String id);

    /**
     * 获取限制点数
     * @param id
     * @return
     */
    public Map<String,Object> getConfig(String id);


    /**
     * 插入门店信息
     * @param locMap
     * @return
     */
    public Map<String,Object> saveLoc(Map<String,Object> locMap);

    /**
     * 更新门店信息
     * @param locMap
     * @return
     */
    public Map<String,Object> updateLoc(Map<String,Object> locMap);
}
