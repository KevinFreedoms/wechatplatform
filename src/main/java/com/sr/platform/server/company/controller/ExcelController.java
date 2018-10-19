package com.sr.platform.server.company.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sr.platform.common.utils.StringUtil;
import com.sr.platform.server.company.bean.*;
import com.sr.platform.server.company.service.IExcelService;
import com.sr.platform.server.company.util.JsonToObject;
import com.sr.platform.server.company.util.NewExcel;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ExcelController {

    @Autowired
    HttpServletRequest request;

    @Autowired
    private IExcelService excelService;

    /**
     * 新增批量充值单
     * @param headtype
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/platform/recharge/new")
    public ModelAndView toRechargeNew(@RequestParam String headtype)throws Exception {
        //生成批量充值单号
        Map<String,Object> reMap = excelService.createBooking(headtype);
        int status = 0;
        String bookingId = "";
        List<WxCompany> list = new ArrayList<WxCompany>();
        status = (int)reMap.get("status");
        if(1==status){
            bookingId = reMap.get("bookingId").toString();
            list = ( List<WxCompany>) reMap.get("companys");
        }
        request.setAttribute("companys",list);
        request.setAttribute("bookingId",bookingId);
        return new ModelAndView("addrechargeorder");
    }

    /**
     * 获取批量充值单
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/platform/recharge/get")
    public ModelAndView toRechargeInfo(@RequestParam String id)throws Exception {
        List<WxBatchrechargecollect> list = excelService.queryRecharge(id);
        WxBatchrechargecollect collect = new WxBatchrechargecollect();
        if(list.size()>0){
            collect = list.get(0);
        }
        //获取汇总
        request.setAttribute("collect",collect);
        //获取批量充值单
        List<WxReceipt> receipts = excelService.getReceiptById(id);
        WxReceipt receipt = new WxReceipt();
        if(receipts.size()>0){
            receipt = receipts.get(0);
        }
        request.setAttribute("receipt",receipt);
        return new ModelAndView("rechargedetail");
    }

    /**
     *导入充值表
     * @param mFile
     * @param userId
     * @return
     */
    @RequestMapping(value = "/platform/recharge/upLoadExcel" ,method = RequestMethod.POST)
    @ResponseBody
    Map<String,Object> upLoadImage(@RequestParam MultipartFile mFile, @RequestParam String userId,@RequestParam String companyId){
        return excelService.uploadObject(mFile,userId,companyId);
    }
    /**
     *检查会员卡号
     * @param staff
     * @return
     */
    @RequestMapping(value = "/platform/recharge/checkMember" ,method = RequestMethod.POST)
    @ResponseBody
    Map<String,Object> checkMember(@RequestBody WxCompanyStaff staff){
        return excelService.checkMember(staff);
    }

    /**
     * 验证用户手机号
     * @param phone
     * @return
     */
    @RequestMapping(value = "/platform/recharge/message" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> checkMessage(@RequestParam String phone){
        return excelService.getPhoneCode(phone);
    }

    /**
     *查询充值单汇总
     * @param locId
     * @param startDate
     * @param endDate
     * @return
     */
    @RequestMapping(value = "/platform/recharge/list" ,method = RequestMethod.GET)
    @ResponseBody
    List<WxBatchrechargecollect> queryRechargeCollect(@RequestParam String locId, @RequestParam String startDate, @RequestParam String endDate){
        return excelService.queryRechargeCollect(locId,startDate,endDate);
    }

    /**
     *传输查询订单汇总
     * @param locId 门店编号
     * @param companyId 企业编号
     * @return
     */
    @RequestMapping(value = "/platform/recharge/list/transfer" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> queryCollectTransfer(@RequestParam String locId, @RequestParam String companyId){
        return excelService.queryCollectTransfer(locId,companyId);
    }

    /**
     *插入付款单
     * @return
     */
    @RequestMapping(value = "/platform/receipt/upload" ,method = RequestMethod.POST,consumes = "application/x-www-form-urlencoded")
    @ResponseBody
    Map<String,Object> saveReceipt() throws IOException {
        String json=StringUtil.getRequestPostxml(request);
        Map<String,Object> reMap =  new HashMap<>();
        reMap = JsonToObject.toMap(json);
        return excelService.insertReceipt(reMap);
    }

    /**
     *检索付款单是否成功
     * @param id 门店编号
     * @return
     */
    @RequestMapping(value = "/platform/receipt/check" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> checkReceipt(@RequestParam String id){
        return excelService.checkReceipt(id);
    }

    /**
     *获取付款单
     * @param id 门店编号
     * @return
     */
    @RequestMapping(value = "/platform/receipt/get" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> queryReceipt(@RequestParam String id,@RequestParam String refid){
        return excelService.queryReceipt(id,refid);
    }

    /**
     *查询批量充值单明细
     * @param id
     * @return
     */
    @RequestMapping(value = "/platform/recharge/detail" ,method = RequestMethod.GET)
    @ResponseBody
    List<WxBatchrechargedetail> queryRechargeDetail(@RequestParam String id){
        return excelService.queryRechargeDetail(id);
    }

    /**
     *批量插入充值单
     * @param saverecharge
     * @return
     */
    @RequestMapping(value = "/platform/recharge/save" ,method = RequestMethod.POST)
    @ResponseBody
    Map<String,Object> saveBatchRecharge(@RequestBody Map<String,Object> saverecharge){
        return excelService.InsertBatchRecharge(saverecharge);
    }

    /**
     *批量更新充值单
     * @param saverecharge
     * @return
     */
    @RequestMapping(value = "/platform/recharge/update" ,method = RequestMethod.POST)
    @ResponseBody
    Map<String,Object> updateBatchRecharge(@RequestBody Map<String,Object> saverecharge){
        return excelService.updateBatchRecharge(saverecharge);
    }

    /**
     *  复核充值单
     * @param saverecharge
     * @return
     */
    @RequestMapping(value = "/platform/recharge/check" ,method = RequestMethod.POST)
    @ResponseBody
    Map<String,Object> checkBatchRecharge(@RequestBody Map<String,Object> saverecharge){
        return excelService.checkBatchRecharge(saverecharge);
    }

    /**
     * 作废订单
     * @param bookingId
     * @param status
     * @return
     */
    @RequestMapping(value = "/platform/recharge/invalid" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> invalidRecharge(@RequestParam String bookingId,@RequestParam String status, @RequestParam String userId){
        return excelService.invalidRecharge(bookingId,status,userId);
    }

    /**
     *
     * 获取条件范围内的企业充值单
     * @param str
     * @param startDate
     * @param endDate
     * @return
     */
    @RequestMapping(value = "/platform/recharge/report/unit" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> unitRechargeReport(@RequestParam String str, @RequestParam String startDate, @RequestParam String endDate){
        return excelService.selectRechargeReport(str,startDate,endDate);
    }

    @RequestMapping(value = "/platform/recharge/report/unitexecl" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> unitRechargeReportExecl(@RequestParam String str, @RequestParam String startDate, @RequestParam String endDate){
        return excelService.selectRechargeReportExecl(str,startDate,endDate);
    }

    /**
     * 获取企业报表查询条件
     * @param staffid
     * @return
     */
    @RequestMapping(value = "/platform/recharge/report/select" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> selectRechargeReport(@RequestParam String staffid){
       return excelService.queryReportCriteria(staffid);
    }

    /**
     * 获取订单明细
     * @param id
     * @return
     */
    @RequestMapping(value = "/platform/recharge/report/info" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> getRechargeReportInfo(@RequestParam String id){
        return excelService.getRechargeReport(id);
    }

    /**
     *查询个人充值单
     * @param startDate
     * @param endDate
     * @return
     */
    @RequestMapping(value = "/platform/recharge/report/member" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> memberRechargeReport(@RequestParam String startDate,@RequestParam String endDate,@RequestParam String str1,@RequestParam String str2){
        return excelService.memberRechargeReport(str1,str2,startDate,endDate);
    }

    /**
     *查询个人充值单
     * @param startDate
     * @param endDate
     * @return
     */
    @RequestMapping(value = "/platform/recharge/report/memberexecl" ,method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> memberRechargeReportExecl(@RequestParam String startDate,@RequestParam String endDate,@RequestParam String str1,@RequestParam String str2){
        return excelService.memberRechargeReportExecl(str1,str2,startDate,endDate);
    }

    /**
     *下载模板
     * @param companyId
     * @param companyName
     */
    @RequestMapping(value = "/platform/recharge/download", method = RequestMethod.GET)
    @ResponseBody
    void testDownload(HttpServletResponse res, @RequestParam String companyId, @RequestParam String companyName) {
        String mk = request.getServletContext().getRealPath(File.separator) + "upLoadExcel";//路径
        //使用Date
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String tody= sdf.format(d).substring(2).replaceAll("-","");
        if(!companyName.equals("0")){
            File upLoadExcel = new File(mk);
            if (!upLoadExcel.exists()) {
                upLoadExcel.mkdir();
            }
            NewExcel excel = new NewExcel();//生成excel模板工具类
            String excelPath = mk +File.separator+ companyName+tody + "充值模板" + ".xlsx";
            if (excel.createExcelFile(excelPath, companyName, companyId)) {
                String fileName = null;
                try {
                    fileName = URLEncoder.encode(companyName+tody+ "充值模板.xlsx", "utf-8");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                res.setHeader("content-type", "application/octet-stream");
                res.setContentType("application/octet-stream");
                res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
                byte[] buff = new byte[1024];
                BufferedInputStream bis = null;
                OutputStream os = null;
                try {
                    os = res.getOutputStream();
                    bis = new BufferedInputStream(new FileInputStream(new File(excelPath)));
                    int i = bis.read(buff);
                    while (i != -1) {
                        os.write(buff, 0, buff.length);
                        os.flush();
                        i = bis.read(buff);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    if (bis != null) {
                        try {
                            bis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
                File file = new File(excelPath);
                file.delete();
            }
        }
    }
}

