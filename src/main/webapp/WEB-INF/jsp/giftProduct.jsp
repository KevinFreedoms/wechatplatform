<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>礼品信息</title>
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/giftManage.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content bodycont">
        <div class="tableft">
            <label>礼品类别：</label>
            <select id="category" class="categorylist">
                <option data-id="0">请选择..</option>
                <c:if test="${categories!=null && fn:length(categories)>0}">
                    <c:forEach var="category" items="${categories}">
                        <option data-id="${category.categoryId}">${category.categoryName}</option>
                    </c:forEach>
                </c:if>
                <c:if test="${categories==null || fn:length(categories)==0}">
                    <option data-id="0">请选择..</option>
                </c:if>
            </select>
            <a class="giftType">类别管理</a>
        </div>
        <button class="btn btn-primary addcoupon" onClick="addproduct()">
            <i class="icon-plus"></i>新增
        </button>
        <table id="giftproductTab">
        </table>
    </div>
    <!--类别管理-->
    <div class="modal fade" id="typemanage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">类别管理</h4>
                </div>
                <div class="modal-body">
                    <div class="typekind">类别类型：礼品</div>
                    <button class="btn btn-primary addcoupon" onClick="newaddType()">
                        <i class="icon-plus"></i>新增
                    </button>
                    <table id="typeTable">
                        <thead>
                        <th>类别名称</th>
                        <th>类别编码</th>
                        <th>启用状态</th>
                        <th>操作</th>
                        </thead>
                        <tbody id="typeTbody"></tbody>
                    </table>
                </div>
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
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/integration/gift.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            init();
        });
    </script>
</body>
</html>
