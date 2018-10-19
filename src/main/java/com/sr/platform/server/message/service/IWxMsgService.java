package com.sr.platform.server.message.service;

import com.sr.platform.server.message.bean.WxMsgTemplet;

import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/8/1.
 */
public interface IWxMsgService {
    /**
     * 获取所有通知
     * @return
     */
    List<WxMsgTemplet> getWxMsgAll();

    /**
     * 根据消息编码获取消息内容
     * @param id
     * @return
     */
    public Map<String,Object>  getWxMsgById(String id);

    /**
     * 获取最大消息编码
     * @return
     */
    public Map<String,Object> getMaxMsgId();

    /**
     * 更新消息
     * @param msg
     */
    public Map<String,Object> updateMsg(WxMsgTemplet msg);

    /**
     * 插入消息
     * @param msg
     */
    public Map<String,Object> insertMsg(WxMsgTemplet msg);

    /**
     * 插入消息
     * @param id
     */
    public Map<String,Object> deleteMsg(String id);

    /**
     * 发送消息
     * @param str
     * @return
     */
    public Map<String,Object> sendMsg(String str);


}
