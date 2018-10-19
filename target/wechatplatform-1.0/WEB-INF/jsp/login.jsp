<%--
  Created by IntelliJ IDEA.
  User: xxx
  Date: 2018/3/25
  Time: 14:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>微会员管理平台-登录</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192"/>
    <!--bootstrap -->
   <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <style>
        *, *:before, *:after{
            box-sizing:inherit;
        }
    </style>
</head>
<body>
    <div class="loginbg">
        <img src="<%=basePath%>images/bg_l.png" class="decorateimg"/>
        <div class="userinput">
            <input type="text" class="username formcontral" id="user_id" placeholder="用户名"/>
            <input type="password" class="formcontral" id="user_password" placeholder="密码"/>
            <input type="checkbox" class="remeberpass" /><span class="remebecont">记住密码</span>
            <button class="btn btn-block loginbtn">登陆</button>
        </div>
        <div class="line"><img src="<%=basePath%>images/line.png" /></div>
        <div class="systemNmae">
            天津市商软信息开发系统有限公司<br />
            TIANJIN  BUSINESSSOFT  CO.,  LTD.
        </div>
    </div>
    <script type="text/javascript" src="<%=basePath%>js/jquery-1.8.3.min.js"></script>
    <!--bootstrap-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap.min.js"></script>
    <!-- cookie -->
    <script type="text/javascript" src="<%=basePath%>js/jquery.cookie.js"></script>
    <!--base64 -->
    <script type="text/javascript" src="<%=basePath%>js/base64/base64.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/login/login.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            pushHistory();
            window.addEventListener("popstate", function(e) {
                pushHistory();
            }, false);
            function pushHistory() {
                var url = basePath+"platform";
                var state = {
                    title: "title",
                    url: url
                };
                window.history.pushState(state, "title", url);
            }
        });
    </script>
</body>
</html>
