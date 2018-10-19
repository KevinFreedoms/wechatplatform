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
<body>
    <div class="content specialcont">
        <div class="storecont bodycont">
            <button class="btn btn-danger deletebtn display" onclick="batchremove()">删除</button>
            <button class="btn btn-primary addcoupon" onClick="addstore()">
                <i class="icon-plus"></i>新增
            </button>
            <div class="functioncount">
                <span class="count">合计数：</span>
                <span>扫码点餐：<span id="countscan"></span></span>
                <span>会员系统：<span id="countmember"></span></span>
                <span>外卖点餐：<span id="countdelivery"></span></span>
                <span class="remark">*合计数为全部“启用”状态的门店下本功能模块“有”的数量</span>
            </div>
            <table id="storeList">
            </table>
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
        });
    </script>
</body>
</html>
