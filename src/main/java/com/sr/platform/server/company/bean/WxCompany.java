package com.sr.platform.server.company.bean;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;
/**
 * 单位表
 * Created by xxx on 2018/3/31.
 */
public class WxCompany {
    /**
     * 自增主键
     */
    @Getter @Setter private int recKey;
    /**
     *单位编码
     */
    @Getter @Setter private String companyId;
    /**
     * 单位
     */
    @Getter @Setter private String companyName;
    /**
     * 单位联系人
     */
    @Getter @Setter private String contactPerson;
    /**
     * 单位地址
     */
    @Getter @Setter private String contactAddress;
    /**
     * 单位联系方式
     */
    @Getter @Setter private String contactWay;
    /**
     * 状态 0：停用 1：启用
     */
    @Getter @Setter private int status;
    /**
     * 关联门店编码
     */
    @Getter @Setter private String locId;
    /**
     *关联门店名称
     */
    @Getter @Setter private String locName;
    @Getter @Setter private String ref1;
    @Getter @Setter private String ref2;
    @Getter @Setter private String ref3;
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

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactAddress() {
        return contactAddress;
    }

    public void setContactAddress(String contactAddress) {
        this.contactAddress = contactAddress;
    }

    public String getContactWay() {
        return contactWay;
    }

    public void setContactWay(String contactWay) {
        this.contactWay = contactWay;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getLocId() {
        return locId;
    }

    public void setLocId(String locId) {
        this.locId = locId;
    }

    public String getLocName() {
        return locName;
    }

    public void setLocName(String locName) {
        this.locName = locName;
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
