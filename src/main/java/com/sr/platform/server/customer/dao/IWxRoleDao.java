package com.sr.platform.server.customer.dao;
import com.sr.platform.server.customer.bean.WxRole;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by xxx on 2018/3/22.
 */
public interface IWxRoleDao {
    /**
     *查询角色列表
     * @return
     */
    List<WxRole> findRoleAll();

    /**
     * 获取新的角色号
     * @return
     */
    List<WxRole> getRoleMaxNum();


    /**
     * 查询角色信息
     * @param id
     * @return
     */
    List<WxRole> findRole(String id);

    /**
     *插入角色信息
     * @param role
     */
    void insertRole(WxRole role);


    /**
     * 更新角色信息
     * @param role
     */
    void updateRole(WxRole role);


}
