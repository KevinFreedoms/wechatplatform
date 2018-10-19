package com.sr.platform.server.product.bean;

/**
 * Created by xxx on 2018/4/24.
 */
public class EpRetailProductSort {
    private Integer recKey;
    private String sortId;
    private String sortName;
    private Integer showIndex;

    public String getSortId() {
        return sortId;
    }

    public void setSortId(String sortId) {
        this.sortId = sortId;
    }

    public String getSortName() {
        return sortName;
    }

    public void setSortName(String sortName) {
        this.sortName = sortName;
    }

    public Integer getShowIndex() {
        return showIndex;
    }

    public void setShowIndex(Integer showIndex) {
        this.showIndex = showIndex;
    }

    @Override
    public String toString() {
        return "EP_retailproductsort{" +
                "sortId='" + sortId + '\'' +
                ", sortName='" + sortName + '\'' +
                ", showIndex=" + showIndex +
                '}';
    }

    public Integer getRecKey() {
        return recKey;
    }

    public EpRetailProductSort setRecKey(Integer recKey) {
        this.recKey = recKey;
        return this;
    }
}
