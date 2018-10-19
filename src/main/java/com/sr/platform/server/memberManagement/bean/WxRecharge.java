package com.sr.platform.server.memberManagement.bean;
/**
 * 会员充值记录
 */
public class WxRecharge {
    private long recKey;
    private String memberId;
    private String memberName;
    private String code;
    private String rechargeId;
    private String createDate;
    private Double money;
    private Double actualMoney;
    private Double presentMoney;
    private Double beforeRechargeBalance;
    private Double afterRechargeBalance;
    private Double rate;

    public long getRecKey() {
        return recKey;
    }

    public void setRecKey(long recKey) {
        this.recKey = recKey;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getRechargeId() {
        return rechargeId;
    }

    public void setRechargeId(String rechargeId) {
        this.rechargeId = rechargeId;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    public Double getActualMoney() {
        return actualMoney;
    }

    public void setActualMoney(Double actualMoney) {
        this.actualMoney = actualMoney;
    }

    public Double getPresentMoney() {
        return presentMoney;
    }

    public void setPresentMoney(Double presentMoney) {
        this.presentMoney = presentMoney;
    }

    public Double getBeforeRechargeBalance() {
        return beforeRechargeBalance;
    }

    public void setBeforeRechargeBalance(Double beforeRechargeBalance) {
        this.beforeRechargeBalance = beforeRechargeBalance;
    }

    public Double getAfterRechargeBalance() {
        return afterRechargeBalance;
    }

    public void setAfterRechargeBalance(Double afterRechargeBalance) {
        this.afterRechargeBalance = afterRechargeBalance;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    @Override
    public String toString() {
        return "WxRecharge{" +
                "recKey=" + recKey +
                ", memberId='" + memberId + '\'' +
                ", memberName='" + memberName + '\'' +
                ", code='" + code + '\'' +
                ", rechargeId='" + rechargeId + '\'' +
                ", createDate='" + createDate + '\'' +
                ", money=" + money +
                ", actualMoney=" + actualMoney +
                ", presentMoney=" + presentMoney +
                ", beforeRechargeBalance=" + beforeRechargeBalance +
                ", afterRechargeBalance=" + afterRechargeBalance +
                ", rate=" + rate +
                '}';
    }
}
