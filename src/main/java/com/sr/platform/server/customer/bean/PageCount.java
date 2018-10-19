package com.sr.platform.server.customer.bean;

public class PageCount {
    /**
     * 当前页码
     */
    private int nowpage;
    /**
     * 记录总数
     */
    private int recordTotal;
    /**
     * 总页数
     */
    private int recordpage;

    public int getNowpage() {
        return nowpage;
    }

    public void setNowpage(int nowpage) {
        this.nowpage = nowpage;
    }

    public int getRecordTotal() {
        return recordTotal;
    }

    public void setRecordTotal(int recordTotal) {
        this.recordTotal = recordTotal;
    }

    public int getRecordpage() {
        return recordpage;
    }

    public void setRecordpage(int recordpage) {
        this.recordpage = recordpage;
    }

}
