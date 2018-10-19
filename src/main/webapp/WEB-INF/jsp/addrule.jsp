<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
    <link href="<%=basePath%>css/page/vipcenter.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content addcouponcont">
        <div class="functionTitle">
            <h4>新增充值规则</h4>
            <a href="<%=basePath%>platform/recharge/rule">返回</a>
            <div class="clearfloat"></div>
        </div>
        <div class="couponcontent bodycont">
            <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>优惠券类型：</label></div>
            <div class="col-md-11 rightcont">
                <label class="radiobeuty" data-id="0" onclick="choseactive(0)">
                    <input class="defaultradio" data-id="0"  type="radio" name="active" checked>
                    <span class="radioInput"></span>赠送金额
                </label>
                <label class="radiobeuty" data-id="1" onclick="choseactive(1)">
                    <input class="defaultradio" data-id="1" type="radio" name="active">
                    <span class="radioInput"></span>赠送优惠券
                </label>
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>充值金额：</label></div>
            <div class="col-md-11 rightcont">
                <input type="text" onkeyup="numMoney(this)" name="money"/>
                <span class="lsdw">元</span>
            </div>
            <div class="clearfloat"></div>
            <div class="present">
                <div class="col-md-1 leftlabel"><label class="defaultLabel">赠送金额：</label></div>
                <div class="col-md-11 rightcont">
                    <input type="text" onkeyup="numMoney(this)" name="presentMoney"/>
                    <span class="lsdw">元</span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel">实充金额：</label></div>
            <div class="col-md-11 rightcont">
                <input type="text" disabled="disabled" name="actualMoney" />
                <span class="lsdw">元</span>
            </div>
            <div class="clearfloat"></div>
            <div class="choseyhq display">
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>优惠券：</label></div>
                <div class="col-md-11 rightcont">
                    <input type="text" disabled="disabled" name="couponBatch"/>
                    <input type="text" readonly value="选择优惠券" class="btninput" onClick="choseyhq()"/>
                </div>
                <div class="clearfloat"></div>
                <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>优惠券数量：</label></div>
                <div class="col-md-11 rightcont">
                    <input type="text" name="couponCount" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
                    <span class="lsdw">张</span>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>是否显示：</label></div>
            <div class="col-md-11 rightcont">
                <label class="radiobeuty" data-id="1">
                    <input class="defaultradio" data-id="1"  type="radio" name="yhqtype" checked>
                    <span class="radioInput"></span>是
                </label>
                <label class="radiobeuty" data-id="0">
                    <input class="defaultradio" data-id="0" type="radio" name="yhqtype">
                    <span class="radioInput"></span>否
                </label>
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-1 leftlabel"><label class="defaultLabel title">备注：</label></div>
            <div class="col-md-11 rightcont">
                <textarea type="text" autocomplete="off" class="inputxt" name="remark" value=""></textarea>
            </div>
            <div class="clearfloat"></div>
            <div class="surebtn">
                <button class="btn btn-primary" onclick="saveData()">保存</button>
                <button class="btn btn-default" onclick="notsave()">取消</button>
            </div>
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
                    <button type="button" class="btn btn-primary" onclick="checkCoupon()">确定</button>
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
    <!-- 打印 -->
    <script type="text/javascript" src="<%=basePath%>js/jQuery.print.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/recharge/recharge.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            initAdd();
        });
    </script>
</body>
</html>
