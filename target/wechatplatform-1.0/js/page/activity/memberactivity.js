/*------------------------------------------------------------------------------------------------------
 /*初始化会员卡活动信息
 -------------------------------------------------------------------------------------------------------*/
function initMember(){
    contentheight();
    $("#vipcardactiveTab").bootstrapTable({
        url: basePath+'platform/activity/member/all',
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
        search: true,      //是否显示表格搜索
        clickToSelect: false,    //是否启用点击选中行
        showColumns:true,
        columns: [{title: "活动类型", field: "couponBatch", align: "left", valign: "middle",
                formatter:function(value,row,index){
                    var e='赠送优惠券';
                    return e;
                }
            },
            {title: "活动批次", field: "privilegeBatch", align: "left", valign: "middle"},
            {title: "优惠券编码", field: "couponBatch", align: "left", valign: "middle"},
            {title: "优惠券数量", field: "couponCount", align: "right", valign: "middle"},
            {title: "创建时间", field: "createDate", align: "left", valign: "middle"},
            {title: "创建人", field: "createUser", align: "left", valign: "middle"},
            {title: "更新时间", field: "lastUpdateDate", align: "left", valign: "middle"},
            {title: "更新人", field: "lastUpdateUser", align: "left", valign: "middle"},
            {title: "备注", field: "remark", align: "center", valign: "middle"},
            {title: "操作", field: "", align: "right", valign: "middle",
                formatter:function(value,row,index){
                    var e='<a data-reckey="'+row.recKey+'" onclick="editactive(\''+ row.privilegeBatch + '\')">编辑</a>';
                    return e;
                }
            }
        ]
    });
    //初始化优惠券信息
    $("#yhqtab").bootstrapTable({
        url: basePath+"platform/coupon/collect?couponType=99&ref2=1&receiveType=5",
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
        search: true,
        singleSelect : true,
        clickToSelect: false,    //是否启用点击选中行
        showColumns:true,
        columns: [
            {checkbox: true,width:"5%"},
            {title: "优惠券批次", field: "couponBatch", align: "center", valign: "middle",width:"10%" },
            {title: "优惠券类型", field: "couponType", align: "left", valign: "middle",width:"10%",
                formatter:function(value,row,index){
                    var e = row.couponType==0?"代金券":"折扣菜券";
                    return e;
                }
            },
            {title: "发行类型", field: "lssueType", align: "left", valign: "middle",width:"10%",
                formatter:function(value,row,index){
                    var e = row.lssueType==0?"日期范围":"有效期";
                    return e;
                }
            },
            {title: "有效期", field: "validtime", align: "left", valign: "middle",width:"20%",
                formatter: function (value, row, index) {
                    var lssueType=row.lssueType;
                    var e='';
                    if(lssueType==0){
                        e=row.startDate.substring(0,10)+' - '+row.endDate.substring(0,10);
                    }else{
                        e=row.ref1;
                    }
                    return e;
                }
            },
            {title: "最大发行量", field: "maxPublishQuantity", align: "left", valign: "middle",width:"10%"},
            {title: "已发行量", field: "publishedQuantity", align: "left", valign: "middle",width:"10%"}
        ]
    });
}

/*------------------------------------------------------------------------------------------------------
/*更新活动
-------------------------------------------------------------------------------------------------------*/
function editactive(obj){
    $.ajax({
        type: "get",
        url:basePath+"platform/activity/member/get?id="+obj,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                row = data.act;
                $('.privilegeBatch').val(row.privilegeBatch);
                $('.couponBatch').val(row.couponBatch);
                $('.couponCount').val(row.couponCount);
                $('.remark').val(row.remark);
                $("#editactive").modal();
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
/*------------------------------------------------------------------------------------------------------
/*取消优惠券选择
-------------------------------------------------------------------------------------------------------*/
function choseyhq(){
    couponBatch =  $('.couponBatch').val();
    if(couponBatch!=""){
        $("#yhqtab").bootstrapTable("uncheckAll");
        $("#yhqtab").bootstrapTable("checkBy", {field:"couponBatch", values:[couponBatch]})
    }
    $("#choseyhq").modal();
}
/*-----------------------------------------------------------------------------------------------------------------
/*选择优惠券确定
------------------------------------------------------------------------------------------------------------------*/
function selectedyhq(){
    coupons=  $("#yhqtab").bootstrapTable('getAllSelections');
    if(coupons.length==0){
        erroMessage("请选择优惠券");
        return false;
    }
    $('.couponBatch').val(coupons[0].couponBatch);
    $("#choseyhq").modal('hide');
}

function saveactive(){
    var privilegeBatch = $('.privilegeBatch').val();
    var couponBatch = $('.couponBatch').val();
    var couponCount = $('.couponCount').val();
    var remark =  $('.remark').val();
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    var staffId = staff.staffId;
    collectjson={"privilegeBatch":privilegeBatch,"couponBatch":couponBatch,"couponCount":couponCount,"remark":remark,"lastUpdateUser":staffId};
    $.ajax({
        type: "post",
        url: basePath+"platform/activity/member/modify",
        data:JSON.stringify(collectjson),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                $("#editactive").modal('hide');
                $("#vipcardactiveTab").bootstrapTable('refresh');
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