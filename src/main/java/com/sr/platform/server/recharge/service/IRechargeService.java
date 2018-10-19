package com.sr.platform.server.recharge.service;

import com.sr.platform.server.recharge.bean.WxRechargeRule;

import java.util.List;
import java.util.Map;

public interface IRechargeService {

    //获取充值规则列表
    List<WxRechargeRule> getRuleList();


    //保存充值规则
    Map<String,Object> createRule(WxRechargeRule rule);


    //更新充值规则
    Map<String,Object> updateRule(WxRechargeRule rule);

    //获取充值规则
    List<WxRechargeRule> getRuleById(String id);

    //删除充值规则
    Map<String,Object> deleteRule(String id);


}
