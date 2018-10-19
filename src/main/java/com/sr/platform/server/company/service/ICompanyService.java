package com.sr.platform.server.company.service;

import com.sr.platform.server.company.bean.WxCompany;
import com.sr.platform.server.company.bean.WxCompanyStaff;

import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/3/31.
 */
public interface ICompanyService {

    /**
     * 获取所有单位
     * @param id
     * @return
     */
    List<WxCompany> getCompanyAll( String id);

    /**
     * 根据企业编号获取企业信息
     * @param id
     * @return
     */
    Map<String,Object> getCompanyTransfer(String id);

   /**
    *进入新增单位
    * @return
    */
    Map<String,Object> getNewCompany ();

    /**
     * 获取单位
     * @param id
     * @return
     */
    Map<String,Object> getCompany(String id);

    /**
     * 更新单位信息
     * @param company
     * @return
     */
    Map<String, Object> updateCompany(WxCompany company);


    /**
     * 获取单位下职工
     * @param id
     * @return
     */
    List<WxCompanyStaff> getCompanyStaffAll(String id);


    /**
     * 检索会员卡是否存在
     * @param id
     * @return
     */
    Map<String,Object> checkCompanyStaff(String id,String companyid,int flag);

    /**
     * 根据企业员工编号获取员工信息
     * @param id
     * @return
     */
    Map<String,Object> getCompanyStaff(String id);

    /**
     * 更新企业员工信息
     * @param staff
     * @return
     */
    Map<String,Object> updateComanyStaff(WxCompanyStaff staff);

 /**
  * 删除员工
  * @param id
  * @return
     */
    Map<String,Object> deleteComanyStaff(String id);

}
