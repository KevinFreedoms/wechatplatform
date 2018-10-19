package com.sr.platform.server.orderManagement.bean;

public class WxLoc {
    private String sid;
    private String branch_name;

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getBranch_name() {
        return branch_name;
    }

    public void setBranch_name(String branch_name) {
        this.branch_name = branch_name;
    }

    @Override
    public String toString() {
        return "Wx_loc{" +
                "sid='" + sid + '\'' +
                ", branch_name='" + branch_name + '\'' +
                '}';
    }
}
