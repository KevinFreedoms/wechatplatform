package com.sr.platform.server.recharge.controller;

import com.sr.platform.server.recharge.bean.WxRechargeRule;
import com.sr.platform.server.recharge.service.IRechargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
public class RechargeController {
    @Autowired
    private IRechargeService rechargeService;
    @Autowired
    HttpServletRequest request;
    /**
     *获取所有员工
     * @return
     */
    @RequestMapping(value = "/platform/recharge/rule/all",method = RequestMethod.GET)
    @ResponseBody
    public List<WxRechargeRule> getRuleAll(){
        return rechargeService.getRuleList();
    }

    /**
     * 进入新增充值规则
     * @return
     */
    @RequestMapping(value = "/platform/recharge/rule/new")
    public ModelAndView toAddRechargeRule(){
        return new ModelAndView("addrule");
    }

    /**
     * 进入编辑充值规则
     * @return
     */
    @RequestMapping(value = "/platform/recharge/rule/modify")
    public ModelAndView toModifyRechargeRule(@RequestParam String id){
        List<WxRechargeRule> rules = rechargeService.getRuleById(id);
        WxRechargeRule rule = new WxRechargeRule();
        if(rules.size()>0){
            rule = rules.get(0);
        }
        request.setAttribute("rule",rule);
        return new ModelAndView("modifyrule");
    }

    /**
     * 保存充值规则
     * @return
     */
    @RequestMapping(value = "/platform/recharge/rule/save")
    @ResponseBody
    public Map<String,Object> doSaveRechargeRule(@RequestBody WxRechargeRule   rule){
        return rechargeService.createRule(rule);
    }


    /**
     * 更新充值规则
     * @param rule
     * @return
     */
    @RequestMapping(value = "/platform/recharge/rule/update")
    @ResponseBody
    public Map<String,Object> doUpdateRechargeRule(@RequestBody WxRechargeRule   rule){
        return rechargeService.updateRule(rule);
    }

    /**
     * 删除充值规则
     * @param id
     * @return
     */
    @RequestMapping(value = "/platform/recharge/rule/delete")
    @ResponseBody
    public Map<String,Object> doDeleteRechargeRule(@RequestParam String id){
        return rechargeService.deleteRule(id);
    }

}
