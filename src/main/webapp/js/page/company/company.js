/*------------------------------------------------------------------------------------------------------
 /*初始化单位信息
 -------------------------------------------------------------------------------------------------------*/
var locid = "";     //员工所属门店编号
var companyid = ""; //企业编码
var companyname="";//企业名称
var isstaffmodify = 0; //判断员工是否是编辑状态
var setting = {
    check: {
        enable: true,
        chkDisabledInherit: true
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};
var temp = new Base64();
function initCompany(){
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    locid = staff.locId;
    $('.companyTable').bootstrapTable({
        url: basePath+'platform/company/all?id='+locid,   //请求后台的URL（*）
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
        columns: [ {
            field: 'companyId',
            title: '单位编码',
            valign: 'middle'
        }, {
            field: 'companyName',
            title: '单位名称',
            valign: 'middle'
        }, {
            field: 'contactAddress',
            title: '地址',
            valign: 'middle'
        }, {
            field: 'contactWay',
            title: '联系方式',
            valign: 'middle'
        } ,{
            field: 'status',
            title: '状态',
            valign: 'middle',
            formatter:function(value,row,index){
                var e = row.status==1?"启用":"停用";
                return e;
            }
        }, {
            field: 'createUserId',
            title: '创建人',
            valign: 'middle'
        }, {
            field: 'createDate',
            title: '创建时间',
            valign: 'middle',
            formatter:function(value,row,index){
                var date =fmtDate(row.createDate);
                return date;
            }
        },{
            field: 'lastUpdateUserId',
            title: '更新人',
            valign: 'middle'
        },{
            field: 'lastUpDate',
            title: '更新时间',
            valign: 'middle',
            formatter:function(value,row,index){
                var date =fmtDate(row.lastUpDate);
                return date;
            }
        },{
            field: 'companyId',
            title: '操作',
            valign: 'middle',
            align: 'center',
            formatter:function(value,row,index){
                var e ='<a class="taboperate" href="javascript:void(0);" mce_href="javascript:void(0);" onclick="exportExcel(\''+ row.companyId + '\',\''+ row.companyName + '\')">导出Excel模板</a><a class="taboperate lastchid" href="javascript:void(0);" mce_href="javascript:void(0);" onclick="edit(\''+ row.companyId + '\')">编辑</a>';
                return e;
            }
        }]
    });
    //初始化页面高度
    contentheight();
}
/*------------------------------------------------------------------------------------------------------
 /*新增单位
 -------------------------------------------------------------------------------------------------------*/
$(".btn_addCompany").click(function() {
    $('.label_warning').html("");
    $.ajax({
        type: "get",
        url: basePath+"platform/company/new",
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                var company = data.company;
                $("input[name='companyId']").val(company.companyId);
                //显示门店信息
                var locs = data.locs;
                var content="";
                for(var i=0;i<locs.length;i++) {
                    content += "<option value='" + locs[i].locId + "'>" + locs[i].locName + "</option>";
                }
                $("#loclist").html(content);
                $("#loclist").val(locid);
                //显示
                $("input[name='recKey']").val("");
                $("input[name='companyName']").val("");
                $("input[name='contactPerson']").val("");
                $("textarea[name='contactAddress']").val("");
                $("input[name='contactWay']").val("");
                $("textarea[name='remark']").val("");
                $('#myModalLabel').html("新增单位");
                $('.label_warning').html("");
                $("#addcompany").modal();
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
});
/*------------------------------------------------------------------------------------------------------
 /*保存更新 2018-04-09
 -------------------------------------------------------------------------------------------------------*/
$(".btn-sure").click(function() {
    $('.label_warning').html("");
    var companyName = $("input[name='companyName']").val();
    if(companyName==""){
        $('.label_warning').html("错误提示：单位名称不能为空!");
        return false;
    }
    var phone = $("input[name='contactWay']").val();
    if(phone==""){
        $('.label_warning').html("错误提示：联系方式不能为空!");
        return false;
    }
    var r=/^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
    if(!r.test(phone)){
        $('.label_warning').html('错误提示：号码格式错误,固话需加区号和符号‘-’');
        return false;
    };
    var contactPerson = $("input[name='contactPerson']").val();
    if(contactPerson==""){
        $('.label_warning').html("错误提示：单位联系人不能为空!");
        return false;
    }
    var companyId = $("input[name='companyId']").val();
    var recKey = $("input[name='recKey']").val();
    var status = $("input[name='status']:checked").val();
    var remark = $("textarea[name='remark']").val();
    var contactAddress = $("textarea[name='contactAddress']").val();
    collectjson={"recKey":recKey,"companyId":companyId,"companyName":companyName,"contactPerson":contactPerson,"contactWay":phone,
        "contactAddress":contactAddress,"locId":locid,"status":status,"remark":remark};
    $.ajax({
        type: "post",
        url: basePath+"platform/company/update",
        data: JSON.stringify(collectjson),
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        timeout: 20000,  //
        success: function (data) {
            if(data.status){
                $("#addcompany").modal('hide');
                $('.companyTable').bootstrapTable('refresh');
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
});
/*------------------------------------------------------------------------------------------------------
 /*导出企业充值单
 -------------------------------------------------------------------------------------------------------*/
function exportExcel(obj1,obj2){
    $('#loading', window.parent.document).modal();
    $(".taboperate").attr("href",basePath+"platform/company/execl?companyId="+obj1+"&companyName="+obj2);
    $('#loading', window.parent.document).modal('hide');
}
/*------------------------------------------------------------------------------------------------------
 /*获取企业信息
 -------------------------------------------------------------------------------------------------------*/
function edit(obj){
    $.ajax({
        type: "get",
        url: basePath+"platform/company/get?id="+obj,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                var company = data.company;
                if(company.status==1){
                    $("#raUsing").attr("checked","checked");
                }else{
                    $("#raUnUsing").attr("checked","checked");
                }
                $("input[name='recKey']").val(company.recKey);
                $("input[name='companyId']").val(company.companyId);
                $("input[name='companyName']").val(company.companyName);
                $("input[name='contactPerson']").val(company.contactPerson);
                $("textarea[name='contactAddress']").val(company.contactAddress);
                $("input[name='contactWay']").val(company.contactWay);
                $("textarea[name='remark']").val(company.remark);
                $('.label_warning').html("");
                $('#myModalLabel').html("修改单位");
                $("#addcompany").modal();
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
 /*获取企业信息
 -------------------------------------------------------------------------------------------------------*/
function getCompany(){
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    locid = staff.locId;
    var  content = "";
    $.ajax({
        type: "get",
        url: basePath+'platform/company/all?id='+locid,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            content="<option id=''>请选择..</option>";
            if(data.length>0){
                for(var j in data){
                    content +="<option id='"+data[j].companyId+"'>"+data[j].companyName+"</option>";
                }
                //companyid = data[0].companyId;
                //companyname = data[0].companyName;
            }
            $('.companylist').html(content);
            initCompanyStaff();
            $(".companylist").change(function () {
                companyid = $(this).children('option:selected').attr("id");
                companyname = $(this).children('option:selected').text();
                $('.comStaffTable').bootstrapTable('refresh',{url: basePath+'platform/companystaff/all?id='+companyid});
            });
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
 /*初始化企业职工
 -------------------------------------------------------------------------------------------------------*/
function initCompanyStaff(){
    $('.comStaffTable').bootstrapTable({
        url: basePath+'platform/companystaff/all?id='+companyid,   //请求后台的URL（*）
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
        clickToSelect: false,    //是否启用点击选中行
        showColumns:true,
        columns: [{
            field: 'companyName',
            title: '公司名称',
            valign: 'middle'
        } ,{
            field: 'staffName',
            title: '职工姓名',
            valign: 'middle'
        }, {
            field: 'memberId',
            title: '会员编号',
            valign: 'middle'
        } ,{
            field: 'memberName',
            title: '会员名称',
            valign: 'middle'
        }, {
            field: 'ref1',
            title: '手机号',
            valign: 'middle'
        },{
            field: 'ref2',
            title: '卡号',
            valign: 'middle'
        },{
            field: 'createUserId',
            title: '创建人',
            valign: 'middle'
        }, {
            field: 'createDate',
            title: '创建时间',
            valign: 'middle',
            formatter:function(value,row,index){
                var date =fmtDate(row.createDate);
                return date;
            }
        },{
            field: 'lastUpdateUserId',
            title: '更新人',
            valign: 'middle'
        },{
            field: 'lastUpDate',
            title: '更新时间',
            valign: 'middle',
            formatter:function(value,row,index){
                var date =fmtDate(row.lastUpDate);
                return date;
            }
        },{
            field: 'companyId',
            title: '操作',
            valign: 'middle',
            align: 'center',
            formatter:function(value,row,index){
                var e ='<a class="taboperate" href="javascript:void(0);" mce_href="javascript:void(0);" onclick="deleteStaff(\''+ row.ref2 + '\')">删除</a><a class="taboperate lastchid" href="javascript:void(0);" mce_href="javascript:void(0);" onclick="editstaff(\''+ row.ref2 + '\')">编辑</a>'
                /*var e ='<a class="taboperate lastchid" href="javascript:void(0);" mce_href="javascript:void(0);" onclick="editstaff(\''+ row.ref2 + '\')">编辑</a>'*/;
                return e;
            }
        }]
    })
    //初始化页面高度
    contentheight();
}
/*------------------------------------------------------------------------------------------------------
 /*新增企业员工
 -------------------------------------------------------------------------------------------------------*/
$(".btn_addstaff").click(function() {
    $('.label_warning').html("");
    if(""==companyid){
        erroMessage("错误提示：请选择需要增加的企业");
        return false;
    }
    $.ajax({
        type: "get",
        url: basePath+"platform/company/new",
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                //显示
                $("input[name='memberId']").val("");
                $("input[name='memberName']").val("");
                $("input[name='staffName']").val("");
                $("input[name='remark']").val("");
                $("input[name='ref1']").val("");
                $("input[name='ref1']").removeAttr("disabled");
                $("input[name='ref2']").val("");
                $("input[name='ref2']").removeAttr("disabled");
                $("input[name='recKey']").val("");
                $('#myModalLabel').html("新增员工");
                $('.btn_search').show();
                $('.btn_searchp').show();
                $("#addcompanyStaff").modal();
                isstaffmodify = 0;
                $('.btn_save_next').show();
                $('.btn_save').html('保存');
                $('.btn_save_next').html('保存并继续');
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
});
/*------------------------------------------------------------------------------------------------------
 /*获取企业员工信息
 -------------------------------------------------------------------------------------------------------*/
function editstaff(obj){
    $.ajax({
        type: "get",
        url: basePath+"platform/companystaff/get?id="+obj,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                //显示
                var staff = data.staff;
                $("input[name='memberId']").val(staff.memberId);
                $("input[name='memberName']").val(staff.memberName);
                $("input[name='staffName']").val(staff.staffName);
                $("input[name='remark']").val(staff.remark);
                $("input[name='ref1']").val(staff.ref1);
                $("input[name='ref2']").val(staff.ref2);
                $("input[name='ref1']").attr("disabled","disabled");
                $("input[name='ref2']").attr("disabled","disabled");
                $("input[name='openId']").val(staff.openId);
                $("input[name='recKey']").val(staff.recKey);
                $('.label_warning').html("");
                $('.btn_search').hide();
                $('.btn_searchp').hide();
                $('#myModalLabel').html("修改员工");
                $("#addcompanyStaff").modal();
                isstaffmodify = 1;
                $('.btn_save').html('更新');
                $('.btn_save_next').hide();
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
 /*检索会员卡
 -------------------------------------------------------------------------------------------------------*/
$(".rightarea .btn_search").click(function(){
    $(this).button('loading');
    var ref2 = $("input[name='ref2']").val();
    $("input[name='memberId']").val("");
    $("input[name='memberName']").val("");
    $("input[name='staffName']").val("");
    $("input[name='ref1']").val("");
    if(""==ref2){
        $('.label_warning').html("错误提示：检索会员卡号为空");
        $(this).button('reset');
        return false;
    }
    $.ajax({
        type: "get",
        url: basePath+"platform/companystaff/check?id="+ref2+"&companyid="+companyid+"&flag="+isstaffmodify,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            $(".rightarea .btn_search").button('reset');
            if(data.status==1){
                memeber = data.staff;
                $("input[name='openId']").val(memeber.openId);
                $("input[name='memberId']").val(memeber.memberId);
                $("input[name='memberName']").val(memeber.memberName);
                $("input[name='staffName']").val(memeber.memberName);
                $("input[name='ref1']").val(memeber.phone);
                $("input[name='ref2']").val(memeber.code);
                $('.label_warning').html("");
            }else{
                $('.label_warning').html("错误提示："+data.Msg);
            }
        },
        error: function (request, status, err) {
            $(".rightarea .btn").button('reset');
            if (status == "timeout")
            {
                erroMessage("请求超时~请稍后重试");
            }else{
                erroMessage("初始化信息失败~请稍后重试");
            }
        }
    });
});

$(".rightarea .btn_searchp").click(function(){
    $(this).button('loading');
    var ref1 = $("input[name='ref1']").val();
    $("input[name='memberId']").val("");
    $("input[name='memberName']").val("");
    $("input[name='staffName']").val("");
    $("input[name='ref2']").val("");
    if(""==ref1){
        $('.label_warning').html("错误提示：检索手机号为空");
        $(this).button('reset');
        return false;
    }
    $.ajax({
        type: "get",
        url: basePath+"platform/companystaff/check?id="+ref1+"&companyid="+companyid+"&flag="+isstaffmodify,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            $(".rightarea .btn_searchp").button('reset');
            if(data.status==1){
                memeber = data.staff;
                $("input[name='openId']").val(memeber.openId);
                $("input[name='memberId']").val(memeber.memberId);
                $("input[name='memberName']").val(memeber.memberName);
                $("input[name='staffName']").val(memeber.memberName);
                $("input[name='ref1']").val(memeber.phone);
                $("input[name='ref2']").val(memeber.code);
                $('.label_warning').html("");
            }else{
                $('.label_warning').html("错误提示："+data.Msg);
            }
        },
        error: function (request, status, err) {
            $(".rightarea .btn").button('reset');
            if (status == "timeout")
            {
                erroMessage("请求超时~请稍后重试");
            }else{
                erroMessage("初始化信息失败~请稍后重试");
            }
        }
    });
});
/*------------------------------------------------------------------------------------------------------
 /*保存更新
 -------------------------------------------------------------------------------------------------------*/
$(".btn_save").click(function() {
    var code = $("input[name='ref2']").val();
    var type = $(this).attr("data");
    if(code==""){
        $('.label_warning').html("错误提示：会员卡号为空");
        return false;
    }
    var memberId = $("input[name='memberId']").val();
    if(memberId==""){
        return false;
    }
    var phone =  $("input[name='ref1']").val();
    if(phone==""){
        $('.label_warning').html("错误提示：手机号为空");
        return false;
    }else if(!(/^1[34578]\d{9}$/.test(phone))){
        $('.label_warning').html("错误提示：手机号格式不正确");
        return false;
    }
    var staffName = $("input[name='staffName']").val();
    if(staffName==""){
        $('.label_warning').html("错误提示：职工名称为空");
        return false;
    }
    var contentMsg  = isstaffmodify==0?"保存成功":"更新成功";
    var memberId = $("input[name='memberId']").val();
    var memberName = $("input[name='memberName']").val();
    var staffName = $("input[name='staffName']").val();
    var recKey = $("input[name='recKey']").val();
    var openId = $("input[name='openId']").val();
    var remark = $("input[name='remark']").val();
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    var staffId = staff.staffId;
    collectjson={"recKey":recKey,"companyId":companyid,"companyName":companyname,"staffName":staffName,"openId":openId,"memberId":memberId,"memberName":memberName,
        "ref1":phone,"ref2":code,"remark":remark,"createUserId":staffId,"lastUpdateUserId":staffId};
    $.ajax({
        type: "post",
        url: basePath+"platform/companystaff/update",
        data:JSON.stringify(collectjson),
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
                            if(isstaffmodify==0){
                                if(type=='1'){
                                    //显示
                                    $("input[name='memberId']").val("");
                                    $("input[name='memberName']").val("");
                                    $("input[name='staffName']").val("");
                                    $("input[name='remark']").val("");
                                    $("input[name='ref1']").val("");
                                    $("input[name='ref2']").val("");
                                    $("input[name='ref2']").removeAttr("disabled");
                                    $("input[name='recKey']").val("");
                                    $('.btn_search').show();
                                }else{
                                    $("#addcompanyStaff").modal("hide");
                                }
                            }else{
                                $("#addcompanyStaff").modal("hide");
                            }
                            $('.comStaffTable').bootstrapTable('refresh');
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
});
/*------------------------------------------------------------------------------------------------------
 /*删除判断
 -------------------------------------------------------------------------------------------------------*/
function deleteStaff(obj){
    BootstrapDialog.show({
        title: '提示信息',
        message: '确定删除您选中的企业员工么？',
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
                doDeleteStaff(obj);
            }
        }]
    });
};

function doDeleteStaff(obj) {
    $.ajax({
        type: "post",
        url: basePath+"platform/companystaff/delete",
        data:{"id":obj},
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1||data.status=='1'){
                $('.comStaffTable').bootstrapTable('refresh');
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