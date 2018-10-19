/*------------------------------------------------------------------------------------------------------
 /*初始化生日活动信息
 -------------------------------------------------------------------------------------------------------*/
function  initBirth(){
    contentheight()//页面高度
    $("#birthdayTab").bootstrapTable({
        url: basePath+'platform/activity/birthday/all',
        method: 'get',      //请求方式（*）
        striped: true,      //是否显示行间隔色
        cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,     //是否显示分页（*）
        sortable: true,      //是否启用排序
        sortOrder: "asc",     //排序方式
        sidePagination: "client",   //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,      //初始化加载第一页，默认第一页
        pageSize: 10,      //每页的记录行数（*）
        pageList: [10, 20, 50, 100, 200, 500],  //可供选择的每页的行数（*）
        search: true,      //是否显示表格搜索
        clickToSelect: false,    //是否启用点击选中行
        showColumns:true,
        columns: [{
            title: "活动类型", field: "activityType", align: "left", valign: "middle", "width": "20%",
            formatter: function (value, row, index) {
                var html = "";
                var activityT = null;
                switch (row.activityType) {
                    case 0:
                        activityT = 0;
                        html = "消费送多倍积分";
                        break;
                    case 1:
                        activityT = 1;
                        html = "赠送生日优惠券";
                        break;
                    case 2:
                        activityT = 2;
                        html = "整单折扣";
                        break;
                    case 3:
                        activityT = 3;
                        html = "消费送多倍积分,赠送生日优惠券";
                        break;
                    case 4:
                        activityT = 4;
                        html = "消费送多倍积分,整单折扣";
                        break;
                    case 5:
                        activityT = 5;
                        html = "赠送生日优惠券,整单折扣";
                        break;
                    case 6:
                        activityT = 6;
                        html = "消费送多倍积分,赠送生日优惠券,整单折扣";
                        break;
                }
                return "<span data-avtivityType='" + activityT + "' >" + html + "</span>";

            }
        },
            {title: "活动批次", field: "privilegeBatch", align: "left", valign: "middle", "width": "10%", sortable: true},
            {
                title: "开始日期",
                field: "birthdayStartDate",
                align: "left",
                valign: "middle",
                "width": "10%",
                sortable: true
            },
            {title: "结束日期", field: "birthdayEndDate", align: "left", valign: "middle", "width": "10%", sortable: true},
            {title: "倍数", field: "multiple", align: "right", valign: "middle", "width": "5%", sortable: true},
            {title: "折扣率", field: "discountRate", align: "right", valign: "middle", "width": "8%", sortable: true},
            {title: "生日优惠券编码", field: "couponBatch", align: "left", valign: "middle", "width": "10%"},
            {title: "优惠券数量", field: "couponCount", align: "right", valign: "middle", "width": "8%", sortable: true},
            {
                title: "是否启用", field: "ref1", align: "center", valign: "middle", "width": "8%",
                formatter: function (value, row, index) {
                    var e = row.ref1 == 0 ? '<span>否</span>' : '<span>是</span>';
                    return e;
                }
            },
            {
                title: "操作", field: "isopen", align: "center", valign: "middle", "width": "9%",
                formatter: function (value, row, index) {
                    var e = '<a class="taboperate lastchid" data-reckey="' + row.recKey + '"onclick="edityhactive(\''+ row.recKey + '\')">编辑</a>';
                    return e;
                }
            }
        ]
    });
}
/*----------------------------------------------------------------------------------------
 /*查询过滤
 /*---------------------------------------------------------------------------------------*/
$('input:checkbox').click(function () {
    var duobei = $("#duobei").is(':checked');
    var birth = $("#birth").is(':checked');
    var zhekou = $("#zhekou").is(':checked');
    var ru = $("#useReady").is(':checked');
    var nu = $("#noUse").is(':checked');
    //类型
    var key=[];
    if (duobei && birth && zhekou)
        key.push(6);
    if (birth && zhekou)
        key.push(5);
    if (duobei && zhekou)
        key.push(4);
    if (duobei && birth)
        key.push(3);
    if (zhekou)
        key.push(2);
    if (birth)
        key.push(1);
    if (duobei)
        key.push(0);
    //状态
    var status=[];
    if (ru)
        status.push('1');
    if (nu)
        status.push('0');
    //搜索
    if(status.length==0&&key.length==0){
        $("#birthdayTab").bootstrapTable("filterBy",{});
    }else if(status.length>0&&key.length==0){
        $("#birthdayTab").bootstrapTable("filterBy",{ref1:status});
    }else if(status.length==0&&key.length>0){
        $("#birthdayTab").bootstrapTable("filterBy",{activityType:key});
    }else{
        $("#birthdayTab").bootstrapTable("filterBy",{ref1:status,activityType:key});
    }
});
/*----------------------------------------------------------------------------------------
 /*新增活动
 /*---------------------------------------------------------------------------------------*/
function addactive() {
    window.location.href = basePath+'platform/activity/birthday/new';
}
/*-----------------------------------------------------------------------------------------------------------------
/*选择活动类型 2018-06-27
------------------------------------------------------------------------------------------------------------------*/
function choseStatus(key,obj){
    var checked=$(obj).find('input').is(':checked');

    switch(key){
        case 0:
            checked==true?$(".intergralmutiple").show():$(".intergralmutiple").hide()
            break
        case 1:
            checked==true?$(".birthdaycoupon").show():$(".birthdaycoupon").hide()
            break
        case 2:
            checked==true?$(".discount").show():$(".discount").hide()
            break
    }
}
/*-----------------------------------------------------------------------------------------------------------------
/*初始化新增 2018-06-27
------------------------------------------------------------------------------------------------------------------*/
function initAdd(){
    //日历初始化
    calendar();
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
    contentheight();
}
/*-----------------------------------------------------------------------------------------------------------------
/*初始化修改 2018-07-02
------------------------------------------------------------------------------------------------------------------*/
function initModify(){
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
    contentheight();
}
/*-----------------------------------------------------------------------------------------------------------------
/*选择优惠券
------------------------------------------------------------------------------------------------------------------*/
function choseyhq(){
    couponBatch = $("input[name='couponBatch']").val();
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
    $("input[name='couponBatch']").val(coupons[0].couponBatch);
    $("#choseyhq").modal('hide');
}
/*----------------------------------------------------------------------------------------
 /*编辑活动
 /*---------------------------------------------------------------------------------------*/
function edityhactive(obj) {
    location.href = basePath+'platform/activity/birthday/modify?id='+obj;
}
/*-----------------------------------------------------------------------------------------------------------------
/*保存新增
------------------------------------------------------------------------------------------------------------------*/
function saveData() {
    if (!$('#duobei').attr("checked") && !$('#birth').attr("checked") && !$('#zhekou').attr("checked")) {
        erroMessage('至少选择一个活动类型');
        return
    }
    if ($('#duobei').attr("checked")) {
        if ($("#multiple").val() == "") {
            erroMessage('积分倍数不可为空！');
            return
        }
    }
    if ($('#birth').attr("checked")) {
        if ($("#couponBatch").val() == "") {
            erroMessage('请选择优惠券！');
            return
        }
        if ($("#couponCount").val() == "" || $("#couponCount").val() == 0) {
            erroMessage('请填写优惠券数量！');
            return
        }
    }
    if ($('#zhekou').attr("checked")) {
        if ($("#discountRate").val() == "") {
            erroMessage('请填写折扣率！');
            return
        }
    }

    //获取数据
    var ref1 = $('#isUse').is(':checked') ? 1 : 0;
    var duobei = $('#duobei').attr("checked");
    var birth = $('#birth').attr("checked");
    var zhekou = $('#zhekou').attr("checked");
    var activityType;
    if (duobei && birth && zhekou)
        activityType = "6";
    else if (birth && zhekou)
        activityType = "5";
    else if (duobei && zhekou)
        activityType = '4';
    else if (duobei && birth)
        activityType = '3';
    else if (zhekou)
        activityType = '2';
    else if (birth)
        activityType = '1';
    else if (duobei)
        activityType = '0';
    var birthday = $('#reservation').val().split(" - ");
    var birthdayStartDate = birthday[0].trim();
    var birthdayEndDate = birthday[1].trim();
    var multiple = $("#multiple").val() + "";
    var discountRate = $("#discountRate").val();
    var couponBatch = $("#couponBatch").val() ? $("#couponBatch").val() : "";
    var couponCount = $("#couponCount").val();
    var activeContent = "";
    if ($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html() != "") {
        activeContent = $(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html();
    }
    var remark = $("#remark").val() ? $("#remark").val() : "";
    var privilegeBatch= $("#privilegebatch").val();
    var jsonstr={privilegeBatch: privilegeBatch, activityType: activityType,birthdayStartDate: birthdayStartDate, birthdayEndDate: birthdayEndDate,
        multiple: multiple, discountRate: discountRate, couponBatch: couponBatch, couponCount: couponCount, activeContent: activeContent, remark: remark,
        ref1: ref1};
    $.ajax({
        type: "post",
        url: basePath+"platform/activity/birthday/save",
        data: JSON.stringify(jsonstr),
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        timeout: 20000,  //
        success: function (data) {
            if(data.status){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '保存成功',
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            location.href = basePath+'platform/activity/birthday';
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
                erroMessage("请求超时~请稍后重试");
            }else{
                erroMessage("初始化信息失败~请稍后重试");
            }
        }
    });
}

function updateData() {
    if (!$('#duobei').attr("checked") && !$('#birth').attr("checked") && !$('#zhekou').attr("checked")) {
        erroMessage('至少选择一个活动类型');
        return
    }
    if ($('#duobei').attr("checked")) {
        if ($("#multiple").val() == "") {
            erroMessage('积分倍数不可为空！');
            return
        }
    }
    if ($('#birth').attr("checked")) {
        if ($("#couponBatch").val() == "") {
            erroMessage('请选择优惠券！');
            return
        }
        if ($("#couponCount").val() == "" || $("#couponCount").val() == 0) {
            erroMessage('请填写优惠券数量！');
            return
        }
    }
    if ($('#zhekou').attr("checked")) {
        if ($("#discountRate").val() == "") {
            erroMessage('请填写折扣率！');
            return
        }
    }

    //获取数据
    var ref1 = $('#isUse').is(':checked') ? 1 : 0;
    var duobei = $('#duobei').attr("checked");
    var birth = $('#birth').attr("checked");
    var zhekou = $('#zhekou').attr("checked");
    var activityType;
    if (duobei && birth && zhekou)
        activityType = "6";
    else if (birth && zhekou)
        activityType = "5";
    else if (duobei && zhekou)
        activityType = '4';
    else if (duobei && birth)
        activityType = '3';
    else if (zhekou)
        activityType = '2';
    else if (birth)
        activityType = '1';
    else if (duobei)
        activityType = '0';
    var birthday = $('#reservation').val().split(" - ");
    var birthdayStartDate = birthday[0].trim();
    var birthdayEndDate = birthday[1].trim();
    var multiple = $("#multiple").val() + "";
    var discountRate = $("#discountRate").val();
    var couponBatch = $("#couponBatch").val() ? $("#couponBatch").val() : "";
    var couponCount = $("#couponCount").val();
    var activeContent = "";
    if ($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html() != "") {
        activeContent = $(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html();
    }
    if ($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html() != "") {
        activeContent = $(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html();
    }
    var remark = $("#remark").val() ? $("#remark").val() : "";
    var privilegeBatch= $("#privilegebatch").val();
    var recKey =  $("#recKey").val();
    var jsonstr={recKey:recKey,privilegeBatch: privilegeBatch, activityType: activityType,birthdayStartDate: birthdayStartDate, birthdayEndDate: birthdayEndDate,
        multiple: multiple, discountRate: discountRate, couponBatch: couponBatch, couponCount: couponCount, activeContent: activeContent, remark: remark,
        ref1: ref1};
    $.ajax({
        type: "post",
        url: basePath+"platform/activity/birthday/update",
        data: JSON.stringify(jsonstr),
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        timeout: 20000,  //
        success: function (data) {
            if(data.status){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '更新成功',
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            location.href = basePath+'platform/activity/birthday';
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
                erroMessage("请求超时~请稍后重试");
            }else{
                erroMessage("初始化信息失败~请稍后重试");
            }
        }
    });
}

/*-----------------------------------------------------------------------------------------------------------------
/*只能输入0-1
------------------------------------------------------------------------------------------------------------------*/
var lastnum=1;
function inputVerification(obj) {
    var re = /^([0-1]|([0][\.])|([0][\.][1-9]{1,2}))?$/;
    //如果输入框的没有通过验证
    if (!re.test($(obj).val())) {
        $(obj).val(lastnum);
        return;
    }
    lastnum=$(obj).val();
}
//日期改变时候判断
/*$('#reservation').on('apply.daterangepicker',function() {
    $("#yhqtab").bootstrapTable('destroy');
    $("#couponBatch").val("");
    $("#couponCount").val(0);
});*/

function inputBlur(obj){
    if($(obj).val()==""||$(obj).val()==0){
        if($(obj).val()==0) {
            erroMessage("折扣率不能为0");
        }
        $(obj).val(1);
        return;
    }
}
var smu=2;
function regmu(obj) {
    var reg = /(^\s?$)|^[0-9]*$/;
    if (!reg.test($(obj).val())) {
        $(obj).val(smu);
        return;
    }
    smu = $(obj).val();
}
var di=1;
//验证生日优惠券数量的有效性
function regbir(obj){
    var reg=/(^\s?$)|^[0-9]*$/;
    if(!reg.test($(obj).val())){
        $(obj).val(di);
        return;
    }
    smu= $(obj).val();
}
//倍数为空的时候默认为两倍
function mublur(obj){
    if($(obj).val()>999999999){
        $(obj).val(999999999);
    }
    if( $(obj).val()==""|| $(obj).val()==0){
        if($(obj).val()==0) {
            erroMessage("积分倍数不能为0");
        }
        $(obj).val(2);
    }
    smu= $(obj).val();
}
//验证优惠券数量在为空的时候赋值为1
function birblur(obj){
    if($("#couponBatch").val()==''){
        return;
    }
    if( $(obj).val()==""|| $(obj).val()==0){
        if($(obj).val()==0) {
            erroMessage("优惠券数量不能为0");
        }
        $(obj).val(1);
    }
    smu= $(obj).val();
}
//没有选择优惠券时点击数量改写数量给出提示
function birfocus(obj){
    if($("#couponBatch").val()==''){
        erroMessage('请先选择优惠券！');
        return;
    }
}
