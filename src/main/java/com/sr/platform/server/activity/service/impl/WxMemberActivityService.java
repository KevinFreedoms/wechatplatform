package com.sr.platform.server.activity.service.impl;

import com.sr.platform.server.activity.bean.WxMemcardActivity;
import com.sr.platform.server.activity.dao.IWxMemcardActivityDao;
import com.sr.platform.server.activity.service.IWxMemberActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WxMemberActivityService implements IWxMemberActivityService {
    @Autowired
    IWxMemcardActivityDao wxMemcardActivityDao;
    @Override
    public List<WxMemcardActivity> findMemcardActivity() {
        return wxMemcardActivityDao.findMemcardActivity();
    }

    @Override
    public Map<String,Object> getMemberActivityById(String id) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            List<WxMemcardActivity> list = wxMemcardActivityDao.findMemcardActivityById(id);
            if(list.size()==0){
                reMap.put("status","0");
                reMap.put("msg", "获取失败,稍后重试");
                return reMap;
            }
            reMap.put("status",1);
            reMap.put("act",list.get(0));
            return reMap;
        } catch (Exception e) {
            reMap.put("status",0);
            reMap.put("msg", "获取失败,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String,Object> updateMemcardActivity(WxMemcardActivity activity) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            wxMemcardActivityDao.updateMemcardActivity(activity);
            reMap.put("status",1);
            return reMap;
        } catch (Exception e) {
            reMap.put("status",0);
            reMap.put("msg", "更新失败,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }
}
