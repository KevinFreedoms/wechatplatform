<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>微会员管理平台-批量充值单</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/companyManage.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="rechargeHead">
        <div class="backpage"><a class="backpage" href="<%=basePath%>platform/recharge/m">返回</a></div>
        <p class="rechargeOrder">单号：<span id="bookingid">${bookingId}</span></p>
        <p class="chosecompany">
            <label class="defaultLabel">选择单位:</label>
            <select id="selectCompany" onchange="companyChange()">
                <c:if test="${companys!=null && fn:length(companys)>0}">
                    <c:forEach var="company" items="${companys}">
                         <option data-id="${company.companyId}">${company.companyName}</option>
                    </c:forEach>
                </c:if>
                 <c:if test="${companys==null || fn:length(companys)==0}">
                     <option data-id="0">请选择..</option>
                 </c:if>
            </select>
        </p>
        <p>
            <label class="defaultLabel" >备注：</label>
            <input type="text" id="remark"/>
            <%--<button class="btn btn-primary importexcel" onclick="importexcel()"><i class="icon-plus"></i>导入Excel</button>--%>
            <button  type="button" class="btn btn-primary importexcel" ><i class="icon-plus"></i>导入Excel</button>
            <input  type="file" id="mFile" name="mFile" style="display: none" onchange="toFileLoad()"/>
        </p>
    </div>
    <div class="rechargecontent">
        <div class="withoutquery"><i class="icon-info-sign"></i>请导入数据</div>
        <div class="querycontent display">
            <div class="importToolip">
                <div class="seccessInfo">
                    <a class="closetoolip icon-remove" onclick="closetoolip()"></a>
                    <p><img src="<%=basePath%>images/success.png" />导入成功</p>
                    <p class="importInfo">
                        <span>已导入会员：<span class="successNumber" id="successNum"></span>条</span>
                        <span>错误数据：<span class="errorNumber" id="errorNum"></span>条</span>
                    </p>
                </div>
            </div>
            <div class="errorcontent" id="errorcontent">
                <p>请修改以下错误数据</p>
                <table id="errortable">
                </table>
            </div>
            <div class="correctcontent">
                <div class="batchModify display">
                    <p class="closebatch" onclick="hidebatchrecharge()"><a class="icon-remove"></a></p>
                    <p class="alerdychose"><span>已选<a id="alreadyCheck">20</a>项</span></p>
                    <p>
                        <span>批量修改金额</span>
                        <input type="text" id="batchMoney" placeholder="请输入金额" onkeyup="num(this)" onblur="changeinput(this)"/>
                        <a onclick="batchinput()">确认</a>
                    </p>
                    </ul>
                    <div class="clearfloat"></div>
                </div>
                <table id="viptable">
                </table>
                <div class="sureorder">
                    <h4>确认订单</h4>
                    <p>
                        <label class="defaultLabel">本次充值人数</label>
                        <span class="importantMessage" id="peopleNum"></span><span>人</span>
                    </p>
                    <p>
                        <label class="defaultLabel">本次充值金额</label>
                        <span class="importantMessage" id="moneySum"></span><span>元</span>
                    </p>
                    <p>
                        <label class="defaultLabel">本次优惠金额</label>
                        <input type="text" onblur="changyhmoney(this)" id="yhmoney" onkeyup="num(this)" onblur="changyhmoney(this)"/>
                        <span style="font-size:16px;">（应收：<span class="oughtmoney"></span>元）</span>
                    </p>
                </div>
                <button class="btn btn-primary sureSave" onclick="saveorder()">确认保存</button>
            </div>
        </div>
    </div>
    <!--jquery-->
    <script type="text/javascript" src="<%=basePath%>js/jquery-1.8.3.min.js"></script>
    <!--bootstrap-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/jquery.dcjqaccordion.2.7.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/jquery.scrollTo.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/jquery.nicescroll.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/jquery.cookie.js"></script>
    <!--base64 -->
    <script type="text/javascript" src="<%=basePath%>js/base64/base64.js"></script>
    <!--bootstrap table-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table-zh-CN.min.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <%--表格上传--%>
    <script type="text/javascript" src="<%=basePath%>js/page/ajaxFileUpload.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/company/addrechargeOrder.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script>
        $(function () {
            basePath = "<%=basePath%>";
            init();
        });
    </script>
</body>
</html>
