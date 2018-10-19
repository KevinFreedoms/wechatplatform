<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>微会员管理平台-登录密码</title>
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/systemSet.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content bodycont">
        <div id="passwordFrom">
            <div class="form-group">
                <div class="col-md-1">
                    <label class="defaultLabel">原始密码</label>
                </div>
                <div class="col-md-11">
                    <input type="password" name="oldpassword">
                    <span class="errortoolip display">原始密码输入错误！</span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="form-group">
                <div class="col-md-1">
                    <label class="defaultLabel">新密码</label>
                </div>
                <div class="col-md-11">
                    <input type="password" name="newpassword">
                    <span class="errortoolip display"></span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="form-group">
                <div class="col-md-1">
                    <label class="defaultLabel">确认新密码</label>
                </div>
                <div class="col-md-11">
                    <input type="password" name="replaypassword">
                    <span class="errortoolip display">两次输入密码不一致！</span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="passwordbtn"><button class="btn btn-primary btn_modifypassword">确认</button></div>
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
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/login/login.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            contentheight();
        });
    </script>
</body>
</html>
