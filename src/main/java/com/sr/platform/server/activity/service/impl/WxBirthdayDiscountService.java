package com.sr.platform.server.activity.service.impl;

import com.sr.platform.server.activity.bean.WxBirthdayDiscount;
import com.sr.platform.server.activity.dao.IWxBirthdayDiscountDao;
import com.sr.platform.server.activity.service.IWxBirthdayDiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WxBirthdayDiscountService implements IWxBirthdayDiscountService {
    @Autowired
    private IWxBirthdayDiscountDao wxBirthdayDiscountDao;

    @Override
    public List<WxBirthdayDiscount> findBirthdayDiscount() {
        return wxBirthdayDiscountDao.findBirthdayDiscount();
    }

    @Override
    public List<WxBirthdayDiscount> findBirthdayDiscountById(String id) {
        return wxBirthdayDiscountDao.getBirthdayDiscountByReckey(id);
    }

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> insertBirthdayDiscount(WxBirthdayDiscount discount) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //判断当前活动是否已经存在
            String privilegeBatch = discount.getPrivilegeBatch();
            List<WxBirthdayDiscount> list = wxBirthdayDiscountDao.getBirthdayDiscountById(privilegeBatch);
            if(list.size()>0){
                reMap.put("status", 0);
                reMap.put("Msg","该编码已经失效，请重新定义");
                return reMap;
            }
            //判断当前时间段时候有重合的活动
            SimpleDateFormat sld = new SimpleDateFormat("yyyy-MM-dd");
            String  birthyayStartDate = discount.getBirthdayStartDate();
            String  birthdayEndDate = discount.getBirthdayEndDate();
            Date testDate = sld.parse(birthyayStartDate);
            Date testDate1 = sld.parse(birthdayEndDate);
            list = wxBirthdayDiscountDao.findBirthdayDiscount();
            for (WxBirthdayDiscount bd : list) {
                String start = bd.getBirthdayStartDate();
                Date startDate = sld.parse(start);
                String end = bd.getBirthdayEndDate();
                Date endDate = sld.parse(end);
                if (testDate.getTime() <= endDate.getTime() && testDate.getTime() >= startDate.getTime()) {
                    reMap.put("status", 0);
                    reMap.put("Msg","该范围内已有执行的优惠券活动!");
                    return reMap;
                }
                if (testDate1.getTime() <= endDate.getTime() && testDate1.getTime() >= startDate.getTime()) {
                    reMap.put("status", 0);
                    reMap.put("Msg","该范围内已有执行的优惠券活动!");
                    return reMap;
                }
            }
            wxBirthdayDiscountDao.insertBirthdayDiscount(discount);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> updateBirthdayDiscount(WxBirthdayDiscount discount) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //判断当前活动是否已经存在
            int id = discount.getRecKey();
            List<WxBirthdayDiscount> list = wxBirthdayDiscountDao.getBirthdayDiscountByReckey(String.valueOf(id));
            if(list.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg","获取生日优惠信息失败！请稍后重试 ");
                return reMap;
            }
            //判断当前时间段时候有重合的活动
            SimpleDateFormat sld = new SimpleDateFormat("yyyy-MM-dd");
            String  birthyayStartDate = discount.getBirthdayStartDate();
            String  birthdayEndDate = discount.getBirthdayEndDate();
            Date testDate = sld.parse(birthyayStartDate);
            Date testDate1 = sld.parse(birthdayEndDate);
            list  = wxBirthdayDiscountDao.findBirthdayDiscount();
            for (WxBirthdayDiscount bd : list) {
                String start = bd.getBirthdayStartDate();
                Date startDate = sld.parse(start);
                String end = bd.getBirthdayEndDate();
                Date endDate = sld.parse(end);
                if (testDate.getTime() <= endDate.getTime() && testDate.getTime() >= startDate.getTime() && !bd.getPrivilegeBatch().equals(discount.getPrivilegeBatch())) {
                    reMap.put("status", 0);
                    reMap.put("Msg","该范围内已有执行的优惠券活动!");
                    return reMap;
                }
                if (testDate1.getTime() <= endDate.getTime() && testDate1.getTime() >= startDate.getTime() && !bd.getPrivilegeBatch().equals(discount.getPrivilegeBatch())) {
                    reMap.put("status", 0);
                    reMap.put("Msg","该范围内已有执行的优惠券活动!");
                    return reMap;
                }
            }
            wxBirthdayDiscountDao.updateBirthdayDiscount(discount);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String, Object> getNewBirthdayDiscount() {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //获取编码
            List<WxBirthdayDiscount> discount = wxBirthdayDiscountDao.getPrivilegeBatch();
            Integer temp  = discount.size()>0?Integer.parseInt(discount.get(0).getPrivilegeBatch())+1:1;
            SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
            String privilegebatch = format.format(new Date()) + String.format("%04d",temp);
            reMap.put("privilegebatch",privilegebatch);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }
}
