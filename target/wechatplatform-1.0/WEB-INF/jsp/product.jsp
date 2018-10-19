<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>商品信息</title>
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-select.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/ware.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content warecontent">
        <div class="col-lg-9 wareleft">
            <div class="tableft">
                <label>商品分类：</label>
                <label for="id_select"></label>
                <select id="id_select" class="selectpicker">
                    <option data-id="0">请选择..</option>
                    <c:if test="${sorts!=null && fn:length(sorts)>0}">
                        <c:forEach var="sort" items="${sorts}">
                            <option data-id="${sort.sortId}">${sort.sortName}</option>
                        </c:forEach>
                    </c:if>
                </select>
            </div>
            <table id="wareinfoTab">
            </table>
        </div>
        <div class="wedget"></div>
        <div class="col-lg-3 wareright" id="loadRightcontent">
            <div class="withoutquery"><i class="icon-info-sign"></i>请选择商品</div>
        </div>
        <div class="clearfloat"></div>
    </div>
    <!--图片预览-->
    <div class="modal fade" id="bigimages" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <img src="" alt="First slide">
                    <div class="goodname"></div>
                </div>
            </div>
        </div>
    </div>
    <!--图片预览-->
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
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-select.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/page/ajaxFileUpload.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/product/product.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            init();
        });
    </script>
</body>
</html>
