package com.sr.platform.server.company.bean;

import java.util.Date;

/**
 * Created by xxx on 2018/3/31.
 */
public class WxCompanyStaff {
    /**
     * 自增主键
     */
    private int recKey;
    /**
     * 企业编码
     */
    private String companyId;
    /**
     * 企业名称
     */
    private String companyName;
    /**
     * 员工名称
     */
    private String staffName;
    /**
     * 会员标识
     */
    private String openId;
    /**
     * 会员编码
     */
    private String memberId;
    /**
     * 会员名称
     */
    private String memberName;
    /**
     * 手机号
     */
    private String ref1;
    /**
     * 卡号
     */
    private String ref2;
    private String ref3;
    private String remark;
    private String createUserId;
    private Date createDate;
    private String lastUpdateUserId;
    private Date lastUpDate;

    public WxCompanyStaff() {
    }

    public String getCompanyId() {
        return companyId;
    }

    public WxCompanyStaff setCompanyId(String companyId) {
        this.companyId = companyId;
        return this;
    }

    public String getCompanyName() {
        return companyName;
    }

    public WxCompanyStaff setCompanyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public String getStaffName() {
        return staffName;
    }

    public WxCompanyStaff setStaffName(String staffName) {
        this.staffName = staffName;
        return this;
    }

    public String getOpenId() {
        return openId;
    }

    public WxCompanyStaff setOpenId(String openId) {
        this.openId = openId;
        return this;
    }

    public String getMemberId() {
        return memberId;
    }

    public WxCompanyStaff setMemberId(String memberId) {
        this.memberId = memberId;
        return this;
    }

    public String getMemberName() {
        return memberName;
    }

    public WxCompanyStaff setMemberName(String memberName) {
        this.memberName = memberName;
        return this;
    }

    public String getRef1() {
        return ref1;
    }

    public WxCompanyStaff setRef1(String ref1) {
        this.ref1 = ref1;
        return this;
    }

    public String getRef2() {
        return ref2;
    }

    public WxCompanyStaff setRef2(String ref2) {
        this.ref2 = ref2;
        return this;
    }

    public String getRef3() {
        return ref3;
    }

    public WxCompanyStaff setRef3(String ref3) {
        this.ref3 = ref3;
        return this;
    }

    public String getRemark() {
        return remark;
    }

    public WxCompanyStaff setRemark(String remark) {
        this.remark = remark;
        return this;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public WxCompanyStaff setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
        return this;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public WxCompanyStaff setCreateDate(Date createDate) {
        this.createDate = createDate;
        return this;
    }

    public String getLastUpdateUserId() {
        return lastUpdateUserId;
    }

    public WxCompanyStaff setLastUpdateUserId(String lastUpdateUserId) {
        this.lastUpdateUserId = lastUpdateUserId;
        return this;
    }

    public Date getLastUpDate() {
        return lastUpDate;
    }

    public WxCompanyStaff setLastUpDate(Date lastUpDate) {
        this.lastUpDate = lastUpDate;
        return this;
    }

    public int getRecKey() {
        return recKey;
    }

    public WxCompanyStaff setRecKey(int recKey) {
        this.recKey = recKey;
        return this;
    }
}
