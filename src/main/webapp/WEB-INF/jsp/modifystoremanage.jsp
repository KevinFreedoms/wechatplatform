<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>微会员管理平台-系统管理</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--calendar-->
    <link href="<%=basePath%>js/dbcalendar/daterangepicker-bs3.css" rel="stylesheet" type="text/css"/>
    <!--bootstrap select-->
    <link href="<%=basePath%>css/bootstrap-select.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/storeManage.css" rel="stylesheet" type="text/css" />
    <style>
        #allmap{height:500px;width:100%;}
        #r-result{width:100%; font-size:14px;}
    </style>
</head>

<body>
<div class="content">
    <div class="functionTitle">
        <h4>编码门店</h4>
        <a href="<%=basePath%>platform/system/loc">返回</a>
        <div class="clearfloat"></div>
    </div>
    <div class="bodycont addcouponpage">
        <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>门店编码：</label></div>
        <div class="col-md-11 rightcont">
            <label for="id_select"></label>
            <select id="id_select" class="selectpicker" data-live-search="true">
                <c:if test="${locs!=null && fn:length(locs)>0}">
                    <c:forEach var="temp" items="${locs}">
                        <option data-id="${temp.orgName}" data-phone="${temp.contractWay}">${temp.orgId}</option>
                    </c:forEach>
                </c:if>
                <c:if test="${locs==null || fn:length(locs)==0}">
                    <option data-id="">请选择..</option>
                </c:if>
            </select>
        </div>
        <div class="clearfloat"></div>
        <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>门店名称：</label></div>
        <div class="col-md-11 rightcont">
            <input type="text" value="" class="storename" name="locName" disabled/>
        </div>
        <div class="clearfloat"></div>
        <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>原门店编码：</label></div>
        <div class="col-md-11 rightcont">
            <input type="text" value="" class="prevstoreId" name="orgId" disabled/>
        </div>
        <div class="clearfloat"></div>
        <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>启用日期：</label></div>
        <div class="col-md-11 rightcont storedata">
            <input type="text" name="startDate" class="usestart" value="" readonly />
            <i class="icon-calendar"></i>
        </div>
        <div class="clearfloat"></div>
        <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>停用日期：</label></div>
        <div class="col-md-11 rightcont storedata">
            <input type="text"  name="endDate" class="usestart" value="" readonly/>
            <i class="icon-calendar"></i>
        </div>
        <div class="clearfloat"></div>
        <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>启用状态：</label></div>
        <div class="col-md-11 rightcont">
            <label class="radiobeuty">
                <input class="defaultradio" type="radio" name="status" data-id="1" id="raUsing">
                <span class="radioInput"></span>是
            </label>
            <label class="radiobeuty">
                <input class="defaultradio" type="radio" name="status" data-id="0" id="raUnUsing" `     >
                <span class="radioInput"></span>否
            </label>
        </div>
        <div class="clearfloat"></div>
        <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>选择功能：</label></div>
        <div class="col-md-11 rightcont">
            <label class="demonlabel">
                <input class="beautycheckbox allchose" type="checkbox" name="isScan">
                <span class="democheckbox checkInput"></span>扫码点餐
            </label>
            <label class="demonlabel">
                <input class="beautycheckbox" type="checkbox" name="isMember">
                <span class="democheckbox checkInput"></span>会员系统
            </label>
            <label class="demonlabel">
                <input class="beautycheckbox" type="checkbox" name="isDelivery">
                <span class="democheckbox checkInput"></span>外卖点餐
            </label>
        </div>
        <div class="clearfloat"></div>
        <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>地址：</label></div>
        <div class="col-md-11 rightcont">
            <form class="form-inline  pull-left">
                <div data-toggle="distpicker" id="distpicker">
                    <div class="form-group">
                        <label class="sr-only" for="province2">Province</label>
                        <select class="form-control" id="province2" data-province="选择省"></select>
                    </div>
                    <div class="form-group display">
                        <label class="sr-only" for="city2">City</label>
                        <select class="form-control" id="city2" data-city="选择市"></select>
                    </div>
                    <div class="form-group display">
                        <label class="sr-only" for="district2">District</label>
                        <select class="form-control" id="district2" data-district="选择区"></select>
                    </div>
                    <input type="text" id="detailAdrss" placeholder="请输入详细地址" style="width: 220px;">
                </div>
            </form>
            <button class="btn btn-default pull_left" onclick="searchmark()">搜索标注</button>
        </div>
        <div class="clearfloat"></div>
        <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>定位：</label></div>
        <div class="col-md-11 rightcont">
            <div id="allmap"></div>
        </div>
        <div class="clearfloat"></div>
    </div>
    <div class="surebtn">
        <button class="btn btn-primary" onclick="updateData()">保存</button>
        <button class="btn btn-default" onclick="back()">取消</button>
    </div>
</div>
<<!--jquery-->
<script type="text/javascript" src="<%=basePath%>js/jquery-1.8.3.min.js"></script>
<!--bootstrap-->
<script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/bootstrap/jquery.dcjqaccordion.2.7.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/bootstrap/jquery.scrollTo.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/bootstrap/jquery.nicescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>js/jquery.cookie.js"></script>
<!--base64 -->
<script type="text/javascript" src="<%=basePath%>js/base64/base64.js"></script>
<!--calendar-->
<script type="text/javascript" src="<%=basePath%>js/dbcalendar/moment.js"></script>
<script type="text/javascript" src="<%=basePath%>js/dbcalendar/daterangepicker.js"></script>
<!--bootstrap table-->
<script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table-zh-CN.min.js"></script>
<!--bootstrap select-->
<script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-select.js"></script>
<!--bootstrap dialog-->
<script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
<script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
<!-- Baidu -->
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=7fa1747a87fa5af93798df9a60e5517a"></script>
<script type="text/javascript" src="<%=basePath%>js/page/city.js"></script>
<script type="text/javascript" src="<%=basePath%>js/page/distpicker.js"></script>
<!--page-->
<script>
    document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
    document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/system/storeManage.js?"+Math.random()+"'></scr"+"ipt>");
</script>
<script type="text/javascript" >
    var map = new BMap.Map("allmap");
    var province=''//省
    var city=''//
    var locinfo= ${loc};
    var baselocinfo= ${baseLoc};
    $(function () {
        basePath = "<%=basePath%>";
        initModifyInfo();
    });
    $("#distpicker").distpicker({
        autoSelect: false
    });
</script>
</body>
</html>
