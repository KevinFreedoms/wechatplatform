package com.sr.platform.server.customer.dao;

import com.sr.platform.server.customer.bean.WxRoleFunction;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by xxx on 2018/3/22.
 */
public interface IWxRoleFunctionDao {
    /**
     * 查询用户功能
     * @param rolefunction
     * @return
     */
    List<WxRoleFunction> findRoleFunction(WxRoleFunction rolefunction);

    /**
     * 批量删除用户功能菜单
      * @param functions
     */
    void deleteBatchFunctions (@Param("functions") List<WxRoleFunction> functions);

    /**
     *批量插入用户功能菜单
     * @param functions
     */
    void insertBatchFunctions(@Param("functions") List<WxRoleFunction> functions);

    /**
     * 批量更新用户功能菜单
     * @param functions
     */
    void updateBatchFunctions(@Param("functions") List<WxRoleFunction> functions);
}
