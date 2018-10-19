package com.sr.platform.server.integration.bean;

import java.util.Date;

/**
 * Created by xxx on 2018/4/25.
 */
public class WxCommodityCategory {
    /**
     * 自增主键
     */
    private Long reckey;

    /**
     * 类别编码
     */
    private String categoryId;

    /**
     * 类别名称
     */
    private String categoryName;

    /**
     * 类别类型
     */
    private String categoryType;
    /**
     *是否显示
     */
    private int isUsing;
    /**
     *
     */
    private String flag;
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

    public WxCommodityCategory setReckey(Long reckey) {
        this.reckey = reckey;
        return this;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public WxCommodityCategory setCategoryId(String categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public WxCommodityCategory setCategoryName(String categoryName) {
        this.categoryName = categoryName;
        return this;
    }

    public String getCategoryType() {
        return categoryType;
    }

    public WxCommodityCategory setCategoryType(String categoryType) {
        this.categoryType = categoryType;
        return this;
    }

    public int getIsUsing() {
        return isUsing;
    }

    public WxCommodityCategory setIsUsing(int isUsing) {
        this.isUsing = isUsing;
        return this;
    }

    public int getShowIndex() {
        return showIndex;
    }

    public WxCommodityCategory setShowIndex(int showIndex) {
        this.showIndex = showIndex;
        return this;
    }

    public String getRef1() {
        return ref1;
    }

    public WxCommodityCategory setRef1(String ref1) {
        this.ref1 = ref1;
        return this;
    }

    public String getRef2() {
        return ref2;
    }

    public WxCommodityCategory setRef2(String ref2) {
        this.ref2 = ref2;
        return this;
    }

    public String getRef3() {
        return ref3;
    }

    public WxCommodityCategory setRef3(String ref3) {
        this.ref3 = ref3;
        return this;
    }

    public String getRemark() {
        return remark;
    }

    public WxCommodityCategory setRemark(String remark) {
        this.remark = remark;
        return this;
    }

    public String getCreateUser() {
        return createUser;
    }

    public WxCommodityCategory setCreateUser(String createUser) {
        this.createUser = createUser;
        return this;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public WxCommodityCategory setCreateDate(Date createDate) {
        this.createDate = createDate;
        return this;
    }

    public String getLastUpdateUser() {
        return lastUpdateUser;
    }

    public WxCommodityCategory setLastUpdateUser(String lastUpdateUser) {
        this.lastUpdateUser = lastUpdateUser;
        return this;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public WxCommodityCategory setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
        return this;
    }

    public String getFlag() {
        return flag;
    }

    public WxCommodityCategory setFlag(String flag) {
        this.flag = flag;
        return this;
    }
}
