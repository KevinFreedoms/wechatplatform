package com.sr.platform.server.system.service.impl;

import com.sr.platform.common.utils.StringUtil;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.customer.dao.IWxStaffDao;
import com.sr.platform.server.system.bean.EpAppSetting;
import com.sr.platform.server.system.bean.WxBaseLoc;
import com.sr.platform.server.system.dao.IWxBaseLocDao;
import com.sr.platform.server.system.service.ISystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SystemService implements ISystemService {
    @Autowired
    private IWxBaseLocDao wxBaseLocDao;

    @Autowired
    private IWxStaffDao wxStaffDao;

    @Override
    public List<WxBaseLoc> getLocAll() {
        return wxBaseLocDao.getlocAll();
    }

    @Override
    public List<EpLoc> getLocLimit() {
        return wxBaseLocDao.getlocLimit();
    }

    @Override
    public List<WxBaseLoc> getBaseLocAll() {
        return wxBaseLocDao.getbaselocAll();
    }

    @Override
    public List<WxBaseLoc> getBaseLocById(String id) {
        return wxBaseLocDao.getbaselocById(id);
    }

    @Override
    public Map<String,Object> getBaseLocCan(String id) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        String bid="";
        //获取微信门店信息
        EpLoc loc = new EpLoc();
        List<EpLoc> list = wxStaffDao.getEplocById(id);
        if(list.size()>0){
            loc = list.get(0);
            bid  = loc.getOrgId();
        }
        reMap.put("loc",loc);
        //判断原始门店编号是否存在
        WxBaseLoc baseLoc = new WxBaseLoc();
        List<WxBaseLoc> select = wxBaseLocDao.getbaselocById(bid);
        if(select.size()>0){
            baseLoc = select.get(0);
        }
        reMap.put("baseLoc",baseLoc);
        return reMap;
    }

    @Override
    public Map<String, Object> getConfig(String id) {
        Map<String,Object> reMap = null;
        try{
            reMap =  new HashMap<String, Object>();
            //判断是否设置了门店点数限制
            List<EpAppSetting> listapp= wxBaseLocDao.getconfig(id);
            if(listapp.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg","尚未设置限点数，无法添加");
                return reMap;
            }
            Integer count = Integer.parseInt(listapp.get(0).getSetString());
            //获取当前已经添加的门店数
            List<EpLoc> locs = wxStaffDao.getEploc();
            Integer loccount = locs.size();
            if(loccount>=count){
                reMap.put("status", 0);
                reMap.put("Msg","添加门店已达到上限");
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
    public Map<String, Object> saveLoc(Map<String, Object> locMap) {
        Map<String,Object> reMap = null;
        try{
            reMap =  new HashMap<String, Object>();
            //判断数据是否存在
            String id = locMap.get("locId").toString();
            List<EpLoc> list = wxStaffDao.getEplocById(id);
            if(list.size()>0){
                reMap.put("status", 0);
                reMap.put("Msg", "微信门店已经存在，不能重复添加");
                return reMap;
            }
            String locid = locMap.get("orgId").toString();
            list = wxStaffDao.getEplocByLoc(locid);
            if(list.size()>0){
                reMap.put("status", 0);
                reMap.put("Msg", list.get(0).getLocName()+"已经和C服门店关联，不能重复关联");
                return reMap;
            }
            wxBaseLocDao.insertLoc(locMap);
            //更新服务门店数据
            WxBaseLoc baseLoc = new WxBaseLoc();
            String startDate = locMap.get("startDate").toString();
            String endDate = locMap.get("endDate").toString();
            SimpleDateFormat sDateFormat=new SimpleDateFormat("yyyy-MM-dd" );
            baseLoc.setOrgId(id);
            baseLoc.setStartDate(sDateFormat.parse(startDate));
            baseLoc.setEndDate(sDateFormat.parse(endDate));
            baseLoc.setStatus(Integer.parseInt( locMap.get("status").toString()));
            baseLoc.setIsScan(Integer.parseInt( locMap.get("isScan").toString()));
            baseLoc.setIsMember(Integer.parseInt( locMap.get("isMember").toString()));
            baseLoc.setIsDelivery(Integer.parseInt( locMap.get("isDelivery").toString()));
            wxBaseLocDao.updateBaseLoc(baseLoc);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "保存失败！");
            e.printStackTrace();
            return reMap;
        }
    }

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> updateLoc(Map<String, Object> locMap) {
        Map<String,Object> reMap = null;
        try{
            reMap =  new HashMap<String, Object>();
            //判断数据是否存在
            String id = locMap.get("locId").toString();
            String locid = locMap.get("orgId").toString();
            List<EpLoc> list = wxStaffDao.getEplocById(id);
            if(list.size()>0&&!locid.equals(list.get(0).getOrgId())){
                reMap.put("status", 0);
                reMap.put("Msg", "微信门店已经存在，不能重复添加");
                return reMap;
            }
            //更新门店信息
            EpLoc loc = new EpLoc();
            loc.setOrgId(id);
            loc.setLocId(locid);
            loc.setAddress1(locMap.get("address1").toString());
            loc.setAddress2(locMap.get("address2").toString());
            loc.setAddress3(locMap.get("address3").toString());
            loc.setAddress4(locMap.get("address4").toString());
            wxBaseLocDao.updateLoc(loc);

            //更新服务门店数据
            WxBaseLoc baseLoc = new WxBaseLoc();
            String startDate = locMap.get("startDate").toString();
            String endDate = locMap.get("endDate").toString();
            SimpleDateFormat sDateFormat=new SimpleDateFormat("yyyy-MM-dd" );
            baseLoc.setOrgId(id);
            baseLoc.setStartDate(sDateFormat.parse(startDate));
            baseLoc.setEndDate(sDateFormat.parse(endDate));
            baseLoc.setStatus(Integer.parseInt( locMap.get("status").toString()));
            baseLoc.setIsScan(Integer.parseInt( locMap.get("isScan").toString()));
            baseLoc.setIsMember(Integer.parseInt( locMap.get("isMember").toString()));
            baseLoc.setIsDelivery(Integer.parseInt( locMap.get("isDelivery").toString()));
            wxBaseLocDao.updateBaseLoc(baseLoc);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "更新失败！");
            e.printStackTrace();
            return reMap;
        }
    }
}
