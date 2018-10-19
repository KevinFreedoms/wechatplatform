<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>微会员管理平台-角色</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <!-- tree-->
    <link href="<%=basePath%>js/Ztree/css/metroStyle/metroStyle.css"  rel="stylesheet" type="text/css">
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/staff.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="content bodycont">
    <div class="functionbtn">
        <button class="btn btn-primary btn_addRole"><i class="icon-plus"></i>新增</button>
    </div>
    <table class="roleTable">
    </table>
</div>
<!--新增角色-->
<div class="modal fade"  data-backdrop="static" id="addrole" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel"></h4>
            </div>
            <div class="modal-body">
                <div class="col-md-6 roleInfo">
                    <div class="col-md-3 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>角色编码：</label></div>
                    <div class="col-md-9 rightcont">
                        <input type="text" value="" name="role.roleId" disabled="disabled"/>
                    </div>
                    <div class="clearfloat"></div>
                    <div class="col-md-3 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>角色名称：</label></div>
                    <div class="col-md-9 rightcont">
                        <input type="text" name="role.roleName"/>
                    </div>
                    <div class="clearfloat"></div>
                    <div class="col-md-3 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>启用状态：</label></div>
                    <div class="col-md-9 rightcont">
                        <label class="radiobeuty">
                            <input class="defaultradio" type="radio" id="raUsing" name="role.status" checked value="1">
                            <span class="radioInput"></span>是
                        </label>
                        <label class="radiobeuty">
                            <input class="defaultradio" type="radio" id="raUnUsing" name="role.status" value="0">
                            <span class="radioInput"></span>否
                        </label>
                    </div>
                    <div class="clearfloat"></div>
                    <div class="col-md-3 leftlabel"><label class="defaultLabel">备注：</label></div>
                    <div class="col-md-9 rightcont">
                        <textarea type="text" name="role.remark"></textarea>
                    </div>
                    <div class="clearfloat"></div>
                </div>
                <div class="col-md-6">
                    <div style="margin-bottom: 5px">功能菜单：</div>

                    <ul id="functionList" class="ztree"></ul>
                </div>
                <div class="clearfloat"></div>
                <input type="hidden" value="" name="role.recKey"/>
            </div>
            <div class="modal-footer">
                <label class="label_warning" ></label>
                <button type="button" class="btn btn-primary btn-sure">确定</button>
            </div>
        </div>
    </div>
</div>
<!--新增角色-->
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
<!-- tree-->
<script type="text/javascript" src="<%=basePath%>js/Ztree/js/jquery.ztree.core.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/Ztree/js/jquery.ztree.excheck.min.js"></script>
<!---page-->
<script>
    document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
    document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/staff/role.js?"+Math.random()+"'></scr"+"ipt>");
</script>

<script type="text/javascript">
    $(function () {
        basePath = "<%=basePath%>";
        initRole();
    });
</script>
</body>
</html>