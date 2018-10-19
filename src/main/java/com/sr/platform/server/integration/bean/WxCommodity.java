package com.sr.platform.server.integration.bean;

import java.util.Date;

/**
 * Created by xxx on 2018/4/25.
 */
public class WxCommodity {
    /**
     * 自增主键
     */
    private Long reckey;

    /**
     * 商品编码
     */
    private String commodityId;

    /**
     * 商品名称
     */
    private  String commodityName;

    /**
     * 类别编码
     */
    private  String categoryId;

    /**
     * 类别名称
     */
    private String categoryName;

    /**
     * 单位
     */
    private  String unit;

    /**
     * 规格
     */
    private  String spec;

    /**
     * 简单描述
     */
    private String description;

    /**
     * 支付方式
     */
    private String  payment;

    /**
     * 商品其他说明编辑
     */
    private String otherDescription;

    /**
     * 售卖价格
     */
    private Double salePrice;

    /**
     * 售卖积分
     */
    private  Double integral;

    /**
     *是否显示
     */
    private int isUsing;

    /**
     * 开始日期
     */
    private Date startDate;

    /**
     * 结束日期
     */
    private Date endDate;

    /**
     * 库存数量
     */
    private int  totalQuantity;

    /**
     * 优惠券编码
     */
    private String couponId;

    /**
     * 优惠券名称
     */
    private String couponName;

    /**
     * 已售数量
     */
    private int totalSale;

    /**
     * 图片
     */
    private String imageUrl;

    /**
     * 显示顺序
     */
    private int showIndex;
    private String ref1;
    private String ref2;
    private String ref3;
    private String remark;
    private String createUser;
    private Date createDate;
    private String lastUpdateUser;
    private Date lastUpdateDate;

    public Long getReckey() {
        return reckey;
    }

    public WxCommodity setReckey(Long reckey) {
        this.reckey = reckey;
        return this;
    }

    public String getCommodityId() {
        return commodityId;
    }

    public WxCommodity setCommodityId(String commodityId) {
        this.commodityId = commodityId;
        return this;
    }

    public String getCommodityName() {
        return commodityName;
    }

    public WxCommodity setCommodityName(String commodityName) {
        this.commodityName = commodityName;
        return this;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public WxCommodity setCategoryId(String categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public WxCommodity setCategoryName(String categoryName) {
        this.categoryName = categoryName;
        return this;
    }

    public String getUnit() {
        return unit;
    }

    public WxCommodity setUnit(String unit) {
        this.unit = unit;
        return this;
    }

    public String getSpec() {
        return spec;
    }

    public WxCommodity setSpec(String spec) {
        this.spec = spec;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public WxCommodity setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getPayment() {
        return payment;
    }

    public WxCommodity setPayment(String payment) {
        this.payment = payment;
        return this;
    }

    public String getOtherDescription() {
        return otherDescription;
    }

    public WxCommodity setOtherDescription(String otherDescription) {
        this.otherDescription = otherDescription;
        return this;
    }

    public Double getSalePrice() {
        return salePrice;
    }

    public WxCommodity setSalePrice(Double salePrice) {
        this.salePrice = salePrice;
        return this;
    }

    public Double getIntegral() {
        return integral;
    }

    public WxCommodity setIntegral(Double integral) {
        this.integral = integral;
        return this;
    }

    public int getIsUsing() {
        return isUsing;
    }

    public WxCommodity setIsUsing(int isUsing) {
        this.isUsing = isUsing;
        return this;
    }

    public Date getStartDate() {
        return startDate;
    }

    public WxCommodity setStartDate(Date startDate) {
        this.startDate = startDate;
        return this;
    }

    public Date getEndDate() {
        return endDate;
    }

    public WxCommodity setEndDate(Date endDate) {
        this.endDate = endDate;
        return this;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public WxCommodity setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
        return this;
    }

    public String getCouponId() {
        return couponId;
    }

    public WxCommodity setCouponId(String couponId) {
        this.couponId = couponId;
        return this;
    }

    public String getCouponName() {
        return couponName;
    }

    public WxCommodity setCouponName(String couponName) {
        this.couponName = couponName;
        return this;
    }

    public int getTotalSale() {
        return totalSale;
    }

    public WxCommodity setTotalSale(int totalSale) {
        this.totalSale = totalSale;
        return this;
    }

    public int getShowIndex() {
        return showIndex;
    }

    public WxCommodity setShowIndex(int showIndex) {
        this.showIndex = showIndex;
        return this;
    }

    public String getRef1() {
        return ref1;
    }

    public WxCommodity setRef1(String ref1) {
        this.ref1 = ref1;
        return this;
    }

    public String getRef2() {
        return ref2;
    }

    public WxCommodity setRef2(String ref2) {
        this.ref2 = ref2;
        return this;
    }

    public String getRef3() {
        return ref3;
    }

    public WxCommodity setRef3(String ref3) {
        this.ref3 = ref3;
        return this;
    }

    public String getRemark() {
        return remark;
    }

    public WxCommodity setRemark(String remark) {
        this.remark = remark;
        return this;
    }

    public String getCreateUser() {
        return createUser;
    }

    public WxCommodity setCreateUser(String createUser) {
        this.createUser = createUser;
        return this;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public WxCommodity setCreateDate(Date createDate) {
        this.createDate = createDate;
        return this;
    }

    public String getLastUpdateUser() {
        return lastUpdateUser;
    }

    public WxCommodity setLastUpdateUser(String lastUpdateUser) {
        this.lastUpdateUser = lastUpdateUser;
        return this;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public WxCommodity setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public WxCommodity setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }
}
