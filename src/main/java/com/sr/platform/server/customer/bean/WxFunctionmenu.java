package com.sr.platform.server.customer.bean;

import java.util.Date;

/**
 * Created by xxx on 2018/3/22.
 * 功能菜单
 */
public class WxFunctionmenu {
    /**
     * 自增主键
     */
    private Long recKey;

    /*
    功能编号
     */
    private String functionId;

    /*
    功能名称
     */
    private String functionName;

    /*
    功能等级
     */
    private String functionLevel;

    /*
    父级标志 0：表示没有子集 1：表示有子集
     */
    private int parentSign;

    /*
    父级功能
     */
    private String parentFunctionId;

    /*
    操作
     */
    private String operation;

    /*
    标志
     */
    private String icon;

    /*
    是否允许勾选
     */
    private int ischeck;


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

    public WxFunctionmenu setRecKey(Long recKey) {
        this.recKey = recKey;
        return this;
    }

    public String getFunctionId() {
        return functionId;
    }

    public WxFunctionmenu setFunctionId(String functionId) {
        this.functionId = functionId;
        return this;
    }

    public String getFunctionName() {
        return functionName;
    }

    public WxFunctionmenu setFunctionName(String functionName) {
        this.functionName = functionName;
        return this;
    }

    public String getFunctionLevel() {
        return functionLevel;
    }

    public WxFunctionmenu setFunctionLevel(String functionLevel) {
        this.functionLevel = functionLevel;
        return this;
    }

    public int getParentSign() {
        return parentSign;
    }

    public WxFunctionmenu setParentSign(int parentSign) {
        this.parentSign = parentSign;
        return this;
    }

    public String getParentFunctionId() {
        return parentFunctionId;
    }

    public WxFunctionmenu setParentFunctionId(String parentFunctionId) {
        this.parentFunctionId = parentFunctionId;
        return this;
    }

    public String getOperation() {
        return operation;
    }

    public WxFunctionmenu setOperation(String operation) {
        this.operation = operation;
        return this;
    }

    public String getIcon() {
        return icon;
    }

    public WxFunctionmenu setIcon(String icon) {
        this.icon = icon;
        return this;
    }

    public int getIscheck() {
        return ischeck;
    }

    public WxFunctionmenu setIscheck(int ischeck) {
        this.ischeck = ischeck;
        return this;
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


    public Date getLastUpDate() {
        return lastUpDate;
    }

    public WxFunctionmenu setLastUpDate(Date lastUpDate) {
        this.lastUpDate = lastUpDate;
        return this;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public WxFunctionmenu setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
        return this;
    }

    public String getLastUpdateUserId() {
        return lastUpdateUserId;
    }

    public WxFunctionmenu setLastUpdateUserId(String lastUpdateUserId) {
        this.lastUpdateUserId = lastUpdateUserId;
        return this;
    }
}
