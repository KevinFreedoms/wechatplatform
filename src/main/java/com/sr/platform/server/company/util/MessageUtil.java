package com.sr.platform.server.company.util;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.sr.platform.common.utils.StringUtil;
import com.sr.platform.server.coupon.util.MysqlBatchUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class MessageUtil {
    //产品名称:云通信短信API产品,开发者无需替换
    static final String product = "Dysmsapi";
    //产品域名,开发者无需替换
    static final String domain = "dysmsapi.aliyuncs.com";

    /**
     *
     * @param number 手机号
     * @param sign 签名
     * @param templatecode 模板
     * @return
     */
    public static Map<String, Object> getMemberCode(String number,String sign,String templatecode) {
        Map<String,Object> reMap = new HashMap<String, Object>();
        try {

            Properties p=new Properties();
            p.load(MessageUtil.class.getClassLoader().getResourceAsStream("application.properties"));

            String accessKeyId=p.getProperty("accessKeyId");
            String accessKeySecret=p.getProperty("accessKeySecret");
            //可自助调整超时时间
            System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
            System.setProperty("sun.net.client.defaultReadTimeout", "10000");

            //初始化acsClient,暂不支持region化
            IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
            DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
            IAcsClient acsClient = new DefaultAcsClient(profile);

            //组装请求对象-具体描述见控制台-文档部分内容
            SendSmsRequest request = new SendSmsRequest();
            //必填:待发送手机号
            request.setPhoneNumbers(number);
            //必填:短信签名-可在短信控制台中找到
            request.setSignName(sign);
            //必填:短信模板-可在短信控制台中找到
            request.setTemplateCode(templatecode);
            //可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
            int mobile_code = (int)((Math.random()*9+1)*100000);
            request.setTemplateParam("{\"code\":\""+mobile_code+"\"}");
            SendSmsResponse sendSmsResponse = acsClient.getAcsResponse(request);
            String messagecode = sendSmsResponse.getCode();
            if(StringUtil.isNotEmpty(messagecode)) {
                if(messagecode.equals("OK")){
                    reMap.put("status", 1);
                    reMap.put("mobile_code", mobile_code);
                }else if(messagecode.equals("isv.BUSINESS_LIMIT_CONTROL")){
                    reMap.put("status", 0);
                    reMap.put("Msg", "发送频繁 请稍后重试！");
                }else if(messagecode.equals("isv.MOBILE_NUMBER_ILLEGAL")){
                    reMap.put("status", 0);
                    reMap.put("Msg", "手机号格式错误！");
                }else if(messagecode.equals("isv.OUT_OF_SERVICE")){
                    reMap.put("status", 0);
                    reMap.put("Msg", "短信业务已经暂停");
                }
            }else{
                reMap.put("status", 0);
                reMap.put("Msg", "网络超时~请稍后重试");
            }
            return reMap;
        } catch (Exception e) {
            e.printStackTrace();
            reMap.put("success", false);
            reMap.put("info", "网络超时~请稍后重试");
            return reMap;
        }
    }

}
