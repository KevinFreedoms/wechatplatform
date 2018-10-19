<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>微会员管理平台-批量充值单</title>
    <link href="<%=basePath%>images/srlogo.png" rel="icon" sizes="192x192">
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/companyManage.css" rel="stylesheet" type="text/css" />
</head>
    <body>
    <div class="rechargeHead">
        <div class="backpage"><a href="<%=basePath%>platform/recharge/m">返回</a></div>
        <div class="rechargeDetail">
            <span class="rechargeOrder">单号：<span id="bookingId">${collect.bookingId}</span></span>
            <a class="secondbtn btn_print"><i class="icon-print"></i>打印</a>

                <c:if test="${collect.bookingFlag==0}">
                    <span class="majorInfo waitcheckbtn" id="waiteCheck">待复核</span>
                </c:if>
                <c:if test="${collect.bookingFlag==3}">
                    <span class="alerdyinvalid" id="waiteCheck">已作废</span>
                </c:if>
                <c:if test="${collect.bookingFlag==1}">
                    <span class="majorInfo waitcheckbtn" id="finishCheck">已完成</span>
                </c:if>

            <div class="clearfloat"></div>
        </div>
        <div class="remark">
            <span>备注：<span id="remark">${collect.remark}</span></span>
            <span></span>
        </div>
        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion"
                           href="#collapseOne">操作记录</a>
                        <i class="icon-angle-right" ></i>
                    </h4>
                </div>
                <div id="collapseOne" class="panel-collapse collapse">
                    <div class="panel-body">
                        <div class="orderperson">
                            <div>创建人：<span  id="createUserId">${collect.createUserId}</span></div>
                            <div>创建时间：<span id="createDate"><fmt:formatDate value="${collect.createDate}" pattern="yyyy-MM-dd" /></span></div>
                        </div>
                        <div class="orderperson">
                            <div>审核人：<span id="checkUserId">${collect.checkUserId}</span></div>
                            <div>审核时间：<span id="checkDate"><fmt:formatDate value="${collect.checkDate}" pattern="yyyy-MM-dd" /></span> </div>
                        </div>
                        <div class="orderperson">
                            <div>作废人：<span id="invalidUserId">${collect.invalidUserId}</span></div>
                            <div>作废时间：<span id="invalidDate"><fmt:formatDate value="${collect.invalidDate}" pattern="yyyy-MM-dd" /></span> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <c:if test="${collect.bookingFlag==0}">
            <div class="ordermessage">
                <div class="message">
                    <div style="margin-bottom:15px;">
                        <span class="rechargeorderinfo">
                            <label>充值金额：</label>
                            <span class="ordermoney" id="moneySum"><fmt:formatNumber type="number" value="${collect.collectMoney}" pattern="0.00" maxFractionDigits="2"/></span>
                        </span>
                        <span class="rechargeorderinfo">
                            <label>优惠金额：</label>
                            <c:if test="${collect.isMoney==1}">
                                <span class="discountmoney"><fmt:formatNumber type="number" value="${collect.ref2}" pattern="0.00" maxFractionDigits="2"/></span>
                            </c:if>
                            <c:if test="${collect.isMoney==0}">
                                <input type="text" value="${collect.ref2}" class="discountmoney" onkeyup="num(this)" onblur="changyhmoney(this)" onchange="changyhmoney(this)"/>
                            </c:if>
                         </span>
                    </div>
                    <c:if test="${collect.isMoney==1}">
                        <div>
                            <span class="rechargeorderinfo">
                                <label>收款单号：</label>
                                <span class="receiptbooking">${receipt.bookingId}</span>
                                <!--<input type="text" class="gathering receiptbooking"/>
                                <button class="btn btn-primary btn_check" data-loading-text="加载中...."  style="margin-bottom:3px;">检索</button>-->
                            </span>
                        </div>
                    </c:if>
                </div>
                <div class="message">
                    <div style="margin-bottom:15px;">
                          <span class="rechargeorderinfo">
                             <label>应收金额：</label>
                             <span class="oughtmoney"></span>
                         </span>
                    </div>
                    <c:if test="${collect.isMoney==1}">
                        <div>
                             <span class="rechargeorderinfo">
                                 <label>实收金额：</label>
                                 <span class="factgathermoney"><fmt:formatNumber type="number" value="${receipt.payMoney}" pattern="0.00" maxFractionDigits="2"/></span>
                             </span>
                        </div>
                    </c:if>
                </div>
                <div class="btngroup">
                    <c:if test="${collect.isMoney==0}">
                        <button class="btn btn-primary pull-right recheck" onclick="updateOrder()">保存 </button>
                        <button class="btn btn-default pull_right invalidbtn" onclick="invalidorder()" style="margin-right: 10px;">作废</button>
                    </c:if>
                    <c:if test="${collect.isMoney==1}">
                        <button class="btn btn-primary pull-right recheck" onclick="checkOrder()">复核</button>
                    </c:if>
                </div>
            </div>
        </c:if>
        <c:if test="${collect.bookingFlag==1}">
            <div class="ordermessage">
                <div class="message" style="width: auto; height:20px ">
                    <div style="margin-bottom:15px;">
                        <span class="rechargeorderinfo">
                            <label>充值金额：</label>
                            <span class="ordermoney"><fmt:formatNumber type="number" value="${collect.collectMoney}" pattern="0.00" maxFractionDigits="2"/></span>
                        </span>
                        <span class="rechargeorderinfo">
                            <label>优惠金额：</label>
                            <span class="ordermoney"><fmt:formatNumber type="number" value="${collect.ref2}" pattern="0.00" maxFractionDigits="2"/></span>
                        </span>
                        <span class="rechargeorderinfo">
                            <label>收款单号：</label>
                            <span class="ordermoney">${receipt.bookingId}</span>
                         </span>
                         <span class="rechargeorderinfo">
                            <label>实收金额：</label>
                            <span class="ordermoney"><fmt:formatNumber type="number" value="${receipt.payMoney}" pattern="0.00" maxFractionDigits="2"/></span>
                          </span>
                    </div>
                </div>
            </div>
        </c:if>
        <c:if test="${collect.bookingFlag==3}">
            <div class="ordermessage">
                <div class="message" style="width: auto; height:20px ">
                    <div style="margin-bottom:15px;">
                        <span class="rechargeorderinfo">
                            <label>充值金额：</label>
                            <span class="ordermoney"><fmt:formatNumber type="number" value="${collect.collectMoney}" pattern="0.00" maxFractionDigits="2"/></span>
                        </span>
                        <span class="rechargeorderinfo">
                            <label>优惠金额：</label>
                            <span class="ordermoney"><fmt:formatNumber type="number" value="${collect.ref2}" pattern="0.00" maxFractionDigits="2"/></span>
                        </span>
                    </div>
                </div>
            </div>
        </c:if>
        <div class="clearfloat"></div>
    </div>
    <div class="rechargecontent detailcontent">
        <div class="correctcontent">
            <div class="batchModify display">
                <p class="closebatch" onclick="hidebatchrecharge()"><a class="icon-remove"></a></p>
                <p class="alerdychose"><span>已选<a id="alreadyCheck">20</a>项</span></p>
                <p>
                    <span>批量修改金额</span>
                    <input type="text" id="batchMoney" placeholder="请输入金额" onkeyup="num(this)" onblur="changeinput(this)"/>
                    <a onclick="batchinput()">确认</a>
                </p>
                </ul>
                <div class="clearfloat"></div>
            </div>
            <table id="viptable">
            </table>
        </div>
    </div>
    <div id="print">

    </div>
    <!--复核确认-->
    <div class="modal fade" id="sureCheck" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel" >复核确认</h4>
                </div>
                <div class="modal-body">
                    <div class="validateform">
                        <label class="speclallab">输入支付密码</label>
                        <div class="reightText">
                            <input type="password" name="password" class="password"/>
                            <div class="errortoolip display">支付密码输入错误！</div>
                            <div class="withoutpassword">还没有支付密码？<a onclick="setpassword()">去设置</a></div>
                        </div>
                        <div class="clearfloat"></div>
                        <div class="dialogbtn rechargebtn">
                            <button class="btn btn-default"  data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary btn_search" data-loading-text="加载中..." onclick="savecheck(this)">确认充值</button>
                        </div>
                    </div>
                    <div class="setpassword display">
                        <label class="speclallab">输入支付密码</label>
                        <div class="reightText">
                            <input type="password"  name="newpassword"/>
                            <div class="errortoolip display">在6-18个字符之间！</div>
                        </div>
                        <div class="clearfloat"></div>
                        <label class="speclallab">确认支付密码</label>
                        <div class="reightText">
                            <input type="password" name="replaypassword"/>
                            <div class="errortoolip display">两次输入密码不一致！</div>
                        </div>
                        <div class="clearfloat"></div>
                        <div class="dialogbtn setpasswordbtn">
                            <button class="btn btn-default" onclick="backrecharge()">返回</button>
                            <button class="btn btn-primary btn-password">确认</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <!--复核确认-->
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
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/company/addrechargeOrder.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script>
        $(function () {
            basePath = "<%=basePath%>";
            bookingFlag = ${collect.bookingFlag};
            isMoney  = ${collect.isMoney};
            initBookingInfo();
        });
    </script>
    </body>
</html>
