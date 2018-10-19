/*------------------------------------------------------------------------------------------------------
 /*初始化员工
 -------------------------------------------------------------------------------------------------------*/
var setting = {
    check: {enable: true},
    data: {
        simpleData: {
            enable: true
        }
    }
};
var temp = new Base64();
function initStaff(){
    $('.staffTable').bootstrapTable({
        url: basePath+'platform/user/all',   //请求后台的URL（*）
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
        columns: [{
            field: 'staffId',
            title: '员工编码',
            valign: 'middle'
        }, {
            field: 'staffName',
            title: '员工名称',
            valign: 'middle'
        },{
            field: 'phone',
            title: '电话',
            valign: 'middle'
        },{
            field: 'locName',
            title: '所属门店',
            valign: 'middle'
        },{
            field: 'roleName',
            title: '权限',
            valign: 'middle'
        },{
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
            title: '操作',
            field: 'staffId',
            align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
                var e =row. staffId=="9999"?'<a data-toggle="tooltip" title="编辑" class="taboperate lastchid" style="pointer-events:none;color: #ccc;">编辑</a>':'<a data-toggle="tooltip" title="编辑" class="taboperate lastchid" href="javascript:void(0);" mce_href="javascript:void(0);" onclick="edit(\''+ row.staffId + '\')">编辑</a>'
                return e;
            }
        }]
    });
    //初始化页面高度
    contentheight();
}
/*------------------------------------------------------------------------------------------------------
 /*新增员工 2018-03-30
 -------------------------------------------------------------------------------------------------------*/
$(".btn_addStaff").click(function() {
    $('.label_warning').html("");
    $.ajax({
        type: "get",
        url: basePath+"platform/staff/new",
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                var staff = data.staff;
                $("input[name='staffId']").val(staff.staffId);
                $("input[name='recKey']").val("");
                $("input[name='staffName']").val("");
                $("textarea[name='address']").val("");
                $("input[name='phone']").val("");
                $("textarea[name='remark']").val("");
                //显示门店信息
                var locs = data.locs;
                var content="";
                for(var i=0;i<locs.length;i++){
                    content  +="<option value='"+locs[i].locId+"'>"+locs[i].locName+"</option>";
                }
                $("#loclist").html(content);
                var roles = data.roles;
                content = "";
                for(var i=0;i<roles.length;i++){
                    content  +="<option value='"+roles[i].roleId+"'>"+roles[i].roleName+"</option>";
                }
                $("#rolelist").html(content)
                //显示
                $('#myModalLabel').html("新增员工");
                $("#addstaff").modal();
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
    var staffName = $("input[name='staffName']").val();
    if(staffName==""){
        $('.label_warning').html("错误提示：员工名称不能为空!");
        return false;
    }
    var loclist =  $("#loclist").val();
    if(loclist==""||loclist==null){
        $('.label_warning').html("错误提示：请选择员工所对应门店!");
        return false;
    }
    var rolelist =  $("#rolelist").val();
    if(rolelist==""||rolelist==null){
        $('.label_warning').html("错误提示：请选择员工所对应角色!");
        return false;
    }
    var phone = $("input[name='phone']").val();
    if(phone==""){
        $('.label_warning').html("错误提示：联系方式不能为空!");
        return false;
    }
    var r=/^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
    if(!r.test(phone)){
        $('.label_warning').html('错误提示：号码格式错误,固话需加区号和符号‘-’');
        return false;
    };
    var staffId = $("input[name='staffId']").val();
    var recKey = $("input[name='recKey']").val();
    var status = $("input[name='status']:checked").val();
    var remark = $("textarea[name='remark']").val();
    var address = $("textarea[name='address']").val();
    collectjson={"recKey":recKey,"staffId":staffId,"staffName":staffName,"phone":phone,"address":address,"roleId":rolelist,"locId":loclist,"status":status,"remark":remark};
    $.ajax({
        type: "post",
        url: basePath+"platform/staff/update",
        data: JSON.stringify(collectjson),
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        timeout: 20000,  //
        success: function (data) {
            if(data.status){
                $("#addstaff").modal('hide');
                $('.staffTable').bootstrapTable('refresh');
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
 /*修改员工 2018-04-09
 -------------------------------------------------------------------------------------------------------*/
function edit(obj){
    $.ajax({
        type: "get",
        url: basePath+"platform/staff/get?id="+obj,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                var staff = data.staff;
                if(staff.status==1){
                    $("#raUsing").attr("checked","checked");
                }else {
                    $("#raUnUsing").attr("checked", "checked");
                }
                $("input[name='recKey']").val(staff.recKey);
                $("input[name='staffId']").val(staff.staffId);
                $("input[name='staffName']").val(staff.staffName);
                $("textarea[name='address']").val(staff.address);
                $("input[name='phone']").val(staff.phone);
                $("textarea[name='remark']").val(staff.remark);
                var locid = staff.locId;
                //显示门店信息
                var locs = data.locs;
                var content="";
                for(var i=0;i<locs.length;i++){
                    if(locid==locs[i].locId){
                        content  +="<option value='"+locs[i].locId+"' selected>"+locs[i].locName+"</option>";
                    }else{
                        content  +="<option value='"+locs[i].locId+"'>"+locs[i].locName+"</option>";
                    }
                }
                $("#loclist").val(staff.locId);
                $("#loclist").html(content);
                var roles = data.roles;
                content = "";
                for(var i=0;i<roles.length;i++){
                    if(roles[i].status==1) {
                        content += "<option value='"  + roles[i].roleId + "'>" + roles[i].roleName + "</option>";
                    }
                }
                $("#rolelist").val(staff.roleId);
                $("#rolelist").html(content)
                $('#myModalLabel').html("修改员工");
                $("#addstaff").modal();
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
};