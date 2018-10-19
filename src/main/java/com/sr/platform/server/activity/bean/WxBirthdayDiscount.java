package com.sr.platform.server.activity.bean;

import java.util.Date;

/**
 * 生日活动表
 */
public class WxBirthdayDiscount {
    private Integer recKey;
    /**
     * 活动类型
     */
    private Integer activityType;
    /**
     * 活动批次
     */
    private String privilegeBatch;
    /**
     * 倍数
     */
    private String multiple;
    /**
     * 折扣率
     */
    private String discountRate;
    /**
     * 优惠券批次
     */
    private String couponBatch;
    /**
     * 备注
     */
    private String remark;
    /**
     * 活动内容
     */
    private String activeContent;
    /**
     * 优惠券数量
     */
    private Integer couponCount;
    /**
     * 生日开始时间
     */
    private String birthdayStartDate;
    /**
     * 生日结束时间
     */
    private String birthdayEndDate;
    private String ref1;
    private String ref2;
    private String ref3;
    private String createUser;
    private Date createDate;
    private String lastUpdateUser;
    private Date lastUpdateDate;

    public Integer getRecKey() {
        return recKey;
    }

    public void setRecKey(Integer recKey) {
        this.recKey = recKey;
    }

    public Integer getActivityType() {
        return activityType;
    }

    public void setActivityType(Integer activityType) {
        this.activityType = activityType;
    }

    public String getPrivilegeBatch() {
        return privilegeBatch;
    }

    public void setPrivilegeBatch(String privilegeBatch) {
        this.privilegeBatch = privilegeBatch;
    }

    public String getMultiple() {
        return multiple;
    }

    public void setMultiple(String multiple) {
        this.multiple = multiple;
    }

    public String getDiscountRate() {
        return discountRate;
    }

    public void setDiscountRate(String discountRate) {
        this.discountRate = discountRate;
    }

    public String getCouponBatch() {
        return couponBatch;
    }

    public void setCouponBatch(String couponBatch) {
        this.couponBatch = couponBatch;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getActiveContent() {
        return activeContent;
    }

    public void setActiveContent(String activeContent) {
        this.activeContent = activeContent;
    }

    public Integer getCouponCount() {
        return couponCount;
    }

    public void setCouponCount(Integer couponCount) {
        this.couponCount = couponCount;
    }

    public String getBirthdayStartDate() {
        return birthdayStartDate;
    }

    public void setBirthdayStartDate(String birthdayStartDate) {
        this.birthdayStartDate = birthdayStartDate;
    }

    public String getBirthdayEndDate() {
        return birthdayEndDate;
    }

    public void setBirthdayEndDate(String birthdayEndDate) {
        this.birthdayEndDate = birthdayEndDate;
    }

    public String getRef1() {
        return ref1;
    }

    public void setRef1(String ref1) {
        this.ref1 = ref1;
    }

    public String getRef2() {
        return ref2;
    }

    public void setRef2(String ref2) {
        this.ref2 = ref2;
    }

    public String getRef3() {
        return ref3;
    }

    public void setRef3(String ref3) {
        this.ref3 = ref3;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getLastUpdateUser() {
        return lastUpdateUser;
    }

    public void setLastUpdateUser(String lastUpdateUser) {
        this.lastUpdateUser = lastUpdateUser;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }
}
