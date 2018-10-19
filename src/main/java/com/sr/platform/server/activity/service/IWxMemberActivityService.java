package com.sr.platform.server.activity.service;

import com.sr.platform.server.activity.bean.WxMemcardActivity;

import java.util.List;
import java.util.Map;

public interface IWxMemberActivityService {
    /**
     * 获取会员激活活动
     * @return
     */
    public List<WxMemcardActivity> findMemcardActivity();


    public Map<String,Object> getMemberActivityById(String id);
    /**
     * 设置会员激活活动
     * @param activity
     */
    public Map<String,Object> updateMemcardActivity(WxMemcardActivity activity);


}
