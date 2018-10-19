package com.sr.platform.server.activity.dao;
import com.sr.platform.server.activity.bean.WxMemcardActivity;
import java.util.List;

public interface IWxMemcardActivityDao {
    /**
     * 获取激活会员活动
     * @return
     */
    List<WxMemcardActivity> findMemcardActivity();


    List<WxMemcardActivity> findMemcardActivityById(String id);

    /**
     * 插入会员活动
     * @param activity
     */
    void insertMemcardActivity(WxMemcardActivity activity);

    /**
     * 更新会员活动
     * @param activity
     */
    void updateMemcardActivity(WxMemcardActivity activity);

}
