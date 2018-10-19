<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>微会员管理平台-单位职工</title>
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
    <link href="<%=basePath%>css/page/staff.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content bodycont">
        <div class="functionbtn">
            <button class="btn btn-primary btn_addstaff"><i class="icon-plus"></i>新增</button>
        </div>
        <div class="pull-left companyselect">
            <label class="defaultLabel">单位：</label>
            <select class="companylist">
            </select>
        </div>
        <table class="comStaffTable">
        </table>
    </div>
    <!--新增职工-->
    <div class="modal fade"  data-backdrop="static" id="addcompanyStaff" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">新增职工</h4>
                </div>
                <form class="form-horizontal tasi-form staffform" name="">
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>会员卡号：</label></div>
                            <div class="col-sm-10 rightarea">
                                <input type="text" class="inputxt" name="ref2" value="" style="float: left" >
                                <button type="button" class="btn btn-primary btn_search" data-loading-text="加载中..." style="float:left">检索</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>会员编码：</label></div>
                            <div class="col-sm-10 rightarea">
                                <input type="text" class="inputxt" name="memberId" value="" disabled="disabled" >
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>手机号：</label></div>
                            <div class="col-sm-10 rightarea">
                                <input type="text" class="inputxt" name="ref1" value="" style="float: left" >
                                <button type="button" class="btn btn-primary btn_searchp" data-loading-text="加载中..." style="float:left">检索</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>会员名称：</label></div>
                            <div class="col-sm-10 rightarea">
                                <input type="text" class="inputxt"  name="memberName" value="" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>职工姓名：</label></div>
                            <div class="col-sm-10 rightarea">
                                <input type="text" class="inputxt"  name="staffName" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel">备注：</label></div>
                            <div class="col-sm-10 rightarea">
                                <input type="text" class="inputxt" name="remark" value="" />
                            </div>
                        </div>
                        <input type="hidden" value="" name="recKey"/>
                        <input type="hidden" value="" name="openId"/>
                        <div class="clearfloat"></div>
                    </div>
                    <div class="modal-footer">
                        <label class="label_warning"></label>
                        <button class="btn btn-primary btn_save" data="0" type="button">保存</button>
                        <button class="btn btn-primary btn_save btn_save_next"  data="1" type="button">保存并继续</button>
                    </div>
                </form>
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
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/company/company.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            //获取企业信息
            getCompany();
        });
    </script>
</body>
</html>
