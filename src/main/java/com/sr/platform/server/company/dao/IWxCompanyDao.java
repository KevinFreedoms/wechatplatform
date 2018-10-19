package com.sr.platform.server.company.dao;

import com.sr.platform.server.company.bean.WxCompany;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.integration.bean.WxCommodityCategory;

import java.util.List;

/**
 * Created by xxx on 2018/3/31.
 */
public interface IWxCompanyDao {

    /**
     * 根据门店获取单位信息
     * @return
     */
    List<WxCompany> findCompanyAll(WxCompany company);

    /**
     * 获取所有门店信息
     * @return
     */
    List<WxCompany> selectCompany();

    /**
     * 获取单位信息
     * @return
     */
    List<WxCompany> findCompanyTransfer(WxCompany company);

    /**
     * 获取新的公司编号
     * @return
     */
    List<WxCompany> getCompanyMaxNum();


    /**
     * 获取公司信息
     * @param id
     * @return
     */
    List<WxCompany> findCompany(String id);


    /**
     *插入公司信息
     * @param company
     */
    void insertCompany(WxCompany company);


    /**
     * 更新公司信息
     * @param company
     */
    void updateCompany(WxCompany company);

    /**
     * \检测用户名
     * @param name
     * @return
     */
    List<WxCompany> checkCompany(String name);
}
