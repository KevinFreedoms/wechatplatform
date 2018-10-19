package com.sr.platform.server.customer.utils;
import java.sql.Timestamp;
import com.sr.platform.common.utils.StringUtil;
import com.sr.platform.server.customer.bean.WxFunctionmenu;
import com.sr.platform.server.customer.bean.WxRole;
import com.sr.platform.server.customer.bean.WxRoleFunction;

import java.util.*;

/**
 * Created by xxx on 2018/3/29.
 */
public class CreateMenuUtil {
    //展示新的功能菜单展示
    public static List<Map<String,Object>> getNewFunctionMenus(List<WxFunctionmenu> menus){
        String parent = "";
        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        Map<String,Object> map = null;
        for(int i = 0; i<menus.size();i++){
            map = new HashMap<String, Object>();
            if("01"== menus.get(i).getFunctionId()||"01".equals(menus.get(i).getFunctionId())){
                map.put("checked", true);
            }
            map.put("id", menus.get(i).getFunctionId());
            parent = menus.get(i).getParentSign()==1?"0": menus.get(i).getParentFunctionId();
            map.put("pId", parent);
            map.put("name",menus.get(i).getFunctionName());
            int check = menus.get(i).getIscheck();
            if(1==check){
                map.put("chkDisabled", true);
            }
            list.add(map);
        }
        return list;
    }
    //展示用户对应的功能菜单
    public static List<Map<String,Object>> getRoleFunctionMenus(String info,List<WxFunctionmenu> menus){
        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        String[] temp = StringUtil.isEmpty(info)?new String[]{}:info.split("_") ;
        Map<String,Object> map = null;
        for(WxFunctionmenu menu : menus){
            String functionId = menu.getFunctionId();
            boolean check= Arrays.asList(temp).contains(functionId);
            map = new HashMap<String, Object>();
            map.put("id", functionId);
            map.put("pId", menu.getParentFunctionId());
            map.put("checked",check);
            int disabled = menu.getIscheck();
            boolean chkDisabled = disabled==1?true:false;
            map.put("chkDisabled",chkDisabled);
            map.put("name",menu.getFunctionName());
            list.add(map);
        }
        return list;
    }

    //拼接用户对应的功能菜单
    public static List<WxRoleFunction> createRoleFunction(WxRole role, List<WxFunctionmenu> menus){
        //拼接menu
        String[] temp = StringUtil.isEmpty(role.getRef1())?new String[]{}:role.getRef1().split("_") ;
        List<WxRoleFunction> functions = new ArrayList<WxRoleFunction>();
        WxRoleFunction fun = null;
        for(WxFunctionmenu menu : menus) {
            fun = new WxRoleFunction();
            String functionId = menu.getFunctionId();
            boolean isUsing= Arrays.asList(temp).contains(functionId);
            //拼接fun
            fun.setRoleId(role.getRoleId());
            fun.setIcon(menu.getIcon());
            fun.setFunctionId(functionId);
            fun.setFunctionName(menu.getFunctionName());
            fun.setParentFunctionId(menu.getParentFunctionId());
            fun.setFunctionLevel(menu.getFunctionLevel());
            fun.setStatus(isUsing?1:0);
            fun.setOperation(menu.getOperation());
            fun.setCreateUserId("系统管理员");
            fun.setLastUpdateUserId("系统管理员");
            functions.add(fun);
        }
        return functions;

    }
    //更新对应的功能菜单
    public static List<WxRoleFunction> updateRoleFunction(WxRole role,List<WxRoleFunction> menus){
        //拼接menu
        Timestamp now = new Timestamp(System.currentTimeMillis());
        String[] temp = StringUtil.isEmpty(role.getRef1())?new String[]{}:role.getRef1().split("_") ;
        List<WxRoleFunction> functions = new ArrayList<WxRoleFunction>();
        for(WxRoleFunction menu : menus) {
            String functionId = menu.getFunctionId();
            boolean isUsing= Arrays.asList(temp).contains(functionId);
            menu.setStatus(isUsing?1:0);
            menu.setLastUpDate(now);
            functions.add(menu);
        }
        return functions;
    }

    //更新角色
    public static WxRole updateRole(WxRole role,WxRole temp){
        Timestamp now = new Timestamp(System.currentTimeMillis());
        role.setRoleName(temp.getRoleName());
        role.setRemark(temp.getRemark());
        role.setStatus(temp.getStatus());
        role.setCreateDate(role.getCreateDate());
        role.setLastUpDate(now);
        return role;
    }
}
