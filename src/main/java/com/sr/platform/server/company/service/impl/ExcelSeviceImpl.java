package com.sr.platform.server.company.service.impl;
import com.sr.platform.common.utils.MD5Util;
import com.sr.platform.common.utils.StringUtil;
import com.sr.platform.server.company.bean.*;
import com.sr.platform.server.company.dao.ExcelDao;
import com.sr.platform.server.company.dao.IWxCompanyDao;
import com.sr.platform.server.company.dao.IWxCompanyStaffDao;
import com.sr.platform.server.company.service.IExcelService;
import com.sr.platform.server.company.util.MessageUtil;
import com.sr.platform.server.company.util.NewExcel;
import com.sr.platform.server.company.util.ReadExcel;
import com.sr.platform.server.customer.bean.EpLoc;
import com.sr.platform.server.customer.bean.WxLocPay;
import com.sr.platform.server.customer.bean.WxRole;
import com.sr.platform.server.customer.bean.WxStaff;
import com.sr.platform.server.customer.dao.IWxLocPayDao;
import com.sr.platform.server.customer.dao.IWxStaffDao;
import com.sr.platform.server.system.bean.EpAppSetting;
import com.sr.platform.server.system.dao.IWxBaseLocDao;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ExcelSeviceImpl implements IExcelService {
    @Autowired
    private PlatformTransactionManager transactionManager;
    @Autowired
    HttpServletRequest request;
    @Autowired
    HttpServletResponse response;
    @Autowired
    private ExcelDao excelDao;
    @Autowired
    private IWxCompanyDao wxCompanyDao;
    @Autowired
    private IWxCompanyStaffDao wxCompanyStaffDao;
    @Autowired
    private IWxLocPayDao wxLocPayDao;
    @Autowired
    private IWxBaseLocDao baseLocDao;
    @Autowired
    private IWxStaffDao wxStaffDao;
    ReadExcel readExcel;

    @Override
    public Map<String, Object> getPhoneCode(String phone) {
        Map<String, Object> reMap =new HashMap<>();
        try{
            //获取签名
            String id="AccessSign";
            List<EpAppSetting> listapp= baseLocDao.getconfig(id);
            if(listapp.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg","尚未设置短信签名");
                return reMap;
            }
            String AccessSign = listapp.get(0).getSetString();
            //获取模板
            id="AccessCode";
            listapp= baseLocDao.getconfig(id);
            if(listapp.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg","尚未设置短信模板");
                return reMap;
            }
            String AccessCode = listapp.get(0).getSetString();
            reMap = MessageUtil.getMemberCode(phone,AccessSign,AccessCode);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            return reMap;
        }
    }

    @Override
    public Map<String, Object> queryCollectTransfer(String locId, String companyId) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try{
            //转换企业编号
            List<EpLoc> locs = wxStaffDao.getEplocByLoc(locId);
            if(locs.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg", "获取门店信息失败");
                return reMap;
            }
            //查询企业信息
            Map<String, Object> sql=new HashMap();
            sql.put("locId",locs.get(0).getLocId());
            sql.put("companyId",companyId);
            List<Map<String,Object>> list = excelDao.queryRechargeTansfer(sql);
            reMap.put("list", list);
            reMap.put("total", list.size());
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            return reMap;
        }
    }

    @Override
    public Map<String, Object> checkReceipt(String id) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            //判断付款单是否存在
            List<WxReceipt> receipts = excelDao.getWxReceipt(id);
            if(receipts.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg", "付款单不存在");
                return reMap;
            }
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            return reMap;
        }
    }

    @Override
    public Map<String, Object> queryReceipt(String id,String refid) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            //充值单是否存在
            List<WxBatchrechargecollect> list = excelDao.queryRecharge(refid);
            if(list.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg", "充值单不存在");
                return reMap;
            }
            //判断付款单是否存在
            List<WxReceipt> receipts = excelDao.getWxReceipt(id);
            if(receipts.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg", "付款单不存在");
                return reMap;
            }
            reMap.put("status", 1);
            reMap.put("map", receipts.get(0));
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            return reMap;
        }
    }

    @Override
    public List<WxReceipt> getReceiptById(String id) {
        return excelDao.getWxReceipt(id);
    }

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> insertReceipt(Map<String, Object> map) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            //判断充值单是否存在
            String refbookingid = map.get("refbookingid").toString();
            List<WxBatchrechargecollect> list = excelDao.queryRecharge(refbookingid);
            if(list.size()==0){
                reMap.put("status", 0);
                reMap.put("Msg", "充值单不存在");
                return reMap;
            }
            //判断付款单是否存在
            String bookingid = map.get("bookingid").toString();
            List<WxReceipt> receipts = excelDao.getWxReceipt(bookingid);
            if(receipts.size()>0){
                reMap.put("status", 0);
                reMap.put("Msg", "付款单已经存在");
                return reMap;
            }
            receipts = excelDao.getWxReceipt(refbookingid);
            if(receipts.size()>0){
                reMap.put("status", 0);
                reMap.put("Msg", "付款单已经存在");
                return reMap;
            }
            excelDao.insertWxReceipt(map);
            //更新汇总单状态
            excelDao.updateRechargeMoney(refbookingid);
            reMap.put("status", 1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            return reMap;
        }
    }

    @Override
    public Map<String, Object> uploadObject(final MultipartFile mFile,final String userId, final String companyId) {
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        final Map<String, Object> reMap =new HashMap<>();
        template.execute(new TransactionCallback<Boolean>() {
            @Override
            public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try{
                    String mk = request.getServletContext().getRealPath(File.separator) + "upLoadExcel";//路径
                    String excelName=mFile.getOriginalFilename();//这个文件名
                    //判断项目下文件夹是否存在
                    File upLoadExcel = new File(mk);
                    if (!upLoadExcel.exists()) {
                        upLoadExcel.mkdir();
                    }
                    List<List<Object>> upExcellist = new LinkedList<List<Object>>();
                    //保存文件到项目目录下
                    mFile.transferTo(new File(mk + File.separator + excelName));
                    upExcellist=readExcel.readExcel(new File(mk + File.separator + excelName));
                    File file = new File(mk + File.separator + excelName);
                    file.delete();
                    //循环获取数据
                    List<Map<String, Object>> errorList=new ArrayList();//异常集合
                    List<Map<String, Object>> rightList=new ArrayList();//正确集合
                    List<Map<String, Object>> unexistList=new ArrayList<>(); //不存在的集合
                    List<WxCompanyStaff> staffInsert = new ArrayList<WxCompanyStaff>(); //带插入
                    List<String> memberIdList=new ArrayList();//已有的会员卡号
                    String excelCompanyId=""; //企业编号
                    String companyName="";   //企业名称
                    String memberId="";      //会员编号
                    String staffName="";     //员工姓名
                    String phone="";         //手机号
                    String money="";         //充值金额
                    for (int i =0;i<upExcellist.size();i++) {
                        List<Object> staffList = new ArrayList();
                        staffList = upExcellist.get(i);
                        switch (i){
                            case 0:
                                break;
                            case 1:
                                excelCompanyId= (String) staffList.get(3);
                                if(!companyId .equals("0") && !companyId .equals(excelCompanyId)){
                                    reMap.put("status", 0);
                                    reMap.put("Msg", "导入表格的单位编码与选择不符请核对");
                                    return false;
                                }
                                List<WxCompany> listcompany = wxCompanyDao.findCompany(companyId);
                                if(listcompany.size()==0){
                                    reMap.put("status", 0);
                                    reMap.put("Msg", "当前单位编码不存在");
                                    return false;
                                }
                                int status = listcompany.get(0).getStatus();
                                if(0==status){
                                    reMap.put("status", 0);
                                    reMap.put("Msg", "当前单位已经停用");
                                    return false;
                                }
                                companyName= listcompany.get(0).getCompanyName();
                                break;
                            case 2:
                                break;
                            default:
                                memberId=(String) staffList.get(0);
                                if (memberId==""){
                                    break;
                                }
                                memberIdList.add(memberId);
                                staffName=(String) staffList.get(1);
                                phone=(String) staffList.get(2);
                                money=(String) staffList.get(3);
                                if(StringUtil.isEmpty(money)){
                                    money="0";
                                }
                                Map<String, Object> memberMap= excelDao.getMemberNum(memberId);
                                if(memberMap==null){//会员表里面没有对应的会员卡号
                                    Map<String, Object> errorMap=new HashMap();
                                    errorMap.put("ref2",memberId);
                                    errorMap.put("staffName",staffName);
                                    errorMap.put("ref1",phone);
                                    errorMap.put("money",money);
                                    errorList.add(errorMap);
                                }else{
                                    //会员卡里面有对应的会员卡号
                                    List<WxCompanyStaff> staffMap=  wxCompanyStaffDao.findCompanyStaff(memberId);
                                    if(staffMap.size()==0){
                                        WxCompanyStaff staff = new WxCompanyStaff();
                                        staff.setCompanyId(excelCompanyId);
                                        staff.setCompanyName(companyName);
                                        staff.setCreateUserId(userId);
                                        staff.setLastUpdateUserId(userId);
                                        staff.setStaffName(staffName);
                                        staff.setRef1(phone);
                                        staff.setRef2(memberId);
                                        staff.setOpenId(memberMap.get("openId").toString());
                                        staff.setMemberId(memberMap.get("memberId").toString());
                                        staff.setMemberName(memberMap.get("memberName").toString());
                                        staffInsert.add(staff);
                                    }else{
                                        if(!staffMap.get(0).getCompanyId().equals(excelCompanyId)){
                                            reMap.put("status", 0);
                                            reMap.put("Msg", "导入会员已在其他家门店入职，查看填写信息是否正确！");
                                            return false;
                                        }
                                    }
                                    Map<String, Object> rightMap=new HashMap();
                                    rightMap.put("ref2",memberId);
                                    rightMap.put("memberId",memberMap.get("memberId").toString());
                                    rightMap.put("memberName",memberMap.get("memberName").toString());
                                    rightMap.put("staffName",staffName);
                                    rightMap.put("ref1",phone);
                                    Double before = Double.parseDouble(memberMap.get("balance").toString());
                                    Double after = before+Double.parseDouble(money);
                                    rightMap.put("before",String.format("%.2f", before));
                                    rightMap.put("money",money);
                                    rightMap.put("after",String.format("%.2f",after));
                                    rightMap.put("flag",1);
                                    rightList.add(rightMap);
                                }
                                break;
                        }
                    }
                    //补全空缺
                    /*Map<String, Object> unstaffdata = new HashMap();
                    unstaffdata.put("companyId",excelCompanyId);
                    unstaffdata.put("memberIdList",memberIdList);
                    unexistList=excelDao.selectStaffUnExist(unstaffdata);
                    rightList.addAll(unexistList);*/
                    //插入企业职工
                    if(staffInsert.size()>0){
                        excelDao.InsertStaffs(staffInsert);
                    }
                    reMap.put("errorList", errorList);
                    reMap.put("rightList",rightList);
                    reMap.put("companyId",excelCompanyId);
                    reMap.put("companyName",companyName);
                    reMap.put("status", 1);
                    return true;
                }catch (Exception e) {
                    reMap.put("status", 0);
                    reMap.put("Msg", "导入失败，请稍后重试");
                    transactionStatus.setRollbackOnly();
                    e.printStackTrace();
                    return false;
                }
            }
        });
        return  reMap;
    }
    //检查会员卡号
    @Override
    public Map<String,Object> checkMember(WxCompanyStaff staff){
        Map<String, Object> reMap =new HashMap<>();
        try {
            String code = staff.getRef2();
            Map<String, Object> memberMap= excelDao.getMemberNum(code);
            if(memberMap==null){//会员表里面没有对应的会员卡号
                reMap.put("status",0);
                reMap.put("Msg","未找到该会员卡信息");
                return reMap;
            }
            List<WxCompanyStaff> staffMap=  wxCompanyStaffDao.findCompanyStaff(code);
            if(staffMap.size()==0){
                staff.setOpenId(memberMap.get("openId").toString());
                staff.setMemberId(memberMap.get("memberId").toString());
                staff.setMemberName(memberMap.get("memberName").toString());
                staffMap.add(staff);
                excelDao.InsertStaffs(staffMap);
            }
            Map<String, Object> rightMap=new HashMap();
            String money=staff.getRef3();
            if(StringUtil.isEmpty(money)){
                money="0";
            }
            rightMap.put("ref2",memberMap.get("code").toString());
            rightMap.put("memberId",memberMap.get("memberId").toString());
            rightMap.put("memberName",memberMap.get("memberName").toString());
            rightMap.put("staffName",staff.getStaffName());
            rightMap.put("ref1", memberMap.get("phone").toString());
            Double before = Double.parseDouble(memberMap.get("balance").toString());
            Double after = before+Double.parseDouble(money);
            rightMap.put("before",String.format("%.2f", before));
            rightMap.put("money",money);
            rightMap.put("after",String.format("%.2f",after));
            rightMap.put("flag",1);
            reMap.put("status",1);
            reMap.put("staff",rightMap);
            reMap.put("Msg","保存成功");
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }
    //创建皮批量充值单号，获取企业信息
    @Override
    public Map<String,Object> createBooking(String locId){
        Map<String, Object> reMap =new HashMap<>();
        try {
            //拼接单号
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
            String  nowdate = formatter.format(new Date());
            Map<String, Object> data = new HashMap();
            String headtypes=locId+nowdate+'%';
            data.put("headtype",headtypes);
            Map<String, Object> mapresult=excelDao.findBookingId(data);
            String id = mapresult.get("bookingId").toString();
            Integer temp  = StringUtil.isNotEmpty(id)?Integer.parseInt(id)+1:1;
            String num =  String.format("%04d",temp);
            String bookingId =locId +nowdate +num;
            reMap.put("bookingId", bookingId);
            reMap.put("status", 1);
            //获取企业信息
            WxCompany company = new WxCompany();
            company.setLocId(locId);
            List<WxCompany> compays = wxCompanyDao.findCompanyAll(company);
            reMap.put("companys",compays);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }
    //查询批量充值汇总
    @Override
    public  List<WxBatchrechargecollect>  queryRechargeCollect(String locId, String startDate, String endDate){
        String startDates = startDate+" 00:00:00";
        String endDates = endDate+" 23:59:59";
        Map<String, Object> data = new HashMap();
        data.put("locId",locId);
        data.put("startDate",startDates);
        data.put("endDate",endDates);
        List<WxBatchrechargecollect> collectList=excelDao.queryRechargeCollect(data);
        return collectList;
    }

    @Override
    public Map<String, Object> queryReportCriteria(String staffid) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            //根据用户编号获取所属门店
            String locid= "";
            List<EpLoc> listloc = new ArrayList<>();
            if(!staffid.equals("9999")){
                List<WxStaff>  liststaff =  wxStaffDao.findStaff(staffid);
                if(liststaff.size()>0){
                    locid = liststaff.get(0).getLocId();
                }
                listloc = wxStaffDao.getEplocById(locid);
            }else{
                listloc = wxStaffDao.getEploc();
            }
            //获取门店信息
            reMap.put("locs",listloc);
            //获取单位信息
            List<WxCompany> companyList = wxCompanyDao.selectCompany();
            reMap.put("companys",companyList);
            reMap.put("status",1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String,Object> selectRechargeReport(String str, String startDate, String endDate) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            String startDates = startDate+" 00:00:00";
            String endDates = endDate+" 23:59:59";
            Map<String, Object> data = new HashMap();
            List<String> list = new ArrayList<>();
            String strs[] = str.split(",");
            list = Arrays.asList(strs);
            List< Map<String, Object>> collectList = new ArrayList<>();
            Map<String, Object> map  = null;
            List< Map<String, Object>> locList=excelDao.selectRechargeReportLoc(list,startDates,endDates);
            for (int i =0;i<locList.size();i++) {
                map = new HashMap<>();
                String locId= locList.get(i).get("locId").toString();
                map.put("locId",locId);
                map.put("locName",locList.get(i).get("locName"));
                List<WxBatchrechargecollect> items = excelDao.selectRechargeReport(list,locId,startDates,endDates);
                map.put("items",items);
                collectList.add(map);
            }
            reMap.put("collectList",collectList);
            reMap.put("status",1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    //发送响应流方法
    public void setResponseHeader(HttpServletResponse response, String fileName) {
        try {
            try {
                fileName = new String(fileName.getBytes(),"ISO8859-1");
            } catch (UnsupportedEncodingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            response.setContentType("application/octet-stream;charset=ISO8859-1");
            response.setHeader("Content-Disposition", "attachment;filename="+ fileName);
            response.addHeader("Pargam", "no-cache");
            response.addHeader("Cache-Control", "no-cache");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public Map<String, Object> selectRechargeReportExecl(String str, String startDate, String endDate) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            //excel标题
            String[] title = {"门店名称","单位名称","充值日期","收款金额","充值金额","溢充金额","充值人数","金额/人","操作人","审核人"};

            //excel文件名
             String fileName = "("+startDate+" - "+endDate+")单位充值一览"+System.currentTimeMillis()+".xls";

            //sheet名
            String sheetName = "单位充值一览";

            String startDates = startDate+" 00:00:00";
            String endDates = endDate+" 23:59:59";
            Map<String, Object> data = new HashMap();
            List<String> list = new ArrayList<>();
            String strs[] = str.split(",");
            list = Arrays.asList(strs);
            Map<String, Object> map  = null;
            List< Map<String, Object>> locList=excelDao.selectRechargeReportLoc(list,startDates,endDates);
            int k = 0;
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
            String [][] content = new String[1000][10];
            for (int i =0;i<locList.size();i++) {
                String locId= locList.get(i).get("locId").toString();
                List<WxBatchrechargecollect> items = excelDao.selectRechargeReport(list,locId,startDates,endDates);
                for (int j =0;j<items.size();j++) {
                    content[k] = new String[title.length];
                    DecimalFormat df = new DecimalFormat("0.00");//格式化小数
                    String every = df.format(items.get(j).getCollectMoney()/items.get(j).getSumStaff());//返回的是String类型
                    content[k][0] = locList.get(i).get("locName").toString();
                    content[k][1] = items.get(j).getCompanyName();
                    content[k][2] = dateFormater.format(items.get(j).getCheckDate());
                    content[k][3] = items.get(j).getCollectMoney().toString();
                    content[k][4] = items.get(j).getCheckMoney().toString();
                    content[k][5] = items.get(j).getRef2();
                    content[k][6] = items.get(j).getSumStaff().toString();
                    content[k][7] = every;
                    content[k][8] = items.get(j).getCreateUserId();
                    content[k][9] = items.get(j).getCheckUserId();
                    k ++;
                }
            }
            //创建HSSFWorkbook
            HSSFWorkbook wb = NewExcel.getHSSFWorkbook(sheetName, title, content, null);

            //响应到客户端
            this.setResponseHeader(response, fileName);
            OutputStream os = response.getOutputStream();
            wb.write(os);
            os.flush();
            os.close();
            reMap.put("status",1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String, Object> memberRechargeReport(String str1,String str2,String startDate,String endDate) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            String startDates = startDate+" 00:00:00";
            String endDates = endDate+" 23:59:59";
            List< Map<String, Object>> collectList= new ArrayList<>();
            if(str1.equals("")||str2.equals("")){
                collectList = excelDao.getMemberRechargeReport(startDates,endDates);
            }else {
                collectList = excelDao.getMemberRechargeReportSelect(str1,str2,startDates,endDates);
            }
            reMap.put("collectList",collectList);
            reMap.put("status",1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String, Object> memberRechargeReportExecl(String str1, String str2, String startDate, String endDate) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            //excel标题
            String[] title = {"会员卡号","会员姓名","充值日期","充值金额（元）","充值方式"};

            //excel文件名
            String fileName = "("+startDate+" - "+endDate+")个人充值统计"+System.currentTimeMillis()+".xls";

            //sheet名
            String sheetName = "个人充值统计";
            String startDates = startDate+" 00:00:00";
            String endDates = endDate+" 23:59:59";
            List< Map<String, Object>> collectList= new ArrayList<>();
            if(str1.equals("")||str2.equals("")){
                collectList = excelDao.getMemberRechargeReport(startDates,endDates);
            }else {
                collectList = excelDao.getMemberRechargeReportSelect(str1,str2,startDates,endDates);
            }
            SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
            String [][] content = new String[5000][5];
            for (int i =0;i<collectList.size();i++) {
                content[i] = new String[title.length];
                content[i][0] = collectList.get(i).get("code").toString();
                content[i][1] = collectList.get(i).get("memberName").toString();
                content[i][2] = dateFormater.format(collectList.get(i).get("createDate"));
                content[i][3] = collectList.get(i).get("actualMoney").toString();
                String type = collectList.get(i).get("ref3").toString();
                content[i][4] = type.equals("2")?"单位":"微信";
            }
            //创建HSSFWorkbook
            HSSFWorkbook wb = NewExcel.getHSSFWorkbook(sheetName, title, content, null);

            //响应到客户端
            this.setResponseHeader(response, fileName);
            OutputStream os = response.getOutputStream();
            wb.write(os);
            os.flush();
            os.close();
            reMap.put("status",1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public Map<String, Object> getRechargeReport(String id) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            Map<String, Object> data = new HashMap();
            data.put("bookingId",id);
            //展示订单汇总
            List<WxBatchrechargecollect> list = excelDao.queryRecharge(id);
            WxBatchrechargecollect collect = new WxBatchrechargecollect();
            if(list.size()>0){
                collect = list.get(0);
            }
            //展示订单明细
            List<WxBatchrechargedetail> detailList=excelDao.queryRechargeDetail(data);
            reMap.put("collect",collect);
            reMap.put("detail",detailList);
            reMap.put("status",1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    @Override
    public List<WxBatchrechargecollect> queryRecharge(String bookingId) {
        return excelDao.queryRecharge(bookingId);
    }

    //查询批量充值明细
    @Override
    public List<WxBatchrechargedetail> queryRechargeDetail(String bookingId){
        Map<String, Object> data = new HashMap();
        data.put("bookingId",bookingId);
        List<WxBatchrechargedetail> detailList=excelDao.queryRechargeDetail(data);
        return detailList;
    }

    //插入批量充值单
    @Override
    public Map<String,Object> InsertBatchRecharge(final Map<String, Object> saverecharge){
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        final Map<String, Object> reMap =new HashMap<>();
        try {
            template.execute(new TransactionCallback<Boolean>() {
                @Override
                public Boolean doInTransaction(TransactionStatus transactionStatus) {
                try{
                    //判断订单是否已经存在
                    String bookingId= (String) saverecharge.get("bookingId");
                    Map<String, Object> data = new HashMap();
                    data.put("bookingId",bookingId);
                    Map<String, Object> bookingMap=  excelDao.checkBooking(data);
                    if (bookingMap!=null) {
                        reMap.put("status",0);
                        reMap.put("Msg", "单号已存在请刷新后重试");
                        return true;
                    }
                    Integer bookingFlag= (Integer) saverecharge.get("bookingFlag");
                    String companyId= (String) saverecharge.get("companyId");
                    String companyName= (String) saverecharge.get("companyName");
                    Double collectMoney= Double.valueOf((String)saverecharge.get("collectMoney"));
                    Double sumStaff= Double.valueOf((String) saverecharge.get("sumStaff"));
                    String remark= (String) saverecharge.get("remark");
                    String ref1=(String)saverecharge.get("ref1");
                    String ref2 = saverecharge.get("ref2").toString();
                    String userId= (String) saverecharge.get("userId");
                    Map<String, Object> seclectdata = new HashMap();
                    seclectdata.put("bookingId", bookingId);
                    seclectdata.put("bookingFlag", bookingFlag);
                    seclectdata.put("companyId", companyId);
                    seclectdata.put("companyName", companyName);
                    seclectdata.put("collectMoney", collectMoney);
                    seclectdata.put("sumStaff", sumStaff);
                    seclectdata.put("remark", remark);
                    seclectdata.put("ref1",ref1);
                    seclectdata.put("ref2",ref2);
                    seclectdata.put("userId", userId);
                    excelDao.insertBatchrechargecollect(seclectdata);

                    List<Map<String,Object>> stuffArry= (List<Map<String, Object>>) saverecharge.get("stuffArry");
                    for (int i = 0; i < stuffArry.size(); i++) {
                        String phone = (String) stuffArry.get(i).get("ref1");
                        String code = (String) stuffArry.get(i).get("ref2");
                        String rechargeBefore = (String) stuffArry.get(i).get("before");
                        String rechargeAmount = (String) stuffArry.get(i).get("money");
                        String rechargeAfter = (String) stuffArry.get(i).get("after");
                        Map<String, Object> detaildata = new HashMap();
                        detaildata.put("bookingId", bookingId);
                        detaildata.put("companyId", companyId);
                        detaildata.put("sumStaff", sumStaff);
                        detaildata.put("remark", remark);
                        detaildata.put("userId", userId);
                        detaildata.put("ref1", phone);
                        detaildata.put("ref2", code);
                        detaildata.put("rechargeBefore", rechargeBefore);
                        detaildata.put("rechargeAmount", rechargeAmount);
                        detaildata.put("rechargeAfter", rechargeAfter);
                        excelDao.insertBatchrechargedetail(detaildata);
                    }
                    reMap.put("status", 1);
                    return true;
                }catch (Exception e) {
                    reMap.put("status", 0);
                    reMap.put("Msg", "网络出走，请稍后重试");
                    transactionStatus.setRollbackOnly();
                    e.printStackTrace();
                    return false;
                }
                }
            });
            return reMap;
        }catch (Exception e) {
            reMap.put("status",0);
            reMap.put("Msg", "网络超时，请稍后重试");
            return reMap;
        }
    }

    //更新批量充值单并批量更新会员积分
    @Override
   public Map<String,Object> checkBatchRecharge(final Map<String, Object> data){
        final Map<String, Object> reMap =new HashMap<>();
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        try {
            template.execute(new TransactionCallback<Boolean>() {
                @Override
                public Boolean doInTransaction(TransactionStatus transactionStatus) {
                    try{
                        //判断是否支付密码是否正确
                        String locid = (String) data.get("locId");
                        List<WxLocPay> listloc = wxLocPayDao.findLocPay(locid);
                        if(listloc.size()==0){
                            reMap.put("status",0);
                            reMap.put("Msg", "尚未设置支付密码请先设置");
                            return true;
                        }
                        String password = (String) data.get("password");
                        password = MD5Util.getMD5(password);
                        if(!password.equals(listloc.get(0).getPassword())){
                            reMap.put("status", 0);
                            reMap.put("Msg", "支付密码错误");
                            return true;
                        }
                        String bookingId= (String) data.get("bookingId");
                        String userId= (String) data.get("userId");
                        Integer bookingFlag=1;
                        Double checkMoney= Double.valueOf((String)data.get("checkMoney"));
                        Double collectMoney= Double.valueOf((String)data.get("collectMoney"));
                        List<Map<String,Object>> rechangedata= (List<Map<String, Object>>) data.get("rechangedata");
                        Map<String, Object> seclectdata = new HashMap();
                        seclectdata.put("bookingId",bookingId);
                        seclectdata.put("userId",userId);
                        seclectdata.put("checkMoney",checkMoney);
                        seclectdata.put("bookingFlag",bookingFlag);
                        excelDao.checkBatchRechargeCollect(seclectdata);
                        //生成充值流水
                        excelDao.insertChangeIntegration(seclectdata);
                        //更新会员余额
                        excelDao.updateBatchMember(seclectdata);
                        reMap.put("status", 1);
                        return true;
                    }catch (Exception e) {
                        reMap.put("status", 0);
                        reMap.put("Msg", "系统繁忙,稍后重试");
                        transactionStatus.setRollbackOnly();
                        e.printStackTrace();
                        return false;
                    }
                }
            });
            return reMap;
        }catch (Exception e){
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            reMap.put("error", e.toString());
            e.printStackTrace();
            return reMap;
        }
    }

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public Map<String, Object> updateBatchRecharge(Map<String, Object> data) {
        Map<String, Object> reMap =new HashMap<>();
        try {
            String bookingId= (String) data.get("bookingId");
            String userId= (String) data.get("userId");
            Double ref2= Double.valueOf((String)data.get("ref2"));
            Double collectMoney= Double.valueOf((String)data.get("collectMoney"));
            List<Map<String,Object>> rechangedata= (List<Map<String, Object>>) data.get("rechangedata");
            Map<String, Object> seclectdata = new HashMap();
            seclectdata.put("bookingId",bookingId);
            seclectdata.put("userId",userId);
            seclectdata.put("collectMoney",collectMoney);
            seclectdata.put("ref2",ref2);
            excelDao.updateBatchRechargeCollect(seclectdata);
            for (int i = 0; i < rechangedata.size(); i++) {
                String memberId = (String) rechangedata.get(i).get("memberId");
                String rechargeAmount = rechangedata.get(i).get("rechargeAmount").toString();
                Map<String, Object> detaildata = new HashMap();
                detaildata.put("bookingId", bookingId);
                detaildata.put("userId", userId);
                detaildata.put("ref2", memberId);
                detaildata.put("rechargeAmount", rechargeAmount);
                excelDao.updateBatchRechargeDetail(detaildata);
            }
            reMap.put("status",1);
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }

    public  Map<String,Object> invalidRecharge(final String bookingId,final String status,final String userId){
        final Map<String, Object> reMap =new HashMap<>();
        TransactionTemplate template = new TransactionTemplate(transactionManager);
        try {
            template.execute(new TransactionCallback<Boolean>() {
                @Override
                public Boolean doInTransaction(TransactionStatus transactionStatus) {
                    try{
                        Map<String, Object> data = new HashMap();
                        data.put("bookingId",bookingId);
                        data.put("status",status);
                        data.put("userId",userId);
                        excelDao.invalidRecharge(data);
                        reMap.put("status", 1);
                        return true;
                    }catch (Exception e) {
                        transactionStatus.setRollbackOnly();
                        e.printStackTrace();
                        reMap.put("status", 0);
                        reMap.put("Msg", "系统繁忙,稍后重试");
                        return false;
                    }
                }
            });
            return reMap;
        }catch (Exception e) {
            reMap.put("status", 0);
            reMap.put("Msg", "系统繁忙,稍后重试");
            e.printStackTrace();
            return reMap;
        }
    }
}
