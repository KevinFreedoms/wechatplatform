package com.sr.platform.server.recharge.dao;
import com.sr.platform.server.recharge.bean.WxRechargeRule;
import java.util.List;

public interface IRechargeDao {
    /**
     * 获取列表
     * @return
     */
    List<WxRechargeRule> getRuleAll();

    /**
     * 获取充值规则
     * @param id
     * @return
     */
    List<WxRechargeRule> getRuleById(String id);

    /**
     * 根据金额判断是否已经存在该充值金额的列
     * @param money
     * @return
     */
    List<WxRechargeRule> getRuleByMoney(Double money);

    /**
     * 添加充值规则
     * @param rule
     */
    void insertRechargeRule(WxRechargeRule rule);

    /**
     * 更新充值规则
     * @param rule
     */
    void updateRechargeRule(WxRechargeRule rule);

    void deleteRuleById(String id);
}
