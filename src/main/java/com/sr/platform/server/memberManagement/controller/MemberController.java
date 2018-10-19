package com.sr.platform.server.memberManagement.controller;

import com.sr.platform.server.memberManagement.bean.WxChangeintegration;
import com.sr.platform.server.memberManagement.service.IMemberManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@RestController
public class MemberController {
    @Autowired
    private IMemberManagementService imms;

    /**
     * 进入会员信息查询
     */
    @RequestMapping(value = "/platform/memberManagement/vipMessage")
    public ModelAndView toVipmessage(){
        return new ModelAndView("vipmessage");
    }
    /**
     * 分页查询
     * @param startDate  查询开始日期
     * @param endDate    查询结束日期
     * @param pageSize   每页显示条目数
     * @param start      从第几条开始显示
     * @return
     */
    @RequestMapping(value = "/platform/memberManagement/getMembersByFy",method = RequestMethod.POST)
    public Map<String,Object> getMembersFy(
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam int pageSize,
            @RequestParam int start,
            @RequestParam String search){
        return imms.getWxMembers(startDate, endDate, pageSize, start, search);
    }
    /**
     *  进入会员使用查询
     */
    @RequestMapping(value = "/platform/memberManagement/vipuserecord")
    public ModelAndView tovipuserecord(){
        return new ModelAndView("vipuserecord");
    }
    /**
     * 返回会员使用记录
     */
    @RequestMapping(value = "/platform/memberManagement/get{path}",method = RequestMethod.POST)
    public List getMemberUsageRecords(
            @PathVariable String path,
            @RequestParam String startDate,
            @RequestParam String endDate){
        return imms.getMemberUsageRecords(path,startDate,endDate);
    }
    /**
     * 进入会员积分兑换查询页面
     * @return
     */
    @RequestMapping(value = "/platform/memberManagement/intergralsearch", method = RequestMethod.GET)
    public ModelAndView getIntergralsearch() {
        return new ModelAndView("intergralsearch");
    }
    /**
     * 获得所有兑换记录
     * @param startDate 日期筛选的开始天
     * @param endDate   日期筛选的结束天
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/platform/memberManagement/getFreeDay", method = RequestMethod.POST)
    public List<WxChangeintegration> getFreeDay(
            @RequestParam String startDate,
            @RequestParam String endDate){
        return imms.getFreeDay(startDate, endDate);
    }
}
