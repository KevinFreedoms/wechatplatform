package com.sr.platform.server.activity.controller;
import com.sr.platform.server.activity.bean.WxBirthdayDiscount;
import com.sr.platform.server.activity.service.IWxBirthdayDiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

import org.springframework.web.servlet.ModelAndView;

@RestController
public class BirthdayDiscountController {
    @Autowired
    HttpServletRequest request;

    @Autowired
    private IWxBirthdayDiscountService birthdayDiscountService;

    @RequestMapping(value = "/platform/activity/birthday/all", method = RequestMethod.GET)
    @ResponseBody
    public List<WxBirthdayDiscount> findBirthdayDiscount() {
        return birthdayDiscountService.findBirthdayDiscount();
    }

    /**
     * 进入新增生日活动
     * @return
     */
    @RequestMapping(value = "/platform/activity/birthday/new")
    public ModelAndView toAddBirthActivity(){
        String privilegebatch = "";
        Map<String,Object> reMap = birthdayDiscountService.getNewBirthdayDiscount();
        int status = (int)reMap.get("status");
        if(1==status){
            privilegebatch = reMap.get("privilegebatch").toString();
        }
        request.setAttribute("privilegebatch",privilegebatch);
        return new ModelAndView("addbirthdayActivity");
    }


    /**
     * 进入修改生日活动
     *
     * @return
     */
    @RequestMapping(value = "/platform/activity/birthday/modify")
    public ModelAndView toModifyBirthActivity(@RequestParam String id){
        WxBirthdayDiscount count = new WxBirthdayDiscount();
        List<WxBirthdayDiscount> list = birthdayDiscountService.findBirthdayDiscountById(id);
        if(list.size()>0){
            count = list.get(0);
        }
        request.setAttribute("count",count);
        return new ModelAndView("modifyBirthdayActivity");
    }


    /**
     * 保存生日活动
     * @return
     */
    @RequestMapping(value = "/platform/activity/birthday/save",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> saveBirthdayDis(@RequestBody WxBirthdayDiscount discount){
        return birthdayDiscountService.insertBirthdayDiscount(discount);
    }

    /**
     * 更新生日活动
     * @param discount
     * @return
     */
    @RequestMapping(value = "/platform/activity/birthday/update",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateBirthdayDis(@RequestBody WxBirthdayDiscount discount){
        return birthdayDiscountService.updateBirthdayDiscount(discount);
    }


}
