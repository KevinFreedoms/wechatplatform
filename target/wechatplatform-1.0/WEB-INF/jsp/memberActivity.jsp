<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>微会员管理平台-会员卡活动</title>
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
    <link href="<%=basePath%>css/page/vipcardactive.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content bodycont">
        <table id="vipcardactiveTab">
        </table>
    </div>
    <!--编辑活动-->
    <div class="modal fade" id="editactive" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel1">编辑会员卡领取活动</h4>
                </div>
                <div class="modal-body">
                    <div class="leftlabel"><label class="defaultLabel">活动批次：</label></div>
                    <div class="rightcont">
                        <input type="text" class="privilegeBatch"  value="" disabled="disabled"/>
                    </div>
                    <div class="clearfloat"></div>
                    <div class="leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>活动类型：</label></div>
                    <div class="rightcont">
                        <label class="demonlabel">
                            <input class="beautycheckbox" type="checkbox" checked="checked" disabled="disabled">
                            <span class="democheckbox checkInput"></span>赠送优惠券
                        </label>
                    </div>
                    <div class="clearfloat"></div>
                    <div class="leftlabel"><label class="defaultLabel">优惠券：</label></div>
                    <div class="rightcont">
                        <input class="yhqcode couponBatch" type="text" disabled/>
                        <input type="text" readonly value="选择优惠券" class="btninput" onClick="choseyhq()">
                    </div>
                    <div class="clearfloat"></div>
                    <div class="leftlabel"><label class="defaultLabel title">优惠券数量：</label></div>
                    <div class="rightcont">
                        <input type="text" class="yhqnumber couponCount" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" />
                    </div>
                    <div class="clearfloat"></div>
                    <div class="col-sm-1 leftlabel"><label class="defaultLabel title">备注：</label></div>
                    <div class="col-sm-11 rightcont">
                        <textarea rows="5" style="resize:none; width:50%" class="remark"></textarea>
                    </div>
                    <div class="clearfloat"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" onclick="saveactive()">更新</button>
                </div>
            </div>
        </div>
    </div>
    <!--编辑活动-->
    <!--选择优惠券-->
    <div class="modal fade" id="choseyhq" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">选择优惠券</h4>
                </div>
                <div class="modal-body">
                    <table id="yhqtab" class="table table-striped">
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" onclick="selectedyhq()">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--选择优惠券-->
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
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/activity/memberactivity.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            initMember();
        });
    </script>
</body>
</html>
