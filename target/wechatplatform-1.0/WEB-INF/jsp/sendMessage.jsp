<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>微会员管理平台-充值规则</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <style>
        .modal-dialog{
            width:70%;
        }
    </style>
</head>
<body>
    <div class="content specialcont" id="checkMessage">
        <div class="filter headcont">
            <label class="defaultLabel">状态：</label>
            <label class="demonlabel">
                <input class="beautycheckbox" type="checkbox" id="waitS">
                <span class="democheckbox checkInput"></span>待推送
            </label>
            <label class="demonlabel" >
                <input class="beautycheckbox" type="checkbox" id="readyS">
                <span class="democheckbox checkInput"></span>已推送
            </label>
            <label class="demonlabel">
                <input class="beautycheckbox" type="checkbox" id="ns">
                <span class="democheckbox checkInput"></span>推送失败
            </label>
            <div class="clearfloat"></div>
        </div>
        <div class="cutarea"></div>
        <div class="rechargetb" style="padding:15px;">
            <button class="btn btn-primary addcoupon" onclick="addmessage()"><i class="icon-plus"></i>新增</button>
            <button class="btn btn-primary addcoupon" onclick="sendmessage()"><i class="icon-signout"></i>推送</button>
            <table id="sendmessagetab">
            </table>
        </div>
    </div>
    <!--新增消息推送-->
    <div class="modal fade" id="addmessage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">新增微信推送</h4>
                </div>
                <div class="modal-body">
                    <div class="col-md-2 leftlabel"><label class="defaultLabel">消息编码：</label></div>
                    <div class="col-md-10 rightcont">
                        <input type="text" value="" disabled="disabled" id="messageId"/>
                    </div>
                    <div class="clearfloat"></div>
                    <div class="col-md-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>主题：</label></div>
                    <div class="col-md-10 rightcont">
                        <input type="text" class="messagetitle"  style="width:80%" id="messageTitle"/>
                    </div>
                    <div class="clearfloat"></div>
                    <div class="col-md-2 leftlabel"><label class="defaultLabel title"><span class="importantinfo">*</span>内容：</label></div>
                    <div class="col-md-10 rightcont">
                        <textarea id="editor_id" name="content" style="width:80%;height:280px;visibility:hidden;margin-left:10px;"></textarea>
                    </div>
                    <div class="clearfloat"></div>
                    <div class="col-md-2 leftlabel"><label class="defaultLabel title">备注：</label></div>
                    <div class="col-md-10 rightcont">
                        <textarea rows="5" style="resize:none; width:80%" id="messageRemark"></textarea>
                    </div>
                    <input type="hidden" value="" id="reckey"/>
                    <div class="clearfloat"></div>
                </div>
                <div class="modal-footer">
                    <label class="label_warning"></label>
                    <button class="btn btn-primary btn-save" onclick="savemessage()">保存</button>
                    <button class="btn btn-primary btn-update" onclick="updatemessage()">更新</button>
                </div>
            </div>
        </div>
    </div>
    <!--jquery-->
    <script src="<%=basePath%>js/jquery-1.8.3.min.js"></script>
    <!--bootstrap-->
    <script src="<%=basePath%>js/bootstrap/bootstrap.min.js"></script>
    <script src="<%=basePath%>js/bootstrap/jquery.dcjqaccordion.2.7.min.js"></script>
    <script src="<%=basePath%>js/bootstrap/jquery.scrollTo.min.js"></script>
    <script src="<%=basePath%>js/bootstrap/jquery.nicescroll.js"></script>
    <script src="<%=basePath%>js/jquery.cookie.js"></script>
    <!--base64 -->
    <script type="text/javascript" src="<%=basePath%>js/base64/base64.js"></script>
    <!--bootstrap table-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table-zh-CN.min.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <!--在线编辑-->
    <script type="text/javascript" src="<%=basePath%>js/kindeditior/kindeditor.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/kindeditior/zh_CN.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/message/message.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            init();
        });
    </script>
</body>
</html>
