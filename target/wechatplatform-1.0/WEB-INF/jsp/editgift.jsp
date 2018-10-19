<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>新增礼品</title>
    <!--bootstrap-->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>assets/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/bootstrap-table.css" rel="stylesheet" type="text/css" />
    <!--bootstrap dialog-->
    <link href="<%=basePath%>css/bootstrap-dialog.css" rel="stylesheet" type="text/css" />
    <!--calendar-->
    <link href="<%=basePath%>js/dbcalendar/daterangepicker-bs3.css" rel="stylesheet" type="text/css"/>
    <!--在线编辑-->
    <link href="<%=basePath%>js/kindeditior/themes/default/default.css" rel="stylesheet">
    <!--page-->
    <link href="<%=basePath%>css/page/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/common.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath%>css/page/giftManage.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="content">
        <div class="functionTitle">
            <h4>编辑礼品</h4>
            <a href="<%=basePath%>platform/gift/m">返回</a>
            <div class="clearfloat"></div>
        </div>
        <div class="bodycont addgiftpro">
            <h4>基本信息</h4>
            <div class="col-md-4">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>商品类别：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" class="category" value="${commodity.categoryId}" id="category" disabled>
                </div>
            </div>
            <div class="col-md-8">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>支付方式：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" value="积分兑换" disabled>
                </div>
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-4">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>商品编码：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" class="commodityId" id="commodityId" value="${commodity.commodityId}" disabled>
                </div>
            </div>
            <div class="col-md-8">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>兑换积分：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" id="integral" value="${commodity.integral}" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
                </div>
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-4">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>商品名称：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" value="${commodity.commodityName}" id="commodityName">
                </div>
            </div>
            <div class="col-md-8">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>商品原价：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" id="salePrice" value="${commodity.salePrice}"  onkeyup='num(this)'><span style="color:#999999">元</span>
                </div>
            </div>
            <div class="clearfloat"></div>

            <div class="col-md-4">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>单位：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" id="unit" value="${commodity.unit}" >
                </div>
            </div>
            <div class="col-md-8">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>上架日期：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" readonly name="reservation" class="reservation " id="startDate" value="<fmt:formatDate value="${commodity.startDate}" pattern="yyyy-MM-dd" />">
                    <i class="icon-calendar"></i>
                </div>
            </div>
            <div class="clearfloat"></div>

            <div class="col-md-4">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>库存数量：</label></div>
                <div class="pull-left rightcont">
                   <input type="text" id="totalQuantity" onkeyup='this.value=this.value.replace(/\D/gi,"")' value="${commodity.totalQuantity}">
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-8">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>下架日期：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" readonly name="reservation" class="reservation " id="endDate" value="<fmt:formatDate value="${commodity.endDate}" pattern="yyyy-MM-dd" />">
                    <i class="icon-calendar"></i>
                </div>
            </div>
            <div class="clearfloat"></div>
            <div class="col-md-12 ">
                <div class="pull-left leftlabel"><label class="defaultLabel">启用状态：</label></div>
                <div class="pull-left rightcont">
                    <label class="radiobeuty">
                        <input class="defaultradio" type="radio" name="open" data-id="1" ${commodity.isUsing eq 1?"checked":""}>
                        <span class="radioInput"></span>是
                    </label>
                    <label class="radiobeuty">
                        <input class="defaultradio" type="radio" name="open" data-id="0" ${commodity.isUsing eq 0?"checked":""}>
                        <span class="radioInput"></span>否
                    </label>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-12">
                <div class="pull-left leftlabel"><label class="defaultLabel"><span class="importantinfo">*</span>门店范围：</label></div>
                <div class="pull-left rightcont" style="width:80%">
                    <input type="text" readonly value="门店范围" class="btninput" onClick="chosestore()">
                    <div class="suitstore">
                        <input name="tagsinput" id="tagsinput" class="tagsinput" value="" readonly/>
                        <div class="chosenum">共选<span class="loccheckcount">0</span>项</div>
                        <div class="clearfloat"></div>
                    </div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-12">
                <div class="pull-left leftlabel"><label class="defaultLabel">备注：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" class="remark" id="remark" value="${commodity.remark}"/>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-12" id="loadRightcontent">
                <div class="pull-left leftlabel"><label class="defaultLabel">商品图片：</label></div>
                <div class="pull-left rightcont">
                    <c:if test="${imagelist!=null && fn:length(imagelist)>0}">
                        <c:forEach var="image" items="${imagelist}">
                            <div class="media_cover loadimg">
                                <div class="create_access" onmouseover="showbtn(this)"  onmouseout="hidebtn(this)">
                                    <img src='${image.imageUrl}' class="goodsimg" data-imageId='${image.imageId}' >
                                    <div class="operatebtn display">
                                        <a class="preview" onclick="preview(this)">预览</a>
                                        <a class="removeimg" onclick="removeimage(this)">删除</a></div>
                                </div>
                            </div>
                        </c:forEach>
                    </c:if>
                    <div class="media_cover loadimg">
                        <div class="create_access">
                            <div class="add_gray_wrp">
                                <img src="<%=basePath%>images/uploadimg.png"/>
                                <br>
                                <input type="file" id="mFile" name="mFile"/>
                                <input type="text" class="uploadimg" value="格式：JPG,PNG" disabled></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <h4>商品详情</h4>
            <div class="col-md-12">
                <div class="pull-left leftlabel"><label class="defaultLabel">规格：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" class="stand" id="spec" value="${commodity.spec}"/>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-12">
                <div class="pull-left leftlabel"><label class="defaultLabel">简单描述：</label></div>
                <div class="pull-left rightcont">
                    <input type="text" class="remark" id="description" value="${commodity.description}"/>
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="col-md-12">
                <div class="pull-left leftlabel"><label class="defaultLabel">其他说明编辑：</label></div>
                <div class="pull-left rightcont">
                    <textarea id="editor_id" name="content" style="width:57%;height:350px;visibility:hidden;margin-left:10px;">
                        ${commodity.otherDescription}
                    </textarea>
                </div>
                <div class="clearfloat"></div>
            </div>
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
        <div class="surebtn">
            <button class="btn btn-primary" onclick="saveData()">更新</button>
            <button class="btn btn-default" onclick="notsave()">取消</button>
        </div>
    </div>
    <!--选择门店-->
    <div class="modal fade" id="storeradius" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel1">选择门店</h4>
                </div>
                <div class="modal-body">
                    <table id="storetab" class="table table-striped">
                    </table>
                </div>
                <div class="modal-footer">
                    <span class="alerdychose">已选：<span class="loccheckcount">0</span>/<span id="loctallcount"></span></span>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" onclick="getCheckloc()">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--选择门店-->
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
    <!--calendar-->
    <script type="text/javascript" src="<%=basePath%>js/dbcalendar/moment.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/dbcalendar/daterangepicker.js"></script>
    <!--bootstrap table-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-table-zh-CN.min.js"></script>
    <!--在线编辑-->
    <script type="text/javascript" src="<%=basePath%>js/kindeditior/kindeditor.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/kindeditior/zh_CN.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/jquery.tagsinput.js"></script>
    <!--bootstrap dialog-->
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-dialog.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/bootstrap/common-scripts.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/page/ajaxFileUpload.js"></script>
    <!---page-->
    <script>
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/base.js?"+Math.random()+"'></scr"+"ipt>");
        document.write("<s"+"cript type='text/javascript' src='<%=basePath%>js/page/integration/gift.js?"+Math.random()+"'></scr"+"ipt>");
    </script>
    <script type="text/javascript">
        $(function () {
            basePath = "<%=basePath%>";
            ismodify = 1;
            initedit();
        });
        locAround = '${commodity.ref1}';
        $('.tagsinput').tagsInput({
            width:'100%',
            'interactive':false,
            onRemoveTag:function(tag){
                var row = Number(rowOfloc(tag,locarry));
                row = row-1;
                $("#storetab").bootstrapTable('uncheck', row);
                //移除
                var index = indexOfloc(tag,locarry)
                locarry.splice(index,1);
                $(".occheckcount").html(locarry.length);
            }
        });
        /*-----------------------------------------------------------------------------------------------------------------
         /*编辑器
         ------------------------------------------------------------------------------------------------------------------*/
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
                    'justifyfull', 'indent', 'outdent','fullscreen','formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 	                'bold','italic', 'underline', 'strikethrough', 'lineheight',  'image', 'multiimage','|' ,'table', 'hr', 'emoticons', 'pagebreak','link', 'unlink'
                ]
            });
        });

    </script>
</body>
</html>
