<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>微会员管理平台-生日活动</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content specialcont">
        <div class="filter headcont">
            <div style="margin-bottom:10px;">
                <label class="defaultLabel">活动类型：</label>
                <label class="demonlabel">
                    <input class="beautycheckbox" type="checkbox" id="duobei">
                    <span class="democheckbox checkInput"></span>消费送多倍积分
                </label>
                <label class="demonlabel">
                    <input class="beautycheckbox" type="checkbox" id="birth">
                    <span class="democheckbox checkInput"></span>赠送生日优惠券
                </label>
                <label class="demonlabel">
                    <input class="beautycheckbox" type="checkbox" id="zhekou">
                    <span class="democheckbox checkInput"></span>整单折扣
                </label>
                <div class="clearfloat"></div>
            </div>
            <div>
                <label class="defaultLabel">是否启用：</label>
                <label class="demonlabel">
                    <input class="beautycheckbox" type="checkbox" id="useReady">
                    <span class="democheckbox checkInput"></span>启用
                </label>
                <label class="demonlabel">
                    <input class="beautycheckbox" type="checkbox" id="noUse">
                    <span class="democheckbox checkInput"></span>未启用
                </label>
                <div class="clearfloat"></div>
            </div>
        </div>
        <div class="cutarea"></div>
        <div class="bodycont">
            <button class="btn btn-primary addcoupon" onclick="addactive()"><i class="icon-plus"></i>新增</button>
            <table id="birthdayTab" class="table">
            </table>
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
    <!--base64 -->
    <script type="text/javascript" src="<%=basePath%>js/base64/base64.js"></script>
    <!--bootstrap table-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table-zh-CN.min.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/activity/birthactivity.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            initBirth();
        });
    </script>
</body>
</html>
