<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>微会员管理平台-单位</title>
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
            <button class="btn btn-primary btn_addCompany"><i class="icon-plus"></i>新增</button>
        </div>
        <table class="companyTable">
        </table>
    </div>
    <!--新增单位-->
    <div class="modal fade"  data-backdrop="static" id="addcompany" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">新增单位</h4>
                </div>
                <div class="form-horizontal tasi-form staffform" name="">
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>单位编码：</label></div>
                            <div class="col-sm-10 rightarea">
                                <input type="text" class="inputxt" name="companyId" value="" disabled="disabled" >
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel">地址：</label></div>
                            <div class="col-sm-10 rightarea">
                                <textarea type="text" autocomplete="off" name="contactAddress" value=""></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>单位名称：</label></div>
                            <div class="col-sm-10 rightarea">
                                <input type="text" autocomplete="off" class="inputxt" value="" name="companyName">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>联系人：</label></div>
                            <div class="col-sm-10 rightarea">
                                <input type="text" autocomplete="off" class="inputxt" value="" name="contactPerson">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>联系方式：</label></div>
                            <div class="col-sm-10 rightarea">
                                <input type="text" autocomplete="off" class="inputxt" value="" name="contactWay">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel">备注：</label></div>
                            <div class="col-sm-10 rightarea">
                                <textarea type="text" autocomplete="off" class="inputxt" name="remark" value=""></textarea>
                            </div>
                        </div>
                        <!--<div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>所属门店：</label></div>
                            <div class="col-sm-10 rightarea">
                                <select id="loclist" disabled="disabled">

                                </select>
                            </div>
                        </div>-->
                        <div class="form-group">
                            <div class="col-sm-2 leftlabel"><label class="defaultLabel">启用状态：</label></div>
                            <div class="col-sm-10 rightarea">
                                <label class="radiobeuty">
                                    <input class="defaultradio"  id="raUsing" type="radio" name="status" value="1" checked/>
                                    <span class="radioInput"></span>是
                                </label>
                                <label class="radiobeuty">
                                    <input class="defaultradio" id="raUnUsing" type="radio" name="status" value="0"/>
                                    <span class="radioInput"></span>否
                                </label>
                            </div>
                        </div>
                        <input type="hidden" value="" name="recKey"/>
                        <div class="clearfloat"></div>
                    </div>
                    <div class="modal-footer">
                        <label class="label_warning"></label>
                        <button class="btn btn-primary btn-sure">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--新增单位-->
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
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/company/company.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            initCompany();
        });
    </script>
</body>
</html>
