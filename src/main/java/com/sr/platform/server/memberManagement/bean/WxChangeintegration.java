package com.sr.platform.server.memberManagement.bean;

public class WxChangeintegration {
    private long recKey;
    private String memberId;
    private String memberName;
    private String code;
    private String source;
    private String sourceDate;
    private String sourceBooking;
    private Integer changeIntegration;
    private Integer beforeIntegration;
    private Integer nowIntegration;

    public long getRecKey() {
        return recKey;
    }

    public void setRecKey(long recKey) {
        this.recKey = recKey;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getSourceDate() {
        return sourceDate;
    }

    public void setSourceDate(String sourceDate) {
        this.sourceDate = sourceDate;
    }

    public String getSourceBooking() {
        return sourceBooking;
    }

    public void setSourceBooking(String sourceBooking) {
        this.sourceBooking = sourceBooking;
    }

    public Integer getChangeIntegration() {
        return changeIntegration;
    }

    public void setChangeIntegration(Integer changeIntegration) {
        this.changeIntegration = changeIntegration;
    }

    public Integer getBeforeIntegration() {
        return beforeIntegration;
    }

    public void setBeforeIntegration(Integer beforeIntegration) {
        this.beforeIntegration = beforeIntegration;
    }

    public Integer getNowIntegration() {
        return nowIntegration;
    }

    public void setNowIntegration(Integer nowIntegration) {
        this.nowIntegration = nowIntegration;
    }

    @Override
    public String toString() {
        return "WxChangeintegration{" +
                "recKey=" + recKey +
                ", memberId='" + memberId + '\'' +
                ", memberName='" + memberName + '\'' +
                ", code='" + code + '\'' +
                ", source='" + source + '\'' +
                ", sourceDate='" + sourceDate + '\'' +
                ", sourceBooking='" + sourceBooking + '\'' +
                ", changeIntegration=" + changeIntegration +
                ", beforeIntegration=" + beforeIntegration +
                ", nowIntegration=" + nowIntegration +
                '}';
    }
}
