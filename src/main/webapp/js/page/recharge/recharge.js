/*------------------------------------------------------------------------------------------------------
 /*初始化充值规则
 -------------------------------------------------------------------------------------------------------*/
var isnew = 1; //是否新增
var temp = new Base64();
function initRule() {
    $("#rechargeTab").bootstrapTable({
        url: basePath+'platform/recharge/rule/all',   //请求后台的URL（*）
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
        search: true,      //是否显示表格搜索，此搜索是客户端搜索
        clickToSelect: false,    //是否启用点击选中行
        showColumns:true,
        columns: [
            {title: "活动编码", field: "recKey", align: "center", valign: "middle",width:"10%"},
            {title: "活动类型", field: "ref1", align: "center", valign: "middle",width:"10%"},
            {title: "是否赠送<br>金额", field: "isMoney", align: "center", valign: "middle",width:"5%",
                formatter:function(value,row,index){
                    var e = "";
                    e = row.isMoney==0?'<span>否</span>':'<span>是</span>'
                    return e;
                }
            },
            {title: "是否赠送<br>优惠券", field: "isCoupon", align: "center", valign: "middle",width:"5%",
                formatter:function(value,row,index){
                    var e = "";
                    e = row.isCoupon==0?'<span>否</span>':'<span>是</span>'
                    return e;
                }
            },
            {title: "充值金额", field: "money", align: "center", valign: "middle",width:"10%"},
            {title: "赠送金额", field: "presentMoney", align: "center", valign: "middle",width:"10%"},
            {title: "实充金额", field: "actualMoney", align: "center", valign: "middle",width:"10%"},
            {title: "优惠券编码", field: "couponBatch", align: "center", valign: "middle",width:"10%",
                formatter:function(value,row,index){
                    var e=row.couponBatch==""?'<span>-</span>':'<span>'+row.couponBatch+'</span>'
                    return e;
                }
            },
            {title: "优惠券数量", field: "couponCount", align: "center", valign: "middle",width:"10%",
                formatter:function(value,row,index){
                    var e=row.couponBatch==""?'<span>-</span>':'<span>'+row.couponCount+'</span>'
                    return e;
                }
            },
            {title: "是否显示", field: "isShow", align: "center", valign: "middle",width:"5%",
                formatter:function(value,row,index){
                    var e=row.isShow==0?'<span>否</span>':'<span>是</span>'
                    return e;
                }
            },
            {title: "操作", field: "operate", align: "center", valign: "middle",width:"15%",
                formatter:function(value,row,index){
                    var e = '<a data-toggle="tooltip" title="编辑" class="icon-edit tooltips" onclick="modifyrule(\''+ row.recKey + '\')" data-delay="100"></a>'+
                        '<a data-toggle="tooltip" title="删除" class="icon-trash tooltips lookdetail" onclick="deleterule(\''+ row.recKey + '\')" data-delay="100"></a>'
                    return e;
                }}
        ],
    });
    //初始化页面高度
    contentheight();
}
/*------------------------------------------------------------------------------------------------------
 /*初始化充值规则
 -------------------------------------------------------------------------------------------------------*/
$("input[name='filterdata']").click(function() {
    var flag = $(this).attr("data-id");
    if(flag==1){
        $("#rechargeTab").bootstrapTable("filterBy",{isMoney:1});
    }else if(flag==2){
        $("#rechargeTab").bootstrapTable("filterBy",{isCoupon:1});
    }else{
        $("#rechargeTab").bootstrapTable("filterBy",{});
    }
});
/*------------------------------------------------------------------------------------------------------
 /*增加充值规则
 -------------------------------------------------------------------------------------------------------*/
function addrule(){
    window.location.href= basePath +'platform/recharge/rule/new';
}
/*------------------------------------------------------------------------------------------------------
 /*修改充值规则
 -------------------------------------------------------------------------------------------------------*/
function modifyrule(obj){
    window.location.href= basePath +'platform/recharge/rule/modify?id='+obj;
}
/*------------------------------------------------------------------------------------------------------
 /*删除充值规则
 -------------------------------------------------------------------------------------------------------*/
function deleterule(obj){
    BootstrapDialog.show({
        title: '提示信息',
        message: '确定删除您选中的充值规则么？',
        buttons: [{
            id: 'btn-close',
            icon: 'glyphicon glyphicon-remove',
            label: '关闭',
            action: function(dialogItself){
                dialogItself.close();
            }
        },{
            id: 'btn-ok',
            icon: 'glyphicon glyphicon-check',
            label: '确定',
            cssClass: 'btn-primary',
            action: function(dialogItself){
                dialogItself.close();
               doDeleteRule(obj);
            }
        }]
    });
};

function doDeleteRule(obj) {
    $.ajax({
        type: "post",
        url: basePath+"platform/recharge/rule/delete",
        data:{"id":obj},
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1||data.status=='1'){
                $('#rechargeTab').bootstrapTable('refresh');
            }else{
                erroMessage(data.Msg);
            }
        },
        error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时,请稍后重试!");
            }else{
                erroMessage("初始化信息失败,请稍后重试!");
            }
        }
    });
}
/*------------------------------------------------------------------------------------------------------
 /*初始化新增
 -------------------------------------------------------------------------------------------------------*/
function initAdd(){
    isnew = 1;
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
    //初始化优惠券
    contentheight();
}
function initModify(){
    isnew = 0;
    var key = $("input[name=active]:checked").attr("data-id");
    if(key=='0'){
        $(".choseyhq").hide();
        $(".present").show()
    }else if(key=='1'){
        $(".choseyhq").show();
        $(".present").hide();
    }
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
    //初始化优惠券
    contentheight();
}

function checkCoupon(){
    coupons=  $("#yhqtab").bootstrapTable('getAllSelections');
    if(coupons.length==0){
        erroMessage("请选择优惠券");
        return false;
    }
    $("input[name='couponBatch']").val(coupons[0].couponBatch);
    $("#choseyhq").modal('hide');
}
/*------------------------------------------------------------------------------------------------------
 /*保存充值规则
 -------------------------------------------------------------------------------------------------------*/
function saveData(){
    var id = $("input[name=active]:checked").attr("data-id");
    var isShow = $("input[name=yhqtype]:checked").attr("data-id");
    money = $("input[name='money']").val();
    if(Number(money)==0){
        erroMessage("充值金额不能为0");
        return false;
    }
    if(id=='0'){
        //赠送金额
        presentMoney = $("input[name='presentMoney']").val();
        actualMoney =  $("input[name='actualMoney']").val();
        isMoney=1;
        isCoupon = 0;
        couponBatch = "";
        couponCount = 0;
    }else{
        presentMoney = 0;
        actualMoney =  money;
        couponBatch = $("input[name='couponBatch']").val();
        couponCount = $("input[name='couponCount']").val();
        if(couponBatch==""){
            erroMessage("请选择赠送的优惠券");
            return false;
        }
        if(Number(couponCount)==0){
            erroMessage("赠送优惠券数量不能为0");
            return false;
        }
        isMoney=0;
        isCoupon = 1;
    }
    remark = $("textarea[name='remark']").val();
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    staffId = staff.staffId;
    collectjson={"money":money,"presentMoney":presentMoney,"actualMoney":actualMoney,"isShow":isShow,"isCoupon":isCoupon,"isMoney":isMoney,"couponCount":couponCount,"couponBatch":couponBatch,"remark":remark,"createUser":staffId,"lastUpdateUser":staffId};
    $.ajax({
        type: "post",
        url: basePath+"platform/recharge/rule/save",
        data: JSON.stringify(collectjson),
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        timeout: 20000,
        beforeSend:function(){
            $('#loading', window.parent.document).modal();
        },
        success: function (data) {
            $('#loading', window.parent.document).modal('hide');
            if(data.status){
                window.location.href= basePath +"platform/recharge/rule";
            }else{
                erroMessage(data.Msg);
            }
        },
        error: function (request, status, err) {
            $('#loading', window.parent.document).modal('hide');
            if (status == "timeout")
            {
                erroMessage("请求超时~请稍后重试");
            }else{
                erroMessage("初始化信息失败~请稍后重试");
            }
        }
    });
}
function  notsave() {
    window.location.href= basePath +"platform/recharge/rule";
}
/*------------------------------------------------------------------------------------------------------
 /*更新充值规则
 -------------------------------------------------------------------------------------------------------*/
function updateData(){
    var id = $("input[name=active]:checked").attr("data-id");
    var isShow = $("input[name=yhqtype]:checked").attr("data-id");
    money = $("input[name='money']").val();
    if(Number(money)==0){
        erroMessage("充值金额不能为0");
        return false;
    }
    if(id=='0'){
        //赠送金额
        presentMoney = $("input[name='presentMoney']").val();
        actualMoney =  $("input[name='actualMoney']").val();
        isMoney=1;
        isCoupon = 0;
        couponBatch = "";
        couponCount = 0;
    }else{
        presentMoney = 0;
        actualMoney =  money;
        couponBatch = $("input[name='couponBatch']").val();
        couponCount = $("input[name='couponCount']").val();
        if(couponBatch==""){
            erroMessage("请选择赠送的优惠券");
            return false;
        }
        if(Number(couponCount)==0){
            erroMessage("赠送优惠券数量不能为0");
            return false;
        }
        isMoney=0;
        isCoupon = 1;
    }
    remark = $("textarea[name='remark']").val();
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    staffId = staff.staffId;
    recKey = $("input[name='recKey']").val();
    collectjson={"recKey":recKey,"money":money,"presentMoney":presentMoney,"actualMoney":actualMoney,"isShow":isShow,"isCoupon":isCoupon,"isMoney":isMoney,"couponCount":couponCount,"couponBatch":couponBatch,"remark":remark,"createUser":staffId,"lastUpdateUser":staffId};
    $.ajax({
        type: "post",
        url: basePath+"platform/recharge/rule/update",
        data: JSON.stringify(collectjson),
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        timeout: 20000,  //
        success: function (data) {
            if(data.status){
                window.location.href= basePath +"platform/recharge/rule";
            }else{
                erroMessage(data.Msg);
            }
        },
        error: function (request, status, err) {
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
 /*保存充值规则
 -------------------------------------------------------------------------------------------------------*/
function choseyhq(){
    couponBatch = $("input[name='couponBatch']").val();
    if(couponBatch!=""){
        $("#yhqtab").bootstrapTable("uncheckAll");
        $("#yhqtab").bootstrapTable("checkBy", {field:"couponBatch", values:[couponBatch]})
    }
    $("#choseyhq").modal();
}
function choseactive(key){
    if(key=='0'){
        $(".choseyhq").hide();
        $(".present").show()
    }else if(key=='1'){
        $(".choseyhq").show();
        $(".present").hide();
        if(isnew==1){
            var money = $("input[name='money']").val();
            money = Number(money) == money ? Number(money) : 0;
            if(money==0){
                $("input[name='money']").val(0);
            }
            $("input[name='presentMoney']").val(0);
            $("input[name='actualMoney']").val(money);
        }
    }
}
//更新金额
function numMoney(obj){
    var count = obj.value.replace(/[^\d.]/g,"");//清除"数字"和"."以外的字符
    obj.value = Number(count) == count ? Number(count) : 0;

    var money = $("input[name='money']").val();
    money = Number(money) == money ? Number(money) : 0;
    if(money==0){
        $("input[name='money']").val(0);
    }

    var presentMoney = $("input[name='presentMoney']").val();
    presentMoney = Number(presentMoney) == presentMoney ? Number(presentMoney) : 0;
    if(presentMoney==0){
        $("input[name='presentMoney']").val(0);
    }

    actualMoney = money + presentMoney;
    $("input[name='actualMoney']").val(actualMoney);
}