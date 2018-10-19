package com.sr.platform.server.company.service;

import com.sr.platform.server.company.bean.WxBatchrechargecollect;
import com.sr.platform.server.company.bean.WxBatchrechargedetail;
import com.sr.platform.server.company.bean.WxCompanyStaff;
import com.sr.platform.server.company.bean.WxReceipt;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface IExcelService {
    /**
     * 导入充值表
     * @param mFile
     * @param userId
     * @param companyId
     * @return
     */
    public Map<String, Object> uploadObject(MultipartFile mFile, String userId, String companyId);

    /**
     * 检查会员卡号
     * @param staff
     * @return
     */
    public Map<String,Object> checkMember(WxCompanyStaff staff);

    /**
     * 创建订单号
     * @param locId
     * @return
     */
    public Map<String,Object> createBooking(String locId);

    /**
     * 保存批量充值单
     * @param saverecharge
     * @return
     */
    public Map<String,Object> InsertBatchRecharge(Map<String, Object> saverecharge);

    /**
     * 查询批量充值单汇总列表
     * @param locId
     * @param startDate
     * @param endDate
     * @return
     */
    public List<WxBatchrechargecollect>  queryRechargeCollect(String locId, String startDate, String endDate);

    /**
     * 获取报表查询条件的数据源
     * @param staffid
     * @return
     */
    public Map<String,Object> queryReportCriteria(String staffid);

    /**
     * 根据查询条件查询单位充值单
     * @param str
     * @param startDate
     * @param endDate
     * @return
     */
    public Map<String,Object> selectRechargeReport(String str,String startDate, String endDate);

    /**
     * 导出execl企业充值单
     * @param str
     * @param startDate
     * @param endDate
     * @return
     */
    public Map<String,Object> selectRechargeReportExecl(String str,String startDate, String endDate);

    /**
     * 获取个人充值
     * @param str1
     * @param str2
     * @param startDate
     * @param endDate
     * @return
     */
    public Map<String,Object> memberRechargeReport(String str1,String str2,String startDate,String endDate);

    /**
     * 导出个人充值单
     * @param str1
     * @param str2
     * @param startDate
     * @param endDate
     * @return
     */
    public Map<String,Object> memberRechargeReportExecl(String str1,String str2,String startDate,String endDate);

    /**
     * 根据单号展示单位充值汇总明细
     * @param id
     * @return
     */
    public Map<String,Object> getRechargeReport(String id);

    /**
     * 查询批量充值单汇总
     * @param bookingId
     * @return
     */
    public List<WxBatchrechargecollect>  queryRecharge(String bookingId);

    /**
     * 查询批量充值单明细
     * @param bookingId
     * @return
     */
    public  List<WxBatchrechargedetail> queryRechargeDetail(String bookingId);

    /**
     * 更新批量充值单
     * @param data
     * @return
     */
    public Map<String,Object> updateBatchRecharge(Map<String, Object> data);

    /**
     *
     * @param data
     * @return
     */
    public Map<String,Object> checkBatchRecharge(Map<String, Object> data);

    /**
     * 作废充值单
     * @param bookingId
     * @param status
     * @param userId
     * @return
     */
    public  Map<String,Object> invalidRecharge(String bookingId,String status,String userId);

    /**
     * 获取手机验证码
     * @param phone
     * @return
     */
    Map<String,Object> getPhoneCode(String phone);

    /**
     * 查询批量充值单
     * @param locId
     * @param companyId
     * @return
     */
    public Map<String,Object> queryCollectTransfer(String locId,String companyId);

    /**
     * 查询付款单是否存在
     * @param id
     * @return
     */
    public Map<String,Object> checkReceipt(String id);


    /**
     * 获取付款单
     * @param id
     * @param refid
     * @return
     */
    public Map<String,Object> queryReceipt(String id,String refid);


    /**
     * 根据Id获取付款单
     * @param id
     * @return
     */
    public List<WxReceipt> getReceiptById(String id);

    /**
     *
     * @param map
     * @return
     */
    public Map<String,Object>  insertReceipt(Map<String, Object> map);

}
