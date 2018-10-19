package com.sr.platform.server.orderManagement.bean;

public class WxSellingOtherPayment {
    private String otherPaymentId;
    private String otherPaymentName;
    private double totalMoney;

    public String getOtherPaymentId() {
        return otherPaymentId;
    }

    public void setOtherPaymentId(String otherPaymentId) {
        this.otherPaymentId = otherPaymentId;
    }

    public String getOtherPaymentName() {
        return otherPaymentName;
    }

    public void setOtherPaymentName(String otherPaymentName) {
        this.otherPaymentName = otherPaymentName;
    }

    public double getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(double totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Override
    public String toString() {
        return "WxSellingOtherPayment{" +
                "otherPaymentId='" + otherPaymentId + '\'' +
                ", otherPaymentName='" + otherPaymentName + '\'' +
                ", totalMoney=" + totalMoney +
                '}';
    }
}
