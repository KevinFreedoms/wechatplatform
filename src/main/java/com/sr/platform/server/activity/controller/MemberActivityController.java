package com.sr.platform.server.activity.controller;

import com.sr.platform.server.activity.bean.WxMemcardActivity;
import com.sr.platform.server.activity.service.IWxMemberActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
public class MemberActivityController {
    @Autowired
    HttpServletRequest request;

    @Autowired
    private IWxMemberActivityService wxMemberActivityService;

    @RequestMapping(value = "/platform/activity/member/all", method = RequestMethod.GET)
    @ResponseBody
    public List<WxMemcardActivity> getMemeberActivityAll(){
        return wxMemberActivityService.findMemcardActivity();
    }


    /**
     * 进入修改生日活动
     *
     * @return
     */
    @RequestMapping(value = "/platform/activity/member/get", method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getMemeberActivityById(@RequestParam String id){
        return wxMemberActivityService.getMemberActivityById(id);
    }

    /**
     * 进入修改生日活动
     *
     * @return
     */
    @RequestMapping(value = "/platform/activity/member/modify", method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> modifyMemeberActivity(@RequestBody WxMemcardActivity activity){
        return wxMemberActivityService.updateMemcardActivity(activity);
    }

}
