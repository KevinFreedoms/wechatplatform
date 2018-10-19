package com.sr.platform.server.coupon.service.impl;

import com.sr.platform.common.utils.MysqlBatchUtil;
import com.sr.platform.server.coupon.bean.Wxcouponcollect;
import com.sr.platform.server.coupon.bean.Wxcoupondetails;
import com.sr.platform.server.coupon.dao.CouponDao;
import com.sr.platform.server.coupon.service.ICouponService;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.customer.dao.IWxStaffDao;
import com.sr.platform.server.product.bean.EpRetailProduct;
import com.sr.platform.server.product.bean.EpRetailProductSort;
import com.sr.platform.server.product.dao.ProductDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CouponServiceImpl implements ICouponService {
    @Autowired
    private CouponDao couponDao;
    @Autowired
    private ProductDao productDao;
    @Autowired
    private IWxStaffDao staffDao;
    private MysqlBatchUtil mysqlBatchUtil;
    @Override
    public List<Wxcouponcollect> getCouponselect(Integer couponType, String ref2, String receiveType) {
        Map<String, Object> data = new HashMap();
        data.put("couponType",couponType);
        data.put("ref2",ref2);
        data.put("receiveType",receiveType);
        List<Wxcouponcollect> list =  couponDao.findCollectByquery(data);
        return list;
    }

    @Override
    public List<Wxcouponcollect> getCouponById(String id) {
        return couponDao.findCollectById(id);
    }

    @Override
    public List<Wxcoupondetails> getCoupondetail(String couponBatch, Integer status) {
        Map<String, Object> data = new HashMap();
        data.put("couponBatch",couponBatch);
        data.put("status",status);
        List<Wxcoupondetails> list =couponDao.findDetailByquery(data);
        return list;
    }

    @Override
    public Map<String, Object> createCouponBatch(String headtype) {
        Map<String,Object> reMap = null;
        try {
            reMap =  new HashMap<String, Object>();
            Map<String, Object> data = new HashMap();
            String headtypes=headtype+'%';
            data.put("headtype",headtypes);
            Map<String, Object> couponbatch=couponDao.findCouponbtch(data);
            List<EpLoc> loclist =  staffDao.getEploc();
            List<EpRetailProduct> productlist =  productDao.getProductAll();
            List<EpRetailProductSort> productsortlist =  productDao.getSortAll();
            reMap.put("status", 1);
            reMap.put("couponbatch", couponbatch.get("couponbatch"));
            reMap.put("productlist", productlist);
            reMap.put("productsortlist", productsortlist);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> insertCollect(Map<String, Object> collectjson) {
        Map<String,Object> reMap =new HashMap<String, Object>();
        try {
            //判断优惠券是否已经存在
            String couponBatch= (String) collectjson.get("couponBatch");
            List<Wxcouponcollect> list = couponDao.findCollectById(couponBatch);
            if(list.size()>0){
                reMap.put("status", 0);
                reMap.put("Msg", "批次编号已经过期，请稍后重试");
            }
            couponDao.insertWXcouponcollect(collectjson);
            //Integer couponType=  Integer.valueOf((String) collectjson.get("couponType"));

            // Integer maxPublishQuantity= Integer.valueOf((String) collectjson.get("maxPublishQuantity"));
            //mysqlBatchUtil.creatCoupondetail(couponType,couponBatch,maxPublishQuantity );
            reMap.put("status", 1);
            reMap.put("Msg", "操作成功！");
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> updateCollect(Map<String, Object> collectjson) {
        Map<String, Object> reMap = new HashMap<String, Object>();
        try {
            couponDao.updateWXcouponcollect(collectjson);
            reMap.put("status", 1);
            reMap.put("Msg", "操作成功！");
            return reMap;
        } catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }
}
