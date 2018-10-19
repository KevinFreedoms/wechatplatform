/*------------------------------------------------------------------------------------------------------
 /*初始化
 -------------------------------------------------------------------------------------------------------*/
var sortid = "";     //选择的类别
var  productId = ""; //选中的商品
function init(){
    //$('.selectpicker').selectpicker({
       // 'selectedText': 'cat'
   // });
    sortid = $('.selectpicker').children('option:selected').attr("data-id");
    //加载商品信息
    $("#wareinfoTab").bootstrapTable({
        url: basePath+'platform/product/all?id='+sortid,   //请求后台的URL（*）
        method: 'get',      //请求方式（*）
        striped: true,      //是否显示行间隔色
        cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,     //是否显示分页（*）
        sortable: false,      //是否启用排序
        sortOrder: "asc",     //排序方式
        sidePagination: "client",   //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,      //初始化加载第一页，默认第一页
        pageSize: 10,      //每页的记录行数（*）
        pageList: [10, 20, 50, 100, 200, 500],  //可供选择的每页的行数（*）
        search: true,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        clickToSelect: true,    //是否启用点击选中行
        columns: [
            {title: "图片", field: "productImg", align: "left", valign: "middle",width:"20%",
                formatter:function(value,row,index){
                    if (row.productImg==null){
                        var e = '<img src="'+basePath+'images/unfind.png" />';
                    }else{
                        var error ="'"+ basePath +"images/unfind.png'";
                        var e = '<img src="'+row.productImg+'" onerror="this.src='+error+'" style="height: 48px; width: 60px"/>';
                    }
                    return e;
                },
            },
            {title: "单品编码", field: "productId", align: "left", valign: "middle",width:"20%"},
            {title: "单品名称", field: "productName", align: "left", valign: "middle",width:"20%"},
            {title: "类别名称", field: "sortName", align: "left", valign: "middle",width:"20%"},
            {title: "基准单位", field: "unitName", align: "center", valign: "middle",width:"20%"},
        ],
        onClickRow: function (row,$element) {
            productName = row.productName;
            productId = row.productId;
            $(".table tr").removeClass("current");
            $element.addClass("current");
            getProductInfo(productId);
        }
    });
    //初始化页面高度
    contentheight();
    $(".selectpicker").change(function () {
        sortid = $(this).children('option:selected').attr("data-id");
        $('#wareinfoTab').bootstrapTable('refresh',{url: basePath+'platform/product/all?id='+sortid});
        $("#loadRightcontent").html('<div class="withoutquery"><i class="icon-info-sign"></i>请选择商品</div>');
    });
}
/*------------------------------------------------------------------------------------------------------
 /*获取单品明细
 -------------------------------------------------------------------------------------------------------*/
function getProductInfo(id){
    $.ajax({
        type: 'get',
        dataType: "json",
        data:{productId: id},
        url: basePath+'platform/product/img?id='+id,
        success: function (re) {
            if (re.status == 1) {
                var content = "";
                var count = 0;
                if (re.listSize > 0) {
                    for (var key in re.list) {
                        content += '<div class="media_cover loadimg">' +
                            '<div class="create_access" onmouseover="showbtn(this)"  onmouseout="hidebtn(this)">' +
                            '<img src=' + re.list[key].imageUrl + ' class="goodsimg" data-imageId=' + re.list[key].imageId + ' >' +
                            '<div class="operatebtn display">' +
                            '<a class="preview" onclick="preview(this)">预览</a>' +
                            '<a class="removeimg" onclick="removeimage(this)">删除</a></div>' +
                            '</div>' +
                            '</div>';
                        '</div>';
                    }
                }else if(re.listSize==0) {
                    count = 1;
                    content += '<div class="media_cover loadimg">' +
                        '<div class="create_access">' +
                        '<div class="add_gray_wrp">' +
                        '<img src="'+basePath+'images/uploadimg.png"/>' +
                        '<br>' +
                        '<input type="file" id="mFile" style="opacity: 0;width:inherit;height:180px;position:absolute;top:-50px;" name="mFile">' +
                        '<input type="text" class="uploadimg" value="格式：JPG,PNG"/>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                var foot = '</div>';
                var head = '<h4 class="goodsName">' + name + '</h4>' +
                    '<div class="uploadnum">商品图片（可上传<span style="color: #ff3434;">'+count+'</span>张）</div>';
                all = head + content + foot;
                $(".wareright").html(all);

            }else{
                erroMessage(re.Msg);
            }
        }, error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时~请稍后重试");
            }else{
                erroMessage("初始化信息失败~请稍后重试");
            }
        }
    });
}
/*------------------------------------------------------------------------------------------------------
 /*图片上传
 -------------------------------------------------------------------------------------------------------*/
/**********************************显示按钮*************************************************/
function showbtn(obj){
    $(obj).find(".operatebtn").removeClass("display")
}
/**********************************隐藏按钮*************************************************/
function hidebtn(obj){
    $(obj).find(".operatebtn").addClass("display")
}
/**********************************浏览按钮*************************************************/
function preview(obj){
    var imageUrl = $(obj).parent().parent().find("img").attr("src");
    $("#bigimages .modal-body>img").attr("src", imageUrl);
    $("#bigimages .modal-body>div").html(productName);
    $("#bigimages").modal('show')
}
/**********************************移除图片*************************************************/
function removeimage(obj){
    var temp='';
    temp='<div class="media_cover loadimg">'+
        '<div class="create_access" >'+
        '<div class="add_gray_wrp">'+
        '<img src="'+basePath+'images/uploadimg.png"/>'+
        '<br>'+
        '<input type="file" id="mFile" style="opacity: 0;width:inherit;height:180px;position:absolute;top:-50px;" name="mFile">' +
        '<input type="text" class="uploadimg" value="格式：JPG,PNG">'+
        '</div>'+
        '</div>'+
        '</div>'
    BootstrapDialog.show({
        title: '提示信息',
        message: '是否删除上传的图片？',
        buttons: [{
            label: '取消',
            cssClass: 'btn-warning',
            action: function(dialog) {
                dialog.close();
            }
        },
            {
                label: '删除',
                cssClass: 'btn-primary',
                action: function(dialog) {
                    var imageId = $(obj).parent().parent().find("img").attr("data-imageId");
                    var imageUrl = $(obj).parent().parent().find("img").attr("src");
                    var params = {
                        productId: productId,
                        imageUrl: imageUrl,
                        imageId: imageId
                    };
                    $.ajax({
                        type: 'post',
                        dataType: "json",
                        url: basePath+'platform/product/delete',
                        data: params,
                        success: function (data) {
                            if (data.status == 1) {
                                $(obj).parent().parent().parent().remove();
                                $("#loadRightcontent").append(temp);
                            }
                        }
                    });
                    dialog.close();
                }
            }]
    });
}
var me = null;
$('#loadRightcontent').on('click', '.media_cover', function () {
    me = $(this);
});
$('#loadRightcontent').on('change', 'input[type=file]', function () {
    var flag = image_check($(this).val());
    if (!flag) {
        $(this).val("");
    }
    if (flag) {
        ajax_upload($(this), me);
        var html =
            '<div class="create_access">' +
            '<div class="add_gray_wrp">' +
            '<div class="progress progress-striped active">' +
            '<div class="progress-bar progress-bar-success " role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">' +
            '<span class="sr-only"></span>' +
            '</div>' +
            '</div>' +
            '<br>' +
            '<div class="canceluoload"></div>' +
            '</div>' +
            '</div>';
        me.find(".create_access").remove();
        me.append(html);
    }
});

/***********************上传的ajax******************/
function ajax_upload(e, me) { //具体的上传图片方法 frid 为得到的图片名称e为当前点击的对象
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    locid = staff.locId;
    $.ajaxFileUpload({
        fileElementId: e.attr("id"),    //需要上传的文件域的ID，即<input type="file">的ID。
        url: basePath+'platform/product/upLoad', //后台方法的路径
        type: 'post',   //当要提交自定义参数时，这个参数要设置成post
        dataType: 'json',   //服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断。
        secureuri: false,   //是否启用安全提交，默认为false。
        data: {productId: productId,locId:locid,imageType:0},
        async: true,   //是否是异步
        success: function (data) {
            if (data.status == 1) {
                var html =
                    '<div class="create_access" onmouseover="showbtn(this)"  onmouseout="hidebtn(this)">' +
                    '<img src=' + data.path + ' class="goodsimg" data-imageId=' + data.imageId + ' >' +
                    '<div class="operatebtn display">' +
                    '<a class="preview" onclick="preview(this)">预览</a>' +
                    '<a class="removeimg" onclick="removeimage(this)">删除</a></div>' +
                    '</div>' +
                    '</div>';
                me.find(".create_access").remove();
                me.append(html);
            }
            if (data.status == 0) {
                var html =
                    '<div class="create_access" >' +
                    '<div class="add_gray_wrp">' +
                    '<img src="'+basePath+'images/faile.png"/>' +
                    '<br>' +
                    '<div class="loadimgfaile">' +
                    '<span class="uploadfaile">'+data.Msg+'</span>' +
                    '<input type="text" class="uploadimg reupload" value="请刷新" onclick="refresh()">' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                me.find(".create_access").remove();
                me.append(html);
            }
        },
        error: function (data,status,e) {  //提交失败自动执行的处理函数。
            if(status == "error"&&JSON.stringify(data)==='{}'){
                reUpLoad(me,'系统繁忙');
            }
        }
    });
}
function reUpLoad(me,message) {
    var html =
        '<div class="create_access" >' +
        '<div class="add_gray_wrp">' +
        '<img src="'+basePath+'images/faile.png"/>' +
        '<br>' +
        '<div class="loadimgfaile">' +
        '<span class="uploadfaile">'+message+'</span>' +
        '<input type="file" id="mFile" style="opacity: 0;width:inherit;height:180px;position:absolute;top:-117px;" name="mFile">' +
        '<input type="text" class="uploadimg reupload" value="重新上传">' +
        '</div>' +
        '</div>' +
        '</div>';
    me.find(".create_access").remove();
    me.append(html);
}
function image_check(feid) {
    feid = feid.toLocaleLowerCase();
    return /.(jpg|png)$/.test(feid) ? true : (function () {
        alert('图片格式仅支持jpg、png格式。');
        return false;
    })();
}
$("#wareinfoTab").on('page-change.bs.table', function (e, number, size) {
    $("#loadRightcontent").html('<div class="withoutquery"><i class="icon-info-sign"></i>请选择商品</div>');
});
function refresh(){
    getProductInfo(productId);
}