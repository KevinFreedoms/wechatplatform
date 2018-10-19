package com.sr.platform.server.memberManagement.service.impl;

import com.sr.platform.server.memberManagement.bean.WxChangeintegration;
import com.sr.platform.server.memberManagement.dao.IWxChangeintegrationDao;
import com.sr.platform.server.memberManagement.dao.IWxConsumeDao;
import com.sr.platform.server.memberManagement.dao.IWxMemberDao;
import com.sr.platform.server.memberManagement.dao.IWxRechargeDao;
import com.sr.platform.server.memberManagement.service.IMemberManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemberManagementService implements IMemberManagementService {
    @Autowired
    private IWxRechargeDao ird;
    @Autowired
    private IWxConsumeDao icd;
    @Autowired
    private IWxChangeintegrationDao icid;
    @Autowired
    private IWxMemberDao iwd;
    @Override
    public List getMemberUsageRecords(String path, String startDate, String endDate) {
        if(path!=null&&!"".equals(path)&&"recharge".equals(path)){
            return ird.getWxRecharges(startDate, endDate);
        }
        if(path!=null&&!"".equals(path)&&"consume".equals(path)){
            return icd.getWxConsumes(startDate, endDate);
        }
        if(path!=null&&!"".equals(path)&&"changeintegration".equals(path)){
            return icid.getWxChangeintegrations(startDate, endDate);
        }
        return null;
    }

    @Override
    public List<WxChangeintegration> getFreeDay(String startDate, String endDate) {
        return icid.getFreeDay(startDate, endDate);
    }

    @Override
    public Map<String, Object> getWxMembers(String startDate, String endDate, int pageSize, int start, String search) {
        Map<String,Object> reMap =new HashMap();
        reMap.put("rows",iwd.getWxMembersFy(startDate, endDate,pageSize,start,search));
        reMap.put("total",iwd.reCount(startDate,endDate,search));
        return  reMap;
    }
}
