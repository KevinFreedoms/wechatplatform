package com.sr.platform.server.company.dao;
import com.sr.platform.server.company.bean.WxCompanyStaff;
import java.util.List;

/**
 * Created by xxx on 2018/3/31.
 */
public interface IWxCompanyStaffDao {

    /**
     * 根据单位编码获取企业
     * @return
     */
    List<WxCompanyStaff> findCompanyStaffAll(WxCompanyStaff companyStaff);

    /**
     * 根据员工编号 和企业信息
     * @param id
     * @return
     */
    List<WxCompanyStaff> findCompanyStaff(String id);

    /**
     *插入公司员工信息
     * @param staff
     */
    void insertCompanyStaff(WxCompanyStaff staff);


    /**
     * 更新公司员工信息
     * @param staff
     */
    void updateCompanyStaff(WxCompanyStaff staff);

    /**
     * 删除企业员工
     * @param id
     */
    void deleteCompanyStaff(int id);
}
