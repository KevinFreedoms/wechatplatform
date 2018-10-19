package com.sr.platform.server.customer.dao;
import com.sr.platform.server.customer.bean.WxFunctionmenu;
import java.util.List;

/**
 * Created by xxx on 2018/3/22.
 */
public interface IWxFunctionmenuDao {

    /**
     * 查询所有功能菜单项
     * @return
     */
    List<WxFunctionmenu> findFunctionsAll();

    /**
     * 查询启用功能菜单项
     * @return
     */
    List<WxFunctionmenu> findFunctions();

}
