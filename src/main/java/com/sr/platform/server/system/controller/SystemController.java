package com.sr.platform.server.system.controller;

import com.google.gson.Gson;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.system.bean.WxBaseLoc;
import com.sr.platform.server.system.service.ISystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;


@RestController
public class SystemController {
    @Autowired
    private ISystemService systemService;
    @Autowired
    HttpServletRequest request;
    protected Gson gson = new Gson();
    /**
     * 获取所有门店
     * @return
     */
    @RequestMapping(value = "/platform/system/loc/all",method = RequestMethod.GET)
    @ResponseBody
    public List<WxBaseLoc> toLocAll(){
        return systemService.getLocAll();
    }

    /**
     * 获取当前可使用门店
     * @return
     */
    @RequestMapping(value = "/platform/system/loc/stat",method = RequestMethod.GET)
    @ResponseBody
    public List<EpLoc> toLocLimit(){
        return systemService.getLocLimit();
    }


    /**
     * 获取能够更换的所有门店
     * @return
     */
    @RequestMapping(value = "/platform/system/loc/can",method = RequestMethod.GET)
    @ResponseBody
    public List<WxBaseLoc> toLocCanAll(){
        request.setAttribute("locs",null);
        return systemService.getLocAll();
    }

    /**
     * 获取门店限制点数
     * @return
     */
    @RequestMapping(value = "/platform/system/loc/limit",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getLocLimit(){
        return systemService.getConfig("LocLimit");
    }

    /**
     * 保存门店信息
     * @return
     */
    @RequestMapping(value = "/platform/system/loc/save",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> saveLoc(@RequestBody Map<String,Object> storejson)
    {
        return systemService.saveLoc(storejson);
    }

    /**
     * 更新门店信息
     * @return
     */
    @RequestMapping(value = "/platform/system/loc/update",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateLoc(@RequestBody Map<String,Object> loc){
        return systemService.updateLoc(loc);
    }

    /**
     * 进入新增门店页面
     * @return
     */
    @RequestMapping(value = "/platform/system/loc/add")
    @ResponseBody
    public ModelAndView toLocAdd(){
        List<WxBaseLoc> locAll = systemService.getBaseLocAll();
        WxBaseLoc loc = new WxBaseLoc();
        request.setAttribute("locs",locAll);
        if(locAll.size()>0){
            loc = locAll.get(0);
        }
        request.setAttribute("loc",loc);
        return new ModelAndView("addstoremanage");
    }

    /**
     * 进入编辑门店页面
     * @return
     */
    @RequestMapping(value = "/platform/system/loc/modify")
    @ResponseBody
    public ModelAndView toLocModify(@RequestParam String id){

        //获取门店信息
        Map<String,Object> reMap = systemService.getBaseLocCan(id);

        EpLoc loc = (EpLoc)reMap.get("loc");
        WxBaseLoc baseLoc = (WxBaseLoc)reMap.get("baseLoc");
        //首先获取所有门店
        List<WxBaseLoc> locAll = systemService.getBaseLocAll();
        locAll.add(baseLoc);
        request.setAttribute("loc",gson.toJson(loc));
        request.setAttribute("locs",locAll);
        request.setAttribute("baseLoc",gson.toJson(baseLoc));
        return new ModelAndView("modifystoremanage");
    }


}
