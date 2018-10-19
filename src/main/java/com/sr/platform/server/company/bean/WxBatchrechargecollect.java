package com.sr.platform.server.company.bean;

import java.util.Date;

public class WxBatchrechargecollect {
    /**
     * 自增主键
     */
    private Long reckey;
    /**
     * 订单编码
     */
    private String bookingId;
    /**
     * 订单状态
     */
    private Integer bookingFlag;
    /**
     * 是否付款
     */
    private Integer isMoney;
    /**
     * 企业编码
     */
    private String companyId;
    /**
     *  企业名称
     */
    private String companyName;
    /**
     *  汇总金额
     */
    private Double collectMoney;
    /**
     *  汇总员工数
     */
    private Double sumStaff;

    /**
     *  复核金额
      */
    private Double checkMoney;
    /**
     *预留1 企业编号
    */
    private String ref1;
    /**
     * 预留2 优惠金额
     */
    private String ref2;
    /**
     * 预留3
     */
    private String ref3;

    /**
     *  备注
     */
    private String remark;
    /**
     * 创建时间
     */
    private Date createDate;
    /**
     *创建人
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
    /**
     * 复核时间
     */
    private Date checkDate;
    /**
     * 复核人
     */
    private String checkUserId;
    /**
     * 作废时间
     */
    private Date invalidDate;
    /**
     * 作废人
     */
    private String invalidUserId;

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

    public Integer getBookingFlag() {
        return bookingFlag;
    }

    public void setBookingFlag(Integer bookingFlag) {
        this.bookingFlag = bookingFlag;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Double getCollectMoney() {
        return collectMoney;
    }

    public void setCollectMoney(Double collectMoney) {
        this.collectMoney = collectMoney;
    }

    public Double getSumStaff() {
        return sumStaff;
    }

    public void setSumStaff(Double sumStaff) {
        this.sumStaff = sumStaff;
    }

    public Double getCheckMoney() {
        return checkMoney;
    }

    public void setCheckMoney(Double checkMoney) {
        this.checkMoney = checkMoney;
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

    public Date getCheckDate() {
        return checkDate;
    }

    public void setCheckDate(Date checkDate) {
        this.checkDate = checkDate;
    }

    public String getCheckUserId() {
        return checkUserId;
    }

    public void setCheckUserId(String checkUserId) {
        this.checkUserId = checkUserId;
    }

    public Date getInvalidDate() {
        return invalidDate;
    }

    public void setInvalidDate(Date invalidDate) {
        this.invalidDate = invalidDate;
    }

    public String getInvalidUserId() {
        return invalidUserId;
    }

    public void setInvalidUserId(String invalidUserId) {
        this.invalidUserId = invalidUserId;
    }


    public Integer getIsMoney() {
        return isMoney;
    }

    public void setIsMoney(Integer isMoney) {
        this.isMoney = isMoney;
    }
}
