package com.sr.platform.server.memberManagement.bean;

/**
 * 会员扣款记录
 */
public class WxConsume {
    private long recKey;
    private String memberId;
    private String memberName;
    private String code;
    private String consumeId;
    private String createDate;
    private Double money;
    private Double actualMoney;
    private Double discountMoney;
    private Double beforeConsumeBalance;
    private Double afterConsumeBalance;

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

    public String getConsumeId() {
        return consumeId;
    }

    public void setConsumeId(String consumeId) {
        this.consumeId = consumeId;
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

    public Double getDiscountMoney() {
        return discountMoney;
    }

    public void setDiscountMoney(Double discountMoney) {
        this.discountMoney = discountMoney;
    }

    public Double getBeforeConsumeBalance() {
        return beforeConsumeBalance;
    }

    public void setBeforeConsumeBalance(Double beforeConsumeBalance) {
        this.beforeConsumeBalance = beforeConsumeBalance;
    }

    public Double getAfterConsumeBalance() {
        return afterConsumeBalance;
    }

    public void setAfterConsumeBalance(Double afterConsumeBalance) {
        this.afterConsumeBalance = afterConsumeBalance;
    }

    @Override
    public String toString() {
        return "WxConsume{" +
                "recKey=" + recKey +
                ", memberId='" + memberId + '\'' +
                ", memberName='" + memberName + '\'' +
                ", code='" + code + '\'' +
                ", consumeId='" + consumeId + '\'' +
                ", createDate='" + createDate + '\'' +
                ", money=" + money +
                ", actualMoney=" + actualMoney +
                ", discountMoney=" + discountMoney +
                ", beforeConsumeBalance=" + beforeConsumeBalance +
                ", afterConsumeBalance=" + afterConsumeBalance +
                '}';
    }
}
