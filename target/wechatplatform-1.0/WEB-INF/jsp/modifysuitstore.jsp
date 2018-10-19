<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>微会员管理平台-适用门店</title>
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/suitStore.css" rel="stylesheet" type="text/css" />
    <style>
        #allmap{height:400px;width:100%;}
        #r-result{width:100%; font-size:14px;}
    </style>
</head>
<body>
    <div class="content">
        <div class="functionTitle">
            <h4>编辑适用门店</h4>
            <a href="<%=basePath%>platform/suitstore/m">返回</a>
            <div class="clearfloat"></div>
        </div>
        <div class="bodycont addsuitstore ">
            <div class="importToolip">
                <div class="seccessInfo display">
                    <a class="closetoolip icon-remove" onclick="closetoolip()"></a>
                    <p><img src="<%=basePath%>images/success.png">审核通过</p>
                    <p class="importInfo">
                        <span>该门店信息已审核通过</span>
                    </p>
                </div>

                <div class="errorInfo display">
                    <a class="closetoolip icon-remove" onclick="closetoolip()"></a>
                    <p><img src="<%=basePath%>images/success.png">审核驳回</p>
                    <p class="importInfo">
                        <span>原因</span>
                    </p>
                </div>
                <div class="waitloading display">
                    <a class="closetoolip icon-remove" onclick="closetoolip()"></a>
                    <p><img src="<%=basePath%>images/success.png">审核中</p>
                    <p class="importInfo">
                        <span>请耐心等待，大约需要1-5个工作日</span>
                    </p>
                </div>
            </div>
            <div class="smalltitle">
                <span class="titleName">基本信息</span>
                <div class="clearfloat"></div>
            </div>
            <div class="pull-left leftcont">
                <label class="defaultLabel"><span class="importantinfo">*</span>选择门店：</label>
            </div>
            <div class="pull-left rightcont">
                <a class="choseStorebtn display" style="color: #CCCCCC">...</a>
                <span class="storeinfo"></span>
            </div>
            <div class="clearfloat"></div>
            <div class="pull-left leftcont">
                <label class="defaultLabel">地址：</label>
            </div>
            <div class="pull-left rightcont storeaddress">

            </div>
            <div class="clearfloat"></div>
            <div class="pull-left leftcont"><label class="defaultLabel">定位：</label></div>
            <div class="pull-left rightcont" style="width:80%;">
                <div id="allmap"></div>
            </div>

            <div class="clearfloat"></div>
            <div class="pull-left leftcont"><label class="defaultLabel"><span class="importantinfo">*</span>门店类型：</label></div>
            <div class="pull-left rightcont">
                <select id="firstRecipe">

                </select>
                <select id="secondRecipe">

                </select>
            </div>
            <div class="clearfloat"></div>
            <div class="serviceInfo">
                <div class="smalltitle">
                    <span class="titleName">服务信息</span>
                    <span>该部分为公共编辑信息，每个添加了该门店的商户均可修改意见，并在审核后选择性采纳</span>
                    <div class="clearfloat"></div>
                </div>
                <div class="pull-left leftcont">
                    <label class="defaultLabel"><span class="importantinfo">*</span>电话：</label>
                </div>
                <div class="pull-left rightcont">
                    <input type="text" name="telephone"/>
                    <p>填写的电话信息需要真实有效，审核过程会进行电话抽审，无人接听或电话无效会影响审核结果</p>
                    <p>固定电话须填写区号；区号、分机号均用 “—” 链接</p>
                    <p>现阶段请不要填写多个电话</p>
                </div>
                <div class="clearfloat"></div>
                <div class="pull-left leftcont">
                    <label class="defaultLabel">人均价格：</label>
                </div>
                <div class="pull-left rightcont">
                    <input type="text" name="avgprice" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" />
                    <span class="lsdw">元</span>
                    <p>大于零的整数，须如实填写，默认单位为人民币</p>
                </div>
                <div class="clearfloat"></div>
                <div class="pull-left leftcont">
                    <label class="defaultLabel">营业时间：</label>
                </div>
                <div class="pull-left rightcont">
                    <input type="text" name="opentime"/>
                    <p>如 10:00—21:00</p>
                </div>
                <div class="clearfloat"></div>
                <div class="pull-left leftcont">
                    <label class="defaultLabel">推荐菜品：</label>
                </div>
                <div class="pull-left rightcont">
                    <textarea name="recommend"></textarea>
                    <p>如 推荐菜，推荐景点，推荐房间</p>
                </div>
                <div class="clearfloat"></div>
                <div class="pull-left leftcont">
                    <label class="defaultLabel">特色服务：</label>
                </div>
                <div class="pull-left rightcont">
                    <textarea name="special"></textarea>
                    <p>如 免费WiFi，免费停车，送货上门等特色功能或服务</p>
                </div>
                <div class="clearfloat"></div>
                <div class="pull-left leftcont">
                    <label class="defaultLabel">门店简介：</label>
                </div>
                <div class="pull-left rightcont">
                    <textarea name="introduction"></textarea>
                    <p>对品牌或门店的简要介绍</p>
                </div>
                <div class="clearfloat"></div>
            </div>
        </div>
        <div class="surebtn">
            <button class="btn btn-primary" onclick="updateData()">更新</button>
        </div>
    </div>
    <!--选择门店-->
    <div class="modal fade" id="storeradius" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">选择门店</h4>
                </div>
                <div class="modal-body">
                    <table id="storetab" class="table table-striped">
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary btn-store">确定</button>
                </div>
            </div>
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
    <script type="text/javascript" src="<%=basePath%>js/base64/base64.js"></script>
    <!--bootstrap table-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table-zh-CN.min.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <!-- Baidu -->
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=7fa1747a87fa5af93798df9a60e5517a"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/suit/suitStore.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script>
        var map = new BMap.Map("allmap");
        map.enableScrollWheelZoom(true)//启用地图滚轮放大缩小
        var recipe = ${recipe};
        var wxloc = ${wxloc};
        $(function () {
            basePath = "<%=basePath%>";
            initModify();
        });
    </script>
</body>
</html>
