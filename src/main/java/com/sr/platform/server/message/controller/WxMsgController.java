package com.sr.platform.server.message.controller;

import com.sr.platform.server.message.bean.WxMsgTemplet;
import com.sr.platform.server.message.service.IWxMsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/8/1.
 */
@RestController
public class WxMsgController {
    @Autowired
    private IWxMsgService wxMsgService;

    /**
     * 获取所有消息通知
     * @return
     */
    @RequestMapping(value = "/platform/notify/all",method = RequestMethod.GET)
    @ResponseBody
    List<WxMsgTemplet> getWxMsgAll(){
        return wxMsgService.getWxMsgAll();
    }

    @RequestMapping(value = "/platform/notify/update",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateWxMsg(@RequestBody WxMsgTemplet msg){
        return wxMsgService.updateMsg(msg);
    }

    @RequestMapping(value = "/platform/notify/new",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> newWxMsg(){
        return wxMsgService.getMaxMsgId();
    }

    @RequestMapping(value = "/platform/notify/insert",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> insertWxMsg(@RequestBody WxMsgTemplet msg){
        return wxMsgService.insertMsg(msg);
    }

    @RequestMapping(value = "/platform/notify/send",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> sendWxMsg(@RequestParam String str){
        return wxMsgService.sendMsg(str);
    }

    @RequestMapping(value = "/platform/notify/delete")
    @ResponseBody
    public Map<String,Object> deleteWxMsg(@RequestParam String id){
        return wxMsgService.deleteMsg(id);
    }

}
