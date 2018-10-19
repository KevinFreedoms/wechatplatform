package com.sr.platform.server.customer.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by xxx on 2018/3/25.
 */
@RestController
public class PageController {
    /**
     * 主管理页面
     * @return
     */
    @RequestMapping(value = "/platform/main")
    public ModelAndView toMain(){
        return new ModelAndView("main");

    }

    /**
     * 系统管理菜单
     * @return
     */
    @RequestMapping(value = "/platform/system")
    public ModelAndView toSystem(){
        return new ModelAndView("managemain");
    }

    /**
     * 系统管理菜单
     * @return
     */
    @RequestMapping(value = "/platform/system/loc")
    public ModelAndView toBaseLoc(){
        return new ModelAndView("storemanager");
    }

    /**
     * 登录页面
     * @return
     */
    @RequestMapping(value = "/platform")
    public ModelAndView toLogin(){
        return new ModelAndView("login");

    }

    /**
     *进入支付设置
     * @return
     */
    @RequestMapping(value = "/platform/pay/v")
    public ModelAndView toPayPassWord(){
        return new ModelAndView("setpassword");
    }

    /**
     *进入登录密码修改
     * @return
     */
    @RequestMapping(value = "/platform/user/p")
    public ModelAndView toModifyPassWord(){
        return new ModelAndView("modifyloginpass");
    }


    /**
     *进入角色维护
     * @return
     */
    @RequestMapping(value = "/platform/user/r")
    public ModelAndView toRoleManager(){
        return new ModelAndView("rolemanager");
    }

    /**
     *进入员工维护
     * @return
     */
    @RequestMapping(value = "/platform/user/s")
    public ModelAndView toStaffManager(){
        return new ModelAndView("staffmanager");
    }

    /**
     *进入企业维护
     * @return
     */
    @RequestMapping(value = "/platform/compay/m")
    public ModelAndView toCompanyManager(){
        return new ModelAndView("companymanager");
    }

    /**
     *进入企业员工维护
     * @return
     */
    @RequestMapping(value = "/platform/compay/s")
    public ModelAndView toCompanyStaffManager(){
        return new ModelAndView("companystaff");
    }

    /**
     *进入充值单维护
     * @return
     */
    @RequestMapping(value = "/platform/recharge/m")
    public ModelAndView toReChargeManager(){
        return new ModelAndView("batchrecharge");
    }
    /**
     *进入会员充值报表
     * @return
     */
    @RequestMapping(value = "/platform/recharge/report/m")
    public ModelAndView toRechargeReport(){
        return new ModelAndView("rechargeReport");
    }

    /**
     *新增充值单
     * @return
     */
    @RequestMapping(value = "/platform/recharge/a")
    public ModelAndView toAddReCharge(){
        return new ModelAndView("addrechargeorder");
    }


    /**
     *进入优惠券维护
     * @return
     */
    @RequestMapping(value = "/platform/coupon/m")
    public ModelAndView toCouponManager(){
        return new ModelAndView("couponmanager");
    }

    /**
     * 进入充值规则
     * @return
     */
    @RequestMapping(value = "/platform/recharge/rule")
    public ModelAndView toRechargeRuleManager(){return new ModelAndView("rechargerule");}

    /**
     * 进入领卡活动
     * @return
     */
    @RequestMapping(value = "/platform/activity/member")
    public ModelAndView toMembercardActivityManager(){return new ModelAndView("memberActivity");}

    /**
     * 进入生日活动
     * @return
     */
    @RequestMapping(value = "/platform/activity/birthday")
    public ModelAndView toBirthActivityManager(){return new ModelAndView("birthdayActivity");}

    /**
     * 进入适用门店
     * @return
     */
    @RequestMapping(value = "/platform/suitstore/m")
    public ModelAndView toSuitStoreManager(){return new ModelAndView("suitStore");}

    /**
     * 推送通知
     * @return
     */
    @RequestMapping(value = "/platform/notify/m")
    public ModelAndView toNotifyManager(){return new ModelAndView("sendMessage");}

}
