package com.sr.platform.server.product.bean;

/**
 * Created by xxx on 2018/4/24.
 */
public class EpRetailProduct {
    private Integer recKey;
    private String productId;
    private String productName;
    private String productImg;
    private String unitName;
    private String sortId;
    private String sortName;

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductImg() {
        return productImg;
    }

    public void setProductImg(String productImg) {
        this.productImg = productImg;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getSortId() {
        return sortId;
    }

    public void setSortId(String sortId) {
        this.sortId = sortId;
    }

    @Override
    public String toString() {
        return "EP_retailproduct{" +
                "productId='" + productId + '\'' +
                ", productName='" + productName + '\'' +
                ", productImg='" + productImg + '\'' +
                ", unitName='" + unitName + '\'' +
                ", sortId='" + sortId + '\'' +
                '}';
    }

    public Integer getRecKey() {
        return recKey;
    }

    public EpRetailProduct setRecKey(Integer recKey) {
        this.recKey = recKey;
        return this;
    }

    public String getSortName() {
        return sortName;
    }

    public EpRetailProduct setSortName(String sortName) {
        this.sortName = sortName;
        return this;
    }
}
