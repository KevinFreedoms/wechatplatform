package com.sr.platform.server.company.dao;

import com.sr.platform.server.company.bean.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ExcelDao {
    /**
     * 根据条件获取会员卡中记录
     * @param code
     * @return
     */
    Map<String,Object> getMemberNum(String code);
    /**
     * 批量插入员工
     * @param staffs
     */
    void InsertStaffs(@Param("functions") List<WxCompanyStaff> staffs);
    /**
     * 获取员工表之前存在单本次没有的
     * @param data
     * @return
     */
   List< Map<String,Object>> selectStaffUnExist(Map<String, Object> data);
    /**
     * 创建充值单号
     * @param data
     * @return
     */
    Map<String,Object> findBookingId(Map<String, Object> data);
    /**
     * 检查单号
     * @param data
     */
    Map<String,Object> checkBooking(Map<String, Object> data);

    /**
     *检测员工是否存在未审核的批量充值单
     * @param id
     * @return
     */
    List<WxBatchrechargecollect> checkBookingStaff(String id);
    /**
     * 查询批量充值单汇总列表
     * @param data
     */
    List<WxBatchrechargecollect> queryRechargeCollect(Map<String, Object> data);

    /**
     * 根据查询条件展示门店
     * @param str
     * @param startDate
     * @param endDate
     * @return
     */
    List<Map<String,Object>> selectRechargeReportLoc(@Param("str")List<String> str,@Param("startDate")String startDate,@Param("endDate")String endDate);

    /**
     * 根据查询条件展示数据
     * @param str
     * @param id
     * @param startDate
     * @param endDate
     * @return
     */
    List<WxBatchrechargecollect> selectRechargeReport(@Param("str")List<String> str,@Param("locId")String id,@Param("startDate")String startDate,@Param("endDate")String endDate);

    /**
     * 查询批量充值单汇总
     * @param id
     */
    List<WxBatchrechargecollect> queryRecharge(String id);

 /**
  * 根据门店 企业
  * @param data
  * @return
  */
    List<Map<String,Object>> queryRechargeTansfer(Map<String, Object> data);

    /**
     * 查询员工是否有批量充值单
     * @param data
     */
    List<WxBatchrechargecollect> queryRechargeStaff(Map<String, Object> data);
    /**
     * 查询批量充值单明细
     * @param data
     */
    List<WxBatchrechargedetail> queryRechargeDetail(Map<String, Object> data);
    /**
     * 插入批量充值汇总
     * @param seclectdata
     */
    void insertBatchrechargecollect(Map<String, Object> seclectdata);
    /**
     * 插入批量充值明细
     * @param detaildata
     */
    void insertBatchrechargedetail(Map<String, Object> detaildata);
    /**
     * 更新批量充值单明细
     * @param detaildata
     */
    void updateBatchRechargeDetail(Map<String, Object> detaildata);
    /**
     * 更新批量充值单汇总
     * @param seclectdata
     */
    void updateBatchRechargeCollect(Map<String, Object> seclectdata);

    /**
     * 复核充值汇总
     * @param seclectdata
     */
    void checkBatchRechargeCollect(Map<String, Object> seclectdata);
    /**
     * 批量更新会员积分
     * @param seclectdata
     */
    void updateBatchMember(Map<String, Object> seclectdata);
    /**
     * 插入充值流水
     * @param seclectdata
     */
    void insertChangeIntegration(Map<String, Object> seclectdata);
    /**
     * 作废付款单
     * @param data
     */
    void invalidRecharge(Map<String, Object> data);

    /**
     * 更新订单付款状态
     * @param id
     */
    void updateRechargeMoney(String id);
    /**
     * 插入付款单
     * @param data
     */
    void insertWxReceipt(Map<String, Object> data);

    /**
     * 获取付款单
     * @param id
     * @return
     */
    List<WxReceipt> getWxReceipt(String id);

    /**
     * 获取个人充值单
     * @param startDate
     * @param endDate
     * @return
     */
    List<Map<String,Object>> getMemberRechargeReport(@Param("startDate")String startDate,@Param("endDate")String endDate);

    /**
     * 查询会员范围的个人充值单
     * @param str1
     * @param str2
     * @param startDate
     * @param endDate
     * @return
     */
    List<Map<String,Object>> getMemberRechargeReportSelect(@Param("str1")String str1,@Param("str2")String str2,@Param("startDate")String startDate,@Param("endDate")String endDate);
}
