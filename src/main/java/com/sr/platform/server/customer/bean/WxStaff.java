package com.sr.platform.server.customer.bean;

import java.util.Date;

/**
 * Created by xxx on 2018/3/22.
 * 微信员工
 */
public class WxStaff {
    /**
     * 自增主键
     */
    private Long recKey;
    /**
     * 员工编码
     */
    private String staffId;
    /**
     * 员工名称
     */
    private String staffName;
    /**
     * 员工电话
     */
    private String phone;
    /**
     * 地址
     */
    private String address;
    /**
     * 角色
     */
    private String roleId;
    /**
     * 角色
     */
    private String roleName;
    /**
     * 归属门店
     */
    private String locId;
    /**
     * 归属门店名称
     */
    private String locName;
    /**
     * 登陆密码
     */
    private String password;
    /**
     * 状态 0：停用 1：启用
     */
    private int status;
    private String ref1;
    private String ref2;
    private String ref3;
    private String remark;
    private String createUserId;
    private Date createDate;
    private String lastUpdateUserId;
    private Date lastUpDate;

    public Long getRecKey() {return recKey;}

    public void setRecKey(Long recKey) {this.recKey = recKey;}

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getLocId() {
        return locId;
    }

    public void setLocId(String locId) {
        this.locId = locId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
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

    public WxStaff setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
        return this;
    }

    public String getLastUpdateUserId() {
        return lastUpdateUserId;
    }

    public WxStaff setLastUpdateUserId(String lastUpdateUserId) {
        this.lastUpdateUserId = lastUpdateUserId;
        return this;
    }

    public Date getLastUpDate() {
        return lastUpDate;
    }

    public WxStaff setLastUpDate(Date lastUpDate) {
        this.lastUpDate = lastUpDate;
        return this;
    }

    public String getRoleName() {
        return roleName;
    }

    public WxStaff setRoleName(String roleName) {
        this.roleName = roleName;
        return this;
    }

    public String getLocName() {
        return locName;
    }

    public WxStaff setLocName(String locName) {
        this.locName = locName;
        return this;
    }
}
