<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>微会员管理平台-新增生日活动</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <!--calendar-->
    <link href="<%=basePath%>js/dbcalendar/daterangepicker-bs3.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content addcouponcont">
        <div class="functionTitle">
            <h4>新增优惠活动</h4>
            <a href="<%=basePath%>platform/activity/birthday">返回</a>
            <div class="clearfloat"></div>
        </div>
        <div class="couponcontent bodycont">
            <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>活动批次：</label></div>
            <div class="col-md-11 rightcont">
                <input type="text" id="privilegebatch" value="${privilegebatch}" disabled="disabled"/>
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>活动类型：</label></div>
            <div class="col-md-11 rightcont activeType">
                <label class="demonlabel" onClick="choseStatus(0,this)">
                    <input class="beautycheckbox" type="checkbox" checked="checked" data-id="0" id="duobei">
                    <span class="democheckbox checkInput"></span>消费送多倍积分
                </label>
                <label class="demonlabel" onClick="choseStatus(1,this)" >
                    <input class="beautycheckbox" type="checkbox" data-id="1" id="birth">
                    <span class="democheckbox checkInput"></span>赠送生日优惠券
                </label>
                <label class="demonlabel" onClick="choseStatus(2,this)">
                    <input class="beautycheckbox" type="checkbox"  data-id="2" id="zhekou">
                    <span class="democheckbox checkInput"></span>整单折扣
                </label>
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel">日期范围：</label></div>
            <div class="col-md-11 rightcont" style="position:relative">
                <input type="text" readonly name="reservation" id="reservation" class="reservation datainput" value=""/>
                <i class="icon-calendar" style="position:absolute;left:185px; top:8px;"></i>
            </div>
            <div class="clearfloat"></div>
            <div class="intergralmutiple ">
                <div class="col-md-1 leftlabel"><label class="defaultLabel">积分倍数：</label></div>
                <div class="col-md-11 rightcont">
                    <input type="text" value="2" class="inputIntegral"  style="text-align:right" id="multiple" onkeyup="regmu(this)" onblur="mublur(this)"/>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="birthdaycoupon display">
                <div class="col-md-1 leftlabel"><label class="defaultLabel">生日优惠券：</label></div>
                <div class="col-md-11 rightcont">
                    <input type="text" name='couponBatch' id="couponBatch" class="yhqcode" disabled />
                    <input type="text" readonly value="选择优惠券" class="btninput" onClick="choseyhq()">
                </div>
                <div class="clearfloat"></div>
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>优惠券数量：</label></div>
                <div class="col-md-11 rightcont">
                    <input type="text" class="yhqnumber"  name="couponCount" value="0" style="text-align:right" id="couponCount" onkeyup="regbir(this)" onblur="birblur(this)" onfocus="birfocus(this)" />
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="discount display">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>折扣率：</label></div>
                <div class="col-md-11 rightcont">
                    <input type="text" class="inputdiscount" value="1" style="text-align:right"  id="discountRate" onkeyup="inputVerification(this)" onblur="inputBlur(this)"/>
                    <span style="color:#F00">0~1之间</span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel title">内容：</label></div>
            <div class="col-md-11 rightcont">
                <textarea id="editor_id" name="content" style="width:40%;height:280px;visibility:hidden;margin-left:10px;"></textarea>
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel title">是否启用：</label></div>
            <div class="col-md-11 rightcont">
                <label class="demonlabel">
                    <input class="beautycheckbox allchose" type="checkbox" checked="checked" id="isUse">
                    <span class="democheckbox checkInput"></span>是否启用
                </label>
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel title">备注：</label></div>
            <div class="col-md-11 rightcont">
                <textarea rows="5" cols="50" style="resize:none" id="remark"></textarea>
            </div>
            <div class="clearfloat"></div>
        </div>
        <div class="surebtn">
            <button class="btn btn-primary" onclick="saveData()">保存</button>
        </div>
    </div>
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
    <!--calendar-->
    <script type="text/javascript" src="<%=basePath%>js/dbcalendar/moment.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/dbcalendar/daterangepicker.js"></script>
    <!--在线编辑-->
    <script type="text/javascript" src="<%=basePath%>js/kindeditior/kindeditor.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/kindeditior/zh_CN.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/activity/birthactivity.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            initAdd();
        });
        KindEditor.ready(function(K) {
            window.editor = K.create('#editor_id',{
                cssPath:basePath+'js/kindeditior/prettify.css',
                uploadJson:'/upload/image.php',
                resizeType :1,
                allowPreviewEmoticons : true,
                allowImageUpload : true,
                items : [
                    'undo', 'redo', '|', 'preview','copy', 'paste',
                    'wordpaste', 'justifyleft', 'justifycenter', 'justifyright',
                    'justifyfull', 'indent', 'outdent','fullscreen','formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold','italic', 'underline', 'strikethrough', 'lineheight',  'image', 'multiimage','|' ,'table', 'hr', 'emoticons', 'pagebreak','link', 'unlink'
                ]
            });
        });
    </script>
</body>
</html>
