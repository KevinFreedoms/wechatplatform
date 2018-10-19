package com.sr.platform.server.customer.dao;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.customer.bean.WxStaff;
import com.sr.platform.server.customer.bean.WxSystem;

import java.util.List;

/**
 * Created by xxx on 2018/3/22.
 */
public interface IWxStaffDao {
    /**
     *查询用户密码是否正确
     * @param id
     * @param id
     * @return
     */
    List<WxStaff> findStaff(String id);

    /**
     * 验证系统管理员账号是否正确
     * @param id
     * @return
     */
    List<WxSystem> findSys(String id);

    /**
            *插入角色信息
    * @param staff
    */
    void insertStaff(WxStaff staff);


    /**
     * 更新角色信息
     * @param staff
     */
    void updateStaff(WxStaff staff);

    /**
     *获取所有用户
     * @return
     */
    List<WxStaff> findStaffAll();

    /**
     *获取最大编码
     * @return
     */
    List<WxStaff> getStaffMaxNum();

    /**
     *门店
     * @return
     */

    List<EpLoc> getEploc();

    /**
     * 根据门店编号获取门店
     * @param id
     * @return
     */
    List<EpLoc> getEplocById(String id);


    /**
     * 根据C服门店号获取门店
     * @param id
     * @return
     */
    List<EpLoc> getEplocByLoc(String id);

}
