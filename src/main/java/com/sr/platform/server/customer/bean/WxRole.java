package com.sr.platform.server.customer.bean;

import java.util.Date;

/**
 * Created by xxx on 2018/3/22.
 * 微信角色
 */
public class WxRole {
    /**
     * 自增主键
     */
    private Long recKey;
    /*
     * 角色编码
     */
    private String  roleId;
    /*
     * 角色名称
     */
    private String  roleName;
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

    public WxRole() {
    }

    public Long getRecKey() {
        return recKey;
    }

    public void setRecKey(Long recKey) {
        this.recKey = recKey;
    }


    public String getRoleId() {
        return roleId;
    }

    public WxRole setRoleId(String roleId) {
        this.roleId = roleId;
        return this;
    }

    public String getRoleName() {
        return roleName;
    }

    public WxRole setRoleName(String roleName) {
        this.roleName = roleName;
        return this;
    }

    public int getStatus() {
        return status;
    }

    public WxRole setStatus(int status) {
        this.status = status;
        return this;
    }

    public String getRef1() {
        return ref1;
    }

    public WxRole setRef1(String ref1) {
        this.ref1 = ref1;
        return this;
    }

    public String getRef2() {
        return ref2;
    }

    public WxRole setRef2(String ref2) {
        this.ref2 = ref2;
        return this;
    }

    public String getRef3() {
        return ref3;
    }

    public WxRole setRef3(String ref3) {
        this.ref3 = ref3;
        return this;
    }

    public String getRemark() {
        return remark;
    }

    public WxRole setRemark(String remark) {
        this.remark = remark;
        return this;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public WxRole setCreateDate(Date createDate) {
        this.createDate = createDate;
        return this;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public WxRole setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
        return this;
    }

    public String getLastUpdateUserId() {
        return lastUpdateUserId;
    }

    public WxRole setLastUpdateUserId(String lastUpdateUserId) {
        this.lastUpdateUserId = lastUpdateUserId;
        return this;
    }

    public Date getLastUpDate() {
        return lastUpDate;
    }

    public WxRole setLastUpDate(Date lastUpDate) {
        this.lastUpDate = lastUpDate;
        return this;
    }
}
