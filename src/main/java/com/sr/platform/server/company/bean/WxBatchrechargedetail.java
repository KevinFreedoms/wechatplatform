package com.sr.platform.server.company.bean;

import java.util.Date;

public class WxBatchrechargedetail {
    /**
     * 自增主键
     */
    private Long reckey;
    /**
     * 订单编码
     */
    private String bookingId;
    /**
     * 企业编码
     */
    private String companyId;
    /**
     * 会员编码
     */
    private String memberId;
    /**
     * 会员名称
     */
    private String memberName;
    /**
     * 员工名称
     */
    private String staffName;
    /**
     * 微信标识
     */
    private String openId;

    /**
     * 充值前金额
     */
    private Double rechargeBefore;
    /**
     * 充值金额
     */
    private Double rechargeAmount;

    /**
     * 充值后金额
     */
    private Double rechargeAfter;

    /**
     * 预留 会员手机号

     */
    private String ref1;
    /**
     * 预留 会员卡号
     */
    private String ref2;
    /**
     * 预留
     */
    private String ref3;
    /**
     * 备注
     */
    private String remark;
    /**
     * 创建时间
     */
    private Date createDate;
    /**
     * 创建人
     */
    private String createUserId;
    /**
     * 更新时间
     */
    private Date lastupDate;
    /**
     * 更新人
     */
    private String lastupdateUserId;



    public Long getReckey() {
        return reckey;
    }

    public void setReckey(Long reckey) {
        this.reckey = reckey;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
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

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public Double getRechargeAmount() {
        return rechargeAmount;
    }

    public void setRechargeAmount(Double rechargeAmount) {
        this.rechargeAmount = rechargeAmount;
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

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public Date getLastupDate() {
        return lastupDate;
    }

    public void setLastupDate(Date lastupDate) {
        this.lastupDate = lastupDate;
    }

    public String getLastupdateUserId() {
        return lastupdateUserId;
    }

    public void setLastupdateUserId(String lastupdateUserId) {
        this.lastupdateUserId = lastupdateUserId;
    }


    public Double getRechargeBefore() {
        return rechargeBefore;
    }

    public void setRechargeBefore(Double rechargeBefore) {
        this.rechargeBefore = rechargeBefore;
    }

    public Double getRechargeAfter() {
        return rechargeAfter;
    }

    public void setRechargeAfter(Double rechargeAfter) {
        this.rechargeAfter = rechargeAfter;
    }
}
