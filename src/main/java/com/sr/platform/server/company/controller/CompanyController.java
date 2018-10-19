package com.sr.platform.server.company.controller;

import com.sr.platform.server.company.bean.WxCompany;
import com.sr.platform.server.company.bean.WxCompanyStaff;
import com.sr.platform.server.company.service.ICompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import  com.sr.platform.server.company.util.NewExcel;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xxx on 2018/3/31.
 */
@RestController
public class CompanyController {
    @Autowired
    HttpServletRequest request;

    @Autowired
    private ICompanyService companyService;

    /**
     * 获取所有单位信息
     * @return
     */
    @RequestMapping(value = "/platform/company/all",method = RequestMethod.GET)
    @ResponseBody
    public List<WxCompany> getCompanyAll(@RequestParam String id){
        return companyService.getCompanyAll(id);
    }

    /**
     * 获取公司信息
     * @return
     */
    @RequestMapping(value = "/platform/company/transfer",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getCompanyTransfer(@RequestParam String id){
        return companyService.getCompanyTransfer(id);
    }

    /**
     * 进入公司新增
     * @return
     */
    @RequestMapping(value = "/platform/company/new",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getNewCompany(){
        return companyService.getNewCompany();
    }

    /**
     * 获取公司信息
     * @return
     */
    @RequestMapping(value = "/platform/company/get",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getCompany(@RequestParam String id){
        return companyService.getCompany(id);
    }

    /**
     * 更新企业信息
     * @return
     */
    @RequestMapping(value = "/platform/company/update",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateCompany(@RequestBody WxCompany company){
        return companyService.updateCompany(company);
    }

    /**
     * 获取公司信息
     * @return
     */
    @RequestMapping(value = "/platform/company/execl",method = RequestMethod.GET)
    @ResponseBody
    public void execlDownload(HttpServletResponse res, @RequestParam String companyId, @RequestParam String companyName){
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


    /**
     * 获取企业下的员工所有
     * @param id
     * @return
     */
    @RequestMapping(value = "/platform/companystaff/all",method = RequestMethod.GET)
    @ResponseBody
    public List<WxCompanyStaff> getCompanyStaffAll(@RequestParam String id){
        return companyService.getCompanyStaffAll(id);
    }

    /**
     * 获取企业下的员工
     * @param id
     * @return
     */
    @RequestMapping(value = "/platform/companystaff/get",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> getCompanyStaff(@RequestParam String id){
        return companyService.getCompanyStaff(id);
    }

    /**
     * 检索会员卡
     * @param id
     * @return
     */
    @RequestMapping(value = "/platform/companystaff/check",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,Object> checkCompanyStaff(@RequestParam String id,@RequestParam String companyid,@RequestParam int flag){
        return companyService.checkCompanyStaff(id,companyid,flag);
    }

    /**
     * 更新企业员工信息
     * @return
     */
    @RequestMapping(value = "/platform/companystaff/update",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updateCompanyStaff(@RequestBody WxCompanyStaff staff){
        return companyService.updateComanyStaff(staff);
    }

    /**
     *删除企业员工信息
     * @return
     */
    @RequestMapping(value = "/platform/companystaff/delete",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> deleteCompanyStaff(@RequestParam String id){
        return companyService.deleteComanyStaff(id);
    }



}
