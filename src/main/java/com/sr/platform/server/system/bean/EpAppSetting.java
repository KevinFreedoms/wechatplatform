package com.sr.platform.server.system.bean;

public class EpAppSetting {
    /**
     * 所属类别
     */
    private String appCode;
    /**
     * 设置属性
     */
    private String setId;
    /**
     * 设置编号
     */
    private String setNo;
    /**
     * 设置名称
     */
    private String setName;
    /**
     * 类别标识
     */
    private String groupFlag;
    /**
     * 属性类型
     */
    private String setFlag;
    /**
     * 属性值
     */
    private String setString;

    public String getAppCode() {
        return appCode;
    }

    public void setAppCode(String appCode) {
        this.appCode = appCode;
    }

    public String getSetId() {
        return setId;
    }

    public void setSetId(String setId) {
        this.setId = setId;
    }

    public String getSetNo() {
        return setNo;
    }

    public void setSetNo(String setNo) {
        this.setNo = setNo;
    }

    public String getSetName() {
        return setName;
    }

    public void setSetName(String setName) {
        this.setName = setName;
    }

    public String getGroupFlag() {
        return groupFlag;
    }

    public void setGroupFlag(String groupFlag) {
        this.groupFlag = groupFlag;
    }

    public String getSetFlag() {
        return setFlag;
    }

    public void setSetFlag(String setFlag) {
        this.setFlag = setFlag;
    }

    public String getSetString() {
        return setString;
    }

    public void setSetString(String setString) {
        this.setString = setString;
    }
}
