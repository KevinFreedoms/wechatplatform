package com.sr.platform.server.message.service.impl;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sr.platform.common.utils.HttpRequestUtil;
import com.sr.platform.server.company.util.MessageUtil;
import com.sr.platform.server.message.bean.WxMsgTemplet;
import com.sr.platform.server.message.dao.IWxMsgDao;
import com.sr.platform.server.message.service.IWxMsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by xxx on 2018/8/1.
 */
@Service
public class WxMsgService  implements IWxMsgService{
    @Autowired
    private IWxMsgDao wxMsgDao;
    @Override
    public List<WxMsgTemplet> getWxMsgAll() {
        return wxMsgDao.findAllMessage();
    }

    @Override
    public Map<String,Object>  getWxMsgById(String id) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            List<WxMsgTemplet> list = wxMsgDao.getMsgById(id);
            if(list.size()==0){
                reMap.put("status","0");
                reMap.put("msg", "获取失败,稍后重试");
                return reMap;
            }
            reMap.put("detail",list.get(0));
            reMap.put("status","1");
            return reMap;
        } catch (Exception e) {
            reMap.put("status","0");
            reMap.put("msg", "获取失败,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String,Object> getMaxMsgId() {
        Map<String, Object> reMap =new HashMap<>();
        try {
            List<WxMsgTemplet> list = wxMsgDao.getMaxNum();
            Integer temp  = list.size()>0?Integer.parseInt(list.get(0).getMessageId())+1:1;
            String id =  String.format("%04d",temp);
            WxMsgTemplet detail = new WxMsgTemplet();
            detail.setMessageId(id);
            reMap.put("detail",detail);
            reMap.put("status","1");
            reMap.put("msg","获取成功");
            return reMap;
        } catch (Exception e) {
            reMap.put("status","0");
            reMap.put("msg", "获取失败,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String,Object>updateMsg(WxMsgTemplet msg) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            String id = msg.getMessageId();
            List<WxMsgTemplet> list = wxMsgDao.getMsgById(id);
            if(list.size()==0){
                reMap.put("status","0");
                reMap.put("msg", "获取失败,稍后重试");
                return reMap;
            }
            Integer status = wxMsgDao.updateMessage(msg);
            if(status==0){
                reMap.put("status","0");
                reMap.put("msg", "更新失败,稍后重试");
                return reMap;
            }
            reMap.put("status","1");
            reMap.put("msg","更新成功");
            return reMap;
        } catch (Exception e) {
            reMap.put("status","0");
            reMap.put("msg", "更新失败,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String,Object> insertMsg(WxMsgTemplet msg) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            String id = msg.getMessageId();
            List<WxMsgTemplet> list = wxMsgDao.getMsgById(id);
            if(list.size()>0){
                reMap.put("status","0");
                reMap.put("msg", "消息编码已存在,请重新提交");
                return reMap;
            }
            Integer status = wxMsgDao.saveMessage(msg);
            if(status==0){
                reMap.put("status","0");
                reMap.put("msg", "添加失败,稍后重试");
                return reMap;
            }
            reMap.put("status","1");
            reMap.put("msg","添加成功");
            return reMap;
        } catch (Exception e) {
            reMap.put("status","0");
            reMap.put("msg", "添加失败,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String, Object> deleteMsg(String id) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            Integer status = wxMsgDao.deleteMessage(id);
            if(status==0){
                reMap.put("status","0");
                reMap.put("msg", "删除失败,稍后重试");
                return reMap;
            }
            reMap.put("status","1");
            reMap.put("msg","删除成功");
            return reMap;
        } catch (Exception e) {
            reMap.put("status","0");
            reMap.put("msg", "删除失败,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String, Object> sendMsg(String str) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            List<String> list = new ArrayList<>();
            String strs[] = str.split(",");
            list = Arrays.asList(strs);

            Properties p=new Properties();
            p.load(MessageUtil.class.getClassLoader().getResourceAsStream("application.properties"));
            String serviceUrl= p.getProperty("serviceUrl");
            serviceUrl = serviceUrl + "/message/reversion";
            for (int i =0;i<list.size();i++) {
                String messageid = list.get(i);
                JsonParser jp = new JsonParser();
                String param = "messageid="+messageid;
                String resultStr = HttpRequestUtil.sendPost(serviceUrl,param);
                JsonObject result = (JsonObject)jp.parse(resultStr);
                String status = result.get("status").toString();
                if( "0".equals(status)){
                    reMap.put("status", 0);
                    reMap.put("Msg", messageid+"发送失败,稍后重试");
                    return reMap;
                }else{
                    wxMsgDao.updateMessageStatus("1",messageid);
                }
            }
            reMap.put("status", 1);
            return reMap;
        } catch (Exception e) {
            reMap.put("status","0");
            reMap.put("Msg", "发送失败,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }
}
