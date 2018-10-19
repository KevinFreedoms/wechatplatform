<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>微会员管理平台-优惠券管理</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <!--calendar-->
    <link href="<%=basePath%>js/dbcalendar/daterangepicker-bs3.css" rel="stylesheet" type="text/css" media="all" />
    <!--在线编辑-->
    <link href="<%=basePath%>js/kindeditior/themes/default/default.css" rel="stylesheet">
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/yhq.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content">
        <div class="functionTitle">
            <h4>新增优惠券</h4>
            <a href="<%=basePath%>platform/coupon/m">返回</a>
            <div class="clearfloat"></div>
        </div>
        <div class="bodycont addcouponpage">
            <div class="col-md-1 leftlabel"><label class="defaultLabel">优惠券批次：</label></div>
            <div class="col-md-11 rightcont">
                <input type="text" id="yhqpc" class="yhqpc" value="" disabled>
                <img src="<%=basePath%>images/warning.png" />
                <span class="toolipinfo">批次信息为系统生成，不可修改！</span>
            </div>
            <div class="clearfloat"></div>
            <div id="yhqtype">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>优惠券类型：</label></div>
                <div class="col-md-11 rightcont" id="coupontype">
                    <label class="radiobeuty" data-id="0" data-name="01">
                        <input class="defaultradio" type="radio" name="yhqtype" checked>
                        <span class="radioInput"></span>代金券
                    </label>
                    <label class="radiobeuty" data-id="1"  data-name="02">
                        <input class="defaultradio" type="radio" name="yhqtype">
                        <span class="radioInput"></span>折扣菜券
                    </label>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="reciveType">
                <div class="col-md-1 leftlabel" ><label class="defaultLabel"><span class="importantinfo">*</span>领取类型：</label></div>
                <div class="col-md-11 rightcont" id="recivetype">
                    <label class="radiobeuty" data-id="0"  data-name="01"onClick="recivetype(0)">
                        <input class="defaultradio" type="radio" name="recivetype" checked>
                        <span class="radioInput"></span>免费领取
                    </label>
                    <label class="radiobeuty" data-id="1" data-name="02" onClick="recivetype(1)">
                        <input class="defaultradio" type="radio" name="recivetype">
                        <span class="radioInput"></span>积分兑换
                    </label>
                    <label class="radiobeuty" data-id="2"  data-name="03" onClick="recivetype(2)">
                        <input class="defaultradio" type="radio" name="recivetype">
                        <span class="radioInput"></span>消费领取
                    </label>
                    <label class="radiobeuty" data-id="3"  data-name="04" onClick="recivetype(3)">
                        <input class="defaultradio" type="radio" name="recivetype">
                        <span class="radioInput"></span>生日领取
                    </label>
                    <label class="radiobeuty" data-id="4"  data-name="05" onClick="recivetype(4)">
                        <input class="defaultradio" type="radio" name="recivetype">
                        <span class="radioInput"></span>会员卡领取
                    </label>
                    <label class="radiobeuty" data-id="5"  data-name="06" onClick="recivetype(5)">
                        <input class="defaultradio" type="radio" name="recivetype">
                        <span class="radioInput"></span>充值领取
                    </label>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="publishtype">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>发行类型：</label></div>
                <div class="col-md-11 rightcont" id="publictypeid">
                    <div class="dataradius" >
                        <label class="radiobeuty" data-id='0'>
                            <input class="defaultradio" type="radio" name="dataradius" checked>
                            <span class="radioInput"></span>日期范围：
                        </label>
                        <input id="usedate" type="text" readonly style="width: 220px" name="reservation" class="reservation orderdate" value=""/>
                        <i class="icon-calendar"></i>
                    </div>
                    <div class="period">
                        <label class="radiobeuty" data-id='1'>
                            <input class="defaultradio" type="radio" name="dataradius">
                            <span class="radioInput"></span>有效期：
                        </label>
                        <input id="ref1" type="number" min="1" class="inputday" onKeyUp="this.value=this.value.replace(/\D/g,'')"
                               onafterpaste="this.value=this.value.replace(/\D/g,'')"
                               onchange="this.value=this.value.replace(/\D/g,'')" disabled/>
                        <span class="lsdw">天</span>
                    </div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="useData">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>发行日期：</label></div>
                <div class="col-md-11 rightcont publishtype">
                    <div class="useDataradiu">
                        <input id='public'type="text" readonly style="width: 220px" name="reservation"  class="reservation" value=""/>
                        <i class="icon-calendar"></i>
                    </div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="publishnum">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>最大发行量：</label></div>
                <div class="col-md-11 rightcont">
                    <input id="maxPublishQuantity" type="number" min="1" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" onchange="this.value=this.value.replace(/\D/g,'')" />
                    <span class="lsdw">张</span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="parvalue">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>面值：</label></div>
                <div class="col-md-11 rightcont">
                    <input id="quota" type="text" onkeyup="num(this)" onblur="changeinput(this)"/>
                    <span class="lsdw">元</span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="limitmoney">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>限额：</label></div>
                <div class="col-md-11 rightcont">
                    <input id="amount" type="text" onkeyup="num(this)" onblur="changeinput(this)"/>
                    <span class="lsdw">元</span>
                    <img src="<%=basePath%>images/warning.png" />
                    <span class="toolipinfo">消费达到最消费低额度可用该优惠券！</span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="totalintergral display">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>兑换积分：</label></div>
                <div class="col-md-11 rightcont">
                    <input id="exchangePoints" type="number" min="1" onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" onchange="this.value=this.value.replace(/\D/g,'')" />
                    <span class="lsdw">分</span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="minconsume display">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>最低消费：</label></div>
                <div class="col-md-11 rightcont">
                    <input id="lowConSumption" type="number" min="1"  onkeyup="num(this) "/>
                    <span class="lsdw">元</span>
                    <img src="<%=basePath%>images/warning.png" />
                    <span class="toolipinfo">消费达到最消费低额度可领取该优惠券！</span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel">简单描述：</label></div>
            <div class="col-md-11 rightcont">
                <input type="text" readonly value="编辑" class="btninput" onClick="adddescription()">
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>门店范围：</label></div>
            <div class="col-md-11 rightcont">
                <input type="text" readonly value="门店范围" class="btninput" onClick="chosestore()">
                <div class="suitstore">
                    <input name="tagsinput" id="tagsinputloc" class="tagsinput" value="" readonly/>
                    <div class="chosenum">共选<span id="dianxuanshu">0</span>项</div>
                    <div class="clearfloat"></div>
                </div>
            </div>
            <div class="clearfloat"></div>
            <div class="dishradius display">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>菜品范围：</label></div>
                <div class="col-md-11 rightcont">
                    <input type="text" readonly value="菜品范围" class="btninput" onClick="chosedish()">
                    <div class="suitstore">
                        <input name="tagsinput" id="tagsinputproduct" class="tagsinput" value=""  readonly/>
                        <div class="chosenum">共选<span id="caixuanshu">0</span>项</div>
                        <div class="clearfloat"></div>
                    </div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel">备注：</label></div>
            <div class="col-md-11 rightcont">
                <input id="remark" type="text" style="width:50%;">
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>是否启用：</label></div>
            <div class="col-md-11 rightcont">
                <label class="radiobeuty">
                    <input class="defaultradio" type="radio" name="open" data-id="1"checked>
                    <span class="radioInput"></span>是
                </label>
                <label class="radiobeuty">
                    <input class="defaultradio" type="radio" name="open" data-id="0">
                    <span class="radioInput"></span>否
                </label>
            </div>
            <div class="clearfloat"></div>
        </div>
        <div class="surebtn">
            <button class="btn btn-primary" onclick="save()">保存</button>
        </div>
    </div>
    <!--简单描述-->
    <div class="modal fade" id="description" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">简单描述</h4>
                </div>
                <div class="modal-body">
                    <textarea id="editor_id" name="content" style="width:96%;height:350px;visibility:hidden; margin-left:10px;"></textarea>
                </div>
                <!--<div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary">确定</button>
                </div>-->
            </div>
        </div>
    </div>
    <!--简单描述-->
    <!--选择门店-->
    <div class="modal fade" id="storeradius" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel1">选择门店</h4>
                </div>
                <div class="modal-body">
                    <table id="storetab" class="table table-striped">
                    </table>
                </div>
                <div class="modal-footer">
                    <span class="alerdychose">已选：<span class="loccheckcount">0</span>/<span id="loctallcount"></span></span>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" onclick="getCheckloc()">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--选择门店-->
    <!--选择菜品-->
    <div class="modal fade" id="dishradius" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">选择菜品</h4>
                </div>
                <div class="modal-body">
                    <div class="fiflterType">
                        <label>类别筛选：</label>
                        <select id="selectsort">

                        </select>
                    </div>
                    <table id="dishtab" class="table table-striped">
                    </table>
                </div>
                <div class="modal-footer">
                    <span class="alerdychose">已选：<span id="sortcheckcount">0</span>/<span id="sortallcount"></span></span>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" onclick="getCheckproduct()">确定</button>
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
    <!--base64 -->
    <script type="text/javascript" src="<%=basePath%>js/base64/base64.js"></script>
    <!--bootstrap table-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table-zh-CN.min.js"></script>
    <!--在线编辑-->
    <script type="text/javascript" src="<%=basePath%>js/kindeditior/kindeditor.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/kindeditior/zh_CN.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/jquery.tagsinput.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <!--calendar-->
    <script type="text/javascript" src="<%=basePath%>js/dbcalendar/moment.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/dbcalendar/daterangepicker.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/coupon/addcoupon.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            createCouponBatch();
        });
    </script>
</body>
</html>
