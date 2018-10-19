/*------------------------------------------------------------------------------------------------------
 /*初始化
 -------------------------------------------------------------------------------------------------------*/
var categoryId="";
var gifeType=[];//类别信息
var globalVariable=1;//保存状态 0:表示可编辑状态  1：表示不可编辑状态
var locid = ""; //门店编号
var bookingflag = 0; //0:表示类别查询 1：新增类别 2：修改类别
var locarry=[];//已选门店
var allloc = []; //所有门店
var locAround="";//门店范围
var ismodify = 0; //判断是否是编辑状态
function init(){
    bookingflag = 0;
    categoryId = $('.categorylist').children('option:selected').attr("data-id");
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    locid = staff.locId;
    //初始化单品信息
    $("#giftproductTab").bootstrapTable({
        url: basePath+'platform/gift/query?id='+categoryId,   //请求后台的URL（*）
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
        showColumns:true,
        columns: [
            {title: "图片", field: "img", align: "left", valign: "middle",
                formatter:function(value,row,index){
                    if (row.imageUrl==null){
                        var e = '<img src="'+basePath+'images/unfind.png" />';
                    }else{
                        var e = '<img src='+row.imageUrl+' />';
                    }
                    return e;
                },
            },
            {title: "编码", field: "commodityId", align:"left", valign: "middle"},
            {title: "名称", field: "commodityName", align:"left", valign: "middle"},
            {title: "类别名称", field: "categoryName", align:"left", valign: "middle"},
            {title: "类别编码", field: "categoryId", align:"center", valign: "middle"},
            {title: "单位", field: "unit", align:"center", valign: "middle"},
            {
                field: 'isUsing',
                title: '状态',
                valign: 'middle',
                align:"center",
                formatter:function(value,row,index){
                    var e = row.isUsing==1?"启用":"停用";
                    return e;
                }
            },
            {title: "兑换积分",field:"integral", align:"right", valign:"middle"},
            {title: "上架日期",field:"startDate", align:"right", valign:"middle",
                formatter:function(value,row,index){
                    // var e = '<img src='+row.imageUrl+' />';
                    if(row.startDate==''||row.startDate==null){
                        var e='无';
                    }else{
                        var e=ChangeDateFormat(row.startDate);
                    }
                    return e;
                },

            },
            {title: "下架日期",field:"endDate", align:"right", valign: "middle",
                formatter:function(value,row,index){
                    // var e = '<img src='+row.imageUrl+' />';
                    if(row.endDate==''||row.endDate==null){
                        var e='无';
                    }else{
                        var e=ChangeDateFormat(row.endDate);
                    }
                    return e;
                },
            },
            {title: "库存数量",field:"totalQuantity", align:"right", valign: "middle"},
            {title: "已售数量",field:"totalSale", align:"right", valign: "middle"},
            /*{
                field: 'createUser',
                title: '创建人',
                valign: 'middle',
                align:"center"
            }, {
                field: 'createDate',
                title: '创建时间',
                valign: 'middle',
                align:"center",
                formatter:function(value,row,index){
                    var date =fmtDate(row.createDate);
                    return date;
                }
            },{
                field: 'lastUpdateUser',
                title: '更新人',
                valign: 'middle',
                align:"center"
            },{
                field: 'lastUpdateDate',
                title: '更新时间',
                valign: 'middle',
                align:"center",
                formatter:function(value,row,index){
                    var date =fmtDate(row.lastUpdateDate);
                    return date;
                }
            },*/
            {title: "操作",field:"operate", align:"center", valign: "middle",
                formatter:function(value,row,index){
                    /*var e ='<a class="taboperate" onclick="editgiftpro(this)">编辑</a><a class="taboperate" onclick="removegift(this)">删除</a>'*/
                    var e ='<a class="taboperate" onclick="editgiftpro(this)">编辑</a>'
                    return e;
                  },
              },
          ],
      });
      //初始化类别
      $("#typeTable").bootstrapTable({
          url: basePath+'platform/gift/category',   //请求后台的URL（*）
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
          columns: [{title: "类别名称", field: "categoryName", align:"left", valign: "middle",width:'40%'},
              {title: "类别编码", field: "categoryId", align:"left", valign: "middle",width:'22%',sortable: true,},
              {title: "启用状态", field: "openstatus", align:"left", valign: "middle",width:'22%',
                  formatter:function(value,row,index){
                      var e='';
                      var flag=row.flag;
                      if(flag=='0'){
                          e = row.isUsing==0?'<span>禁用</span>':'<span>启用</span>';
                          return e;
                      }
                      if(flag=='1'){
                          e=' <label class="radiobeuty" data-id="1">'+
                              '<input class="defaultradio" type="radio" name="typestatu\''+index+'\'" checked>'+
                              '<span class="radioInput"></span>启用'+
                              '</label>'+
                              '<label class="radiobeuty" data-id="0">'+
                              '<input class="defaultradio" type="radio" name="typestatu\''+index+'\'" >'+
                              '<span class="radioInput"></span>禁用'+
                              '</label>'
                          return e;
                      }
                  },
              },
              {title: "操作", field: "operate", align:"center", valign: "middle",width:'16%',
                  formatter:function(value,row,index){
                      var e='';
                      var statu=row.isUsing;
                      var flag=row.flag;
                      if(flag=='0'){
                          e = '<a class="taboperate" onclick="editCategory(this,'+statu+','+flag+','+index+')">编辑</a><a class="taboperate" onclick="deleteType(this)">删除</a>';
                      }
                      if(flag=='1'){
                          var typename='';
                          var typecode='';
                          e ='<a class="taboperate" onclick="saveCategory(this,'+statu+','+flag+','+index+')">保存</a><a class="taboperate" onclick="cancel(this,\''+typename+'\',\''+typecode+'\','+statu+','+flag+','+index+')">取消</a>'
                      }
                      return e;
                  },
              },
          ],
      })
      //初始化页面高度
      contentheight();
  }
/*--------------------------------------------------------------------------------------------
* 门店管理
---------------------------------------------------------------------------------------------*/
function chosestore(){
    //拼接选择门店
    $("#storetab").bootstrapTable("uncheckAll");
    for(var i=0;i<locarry.length;i++ ){
        $("#storetab").bootstrapTable("checkBy", {field:"locId", values:[locarry[i].locId]});
    }
    $("#dianxuanshu").html(locarry.length);
    $("#storeradius").modal({backdrop: 'static', keyboard: false});
}
/*--------------------------------------------------------------------------------------------
* 类别管理
---------------------------------------------------------------------------------------------*/
$(".giftType").click(function() {
    $("#typemanage").modal();
    $('#typeTable').bootstrapTable('refresh');
    globalVariable=1;
});
/*-----------------------------------------------------------------------------------------------------
 * 类别切换
 -------------------------------------------------------------------------------------------------------*/
$(".categorylist").change(function () {
    categoryId = $(this).children('option:selected').attr("data-id");
    if(0==bookingflag){
        $('#giftproductTab').bootstrapTable('refresh',{url: basePath+'platform/gift/query?id='+categoryId});
    }else if(1==bookingflag){
        if ($(".create_access .goodsimg").is(":visible")){
            BootstrapDialog.show({
                title: '提示信息',
                message: "切换类别后会清空之前上传的图片!,是否继续",
                buttons: [{
                    label: '确定',
                    cssClass: 'btn-primary',
                    action: function(dialog) {
                        dialog.close();
                        showCommidtyId();
                        var temp=' <div class="pull-left leftlabel"><label class="defaultLabel">商品图片：</label></div>\n' +
                            '            <div class="pull-left rightcont">\n' +
                            '                <div class="media_cover loadimg">\n' +
                            '                    <div class="create_access">\n' +
                            '                        <div class="add_gray_wrp">\n' +
                            '                            <img src="'+basePath+'images/uploadimg.png"/>\n' +
                            '                            <br>\n' +
                            '                            <input type="file" id="mFile" name="mFile"/>\n' +
                            '                            <input type="text" class="uploadimg" value="格式：JPG,PNG" disabled></input>\n' +
                            '                        </div>\n' +
                            '                    </div>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '            <div class="clearfloat"></div>'
                        $('#loadRightcontent').html(temp);
                    }
                },{
                    label: '取消',
                    cssClass: 'btn-primary',
                    action: function(dialog) {
                        dialog.close();
                        return false;
                    }
                } ]
            });
        }else{
            showCommidtyId();
        }
    }else if(2==bookingflag){

    }

});
/*-----------------------------------------------------------------------------------------------------
 * 新增类别
 -------------------------------------------------------------------------------------------------------*/
function newaddType(){
    if(globalVariable==0){
        erroMessage('请保存当前数据！');
        return false;
    }
    // 从后台获取类别编码
    $.ajax({
        type: "get",
        url: basePath+"platform/gift/addcategory",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                globalVariable=0;
                gifeType = data.category;
                $("#typeTable").bootstrapTable('insertRow', {
                    index: 0,
                    row: {
                        categoryName: '<input type="text" class="form-control small" value="" autofocus>',
                        categoryId: gifeType.categoryId,
                        isUsing:'0',
                        flag:1
                    }
                });
            }else{
                erroMessage(data.Msg);
            }
        },
        error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时,请稍后重试");
            }else{
                erroMessage("获取失败");
            }
        }
    });
}
/*-----------------------------------------------------------------------------------------------------
 * 保存类别
 -------------------------------------------------------------------------------------------------------*/
function saveCategory(obj,statu,flag,index){
    var temp='';
    var jqtd=$(obj).parent().parent();
    var typeName=jqtd.find('td').eq('0').find('input').val();
    var typecode=jqtd.find('td').eq('1').text();
    var status=jqtd.find('td').eq('2').find('input:checked').parent().attr('data-id');
    if(status=='0'){
        statu=0;
    }else{
        statu=1;
    }
    statu==0?temp='禁用':temp='启用';
    if(typeName==""){
        erroMessage('类别名称不可为空！');
        return false;
    }
    modifyCategory(typecode,typeName,statu);
}
function editCategory (obj,statu,flag,index) {
    if(globalVariable==0){
        erroMessage('请保存当前数据！');
        return false;
    }
    globalVariable=0;
    // var statu=statu;
    var temp='';
    var jqtd=$(obj).parent().parent();
    var typeName=jqtd.find('td').eq('0').text();
    var typecode=jqtd.find('td').eq('1').text();
    if(statu==0){
        temp=' <label class="radiobeuty" data-id="1">'+
            '<input class="defaultradio" type="radio" name="typestatu\''+index+'\'">'+
            '<span class="radioInput"></span>启用'+
            '</label>'+
            '<label class="radiobeuty" data-id="0">'+
            '<input class="defaultradio" type="radio" name="typestatu\''+index+'\'" checked>'+
            '<span class="radioInput"></span>禁用'+
            '</label>'
    }else{
        temp=' <label class="radiobeuty" data-id="1">'+
            '<input class="defaultradio" type="radio" name="typestatu\''+index+'\'" checked>'+
            '<span class="radioInput"></span>启用'+
            '</label>'+
            '<label class="radiobeuty" data-id="0">'+
            '<input class="defaultradio" type="radio" name="typestatu\''+index+'\'">'+
            '<span class="radioInput"></span>禁用'+
            '</label>'
    }
    jqtd.find('td').eq('0').html('<input type="text" class="form-control small" value='+typeName+'>');
    jqtd.find('td').eq('1').html(typecode);
    jqtd.find('td').eq('2').html(temp);
    jqtd.find('td').eq('3').html('<a class="taboperate" onclick="saveCategory(this,'+statu+','+flag+','+index+')">保存</a><a class="taboperate" onclick="cancel(this,\''+typeName+'\',\''+typecode+'\','+statu+','+flag+','+index+')">取消</a>')

}
function modifyCategory(typecode,typeName,statu){
    var isUsing =statu?1:0;
    var collectjson = {"categoryId":typecode,"categoryName":typeName,"isUsing":isUsing,"createUser":locid};
    $.ajax({
        type: "POST",
        url: basePath+"platform/gift/modifycategory",
        data:JSON.stringify(collectjson),
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                globalVariable=1;
                $('#typeTable').bootstrapTable('refresh');
                //更新列表框
                categories=data.categories;
                str = "";
                for (var i in categories){
                    var categoryId= categories[i].categoryId;
                    var categoryName= categories[i].categoryName;
                    var isUsing= categories[i].isUsing;
                    if(isUsing==1){
                        str += '<option data-id="'+categoryId+'">'+categoryName+'</option>';
                    }
                }
                $('.categorylist').html(str);
                categoryId = $('.categorylist').children('option:selected').attr("data-id");
                $('#giftproductTab').bootstrapTable('refresh',{url:basePath+'platform/gift/query?id='+categoryId});
            }else{
                erroMessage(data.Msg);
            }

        },
        error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时,请稍后重试");
            }else{
                erroMessage("获取失败");
            }
        }
    });
}
/*-----------------------------------------------------------------------------------------------------
 * 取消类别
 -------------------------------------------------------------------------------------------------------*/
function cancel(obj,typeName,typecode,statu,flag,index){
    if(flag=='0'){//之前有的
        globalVariable=1;
        var temp='';
        statu==0?temp='禁用':temp='启用';
        var jqtd=$(obj).parent().parent();
        jqtd.find('td').eq('0').html(typeName);
        jqtd.find('td').eq('1').html(typecode);
        jqtd.find('td').eq('2').html(temp);
        jqtd.find('td').eq('3').html('<a class="taboperate" onclick="editCategory(this,'+statu+','+flag+','+index+')">编辑</a><a class="taboperate" onclick="deleteType(this)">删除</a>')
    }else{
        globalVariable=1;
        $(obj).parent().parent().remove();
    }
    $('#typeTable').bootstrapTable('refresh');
}
//删除类别
function deleteType(obj){
    if(globalVariable==0){
        erroMessage('请保存当前数据！');
        return false;
    }
    var jqtd = $(obj).parent().parent();
    var typecode = jqtd.find('td').eq('1').text();
    BootstrapDialog.show({
        title: '提示信息',
        message: '是否确认删除?',
        buttons: [{
            label: '确定',
            cssClass: 'btn-primary',
            action: function (dialog) {
                deleteCategory(typecode);
                dialog.close();
            }
        }, {
            label: '取消',
            action: function (dialog) {
                dialog.close();
            }
        }
        ]
    });
}
// 删除类别方法
function deleteCategory(typecode){
    $.ajax({
        type: "get",
        url: basePath+"platform/gift/deletecategory?categoryId="+typecode,
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                erroMessage("删除成功");
                globalVariable=1;
                $('#typeTable').bootstrapTable('refresh');
                //更新列表框
                categories=data.categories;
                str = "";
                for (var i in categories){
                    var categoryId= categories[i].categoryId;
                    var categoryName= categories[i].categoryName;
                    var isUsing= categories[i].isUsing;
                    if(isUsing==1){
                        str += '<option data-id="'+categoryId+'">'+categoryName+'</option>';
                    }
                }
                $('.categorylist').html(str);
                categoryId = $('.categorylist').children('option:selected').attr("data-id");
                $('#giftproductTab').bootstrapTable('refresh',{url:basePath+'platform/gift/query?id='+categoryId});
            }else{
                erroMessage(data.Msg);
            }
        },
        error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时,请稍后重试");
            }else{
                erroMessage("获取失败");
            }
        }
    })
}
/*---------------------------------------------------------------------------------------------------
 * 新增礼品
 -----------------------------------------------------------------------------------------------------*/
function addproduct(){
    categoryId = $('.categorylist').children('option:selected').attr("data-id");
    if(categoryId==0){
        erroMessage("尚未添加礼品类别，请先添加");
        return false;
    }
    window.location.href=basePath+'platform/gift/add'
}
function showCommidtyId(){
    categoryId = $('.categorylist').children('option:selected').attr("data-id");
    var commodityId=$("#commodityId").val();
    $.ajax({
        type: 'get',
        dataType: "json",
        url: basePath+'platform/gift/createcommodity?id='+commodityId+'&cateid='+categoryId,
        success: function (re) {
            if (re.status == 1) {
                $("#commodityId").val(re.commodityId);
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
/*---------------------------------------------------------------------------------------------------
 * 编辑礼品
 -----------------------------------------------------------------------------------------------------*/
function editgiftpro(obj){
    var  commodityId=$(obj).parent().parent().find('td').eq('1').text();
    window.location.href=basePath+'platform/gift/edit?id='+commodityId;
}
/*---------------------------------------------------------------------------------------------------
 * 删除礼品
 -----------------------------------------------------------------------------------------------------*/
function removegift(obj){
    var that=$(obj);
    BootstrapDialog.show({
        title: '提示信息',
        message: '是否删除礼品！',
        buttons: [{
            label: '取消',
            cssClass: 'btn-default',
            action: function(dialog) {
                dialog.close();
            }
        },
            {
                label: '删除',
                cssClass: 'btn-primary',
                action: function(dialog) {
                    dialog.close();
                    deleteCommodityId(that);

                }
            }
        ]
    });
}
function deleteCommodityId(that){
    var commodityId=that.parent().parent().find("td").eq(1).text();
    $.ajax({
        type: "post",
        url: "deleteCommodityId.do",
        data:{'commodityId':commodityId},
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                that.parent().parent().remove();
                // typeManage();
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '删除成功',
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                        }
                    }
                    ]
                });
            }else{
                erroMessage(data.Msg);
            }
        },
        error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时,请稍后重试");
            }else{
                erroMessage("获取失败");
            }
        }
    });
}
/*------------------------------------------------------------------------------------------------------
 /*初始化新增单品
 -------------------------------------------------------------------------------------------------------*/
function  initadd(){
    bookingflag = 1;
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    locid = staff.locId;
    calendar()//日历初始化
    $(".reservation").val(nowtime())
    $(".reservation").daterangepicker({
        singleDatePicker: true,//设置成单日历
        format: 'YYYY-MM-DD',
        startDate: nowtime(),
    });
    //初始化门店
    $("#storetab").bootstrapTable({
        url: basePath+'platform/gift/loc',   //请求后台的URL（*）
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
            {checkbox: true,width:"10%"},
            {title: "行号", field: "recKey", align: "center", valign: "middle",width:"20%"},
            {title: "门店编码", field: "locId", align: "center", valign: "middle",width:"30%"},
            {title: "门店名称", field: "locName", align: "center", valign: "middle",width:"50%"},

        ],
        onCheckAll:function(rows){
            $(".loccheckcount").html(rows.length);
        },
        onCheck:function(row){
            var list =  $("#storetab").bootstrapTable('getAllSelections');
            $(".loccheckcount").html(list.length);
        },
        onUncheck: function (rows) {
            var list =  $("#storetab").bootstrapTable('getAllSelections');
            $(".loccheckcount").html(list.length);
        },
        onUncheckAll: function (rows) {
            var list =  $("#storetab").bootstrapTable('getAllSelections');
            $(".occheckcount").html(list.length);
        },onLoadSuccess:function(data){
            allloc = data;
            $("#loctallcount").html(data.length);
        },
    })
    //初始化类别
    $("#typeTable").bootstrapTable({
        url: basePath+'platform/gift/category',   //请求后台的URL（*）
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
        columns: [{title: "类别名称", field: "categoryName", align:"left", valign: "middle",width:'40%'},
            {title: "类别编码", field: "categoryId", align:"left", valign: "middle",width:'22%',sortable: true,},
            {title: "启用状态", field: "openstatus", align:"left", valign: "middle",width:'22%',
                formatter:function(value,row,index){
                    var e='';
                    var flag=row.flag;
                    if(flag=='0'){
                        e = row.isUsing==0?'<span>禁用</span>':'<span>启用</span>';
                        return e;
                    }
                    if(flag=='1'){
                        e=' <label class="radiobeuty" data-id="1">'+
                            '<input class="defaultradio" type="radio" name="typestatu\''+index+'\'" checked>'+
                            '<span class="radioInput"></span>启用'+
                            '</label>'+
                            '<label class="radiobeuty" data-id="0">'+
                            '<input class="defaultradio" type="radio" name="typestatu\''+index+'\'" >'+
                            '<span class="radioInput"></span>禁用'+
                            '</label>'
                        return e;
                    }
                },
            },
            {title: "操作", field: "operate", align:"center", valign: "middle",width:'16%',
                formatter:function(value,row,index){
                    var e='';
                    var statu=row.isUsing;
                    var flag=row.flag;
                    if(flag=='0'){
                        e = '<a class="taboperate" onclick="editCategory(this,'+statu+','+flag+','+index+')">编辑</a><a class="taboperate" onclick="deleteType(this)">删除</a>';
                    }
                    if(flag=='1'){
                        var typename='';
                        var typecode='';
                        e ='<a class="taboperate" onclick="saveCategory(this,'+statu+','+flag+','+index+')">保存</a><a class="taboperate" onclick="cancel(this,\''+typename+'\',\''+typecode+'\','+statu+','+flag+','+index+')">取消</a>'
                    }
                    return e;
                },
            },
        ],
    })
}

//获取已选的门店--选择门店的确定按钮
function getCheckloc(){
    locarry=  $("#storetab").bootstrapTable('getAllSelections');
    $('.tagsinput').importTags('');
    for(var i=0;i<locarry.length;i++) {
        locname = locarry[i].locName;
        $(".tagsinput").addTag(locname,{focus:false,callback:false});
    }
    $("#dianxuanshu").html(locarry.length);
    $("#storeradius").modal('hide');
}
//确定数组的行号
function rowOfloc(val,list){
    for(var i = 0; i < list.length; i++){
        if(list[i].locName== val){return list[i].recKey;}
    }
    return -1;
}
//确定数组的索引
function indexOfloc(val,list){
    for(var i = 0; i < list.length; i++){
        if(list[i].locName== val){return i;}
    }
    return -1;
}
//根据门店编号获取
function getloc(id){
    for(var i = 0; i < allloc.length; i++){
        if(allloc[i].locId== id){
            return allloc[i];
        }
    }
    return null;
}
/*------------------------------------------------------------------------------------------------------
 /*初始化修改单品
 -------------------------------------------------------------------------------------------------------*/
function  initedit(){
    bookingflag = 2;
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    locid = staff.locId;
    $(".reservation").daterangepicker({
        singleDatePicker: true,//设置成单日历
        format: 'YYYY-MM-DD'
    });
    //初始化门店
    $("#storetab").bootstrapTable({
        url: basePath+'platform/gift/loc',   //请求后台的URL（*）
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
            {checkbox: true,width:"10%"},
            {title: "行号", field: "recKey", align: "center", valign: "middle",width:"20%"},
            {title: "门店编码", field: "locId", align: "center", valign: "middle",width:"30%"},
            {title: "门店名称", field: "locName", align: "center", valign: "middle",width:"50%"},

        ],
        onCheckAll:function(rows){
            $(".loccheckcount").html(rows.length);
        },
        onCheck:function(row){
            var list =  $("#storetab").bootstrapTable('getAllSelections');
            $(".loccheckcount").html(list.length);
        },
        onUncheck: function (rows) {
            var list =  $("#storetab").bootstrapTable('getAllSelections');
            $(".loccheckcount").html(list.length);
        },
        onUncheckAll: function (rows) {
            var list =  $("#storetab").bootstrapTable('getAllSelections');
            $(".occheckcount").html(list.length);
        },onLoadSuccess:function(data){
            allloc = data;
            //拼接选择门店
            if(locAround!=""){
                var arrlocAround=locAround.split(",");
                for(var i=0;i<arrlocAround.length;i++ ){
                    var jsonloc=getloc(arrlocAround[i]);
                    $("#storetab").bootstrapTable("checkBy", {field:"locId", values:[arrlocAround[i]]});
                    $(".tagsinput").addTag(jsonloc.locName,{focus:false,callback:false});
                    locarry.push(jsonloc);
                }
            }
            $("#dianxuanshu").html(locarry.length);
            $("#loctallcount").html(data.length);
        },
    })
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
    var productName=$("#commodityName").val();
    $("#bigimages .modal-body>img").attr("src", imageUrl);
    $("#bigimages .modal-body>div").html(productName);
    $("#bigimages").modal('show')
}
/**********************************移除图片*************************************************/
function removeimage(obj){
    var productId=$("#commodityId").val();
    BootstrapDialog.show({
        title: '提示信息',
        message: '是否删除上传的图片？',
        buttons: [{
            label: '取消',
            cssClass: 'btn-warning',
            action: function(dialog) {
                dialog.close();
            }
        },{
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
    var productId=$("#commodityId").val();
    $.ajaxFileUpload({
        fileElementId: e.attr("id"),    //需要上传的文件域的ID，即<input type="file">的ID。
        url: basePath+'platform/product/upLoad', //后台方法的路径
        type: 'post',   //当要提交自定义参数时，这个参数要设置成post
        dataType: 'json',   //服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断。
        secureuri: false,   //是否启用安全提交，默认为false。
        data: {productId: productId,locId:locid,imageType:1},
        async: true,   //是否是异步
        success: function (data) {
            if (data.status == 1) {
                var html =//'<div class="media_cover loadimg">'+
                    '<div class="create_access" onmouseover="showbtn(this)"  onmouseout="hidebtn(this)">' +
                    '<img src=' + data.path + ' class="goodsimg" data-imageId=' + data.imageId + ' >' +
                    '<div class="operatebtn display">' +
                    '<a class="preview" onclick="preview(this)">预览</a>' +
                    '<a class="removeimg" onclick="removeimage(this)">删除</a></div>' +
                    '</div>' +
                    '</div>';
                //'</div>';
                me.find(".create_access").remove();
                me.append(html);
                var temp='';
                temp='<div class="media_cover loadimg"  >'+
                    '<div class="create_access">'+
                    '<div class="add_gray_wrp">'+
                    '<img src="'+basePath+'images/uploadimg.png"/>'+
                    '<br>' +
                    '<input type="text" class="uploadimg" value="格式：JPG,PNG" disabled></input>' +
                    '<input type="file" id="mFile" name="mFile"/>' +
                    '</div>' +
                    '</div>' +
                    '</div>'+
                    '</div>'+
                    '</div>'
                me.parent().append(temp);
                me.unbind('click');
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
        erroMessage('图片格式仅支持jpg、png格式。');
        return false;
    })();
}
function saveData(){
    var commodityId=$("#commodityId").val();
    var commodityName=$("#commodityName").val();
    if(commodityName==null||commodityName==''){
        erroMessage("商品名称不能为空");
        return false;
    }
    var categoryId=$("#category").find("option:checked").attr("data-id");
    var categoryName=$("#category").find("option:checked").val();
    var unit=$("#unit").val();
    if(unit==null||unit==''){
        erroMessage("单位不能为空");
        return false;
    }
    var spec=$("#spec").val();
    var description=$("#description").val();
    var otherDescription=$(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html();
    var salePrice=$("#salePrice").val();
    if(salePrice==null||salePrice==''){
        erroMessage("商品原价不能为空");
        return false;
    }
    var integral=$("#integral").val();
    if(integral==null||integral==''){
        erroMessage("兑换积分不能为空");
        return false;
    }
    var isUsing=Number($("input[name='open']:checked").attr('data-id'));
    var startDate=$("#startDate").val();
    var endDate=$("#endDate").val();
    var totalQuantity=$("#totalQuantity").val();
    if(totalQuantity==null||totalQuantity==''){
        erroMessage("库存数量不能为空");
        return false;
    }
    locAround='';
    for (var i in locarry){
        if (i==0){
            locAround=locarry[i].locId;
        }else{
            locAround=locAround+","+locarry[i].locId;
        }
    }
    var contentMsg  = ismodify==0?"保存成功":"更新成功";
    var totalSale=$("#totalSale").val();
    var remark=$("#remark").val();
    var commodityJson={"commodityId":commodityId,"commodityName":commodityName,"categoryId":categoryId,
        "categoryName":categoryName,"unit":unit,"spec":spec,
        "description":description,"otherDescription":otherDescription,
        "salePrice":salePrice,"integral":integral,"isUsing":isUsing,"startDate":startDate,
        "endDate":endDate,"totalQuantity":totalQuantity,
        "totalSale":totalSale,"remark":remark,ref1:locAround,"createUser":locid};
    $.ajax({
        type: "post",
        url: basePath+"platform/gift/save",
        data:JSON.stringify(commodityJson),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: contentMsg,
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            unloadnum=1;
                            window.location.href=basePath+'platform/gift/m';
                        }
                    }
                    ]
                });
            }else{
                erroMessage(data.Msg);
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
function notsave(){
    window.location.href=basePath+'platform/gift/m';
}
/*------------------------------------------------------------------------------------------------------
 /*初始化编辑单品
 -------------------------------------------------------------------------------------------------------*/
// 日期格式转换
function ChangeDateFormat(jsondate) {
    var date = new Date(parseInt(jsondate, 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getMilliseconds() / 1000 < 10 ? "0" + parseInt(date.getMilliseconds() / 1000) : parseInt(date.getMilliseconds() / 1000);
    return date.getFullYear() + "-" + month + "-" + currentDate;
}