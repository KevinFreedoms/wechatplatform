package com.sr.platform.server.coupon.bean;

import java.sql.Date;
import java.sql.Timestamp;

/**
 *优惠券汇总
 */
public class Wxcouponcollect {
    /**
     * 自增主键
     */
    private Long reckey;
    /**
     * 优惠券类型
     */
    private Integer couponType;
    /**
     * 优惠券批次
     */
    private String couponBatch;
    /**
     * 优惠券金额
     */
    private Double amount;
    /**
     * 优惠券限额
     */
    private Double quota;
    /**
     * 发行开始日期
     */
    private Date publishStartDate;
    /**
     * 发行结束日期
     */
    private Date publishEndDate;
    /**
     * 使用开始日期
     */
    private Date startDate;
    /**
     * 使用结束日期
     */
    private Date endDate;
    /**
     * 折扣
     */
    private Double discount;
    /**
     * 最大发行量
     */
    private Long maxPublishQuantity;
    /**
     * 已发行数量
     */
    private Long publishedQuantity;
    /**
     * 门店使用区间
     */
    private Integer section;
    /**
     * 门店范围
     */
    private String locAround;
    /**
     * 菜品范围
     */
    private String productAround;
    /**
     * 有效期天数
     */
    private String ref1;
    /**
     * 优惠券启用状态
     */
    private String ref2;
    /**
     * 预留列
     */
    private String ref3;
    /**
     * 描述
     */
    private String describeinfo;
    /**
     * 备注
     */
    private String remark;

    /**
     * 创建人
     */
    private String createUser;
    /**
     * 创建时间
     */
    private Timestamp createDate;
    /**
     * 更新人
     */
    private String lastUpdateUser;
    /**
     * 更新时间
     */
    private Date lastUpdateDate;
    /**
     * 发行类型
     */
    private Integer lssueType;
    /**
     * 领取类型
     */
    private Integer receiveType;
    /**
     * 最低消费额
     */
    private Double lowConSumption;
    /**
     * 兑换积分
     */
    private Double exchangePoints;
    private  String locStr;
    private String productStr;

    public String getLocStr() {
        return locStr;
    }

    public void setLocStr(String locStr) {
        this.locStr = locStr;
    }

    public String getProductStr() {
        return productStr;
    }

    public void setProductStr(String productStr) {
        this.productStr = productStr;
    }

    public Long getReckey() {
        return reckey;
    }

    public void setReckey(Long reckey) {
        this.reckey = reckey;
    }

    public Integer getCouponType() {
        return couponType;
    }

    public void setCouponType(Integer couponType) {
        this.couponType = couponType;
    }

    public String getCouponBatch() {
        return couponBatch;
    }

    public void setCouponBatch(String couponBatch) {
        this.couponBatch = couponBatch;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }

    public Double getQuota() {
        return quota;
    }

    public void setQuota(Double quota) {
        this.quota = quota;
    }



    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Long getMaxPublishQuantity() {
        return maxPublishQuantity;
    }

    public void setMaxPublishQuantity(Long maxPublishQuantity) {
        this.maxPublishQuantity = maxPublishQuantity;
    }

    public Long getPublishedQuantity() {
        return publishedQuantity;
    }

    public void setPublishedQuantity(Long publishedQuantity) {
        this.publishedQuantity = publishedQuantity;
    }

    public Integer getSection() {
        return section;
    }

    public void setSection(Integer section) {
        this.section = section;
    }

    public String getLocAround() {
        return locAround;
    }

    public void setLocAround(String locAround) {
        this.locAround = locAround;
    }

    public String getProductAround() {
        return productAround;
    }

    public void setProductAround(String productAround) {
        this.productAround = productAround;
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
    public String getDescribeinfo() {
        return describeinfo;
    }

    public void setDescribeinfo(String describeinfo) {
        this.describeinfo = describeinfo;
    }
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Timestamp createDate) {
        this.createDate = createDate;
    }

    public String getLastUpdateUser() {
        return lastUpdateUser;
    }

    public void setLastUpdateUser(String lastUpdateUser) {
        this.lastUpdateUser = lastUpdateUser;
    }



    public Integer getLssueType() {
        return lssueType;
    }

    public void setLssueType(Integer lssueType) {
        this.lssueType = lssueType;
    }

    public Integer getReceiveType() {
        return receiveType;
    }

    public void setReceiveType(Integer receiveType) {
        this.receiveType = receiveType;
    }

    public Double getLowConSumption() {
        return lowConSumption;
    }

    public void setLowConSumption(Double lowConSumption) {
        this.lowConSumption = lowConSumption;
    }

    public Double getExchangePoints() {
        return exchangePoints;
    }

    public void setExchangePoints(Double exchangePoints) {
        this.exchangePoints = exchangePoints;
    }

    public Date getPublishStartDate() {
        return publishStartDate;
    }

    public void setPublishStartDate(Date publishStartDate) {
        this.publishStartDate = publishStartDate;
    }

    public Date getPublishEndDate() {
        return publishEndDate;
    }

    public void setPublishEndDate(Date publishEndDate) {
        this.publishEndDate = publishEndDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}

