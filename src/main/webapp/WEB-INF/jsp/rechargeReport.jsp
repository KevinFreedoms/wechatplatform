<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>微会员管理平台-电子会员充值查询</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--calendar-->
    <link rel="stylesheet" type="text/css" media="all" href="<%=basePath%>js/dbcalendar/daterangepicker-bs3.css" />
    <!--page-->
    <link href="<%=basePath%>css/bootstrap-multiselect.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/rechargeReport.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content specialcont">
        <div class="filter headcont">
            <div class="couponfilter">
                <label class="filtertitle">充值类别：</label>
                <ul class="yhmenu">
                    <li>
                        <input type="radio" id="yhtype0" name="yhtype"  data-type="0" class="check" checked>
                        <label for="yhtype0" onClick="rechargeType(this)" data-type="0">单位充值</label>
                    </li>
                    <li>
                        <input type="radio" id="yhtype1" name="yhtype"  data-type="1" class="check">
                        <label for="yhtype1" onClick="rechargeType(this)" data-type="1">个人充值</label>
                    </li>
                </ul>
            </div>
            <div class="chosedata">
                <label class="filtertitle">日期筛选：</label>
                <input type="text" readonly name="reservation" id="reservation" class="reservation datainput" value=""/>
                <i class="icon-calendar"></i>
            </div>
            <div class="pull-right btngroup">
                <a style="margin-right:15px" onclick="toPrint()"><i class="icon-print"></i>打印</a>
                <a onclick="toExecl()"><i class="icon-upload-alt"></i>导出Excel</a>
            </div>
            <div class="clearfloat"></div>
        </div>
        <div class="cutarea"></div>
        <div class="companyrecharge bodycont">
            <h4>单位充值一览</h4>
            <div class="tableft">
                <label>门店：</label>
                <select id="storeselelct" class="multipleselect" multiple="multiple">
                </select>
            </div>
            <div class="tableft">
                <label>单位：</label>
                <select id="companyselect" class="multipleselect" multiple="multiple">
                </select>
            </div>
            <div class="tableft">
                <button class="btn btn-primary" onclick="storeSelectReprot()">查询</button>
            </div>
            <table id="unittab" class="table table-bordered operateyhq">
                <thead>
                <th>门店名称</th>
                <th>单号</th>
                <th>单位名称</th>
                <th>充值日期</th>
                <th>收款金额</th>
                <th>充值金额</th>
                <th>溢充金额</th>
                <th>充值人数</th>
                <th>金额/人</th>
                <th>操作人</th>
                <th>审核人</th>
                </thead>
                <tbody id="unitTbody">

                </tbody>
            </table>
            <div class="sureorder">
                <h4>合计</h4>
                <label>收款金额：</label>
                <span class="defaultLabel" id="sumrecivemoney"></span>
                <label>充值金额：</label>
                <span class="defaultLabel" id="sumrechargemoney"></span>
                <label>溢充金额：</label>
                <span class="defaultLabel" id="sumoverflowmoney"></span>
                <label>充值人数：</label>
                <span class="defaultLabel" id="sumrechargenum"></span>
            </div>
        </div>
        <!--个人充值-->
        <div class="personrecharge bodycont" style="display:none">
            <h4>个人充值统计</h4>
            <div class="tableft">
                <label>会员范围：</label>
                <input type="text" placeholder="请输入开始会员号" id="startmember">至
                <input type="text" placeholder="请输入结束会员号" id="endmember">
            </div>
            <div class="tableft">
                <button class="btn btn-primary" onclick="selectReport()">查询</button>
                <button class="btn btn-primary" style="margin-left:15px;" onclick="selectAll()">显示全部</button>
            </div>
            <table id="persontab" class="table table-bordered operateyhq">
                <thead>
                <th>会员卡号</th>
                <th>会员姓名</th>
                <th>充值日期</th>
                <th>充值金额（元）</th>
                <th>充值方式</th>
                </thead>
                <tbody id="memberbody">

                </tbody>
            </table>
            <div class="sureorder">
                <h4>合计</h4>
                <label>充值金额：</label>
                <span class="defaultLabel sumrechargemoney"></span>
            </div>
        </div>
        <!--个人充值-->
    </div>
    <!--查看明细-->
    <div class="modal fade" id="rechargedetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">单位充值明细</h4>
                </div>
                <div class="modal-body">
                    <div class="rechargecollect">

                    </div>
                    <div class="clearfloat"></div>
                    <table class="table" id="rechargesr">

                    </table>
                    <div class="sureorder">
                        <h4>合计</h4>
                        <label>充值金额：</label>
                        <span class="defaultLabel" id="rechargecsum"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="print">
    </div>
    <div id="temptab">
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
    <!--bootstrap select-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-multiselect.js"></script>
    <!-- 打印 -->
    <script type="text/javascript" src="<%=basePath%>js/jQuery.print.js"></script>
    <!--calendar-->
    <script type="text/javascript" src="<%=basePath%>js/dbcalendar/moment.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/dbcalendar/daterangepicker.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/company/rechargeReport.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            init();
        });
    </script>
</body>
</html>
