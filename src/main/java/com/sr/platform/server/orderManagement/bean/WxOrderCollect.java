package com.sr.platform.server.orderManagement.bean;

public class WxOrderCollect {
    private String bookingId;
    private String locId;
    private String locName;
    private String bookingSource;
    private Integer bookingStatus;
    private Integer bookingType;
    private double price;
    private double sumPrice;
    private String address;
    private String phone;
    private String memberName;
    private String memberId;
    private String createDate;
    private String remark;
    private String deliveryTime;
    private String company;
    private String ref1;
    private double packingPrice;
    private double deliveryPrice;

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
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

    public String getBookingSource() {
        return bookingSource;
    }

    public void setBookingSource(String bookingSource) {
        this.bookingSource = bookingSource;
    }

    public Integer getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(Integer bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public Integer getBookingType() {
        return bookingType;
    }

    public void setBookingType(Integer bookingType) {
        this.bookingType = bookingType;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getSumPrice() {
        return sumPrice;
    }

    public void setSumPrice(double sumPrice) {
        this.sumPrice = sumPrice;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getRef1() {
        return ref1;
    }

    public void setRef1(String ref1) {
        this.ref1 = ref1;
    }

    public double getPackingPrice() {
        return packingPrice;
    }

    public void setPackingPrice(double packingPrice) {
        this.packingPrice = packingPrice;
    }

    public double getDeliveryPrice() {
        return deliveryPrice;
    }

    public void setDeliveryPrice(double deliveryPrice) {
        this.deliveryPrice = deliveryPrice;
    }

    @Override
    public String toString() {
        return "WxOrderCollect{" +
                "bookingId='" + bookingId + '\'' +
                ", locId='" + locId + '\'' +
                ", locName='" + locName + '\'' +
                ", bookingSource='" + bookingSource + '\'' +
                ", bookingStatus=" + bookingStatus +
                ", bookingType=" + bookingType +
                ", price=" + price +
                ", sumPrice=" + sumPrice +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", memberName='" + memberName + '\'' +
                ", memberId='" + memberId + '\'' +
                ", createDate='" + createDate + '\'' +
                ", remark='" + remark + '\'' +
                ", deliveryTime='" + deliveryTime + '\'' +
                ", company='" + company + '\'' +
                ", ref1='" + ref1 + '\'' +
                ", packingPrice=" + packingPrice +
                ", deliveryPrice=" + deliveryPrice +
                '}';
    }
}
