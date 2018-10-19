package com.sr.platform.server.company.service.impl;
import com.sr.platform.common.utils.StringUtil;
import com.sr.platform.server.company.bean.WxBatchrechargecollect;
import com.sr.platform.server.company.bean.WxCompany;
import com.sr.platform.server.company.bean.WxCompanyStaff;
import com.sr.platform.server.company.dao.ExcelDao;
import com.sr.platform.server.company.dao.IWxCompanyDao;
import com.sr.platform.server.company.dao.IWxCompanyStaffDao;
import com.sr.platform.server.company.service.ICompanyService;
import com.sr.platform.server.company.util.MessageUtil;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.customer.dao.IWxStaffDao;
import com.sr.platform.server.suitstore.bean.WxLoc;
import com.sr.platform.server.system.bean.EpAppSetting;
import com.sr.platform.server.system.dao.IWxBaseLocDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.transaction.support.TransactionTemplate;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/3/31.
 */
@Service
public class CompanyService implements ICompanyService {
    @Autowired
    private PlatformTransactionManager transactionManager;
    @Autowired
    private IWxStaffDao wxStaffDao;
    @Autowired
    private ExcelDao excelDao;
    @Autowired
    private IWxCompanyDao wxCompanyDao;
    @Autowired
    private IWxCompanyStaffDao wxCompanyStaffDao;

    @Override
    public List<WxCompany> getCompanyAll(String id) {
        WxCompany company = new WxCompany();
         company.setLocId(id);
        return wxCompanyDao.findCompanyAll(company);
    }

    @Override
    public Map<String, Object> getCompanyTransfer(String id) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //转换企业编号
            List<EpLoc> locs = wxStaffDao.getEplocByLoc(id);
            if(locs.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg", "获取门店信息失败");
                return reMap;
            }
            //查询企业信息
            WxCompany company = new WxCompany();
            company.setLocId(locs.get(0).getLocId());
            List<WxCompany> list = wxCompanyDao.findCompanyTransfer(company);
            reMap.put("list", list);
            reMap.put("total", list.size());
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
    public Map<String, Object> getNewCompany() {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //获取最大公司编码
            List<WxCompany> companyList = wxCompanyDao.getCompanyMaxNum();
            Integer temp  = companyList.size()>0?Integer.parseInt(companyList.get(0).getCompanyId())+1:1;
            String CompanyId =  String.format("%04d",temp);
            WxCompany company = new WxCompany();
            company.setCompanyId(CompanyId);
            reMap.put("company", company);
            //获取对应门店
            List<EpLoc> locs = wxStaffDao.getEploc();
            reMap.put("locs", locs);
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
    public Map<String, Object> getCompany(String id) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            List<WxCompany> list = wxCompanyDao.findCompany(id);
            if(list.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg","获取单位信息失败");
            }
            reMap.put("company", list.get(0));
            //获取对应门店
            List<EpLoc> locs = wxStaffDao.getEploc();
            reMap.put("locs", locs);
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
    public Map<String, Object> updateCompany(final WxCompany company) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //判断当前角色是否存在
            String id = company.getCompanyId();
            List<WxCompany> list = wxCompanyDao.findCompany(id);
            WxCompany temp = new WxCompany();
            Timestamp now = new Timestamp(System.currentTimeMillis());
            //判断名称是否重复
            String name = company.getCompanyName();
            List<WxCompany> companies = wxCompanyDao.checkCompany(name);
            if(list.size()>0){
                if(companies.size()>0){
                    String companyId  = companies.get(0).getCompanyId();
                    if(!id.equals(companyId)){
                        reMap.put("status",0);
                        reMap.put("Msg","企业名称不能重复");
                        return reMap;
                    }
                }
                temp = list.get(0);
                temp.setCompanyName(company.getCompanyName());
                temp.setContactWay(company.getContactWay());
                temp.setContactPerson(company.getContactPerson());
                temp.setContactAddress(company.getContactAddress());
                temp.setLocId(company.getLocId());
                temp.setStatus(company.getStatus());
                temp.setRemark(company.getRemark());
                temp.setLastUpDate(now);
                temp.setLastUpdateUserId("系统管理员");
                wxCompanyDao.updateCompany(company);
            }else{
                if(companies.size()>0){
                    reMap.put("status",0);
                    reMap.put("Msg","企业名称不能重复");
                    return reMap;
                }
                company.setCreateUserId("系统管理员");
                company.setLastUpdateUserId("系统管理员");
                company.setCreateDate(now);
                company.setLastUpDate(now);
                wxCompanyDao.insertCompany(company);
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
    public List<WxCompanyStaff> getCompanyStaffAll(String id) {
        WxCompanyStaff staff = new WxCompanyStaff();
        if(!id.equals("")){
            staff.setCompanyId(id);
        }
        return wxCompanyStaffDao.findCompanyStaffAll(staff);
    }

    @Override
    public Map<String, Object> checkCompanyStaff(String id,String companyid,int flag) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            Map<String, Object> memberMap= excelDao.getMemberNum(id);
            if(memberMap==null){//会员表里面没有对应的会员卡号
                reMap.put("status",0);
                reMap.put("Msg","未找到该会员卡信息");
                return reMap;
            }
            List<WxCompanyStaff> staffMap=  wxCompanyStaffDao.findCompanyStaff(id);
            if(staffMap.size()>0){
                WxCompanyStaff staff = staffMap.get(0);
                String oldcompang = staff.getCompanyId();
                if(flag==0&&oldcompang.equals(companyid)){
                    reMap.put("status",0);
                    reMap.put("Msg","目前已存在该会员信息,不能重复添加");
                    return reMap;
                }
                if(flag==0&&!oldcompang.equals(companyid)){
                    reMap.put("status",0);
                    reMap.put("Msg","当前职工信息已经在其他企业添加,请检查数据是否正确");
                    return reMap;
                }
            }
            reMap.put("staff",memberMap);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            return reMap;
        }
    }

    @Override
    public Map<String, Object> getCompanyStaff(String id) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            List<WxCompanyStaff> list = wxCompanyStaffDao.findCompanyStaff(id);
            if(list.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg", "获取企业员工信息失败");
                return reMap;
            }
            reMap.put("staff",list.get(0));
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            e.printStackTrace();
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            return reMap;
        }
    }

    @Override
    public  Map<String,Object> updateComanyStaff(final WxCompanyStaff staff) {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        final Map<String, Object> reMap =new HashMap<>();
        template.execute(new TransactionCallback<Boolean>() {
            @Override
            public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try{
                    //判断
                    String  code = staff.getRef2();
                    if(StringUtil.isEmpty(code)){
                        reMap.put("status", 0);
                        reMap.put("Msg", "会员卡号不能为空");
                    }
                    List<WxCompanyStaff> list = wxCompanyStaffDao.findCompanyStaff(code);
                    if(list.size()==0){
                        wxCompanyStaffDao.insertCompanyStaff(staff);
                    }else{
                        wxCompanyStaffDao.updateCompanyStaff(staff);
                    }
                    reMap.put("status", 1);
                    return true;
                }catch (Exception e) {
                    e.printStackTrace();
                    reMap.put("status", 0);
                    reMap.put("Msg", "系统繁忙,稍后重试");
                    transactionStatus.setRollbackOnly();
                    return false;
                }
            }
        });
        return  reMap;
    }
    @Override
    public Map<String, Object> deleteComanyStaff(final String id) {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        final Map<String, Object> reMap =new HashMap<>();
        template.execute(new TransactionCallback<Boolean>() {
            @Override
            public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try{
                    int reckey = 0;
                    List<WxCompanyStaff> list = wxCompanyStaffDao.findCompanyStaff(id);
                    if(list.size()==0){
                        reMap.put("status", 0);
                        reMap.put("Msg", "获取企业员工信息失败！");
                        return true;
                    }
                    String openid = list.get(0).getOpenId();
                    //判断是否有未审核的订单里存在
                    List<WxBatchrechargecollect> collect=excelDao.checkBookingStaff(openid);
                    if(collect.size()>0){
                        reMap.put("status", 0);
                        reMap.put("Msg", "该企业职工存在待复核的订单，不允许删除！");
                        return true;
                    }
                    reckey  = list.get(0).getRecKey();
                    //删除
                    wxCompanyStaffDao.deleteCompanyStaff(reckey);
                    reMap.put("status", 1);
                    return true;
                }catch (Exception e) {
                    reMap.put("status", 0);
                    reMap.put("Msg", "系统繁忙,稍后重试");
                    transactionStatus.setRollbackOnly();
                    return false;
                }
            }
        });
        return  reMap;
    }
}
