<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>微信订单</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--calendar-->
    <link rel="stylesheet" type="text/css" media="all" href="<%=basePath%>js/dbcalendar/daterangepicker-bs3.css" />
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/wetchatorder.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="content specialcont">
    <div class="filter headcont">
        <div class="wetchatData filterarea">
            <label class="defaultLabel">时间：</label>
            <input type="text" readonly name="reservation" id="reservation" class="reservation datainput" value=""/>
            <i class="icon-calendar"></i>
            <div class="clearfloat"></div>
        </div>
        <div class="filterarea">

            <label  class="defaultLabel">门店：</label>
            <select id="wxLoc" onchange="locChange()">
                <c:if test="${wxLoc!=null && fn:length(wxLoc)>0}">
                    <c:forEach var="loc" items="${wxLoc}">
                        <option data-sid="${loc.sid}">${loc.branch_name}</option>
                    </c:forEach>
                </c:if>
            </select>
            <label  class="defaultLabel">来源：</label>
            <ul class="yhmenu" id="bookingType">
                <li>
                    <input type="radio" id="rescous0" name="rescous" class="check" checked data-bookingType="9999">
                    <label for="rescous0">全部</label>
                </li>
                <li>
                    <input type="radio" id="rescous1" name="rescous" class="check"  data-bookingType="0">
                    <label for="rescous1">外卖</label>
                </li>
                <li class="lastchid">
                    <input type="radio" id="rescous2" name="rescous" class="check" data-bookingType="1">
                    <label for="rescous2">堂食</label>
                </li>
            </ul>
            <div class="clearfloat"></div>
        </div>
        <div class="filterarea" id="bookingstatus">
            <label class="defaultLabel">状态：</label>
            <label class="demonlabel" >
                <input class="beautycheckbox allchose" type="checkbox" data-bookingstatus="9999">
                <span class="democheckbox checkInput"></span>全选
            </label>
            <label class="demonlabel" >
                <input class="beautycheckbox" type="checkbox" data-bookingstatus="0"  >
                <span class="democheckbox checkInput"></span>未付款
            </label>
            <label class="demonlabel"  >
                <input class="beautycheckbox" type="checkbox" data-bookingstatus="1" >
                <span class="democheckbox checkInput"></span>已付款
            </label>
            <label class="demonlabel"   >
                <input class="beautycheckbox" type="checkbox" data-bookingstatus="2"   >
                <span class="democheckbox checkInput"></span>已获取
            </label>
            <label class="demonlabel"  >
                <input class="beautycheckbox" type="checkbox" data-bookingstatus="3"   >
                <span class="democheckbox checkInput"></span>已确认
            </label>
            <label class="demonlabel" >
                <input class="beautycheckbox" type="checkbox" data-bookingstatus="4"   >
                <span class="democheckbox checkInput"></span>已递送
            </label>
            <label class="demonlabel"   >
                <input class="beautycheckbox" type="checkbox" data-bookingstatus="5"  >
                <span class="democheckbox checkInput"></span>已结单
            </label>
            <label class="demonlabel"   >
                <input class="beautycheckbox" type="checkbox" data-bookingstatus="6"   >
                <span class="democheckbox checkInput"></span>已退单
            </label>
            <label class="demonlabel"  >
                <input class="beautycheckbox" type="checkbox" data-bookingstatus="10"  >
                <span class="democheckbox checkInput"></span>退单中
            </label>
            <%--<label class="demonlabel" onClick="choseStatus(8,this)">--%>
                <%--<input class="beautycheckbox" type="checkbox">--%>
                <%--<span class="democheckbox checkInput"></span>已取消--%>
            <%--</label>--%>
        </div>
        <div class="clearfloat"></div>
    </div>
    <div class="cutarea"></div>
    <div class="bodycont">
        <button class="btn btn-default exportexcel" onClick="exportExcel()"><i class="icon-signout"></i>导出Excel</button>
        <table id="wetchatOrdertb" class="table">
        </table>
    </div>
</div>
<!--查看详情-->
<div class="modal fade" id="orderDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">订单详情</h4>
            </div>
            <div class="modal-body">
                <div class="module">
                    <h4>订单信息</h4>
                    <ul>
                        <li class="ordercode">订单编号：<span id="bookingId"></span></li>
                        <li class="totalmoney">总金额：<span id="price"></span></li>
                        <li class="gathering">收款金额：<span id="sumPrice"></span></li>
                        <li class="deliverfee">配送费：<span id="ps"></span></li>
                        <li class="discountmoney">折扣金额：<span id="zk"></span></li>
                        <li class="packagefee">包装费：<span id="bp"></span></li>
                    </ul>
                    <div class="clearfloat"></div>
                </div>
                <div class="module">
                    <h4>用户信息</h4>
                    <ul>
                        <li class="customeName">姓名：<span id="shName"></span></li>
                        <li class="deliveryAdress">送餐地址：<span id="address"></span></li>
                        <li class="customePhone">电话：<span id="phone"></span></li>
                        <li class="remark">备注：<span id="remark"></span></li>
                        <li class="deliveryTime" >配送时间：<span id="deliveryTime"></span></li>
                    </ul>
                    <div class="clearfloat"></div>
                </div>
                <div class="module">
                    <h4>商品信息</h4>
                    <table id="productInfo">
                    </table>
                </div>
                <div class="module">
                    <h4>付款信息</h4>
                    <table id="payInfo">
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    basePath="<%=basePath%>";
</script>
<!--查看详情-->
<!--jquery-->
<script src="<%=basePath%>js/jquery-1.11.1.min.js"></script>
<!--bootstrap-->
<script src="<%=basePath%>js/bootstrap/bootstrap.min.js"></script>
<script src="<%=basePath%>js/bootstrap/jquery.dcjqaccordion.2.7.min.js"></script>
<script src="<%=basePath%>js/bootstrap/jquery.scrollTo.min.js"></script>
<script src="<%=basePath%>js/bootstrap/jquery.nicescroll.js"></script>
<script src="<%=basePath%>js/jquery.cookie.js"></script>
<!--bootstrap table-->
<script src="<%=basePath%>js/bootstrap/bootstrap-table.min.js"></script>
<script src="<%=basePath%>js/bootstrap/bootstrap-table-zh-CN.min.js"></script>
<!--calendar-->
<script type="text/javascript" src="<%=basePath%>js/dbcalendar/moment.js"></script>
<script type="text/javascript" src="<%=basePath%>js/dbcalendar/daterangepicker.js"></script>
<script src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
<script type="text/javascript" src="<%=basePath%>js/export/tableExport.js"></script>
<!--page-->
<script>
    document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
    document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/order/wetchatorder.js?"+Math.random()+"'></scr"+"ipt>");
</script>
</body>
</html>
