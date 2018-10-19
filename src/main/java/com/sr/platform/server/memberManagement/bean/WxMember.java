package com.sr.platform.server.memberManagement.bean;

public class WxMember {
    private long recKey;
    private String memberId;
    private String memberName;
    private String phone;
    private String birthday;
    private String registrationDate;
    private int sex;

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    /**
     * 当前积分
     */
    private Integer currentIntegration;
    /**
     * 余额
     */
    private Double balance;
    /**
     * 累计消费
     */
    private Double cumulative;

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Integer getCurrentIntegration() {
        return currentIntegration;
    }

    public void setCurrentIntegration(Integer currentIntegration) {
        this.currentIntegration = currentIntegration;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Double getCumulative() {
        return cumulative;
    }

    public void setCumulative(Double cumulative) {
        this.cumulative = cumulative;
    }

    @Override
    public String toString() {
        return "WxMember{" +
                "recKey=" + recKey +
                ", memberId='" + memberId + '\'' +
                ", memberName='" + memberName + '\'' +
                ", phone='" + phone + '\'' +
                ", birthday='" + birthday + '\'' +
                ", registrationDate='" + registrationDate + '\'' +
                ", sex=" + sex +
                ", currentIntegration=" + currentIntegration +
                ", balance=" + balance +
                ", cumulative=" + cumulative +
                '}';
    }
}

