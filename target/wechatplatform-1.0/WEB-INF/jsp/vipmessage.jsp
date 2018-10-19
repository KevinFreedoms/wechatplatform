<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>会员信息查询</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap -->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <!--bootstrap table-->
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-select.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" media="all" href="<%=basePath%>js/dbcalendar/daterangepicker-bs3.css">
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/vipcenter.css" rel="stylesheet" type="text/css" />
</head>
<body>

<div class="content">
    <div class="headcont" style="background-color: #fff;">
        <div class="chosedata">
            <label>日期筛选：</label>
            <input type="text" readonly="" name="reservation" id="reservation" class="reservation datainput" value="">
            <i class="icon-calendar"></i>
        </div>
        <ul class="yhmenu">
            <li class="active">
                <input type="radio" id="filterdata0" name="filterdata" class="check" >
                <label for="filterdata0" data-id="0"  onclick="filterTime(this)">本日</label>
            </li>
            <li>
                <input type="radio" id="filterdata1" name="filterdata" class="check">
                <label for="filterdata1" data-id="1"  onclick="filterTime(this)">本周</label>
            </li>
            <li class="lastchid">
                <input type="radio" id="filterdata2" name="filterdata" class="check">
                <label for="filterdata2" data-id="2"  onclick="filterTime(this)">本月</label>
            </li>
        </ul>
        <div class="clearfloat"></div>
    </div>
    <div class="cutarea"></div>
    <div class="recordtb">
    <table id="vipmessageTab">
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
<!--bootstrap table-->
<script src="<%=basePath%>js/bootstrap/bootstrap-table.min.js"></script>
<script src="<%=basePath%>js/bootstrap/bootstrap-table-zh-CN.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/dbcalendar/moment.js"></script>
<script type="text/javascript" src="<%=basePath%>js/dbcalendar/daterangepicker.js"></script>
<!--bootstrap dialog-->
<script src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
<script src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
<script src="<%=basePath%>js\page\member\time\time.js"></script>
<script>
    document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
    document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/member/vipmessage.js?"+Math.random()+"'></scr"+"ipt>");
</script>
<script>
    $(function () {
        basePath = "<%=basePath%>";
        init()
    })
</script>
</body>
</html>
