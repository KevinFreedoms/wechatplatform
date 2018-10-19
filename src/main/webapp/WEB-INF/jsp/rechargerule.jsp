<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>微会员管理平台-充值规则</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/vipcenter.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content bodycont">
        <label class="labeltag defaultLabel">活动类型：</label>
        <ul class="yhmenu">
            <li class="active">
                <input type="radio" id="active0" name="filterdata" class="check" checked data-id='0'>
                <label for="active0" data-id='0'>全部</label>
            </li>
            <li>
                <input type="radio" id="active1" name="filterdata" class="check" data-id='1'>
                <label for="active1" data-id='1'>赠送金额</label>
            </li>
            <li class="lastchid">
                <input type="radio" id="active2" name="filterdata" class="check" data-id='2'>
                <label for="active2" data-id='2'>赠送优惠券</label>
            </li>
        </ul>
        <div class="clearfloat"></div>
        <div class="rechargetb">
            <button class="btn btn-primary addcoupon" onclick="addrule()"><i class="icon-plus"></i>新增</button>
            <table id="rechargeTab" class="operateyhq">
            </table>
        </div>
    </div>
    <!--jquery-->
    <script src="<%=basePath%>js/jquery-1.8.3.min.js"></script>
    <!--bootstrap-->
    <script src="<%=basePath%>js/bootstrap/bootstrap.min.js"></script>
    <script src="<%=basePath%>js/bootstrap/jquery.dcjqaccordion.2.7.min.js"></script>
    <script src="<%=basePath%>js/bootstrap/jquery.scrollTo.min.js"></script>
    <script src="<%=basePath%>js/bootstrap/jquery.nicescroll.js"></script>
    <script src="<%=basePath%>js/jquery.cookie.js"></script>
    <!--base64 -->
    <script type="text/javascript" src="<%=basePath%>js/base64/base64.js"></script>
    <!--bootstrap table-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table-zh-CN.min.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <!-- 打印 -->
    <script type="text/javascript" src="<%=basePath%>js/jQuery.print.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/recharge/recharge.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            initRule();
        });
    </script>
</body>
</html>
