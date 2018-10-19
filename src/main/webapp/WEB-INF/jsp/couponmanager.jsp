<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<body>
<head>
    <title>微会员管理平台-优惠券管理</title>
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
    <link href="<%=basePath%>css/page/yhq.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content specialcont">
        <div class="filter headcont">
            <div class="couponfilter">
                <label class="filtertitle">优惠券类型：</label>
                <ul class="yhmenu" id="coptypecheck">
                    <li>
                        <input type="radio" id="yhtype0" name="yhtype" class="check" checked>
                        <label for="yhtype0" data-id="99">全部</label>
                    </li>
                    <li>
                        <input type="radio" id="yhtype1" name="yhtype" class="check">
                        <label for="yhtype1" data-id="0">代金券</label>
                    </li>
                    <li class="lastchid">
                        <input type="radio" id="yhtype2" name="yhtype" class="check">
                        <label for="yhtype2" data-id="1">折扣菜券</label>
                    </li>
                </ul>
                <div class="clearfloat"></div>
            </div>
            <div class="couponfilter">
                <label class="filtertitle">状态：</label>
                <ul class="yhmenu" id="strutscheck">
                    <li>
                        <input type="radio" id="status0" name="status" class="check" checked>
                        <label for="status0" data-id="99">全部</label>
                    </li>
                    <li>
                        <input type="radio" id="status1" name="status" class="check">
                        <label for="status1"  data-id="1">启用</label>
                    </li>
                    <li class="lastchid">
                        <input type="radio" id="status2" name="status" class="check">
                        <label for="status2"  data-id="0">未启用</label>
                    </li>
                </ul>
                <div class="clearfloat"></div>
            </div>
            <div class="couponfilter">
                <label class="filtertitle">领取类型：</label>
                <select id="selected">
                    <option value="99">全部</option>
                    <option value="0">免费领取</option>
                    <option value="1">积分兑换</option>
                    <option value="2">消费领取</option>
                    <option value="3">生日领取</option>
                    <option value="4">会员卡领取</option>
                    <option value="5">充值领取</option>
                </select>
            </div>
            <div class="clearfloat"></div>
            <div class="couponfilter" style="margin-bottom:0px;">
                <label class="filtertitle">关键字搜索：</label>
                <input type="text" placeholder="优惠券批次、最低消费额、面值...">
                <button class="btn btn-default">查询</button>
            </div>
            <div class="clearfloat"></div>
        </div>
        <div class="cutarea"></div>
        <div class="coupontab bodycont">
            <button class="btn btn-primary addcoupon" onClick="addcoupon()">
                <i class="icon-plus"></i>新增
            </button>
            <table id="couponrecord" class="table operateyhq">
                <thead>
                </thead>
            </table>
        </div>
    </div>
    <div class="yhquseradius display">
        <label>门店范围</label>
        <div class="radiusdetail" id="loclist"></div>
        <label id="labelproductlist">菜品范围</label>
        <div class="radiusdetail" id="productlist"> </div>
    </div>
    <!--查看详情-->
    <div class="modal fade" id="neckband" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">查看领用记录</h4>
                </div>
                <div class="modal-body">
                    <div class="neckbandTltle">
                        <h4>优惠券信息</h4>
                        <div class="yhqInfo">
                            <label>优惠券批次：</label>
                            <span id="detailCouponbatch"></span>
                            <label>优惠券类型：</label>
                            <span id="detailCoupontype"></span>
                            <label>领取类型：</label>
                            <span id="detailGetype"></span>
                        </div>
                    </div>
                    <div class="neckbandbody">
                        <h4>领用记录</h4>
                        <div class="neckband">
                            <div class="fiflterstatus" >
                                <label class="yhqstatu">状态：</label>
                                <ul class="yhmenu neckbandlist" id="yhqstatu">
                                    <li>
                                        <input type="radio" id="yhqstatu0"   name="yhqstatu" class="check" checked>
                                        <label for="yhqstatu0" data-id="88">全部</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="yhqstatu1" name="yhqstatu" class="check">
                                        <label for="yhqstatu1"  data-id="1">已使用</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="yhqstatu2"  name="yhqstatu" class="check">
                                        <label for="yhqstatu2" data-id="0">未使用</label>
                                    </li>
                                    <li class="lastchid">
                                        <input type="radio" id="yhqstatu3" name="yhqstatu" class="check">
                                        <label for="yhqstatu3"   data-id="2" >已过期</label>
                                    </li>
                                </ul>
                            </div>
                            <table id="neckbandTb">
                            </table>
                            <div class="clearfloat"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--查看详情-->
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
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/coupon/coupon.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () { 
            basePath = "<%=basePath%>";
            querycellect(couponType,ref2,receiveType);
        });
    </script>
</body>
</html>
