package com.sr.platform.server.suitstore.service.impl;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sr.platform.common.utils.HttpRequestUtil;
import com.sr.platform.common.utils.StringUtil;
import com.sr.platform.server.company.util.MessageUtil;
import com.sr.platform.server.suitstore.bean.WxBasicCategories;
import com.sr.platform.server.suitstore.bean.WxLoc;
import com.sr.platform.server.suitstore.dao.ISuitStoreDao;
import com.sr.platform.server.suitstore.service.ISuitStoreService;
import com.sr.platform.server.system.bean.EpAppSetting;
import com.sr.platform.server.system.dao.IWxBaseLocDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SuitStoreService implements ISuitStoreService {
    @Autowired
    private ISuitStoreDao suitStoreDao;
    @Autowired
    private IWxBaseLocDao wxBaseLocDao;

    @Override
    public List<WxLoc> getLocAll() {
        return suitStoreDao.getLocAll();
    }

    @Override
    public List<WxLoc> getLocById(String id) {
        return suitStoreDao.getLocById(id);
    }

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String,Object> insertSuitLoc(WxLoc loc) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //判断新增门店存在
            String id = loc.getSid();
            List<WxLoc> list = suitStoreDao.getLocById(id);
            if(list.size()>0){
                reMap.put("status", 0);
                reMap.put("Msg", "该门店已经存在不能重复添加");
                return reMap;
            }
            //判断是否设置了门店点数限制
            String type = "WxLocUrl";
            List<EpAppSetting> listapp= wxBaseLocDao.getconfig(type);
            if(listapp.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg","尚未设置适用门店LogoUrl，无法添加");
                return reMap;
            }
            loc.setUrl(listapp.get(0).getSetString());
            suitStoreDao.insertLoc(loc);

            Properties p=new Properties();
            p.load(MessageUtil.class.getClassLoader().getResourceAsStream("application.properties"));

            String baseUrl=p.getProperty("baseUrl");
            baseUrl = baseUrl + "membercard/doCreateLoc";
            JsonParser jp = new JsonParser();
            String resultStr = HttpRequestUtil.sendPost(baseUrl,"");
            JsonObject result = (JsonObject)jp.parse(resultStr);
            String status = result.get("status").toString();
            if( "false".equals(status)){
                reMap.put("status", 0);
                reMap.put("Msg", "审核失败,稍后重试");
                return reMap;
            }
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
    public Map<String,Object> updateSuitLoc(WxLoc loc) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //判断门店存在
            String id = loc.getSid();
            List<WxLoc> list = suitStoreDao.getLocById(id);
            if(list.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg", "获取适用门店信息失败！");
                return reMap;
            }
            suitStoreDao.updateLoc(loc);
            String poi_id = loc.getPoi_id();
            Properties p=new Properties();
            p.load(MessageUtil.class.getClassLoader().getResourceAsStream("application.properties"));


            String baseUrl= p.getProperty("baseUrl");
            String param = "";
            if(StringUtil.isEmpty(poi_id)){
                baseUrl = baseUrl + "membercard/doCreateLoc";
            }else{
                String locid = loc.getSid();
                baseUrl = baseUrl + "membercard/doUpdateLoc";
                param = "sid="+locid;
            }
            JsonParser jp = new JsonParser();
            String resultStr = HttpRequestUtil.sendPost(baseUrl,"");
            JsonObject result = (JsonObject)jp.parse(resultStr);
            String status = result.get("status").toString();
            if( "false".equals(status)){
                reMap.put("status", 0);
                reMap.put("Msg", "审核失败,稍后重试");
                return reMap;
            }
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
    public Map<String,Object>  getCateList() {
        Map<String,Object> reMap = new HashMap<>();
        //获取类别类型
        List<WxBasicCategories> index = suitStoreDao.getCateIndex();
        for (int i =0;i<index.size();i++) {
            String name = index.get(i).getCategory2();
            List<WxBasicCategories>  categories= suitStoreDao.getCateList(name);
            reMap.put(name,categories);
        }
        return reMap;
    }

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> deleteSuit(String id) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //判断门店存在
           // List<WxLoc> list = suitStoreDao.getLocById(id);
           // if(list.size()==0){
              //  reMap.put("status", 0);
               // reMap.put("Msg", "获取适用门店信息失败！");
               // return reMap;
           // }
            suitStoreDao.deleteLoc(id);
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
