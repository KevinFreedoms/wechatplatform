package com.sr.platform.server.suitstore.controller;

import com.google.gson.Gson;
import com.sr.platform.server.activity.bean.WxBirthdayDiscount;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.suitstore.bean.WxLoc;
import com.sr.platform.server.suitstore.service.ISuitStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
public class SuitStoreController {
    @Autowired
    private ISuitStoreService suitStoreService;
    @Autowired
    HttpServletRequest request;

    /**
     * 查询所有网点
     * @return
     */
    @RequestMapping(value = "/platform/suitstore/all",method = RequestMethod.GET)
    @ResponseBody
    public List<WxLoc> findLocAll() {
        return suitStoreService.getLocAll();
    }


    /**
     * 进入新增
     * @return
     */
    @RequestMapping(value = "/platform/suitstore/new")
    public ModelAndView toAddSuitStore(){
        Gson gson = new Gson();
        request.setAttribute("recipe",gson.toJson(suitStoreService.getCateList()));
        return new ModelAndView("addsuitstore");
    }

    /**
     * 进入修改
     * @return
     */
    @RequestMapping(value = "/platform/suitstore/modify")
    public ModelAndView toModifySuitStore(@RequestParam String id){
        //获取门店
        WxLoc wxLoc = new WxLoc();
        List<WxLoc> list = suitStoreService.getLocById(id);
        if(list.size()>0){
            wxLoc = list.get(0);
        }
        Gson gson = new Gson();
        request.setAttribute("wxloc",gson.toJson(wxLoc));
        request.setAttribute("recipe",gson.toJson(suitStoreService.getCateList()));
        return new ModelAndView("modifysuitstore");
    }

    /**
     * 保存适用门店
     * @param loc
     * @return
     */
    @RequestMapping(value = "/platform/suitstore/save",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> saveSuitLoc(@RequestBody WxLoc loc){
        return suitStoreService.insertSuitLoc(loc);
    }

    /**
     * 更新适用门店
     * @param loc
     * @return
     */
    @RequestMapping(value = "/platform/suitstore/update",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateSuitLoc(@RequestBody WxLoc loc){
        return suitStoreService.updateSuitLoc(loc);
    }

    @RequestMapping(value = "/platform/suitstore/delete",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> deleteSuitstore(@RequestParam String id){
        return suitStoreService.deleteSuit(id);
    }
}
