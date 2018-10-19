package com.sr.platform.server.message.bean;

/**
 * Created by xxx on 2018/8/1.
 */
public class WxMsgTemplet {
    private Integer recKey;
    /**
     * 消息编码
     */
    private String messageId;
    /**
     * 消息模板号
     */
    private String messageTempletCode;
    /**
     * 消息内容
     */
    private String messageSubject;
    /**
     * 消息描述
     */
    private String messageDescription;
    private String ref1;
    private String ref2;
    private String ref3;
    private String remark;
    private String createDate;
    private String createUserId;
    private String updateDate;
    private String updateUserId;

    public Integer getRecKey() {
        return recKey;
    }

    public WxMsgTemplet setRecKey(Integer recKey) {
        this.recKey = recKey;
        return this;
    }

    public String getMessageId() {
        return messageId;
    }

    public WxMsgTemplet setMessageId(String messageId) {
        this.messageId = messageId;
        return this;
    }

    public String getMessageTempletCode() {
        return messageTempletCode;
    }

    public WxMsgTemplet setMessageTempletCode(String messageTempletCode) {
        this.messageTempletCode = messageTempletCode;
        return this;
    }

    public String getMessageSubject() {
        return messageSubject;
    }

    public WxMsgTemplet setMessageSubject(String messageSubject) {
        this.messageSubject = messageSubject;
        return this;
    }

    public String getMessageDescription() {
        return messageDescription;
    }

    public WxMsgTemplet setMessageDescription(String messageDescription) {
        this.messageDescription = messageDescription;
        return this;
    }

    public String getRef1() {
        return ref1;
    }

    public WxMsgTemplet setRef1(String ref1) {
        this.ref1 = ref1;
        return this;
    }

    public String getRef2() {
        return ref2;
    }

    public WxMsgTemplet setRef2(String ref2) {
        this.ref2 = ref2;
        return this;
    }

    public String getRef3() {
        return ref3;
    }

    public WxMsgTemplet setRef3(String ref3) {
        this.ref3 = ref3;
        return this;
    }

    public String getRemark() {
        return remark;
    }

    public WxMsgTemplet setRemark(String remark) {
        this.remark = remark;
        return this;
    }

    public String getCreateDate() {
        return createDate;
    }

    public WxMsgTemplet setCreateDate(String createDate) {
        this.createDate = createDate;
        return this;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public WxMsgTemplet setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
        return this;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public WxMsgTemplet setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public String getUpdateUserId() {
        return updateUserId;
    }

    public WxMsgTemplet setUpdateUserId(String updateUserId) {
        this.updateUserId = updateUserId;
        return this;
    }
}
