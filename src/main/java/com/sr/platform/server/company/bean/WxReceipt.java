package com.sr.platform.server.company.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 收款单
 */
public class WxReceipt {
    /**
     * 自增主键
     */
    @Getter @Setter private int  recKey;
    /**
     * 订单编号
     */
    @Getter @Setter private String bookingId;
    /**
     * 批量充值单单号
     */
    @Getter @Setter private String refbookingId;
    /**
     * 应收金额
     */
    @Getter @Setter private Double checkMoney;
    /**
     * 实收金额
     */
    @Getter @Setter private Double payMoney;
    /**
     * 来源
     */
    @Getter @Setter private int source;
    /**
     * 门店编号
     */
    @Getter @Setter private String locId;
    /**
     * 企业编号
     */
    @Getter @Setter private String companyId;
    @Getter @Setter private String ref1;
    @Getter @Setter private String ref2;
    @Getter @Setter  private String ref3;
    @Getter @Setter private String remark;
    @Getter @Setter private String createUserId;
    @Getter @Setter private Date createDate;
    @Getter @Setter private String lastUpdateUserId;
    @Getter @Setter private Date lastUpDate;

    public int getRecKey() {
        return recKey;
    }

    public void setRecKey(int recKey) {
        this.recKey = recKey;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getRefbookingId() {
        return refbookingId;
    }

    public void setRefbookingId(String refbookingId) {
        this.refbookingId = refbookingId;
    }

    public Double getCheckMoney() {
        return checkMoney;
    }

    public void setCheckMoney(Double checkMoney) {
        this.checkMoney = checkMoney;
    }

    public Double getPayMoney() {
        return payMoney;
    }

    public void setPayMoney(Double payMoney) {
        this.payMoney = payMoney;
    }

    public int getSource() {
        return source;
    }

    public void setSource(int source) {
        this.source = source;
    }

    public String getLocId() {
        return locId;
    }

    public void setLocId(String locId) {
        this.locId = locId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
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

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getLastUpdateUserId() {
        return lastUpdateUserId;
    }

    public void setLastUpdateUserId(String lastUpdateUserId) {
        this.lastUpdateUserId = lastUpdateUserId;
    }

    public Date getLastUpDate() {
        return lastUpDate;
    }

    public void setLastUpDate(Date lastUpDate) {
        this.lastUpDate = lastUpDate;
    }
}
