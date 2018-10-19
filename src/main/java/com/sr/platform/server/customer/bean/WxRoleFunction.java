package com.sr.platform.server.customer.bean;

import java.util.Date;

/**
 * Created by xxx on 2018/3/22.
 * 角色对应功能菜单
 */
public class WxRoleFunction {
    /**
     * 自增主键
     */
    private Long recKey;
    /**
     *功能编码
     */
    private String functionId;
    /**
     *功能名称
     */
    private String functionName;
    /**
     *角色编码
     */
    private String roleId;
    /**
     * 父级编号
     */
    private String parentFunctionId;
    /**
     * 操作url
     */
    private String operation;
    /*
    功能等级
     */
    private String functionLevel;
    /**
     * 标识
     */
    private String icon;
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

    public Long getRecKey() {
        return recKey;
    }

    public WxRoleFunction setRecKey(Long recKey) {
        this.recKey = recKey;
        return this;
    }

    public String getFunctionId() {
        return functionId;
    }

    public WxRoleFunction setFunctionId(String functionId) {
        this.functionId = functionId;
        return this;
    }

    public String getFunctionName() {
        return functionName;
    }

    public WxRoleFunction setFunctionName(String functionName) {
        this.functionName = functionName;
        return this;
    }

    public String getRoleId() {
        return roleId;
    }

    public WxRoleFunction setRoleId(String roleId) {
        this.roleId = roleId;
        return this;
    }

    public String getParentFunctionId() {
        return parentFunctionId;
    }

    public WxRoleFunction setParentFunctionId(String parentFunctionId) {
        this.parentFunctionId = parentFunctionId;
        return this;
    }

    public String getOperation() {
        return operation;
    }

    public WxRoleFunction setOperation(String operation) {
        this.operation = operation;
        return this;
    }

    public String getIcon() {
        return icon;
    }

    public WxRoleFunction setIcon(String icon) {
        this.icon = icon;
        return this;
    }

    public int getStatus() {
        return status;
    }

    public WxRoleFunction setStatus(int status) {
        this.status = status;
        return this;
    }

    public String getRef1() {
        return ref1;
    }

    public WxRoleFunction setRef1(String ref1) {
        this.ref1 = ref1;
        return this;
    }

    public String getRef2() {
        return ref2;
    }

    public WxRoleFunction setRef2(String ref2) {
        this.ref2 = ref2;
        return this;
    }

    public String getRef3() {
        return ref3;
    }

    public WxRoleFunction setRef3(String ref3) {
        this.ref3 = ref3;
        return this;
    }

    public String getRemark() {
        return remark;
    }

    public WxRoleFunction setRemark(String remark) {
        this.remark = remark;
        return this;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public WxRoleFunction setCreateDate(Date createDate) {
        this.createDate = createDate;
        return this;
    }

    public String getFunctionLevel() {
        return functionLevel;
    }

    public WxRoleFunction setFunctionLevel(String functionLevel) {
        this.functionLevel = functionLevel;
        return this;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public WxRoleFunction setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
        return this;
    }

    public String getLastUpdateUserId() {
        return lastUpdateUserId;
    }

    public WxRoleFunction setLastUpdateUserId(String lastUpdateUserId) {
        this.lastUpdateUserId = lastUpdateUserId;
        return this;
    }

    public Date getLastUpDate() {
        return lastUpDate;
    }

    public WxRoleFunction setLastUpDate(Date lastUpDate) {
        this.lastUpDate = lastUpDate;
        return this;
    }
}
