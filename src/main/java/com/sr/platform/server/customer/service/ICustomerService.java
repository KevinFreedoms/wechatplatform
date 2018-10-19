package com.sr.platform.server.customer.service;

import com.sr.platform.server.customer.bean.WxLocPay;
import com.sr.platform.server.customer.bean.WxRole;
import com.sr.platform.server.customer.bean.WxStaff;

import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/3/20.
 */
public interface ICustomerService {
    /**
     * 验证用户账号密码
     * @param id
     * @param password
     * @return
     */
    Map<String,Object> getStaff(String id,String password);

    /**
     * 获取所有角色
     * @return
     */
    List<WxRole> getRoleAll();

    /**
     *进入新增角色
     * @return
     */
    Map<String,Object> getNewRole();

    /**
     * 获取角色信息
     * @param id
     * @return
     */
    Map<String,Object> getRole(String id);

    /**
     * 更新角色信息
     * @param role
     * @return
     */
    boolean updateRole(WxRole role);

    /**
     * 获取所有员工
     * @return
     */
    List<WxStaff> getStaffAll();

    /**
            *进入新增员工
    * @return
            */
    Map<String,Object> getNewStaff ();

    /**
     * 获取员工
     * @param id
     * @return
     */
    Map<String,Object> getStaff(String id);

    /**
     * 更新员工信息
     * @param staff
     * @return
     */
    boolean updateStaff(WxStaff staff);

    /**
     * 更新密码
     * @param staff
     * @return
     */
    Map<String,Object> updatePassword(Map<String,Object> staff);

    /**
     * 根据编码查询是否设置支付密码
     * @param id
     * @return
     */
    List<WxLocPay> findLocPay(String id);

    /**
     * 设置支付密码
     * @param loc
     * @return
     */
    Map<String,Object> updatePayPassword(Map<String,Object> loc);
}
