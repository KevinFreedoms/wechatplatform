package com.sr.platform.server.activity.bean;

import java.util.Date;

/**
 * 会员卡活动表
 */
public class WxMemcardActivity {
    /**
     * 自增主键
     */
    private Integer reckey;
    /**
     * 活动批次
     */
    private String privilegeBatch;
    /**
     * 是否优惠券
     */
    private int isCoupon;
    /**
     * 优惠券批次
     */
    private String couponBatch;
    /**
     * 优惠券数量
     */
    private Integer couponCount;
    /**
     * 是否积分
     */
    private int isIntegration;
    /**
     * 积分倍数
     */
    private String multiple;
    /**
     * 备注
     */
    private String remark;
    private String ref1;
    private String ref2;
    private String ref3;
    private String createUser;
    private String createDate;
    private String lastUpdateUser;
    private String lastUpdateDate;

    public Integer getReckey() {
        return reckey;
    }

    public void setReckey(Integer reckey) {
        this.reckey = reckey;
    }

    public String getPrivilegeBatch() {
        return privilegeBatch;
    }

    public void setPrivilegeBatch(String privilegeBatch) {
        this.privilegeBatch = privilegeBatch;
    }

    public int getIsCoupon() {
        return isCoupon;
    }

    public void setIsCoupon(int isCoupon) {
        this.isCoupon = isCoupon;
    }

    public String getCouponBatch() {
        return couponBatch;
    }

    public void setCouponBatch(String couponBatch) {
        this.couponBatch = couponBatch;
    }

    public Integer getCouponCount() {
        return couponCount;
    }

    public void setCouponCount(Integer couponCount) {
        this.couponCount = couponCount;
    }

    public int getIsIntegration() {
        return isIntegration;
    }

    public void setIsIntegration(int isIntegration) {
        this.isIntegration = isIntegration;
    }

    public String getMultiple() {
        return multiple;
    }

    public void setMultiple(String multiple) {
        this.multiple = multiple;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
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

    public String getLastUpdateUser() {
        return lastUpdateUser;
    }

    public void setLastUpdateUser(String lastUpdateUser) {
        this.lastUpdateUser = lastUpdateUser;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(String lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }
}
