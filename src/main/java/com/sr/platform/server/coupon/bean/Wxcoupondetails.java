package com.sr.platform.server.coupon.bean;
import java.sql.Date;

/**
 * 优惠券明细
 */
public class Wxcoupondetails {

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
     * 优惠券编码
     */
    private String couponId;
    /**
     * 状态
     */
    private Integer status;
    /**
     * 持卡人openid
     */
    private String openId;
    /**
     * 获取来源
     */
    private String memberId;
    /**
     * 会员名称
     */
    private String memberName;
    /**
     * 获取来源
     */
    private String source;
    /**
     * 获取时间
     */
    private Date sourceDate;
    /**
     * 使用订单
     */
    private String bookingId;
    /**
     * 使用时间
     */
    private Date useDate;
    /**
     * 使用开始日期
     */
    private Date startDate;
    /**
     * 使用结束日期
     */
    private Date endDate;
    /**
     * 预留一
     */
    private String ref1;
    /**
     * 预留二
     */
    private String ref2;
    /**
     * 预留三
     */
    private String ref3;
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
    private Date createDate;
    /**
     * 更新人
     */
    private String lastUpdateUser;
    /**
     * 更新时间
     */
    private Date lastUpdateDate;

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

    public String getCouponId() {
        return couponId;
    }

    public void setCouponId(String couponId) {
        this.couponId = couponId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
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

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Date getSourceDate() {
        return sourceDate;
    }

    public void setSourceDate(Date sourceDate) {
        this.sourceDate = sourceDate;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public Date getUseDate() {
        return useDate;
    }

    public void setUseDate(Date useDate) {
        this.useDate = useDate;
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
