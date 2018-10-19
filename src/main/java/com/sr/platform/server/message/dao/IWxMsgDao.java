package com.sr.platform.server.message.dao;
import com.sr.platform.server.message.bean.WxMsgTemplet;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by xxx on 2018/8/1.
 */
public interface IWxMsgDao {
    /**
     * 获取所有单品
     * @return
     */
    List<WxMsgTemplet> findAllMessage();

    /**
     * 根据消息编码获取消息
     * @param id
     * @return
     */
    List<WxMsgTemplet> getMsgById(String id);

    /**
     * 新增
     * @return
     */
    List<WxMsgTemplet> getMaxNum();

    /**
     * 根据id 删除消息
     * @param id
     * @return
     */
    Integer deleteMessage(String id);

    /**
     * 更新消息
     * @param msg
     * @return
     */
    Integer updateMessage(WxMsgTemplet msg);

    /**
     * 新增消息
     * @param msg
     * @return
     */
    Integer saveMessage(WxMsgTemplet msg);

    /**
     * 更新订单状态
     * @param status
     * @param recKey
     * @return
     */
    Integer updateMessageStatus(@Param("ref1") String status , @Param("id") String id);
}
