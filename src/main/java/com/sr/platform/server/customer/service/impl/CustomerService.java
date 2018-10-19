package com.sr.platform.server.customer.service.impl;

import com.sr.platform.common.utils.MD5Util;
import com.sr.platform.common.utils.StringUtil;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.customer.bean.*;
import com.sr.platform.server.customer.dao.*;
import com.sr.platform.server.customer.service.ICustomerService;
import com.sr.platform.server.customer.utils.CreateMenuUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.transaction.support.TransactionTemplate;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/3/23.
 */
@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private PlatformTransactionManager transactionManager;
    @Autowired
    private IWxStaffDao wxStaffDao;

    @Autowired
    private IWxRoleDao wxRoleDao;

    @Autowired
    private IWxRoleFunctionDao wxRoleFunctionDao;

    @Autowired
    private IWxFunctionmenuDao wxFunctionmenuDao;

    @Autowired
    private IWxLocPayDao wxLocPayDao;

    @Override
    public Map<String, Object> getStaff(String id, String password) {
        Map<String,Object> reMap = null;
        try{
            password = MD5Util.getMD5(password);
            reMap =  new HashMap<String, Object>();
            if("admin".equals(id)||"admin"==id){
                //判断用户是否存在
                List<WxSystem> list= wxStaffDao.findSys(id);
                if(list.size()==0){
                    reMap.put("status", 0);
                    reMap.put("Msg", "尚未设置系统账号");
                    return reMap;
                }
                WxSystem sys = list.get(0);
                if(!password.equals(sys.getPassword())){
                    reMap.put("status", 0);
                    reMap.put("Msg", "用户密码错误");
                    return reMap;
                }
                reMap.put("system",1);
            }else{
                WxStaff staff = new WxStaff();
                staff.setStaffId(id);
                //判断用户是否存在
                List<WxStaff> list= wxStaffDao.findStaff(id);
                if(list.size()==0){
                    reMap.put("status", 0);
                    reMap.put("Msg", "用户信息不存在");
                    return reMap;
                }
                //判断密码是否正确
                staff = list.get(0);
                if(!password.equals(staff.getPassword())){
                    reMap.put("status", 0);
                    reMap.put("Msg", "用户密码错误");
                    return reMap;
                }
                //判断用户的状态
                int status = staff.getStatus();
                if(0==status){
                    reMap.put("success", 0);
                    reMap.put("Msg", "该用户已经停用");
                    return reMap;
                }
                //获取用户功能菜单项
                String roleId = staff.getRoleId();
                WxRoleFunction roleFunction = new WxRoleFunction();
                roleFunction.setRoleId(roleId);
                roleFunction.setStatus(1);
                List<WxRoleFunction> functions =  wxRoleFunctionDao.findRoleFunction(roleFunction);
                if(functions.size()==0){
                    reMap.put("success", 0);
                    reMap.put("Msg", "当前用户尚未分配权限，请联系相关人员进行处理");
                    return reMap;
                }
                reMap.put("functions", functions);
                reMap.put("staff", list.get(0));
                reMap.put("system",0);
            }
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public List<WxStaff> getStaffAll() {
        return wxStaffDao.findStaffAll();
    }

    @Override
    public Map<String, Object> getNewStaff() {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //获取最大类别
            List<WxStaff> staffs = wxStaffDao.getStaffMaxNum();
            Integer temp  = staffs.size()>0?Integer.parseInt(staffs.get(0).getStaffId())+1:1;
            String staffId =  String.format("%04d",temp);
            WxStaff staff = new WxStaff();
            staff.setStaffId(staffId);
            reMap.put("staff", staff);
            //获取对应门店
            List<EpLoc> locs = wxStaffDao.getEploc();
            reMap.put("locs", locs);
            //获取角色
            List<WxRole> roles = wxRoleDao.findRoleAll();
            reMap.put("roles", roles);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String, Object> getStaff(String id) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //判断当前角色是否存在
            List<WxStaff> list = wxStaffDao.findStaff(id);
            if(list.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg","获取员工信息失败");
            }
            reMap.put("staff", list.get(0));
            //获取对应门店
            List<EpLoc> locs = wxStaffDao.getEploc();
            reMap.put("locs", locs);
            //获取角色
            List<WxRole> roles = wxRoleDao.findRoleAll();
            reMap.put("roles", roles);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public boolean updateStaff(final WxStaff staff) {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        return template.execute(new TransactionCallback<Boolean>() {
            @Override
            public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try{
                    //判断当前角色是否存在
                    String id = staff.getStaffId();
                    List<WxStaff> list = wxStaffDao.findStaff(id);
                    //判断角色
                    WxStaff temp = new WxStaff();
                    Timestamp now = new Timestamp(System.currentTimeMillis());
                    if(list.size()>0){
                        temp = list.get(0);
                        temp.setStaffName(staff.getStaffName());
                        temp.setPhone(staff.getPhone());
                        temp.setAddress(staff.getAddress());
                        temp.setRoleId(staff.getRoleId());
                        temp.setLocId(staff.getLocId());
                        temp.setStatus(staff.getStatus());
                        temp.setRemark(staff.getRemark());
                        temp.setLastUpDate(now);
                        temp.setLastUpdateUserId("系统管理员");
                        wxStaffDao.updateStaff(temp);
                    }else{
                        //staff.setRemark(StringUtil.isEmpty(staff.getRemark())?"":staff.getRemark());
                        //staff.setAddress(StringUtil.isEmpty(staff.getAddress())?"":staff.getAddress());
                        staff.setCreateUserId("系统管理员");
                        staff.setLastUpdateUserId("系统管理员");
                        staff.setCreateDate(now);
                        staff.setLastUpDate(now);
                        staff.setPassword( MD5Util.getMD5(staff.getStaffId()));
                        wxStaffDao.insertStaff(staff);
                    }
                    return true;
                }catch (Exception e) {
                    transactionStatus.setRollbackOnly();
                    e.printStackTrace();
                    return false;
                }
            }
        });
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
    public Map<String, Object> updatePassword(Map<String, Object> map) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //判断原始密码是否正确
            String id = map.get("id").toString();
            String oldpassword = map.get("oldp").toString();
            String newpassword = map.get("newp").toString();
            //判断用户是否存在
            List<WxStaff> list= wxStaffDao.findStaff(id);
            if(list.size()==0){
                reMap.put("status", 0);
                return reMap;
            }
            //判断密码是否正确
            oldpassword = MD5Util.getMD5(oldpassword);
            if(!oldpassword.equals(list.get(0).getPassword())){
                reMap.put("status", 0);
                reMap.put("Msg", "用户密码错误");
                return reMap;
            }
            WxStaff staff = new WxStaff();
            staff.setStatus(list.get(0).getStatus());
            staff.setRecKey(list.get(0).getRecKey());
            staff.setPassword(MD5Util.getMD5(newpassword));
            wxStaffDao.updateStaff(staff);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 99);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public List<WxLocPay> findLocPay(String id) {
        return wxLocPayDao.findLocPay(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
    public Map<String, Object> updatePayPassword(Map<String, Object> loc) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            String locid = loc.get("loc").toString();
            String id = loc.get("id").toString();
            List<WxLocPay> listloc = wxLocPayDao.findLocPay(locid);
            String newpassword = loc.get("newp").toString();
            WxLocPay locinfo = new WxLocPay();
            if(listloc.size()>0){
                String oldpassword = loc.get("oldp").toString();
                oldpassword = MD5Util.getMD5(oldpassword);
                if(!oldpassword.equals(listloc.get(0).getPassword())){
                    reMap.put("status", 0);
                    reMap.put("Msg", "用户密码错误");
                    return reMap;
                }
                locinfo.setRecKey(listloc.get(0).getRecKey());
                locinfo.setPassword(MD5Util.getMD5(newpassword));
                wxLocPayDao.updateLocPay(locinfo);
            }else{
                locinfo.setPassword(MD5Util.getMD5(newpassword));
                locinfo.setLocId(locid);
                List<EpLoc> locs = wxStaffDao.getEplocById(locid);
                if(locs.size()>0){
                    locinfo.setLocName(locs.get(0).getLocName());
                }
                locinfo.setCreateUserId(id);
                locinfo.setLastUpdateUserId(id);
                wxLocPayDao.insertLocPay(locinfo);
            }
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 99);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public List<WxRole> getRoleAll() {
        return wxRoleDao.findRoleAll();
    }

    @Override
    public Map<String, Object> getNewRole() {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //获取最大编码
            List<WxRole> roles = wxRoleDao.getRoleMaxNum();
            Integer temp  = roles.size()>0?Integer.parseInt(roles.get(0).getRoleId())+1:1;
            String roleId =  String.format("%04d",temp);
            System.out.println(roleId);
            WxRole role = new WxRole();
            role.setRoleId(roleId);
            //获取功能菜单项
            List<WxFunctionmenu> wxFunctionmenus = wxFunctionmenuDao.findFunctions();
            if(wxFunctionmenus.size()==0){
                reMap.put("Msg", "初始化功能菜单失败~请稍后重试");
                reMap.put("status", 0);
                return reMap;
            }
            List<Map<String,Object>> menus = new ArrayList<Map<String,Object>>();
            menus = CreateMenuUtil.getNewFunctionMenus(wxFunctionmenus);
            reMap.put("menus", menus);
            reMap.put("role", role);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String, Object> getRole(String id) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //获取角色信息
            //判断当前角色是否存在
            List<WxRole> list = wxRoleDao.findRole(id);
            if(list.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg","获取角色信息失败");
            }
            reMap.put("role",list.get(0));
            //用户功能菜单
            List<WxRoleFunction> menus = new ArrayList<WxRoleFunction>();
            WxRoleFunction function = new  WxRoleFunction();
            function.setRoleId(id);
            function.setStatus(1);
            menus = wxRoleFunctionDao.findRoleFunction(function);
            String info="";
            for(int i = 0; i<menus.size();i++){
                info += menus.get(i).getFunctionId()+"_";
            }
            //系统功能菜单
            List<WxFunctionmenu> functionmenus = wxFunctionmenuDao.findFunctions();
            reMap.put("menus",CreateMenuUtil.getRoleFunctionMenus(info,functionmenus));
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public  boolean updateRole(final WxRole role) {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
            return template.execute(new TransactionCallback<Boolean>() {
            @Override
            public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try{
                    String id = role.getRoleId();
                    //判断当前角色是否存在
                    List<WxRole> list = wxRoleDao.findRole(id);
                    //判断角色
                    WxRole temp = new WxRole();
                    if(list.size()>0){
                        temp = list.get(0);
                        temp = CreateMenuUtil.updateRole(temp,role);
                        wxRoleDao.updateRole(temp);
                    }else{
                        Timestamp now = new Timestamp(System.currentTimeMillis());
                        role.setRemark(StringUtil.isEmpty(role.getRemark())?"":role.getRemark());
                        role.setCreateUserId("系统管理员");
                        role.setLastUpdateUserId("系统管理员");
                        role.setCreateDate(now);
                        role.setLastUpDate(now);
                        wxRoleDao.insertRole(role);
                    }
                    //用户功能菜单
                    List<WxRoleFunction> listrolef = new ArrayList<WxRoleFunction>();

                    //系统功能菜单
                    List<WxFunctionmenu> menus = wxFunctionmenuDao.findFunctionsAll();

                    WxRoleFunction function = new  WxRoleFunction();
                    function.setRoleId(role.getRoleId());
                    listrolef = wxRoleFunctionDao.findRoleFunction(function);
                    if(menus.size()==listrolef.size()){
                        listrolef = CreateMenuUtil.updateRoleFunction(role,listrolef);
                        wxRoleFunctionDao.updateBatchFunctions(listrolef);
                    }else{
                        //删除原始
                        if(listrolef.size()>0){
                            wxRoleFunctionDao.deleteBatchFunctions(listrolef);
                        }
                        listrolef = CreateMenuUtil.createRoleFunction(role,menus);
                        //插入新增
                        wxRoleFunctionDao.insertBatchFunctions(listrolef);
                    }
                    return true;
                }catch (Exception e) {
                    transactionStatus.setRollbackOnly();
                    e.printStackTrace();
                    return false;
                }
            }
        });
    }
}
