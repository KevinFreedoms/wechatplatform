package com.sr.platform.server.customer.controller;

import com.sr.platform.server.customer.bean.WxLocPay;
import com.sr.platform.server.customer.bean.WxRole;
import com.sr.platform.server.customer.bean.WxStaff;
import com.sr.platform.server.customer.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/3/20.
 */
@RestController
public class CustomerController {
    @Autowired
    private ICustomerService customerService;

    /**
     *登录验证W
     * @param id
     * @param password
     * @return
     */
    @RequestMapping(value = "/platform/user/get",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getStaff(@RequestParam String id, @RequestParam String password ){
        return customerService.getStaff(id,password);
    }

    /**
     *获取所有员工
     * @return
     */
    @RequestMapping(value = "/platform/user/all",method = RequestMethod.GET)
    @ResponseBody
    public List<WxStaff> getStaffAll(){
        return customerService.getStaffAll();
    }

    /**
     * 获取所有角色
     * @return
     */
    @RequestMapping(value = "/platform/role/all",method = RequestMethod.GET)
    @ResponseBody
    public List<WxRole> getRoleAll(){
        return customerService.getRoleAll();
    }

    /**
     * 进入角色新增
     * @return
     */
    @RequestMapping(value = "/platform/role/new",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getNewRole(){
        return customerService.getNewRole();
    }

    /**
     * 获取角色下的功能菜单 以及角色信息
     * @return
     */
    @RequestMapping(value = "/platform/role/get",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getRole(@RequestParam String id){
        return customerService.getRole(id);
    }

    /**
     * 更新保存角色信息
     * @param role
     * @return
     */
    @RequestMapping(value = "/platform/role/update",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateRole(@RequestBody WxRole role){
        Map<String,Object> reMap = new HashMap<String, Object>();
        boolean  status= customerService.updateRole(role);
        if(status){
            reMap.put("status",1);
            return reMap;
        }
        reMap.put("status",0);
        reMap.put("Msg","更新数据失败，请稍后重试");
        return reMap;

    }

    /**
     * 进入员工新增
     * @return
     */
    @RequestMapping(value = "/platform/staff/new",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getNewStaff(){
        return customerService.getNewStaff();
    }

    /**
     * 获取员工信息
     * @return
     */
    @RequestMapping(value = "/platform/staff/get",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getStaff(@RequestParam String id){
        return customerService.getStaff(id);
    }

    /**
     * 更新保存角色信息
     * @param staff
     * @return
     */
    @RequestMapping(value = "/platform/staff/update",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateStaff(@RequestBody WxStaff staff){
        Map<String,Object> reMap = new HashMap<String, Object>();
        boolean  status= customerService.updateStaff(staff);
        if(status){
            reMap.put("status",1);
            return reMap;
        }
        reMap.put("status",0);
        reMap.put("Msg","更新数据失败，请稍后重试");
        return reMap;

    }

    /**
     * 修改密码
     * @return
     */
    @RequestMapping(value = "/platform/staff/password",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updatePassword(@RequestBody Map<String,Object> map){
        return customerService.updatePassword(map);
    }

    /**
     * 判断是否设置了支付密码
     * @return
     */
    @RequestMapping(value = "/platform/pay/check",method = RequestMethod.GET)
    public Map<String,Object> checkLocPay(@RequestParam String id){
        Map<String,Object> reMap = new HashMap<String, Object>();
        List<WxLocPay> list = customerService.findLocPay(id);
        if(list.size()>0){
            reMap.put("status",1);
            return reMap;
        }
        reMap.put("status",0);
        return reMap;

    }

    /**
     * 判断是否设置了支付密码
     * @return
     */
    @RequestMapping(value = "/platform/pay/modify",method = RequestMethod.POST)
    public Map<String,Object> updatePayLoc(@RequestBody Map<String,Object> map){
        return customerService.updatePayPassword(map);

    }
}
