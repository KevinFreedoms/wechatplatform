<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>微会员管理平台-主页</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
</head>
<style>
    *, .userinput:before, *:after{
        box-sizing:inherit;
    }
</style>
<body>
    <header class="header white-bg">
        <div class="headleft">
            <img src="<%=basePath%>images/logo.png" />
            <div class="systemTitle">
                <div class="headtitle">微会员管理平台</div>
                <div class="engtitle">WeChat  platform</div>
            </div>
            <div class="clearfloat"></div>
        </div>
        <div class="navigation">
            <ol class="breadcrumb" id="breadnav">
                <li><i class="icon-dashboard"></i>首页</li>
            </ol>
        </div>
        <div class="headright">
            <ul class="pull-right">
                <li><a>欢迎您！<span class="sysusername">商软后台维护</span></a></li>
                <li class="returnlogin"><i class="icon-off"></i></li>
            </ul>
        </div>
    </header>
    <aside>
        <div id="sidebar"  class="nav-collapse">
            <!-- sidebar menu start-->
            <ul class="sidebar-menu" id="nav-accordion">
                <li class="sub-menu" class="current">
                    <a class="active">
                        <i class=" icon-gears (alias)"></i>
                        <span>基础信息设置</span>
                    </a>
                    <ul class="sub">
                        <li src="<%=basePath%>platform/system/loc" class="current"><a>站点维护</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </aside>
    <section id="main-content">
        <section class="wrapper">
            <!--<iframe width="100%" height="100px" frameborder="0" scrolling="yes" src="#"></iframe> -->
        </section>
    </section>
    <div id="mask" class="display"></div>
    <div class="modal fade" id="loading" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="spinner">
                        <div class="rect1"></div>
                        <div class="rect2"></div>
                        <div class="rect3"></div>
                        <div class="rect4"></div>
                        <div class="rect5"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--jquery-->
    <script type="text/javascript" src="<%=basePath%>js/jquery-1.11.1.min.js"></script>
    <!--bootstrap-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/jquery.dcjqaccordion.2.7.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/jquery.scrollTo.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/jquery.nicescroll.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/jquery.cookie.js"></script>
    <!--base64 -->
    <script type="text/javascript" src="<%=basePath%>js/base64/base64.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            isSystem = true;
            // JavaScript Document
            var headheigh =$(window).height() //高度
            var ifreamheigh=parseInt(headheigh-60);
            var strHtml = '<iframe width="100%" height="'+ifreamheigh+'px" frameborder="0" scrolling="yes" src="'+basePath+'platform/system/loc"></iframe>';
            $(".wrapper").html(strHtml)
        });
    </script>
</body>
</html>
