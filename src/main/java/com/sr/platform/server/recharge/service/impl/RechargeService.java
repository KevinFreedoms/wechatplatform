package com.sr.platform.server.recharge.service.impl;

import com.sr.platform.server.recharge.bean.WxRechargeRule;
import com.sr.platform.server.recharge.dao.IRechargeDao;
import com.sr.platform.server.recharge.service.IRechargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RechargeService implements IRechargeService{
    @Autowired
    IRechargeDao rechargeDao;
    @Override
    public List<WxRechargeRule> getRuleList() {
        return rechargeDao.getRuleAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> createRule(WxRechargeRule rule) {
        Map<String, Object> reMap =new HashMap<>();
        try{
            double money =  rule.getMoney();
            if(money==0){
                reMap.put("status", 0);
                reMap.put("Msg", "充值金额不能为0");
                return reMap;
            }
            //判断充值金额是否存在
            List<WxRechargeRule> list=rechargeDao.getRuleByMoney(money);
            if(list.size()>0){
                reMap.put("status", 0);
                reMap.put("Msg", "金额为"+money+"元充值规则已经存在，不能重复添加");
                return reMap;
            }
            rechargeDao.insertRechargeRule(rule);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            e.printStackTrace();
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            return reMap;
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> updateRule(WxRechargeRule rule) {
        Map<String, Object> reMap =new HashMap<>();
        try{
            double money =  rule.getMoney();
            if(money==0){
                reMap.put("status", 0);
                reMap.put("Msg", "充值金额不能为0");
                return reMap;
            }
            Integer id = rule.getRecKey();
            List<WxRechargeRule> list=rechargeDao.getRuleByMoney(money);
            if(list.size()>0&&id!=list.get(0).getRecKey()){
                reMap.put("status", 0);
                reMap.put("Msg", "金额为"+money+"元充值规则已经存在，无法更新");
                return reMap;
            }
            rechargeDao.updateRechargeRule(rule);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            e.printStackTrace();
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            return reMap;
        }
    }

    @Override
    public List<WxRechargeRule> getRuleById(String id) {
        return rechargeDao.getRuleById(id);
    }

    @Override
    public Map<String, Object> deleteRule(String id) {
        Map<String, Object> reMap =new HashMap<>();
        try{
            List<WxRechargeRule> list=rechargeDao.getRuleById(id);
            if(list.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg", "充值规则不存在，无法删除");
                return reMap;
            }
            rechargeDao.deleteRuleById(id);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            e.printStackTrace();
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            return reMap;
        }
    }
}
