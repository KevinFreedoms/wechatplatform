package com.sr.platform.server.suitstore.bean;

public class WxLoc {
    //自增主键
    private Integer recKey;
    //门店编码
    private String sid;
    //微信标识
    private String poi_id;
    //门店名称
    private String  business_name;
    //分店名称
    private String branch_name;
    //省份
    private String  province;
    //城市
    private String city;
    //区县
    private String district;
    //详细地址
    private String address;
    //门店电话
    private String telephone;
    //门店类型
    private String categories;
    //坐标类型
    private String offset_type;
    //地理经度
    private String longitude;
    //地理纬度
    private String latitude;
    //推荐品
    private String recommend;
    //特色服务
    private String special;
    //商户简介
    private String introduction;
    //营业时间
    private String open_time;
    //人均价格
    private int avg_price;
    //图片url
    private String url;

    public Integer getRecKey() {
        return recKey;
    }

    public void setRecKey(Integer recKey) {
        this.recKey = recKey;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getPoi_id() {
        return poi_id;
    }

    public void setPoi_id(String poi_id) {
        this.poi_id = poi_id;
    }

    public String getBusiness_name() {
        return business_name;
    }

    public void setBusiness_name(String business_name) {
        this.business_name = business_name;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public String getOffset_type() {
        return offset_type;
    }

    public void setOffset_type(String offset_type) {
        this.offset_type = offset_type;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getRecommend() {
        return recommend;
    }

    public void setRecommend(String recommend) {
        this.recommend = recommend;
    }

    public String getSpecial() {
        return special;
    }

    public void setSpecial(String special) {
        this.special = special;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getOpen_time() {
        return open_time;
    }

    public void setOpen_time(String open_time) {
        this.open_time = open_time;
    }



    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getBranch_name() {
        return branch_name;
    }

    public void setBranch_name(String branch_name) {
        this.branch_name = branch_name;
    }

    public int getAvg_price() {
        return avg_price;
    }

    public WxLoc setAvg_price(int avg_price) {
        this.avg_price = avg_price;
        return this;
    }
}
