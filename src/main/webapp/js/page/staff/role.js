/*------------------------------------------------------------------------------------------------------
 /*初始化角色
 -------------------------------------------------------------------------------------------------------*/
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
function initRole(){
    $('.roleTable').bootstrapTable({
        url: basePath+'platform/role/all',   //请求后台的URL（*）
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
        clickToSelect: false,    //是否启用点击选中行
        showColumns:true,
        columns: [ {
            field: 'roleId',
            title: '角色编码',
            valign: 'middle'
        }, {
            field: 'roleName',
            title: '角色名称',
            valign: 'middle'
        }, {
            field: 'status',
            title: '状态',
            valign: 'middle',
            formatter:function(value,row,index){
                var e = row.status==1?"启用":"停用";
                return e;
            }
        },{
            field: 'remark',
            title: '备注',
            valign: 'middle'
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
            field: 'roleId',
            align: 'center',
            valign: 'middle',
            width:"10%",
            formatter:function(value,row,index){
                var e =row.roleId=="9999"?'<a data-toggle="tooltip" title="编辑" class="taboperate lastchid" style="pointer-events:none;color: #ccc;">编辑</a>':'<a data-toggle="tooltip" title="编辑" class="taboperate lastchid" href="javascript:void(0);" mce_href="javascript:void(0);" onclick="edit(\''+ row.roleId + '\')">编辑</a>'
                return e;
            }
        }]
    });
    //初始化页面高度
    contentheight();
}
/*------------------------------------------------------------------------------------------------------
 /*新增角色 2018-03-29
 -------------------------------------------------------------------------------------------------------*/
$(".btn_addRole").click(function() {
    $.ajax({
        type: "get",
        url: basePath+"platform/role/new",
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                var role = data.role;
				$("#raUsing").attr("checked","checked");
                $("input[name='role.roleId']").val(role.roleId);
				$("input[name='role.roleName']").val("");
				$("textarea[name='role.remark']").val("");
                $.fn.zTree.init($("#functionList"), setting, data.menus);
				$('#myModalLabel').html("新增角色");
                $("#addrole").modal();
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
});

/*------------------------------------------------------------------------------------------------------
 /*保存更新 2018-04-03
 -------------------------------------------------------------------------------------------------------*/
$(".btn-sure").click(function() {
    $('.label_warning').html("");
    var rolename = $("input[name='role.roleName']").val();
    if(rolename==""){
        $('.label_warning').html("错误提示：角色名称不能为空!");
        return false;
    }
	var recKey = $("input[name='role.recKey']").val();
	var roleid = $("input[name='role.roleId']").val();
	var status = $("input[name='role.status']:checked").val();
	var remark = $("textarea[name='role.remark']").val();
	
    //获取选中的功能菜单
    var fnodes="01_";
    var functionObj=$.fn.zTree.getZTreeObj("functionList"),
        functionnodes=functionObj.getCheckedNodes(true);
    for(var i=0;i<functionnodes.length;i++){
        fnodes += functionnodes[i].id + "_";
    }
	collectjson={"recKey":recKey,"roleId":roleid,"roleName":rolename,"status":status,"remark":remark,"ref1":fnodes};
	$.ajax({
		type: "post",
		url: basePath+"platform/role/update",
		data: JSON.stringify(collectjson),
		dataType : 'json',
		contentType : 'application/json;charset=UTF-8',
		timeout: 20000,  //
		success: function (data) {
			if(data.status){
				$("#addrole").modal('hide');
				$('.roleTable').bootstrapTable('refresh');
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
 /*修改角色 2018-04-01
 -------------------------------------------------------------------------------------------------------*/
function edit(obj){
    $.ajax({
        type: "get",
        url: basePath+"platform/role/get?id="+obj,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                var role = data.role;
				if(role.status==1){
					$("#raUsing").attr("checked","checked");
				}else{
					$("#raUnUsing").attr("checked","checked");
				}
				$("input[name='role.recKey']").val(role.recKey);
                $("input[name='role.roleId']").val(role.roleId);
				$("input[name='role.roleName']").val(role.roleName);
				$("textarea[name='role.remark']").val(role.remark);
                $.fn.zTree.init($("#functionList"), setting, data.menus);
				$('#myModalLabel').html("修改角色");
                $("#addrole").modal();
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
 /*删除角色
 -------------------------------------------------------------------------------------------------------*/
function deleteRole(obj){
    BootstrapDialog.show({
        title: '提示信息',
        message: '确定删除您选中的角色么？',
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
                var scolor = "";
                $("tr[class='selected']").each(function(){
                    scolor += $(this).children().next().html()+"_";
                });
                doDeleteRole(scolor)
            }
        }]
    });
};
function doDeleteRole(obj){
    if(obj.indexOf("9999")>=0){
        erroMessage("系统管理员角色不能删除!");
        return false;
    }
    $.ajax({
        type: "post",
        url: basePath+"procurement/staff/doDeleteRoles.do",
        data:{"deleteStr":obj},
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.success){
                $('.roletable').bootstrapTable('refresh');
            }else{
                erroMessage(data.info);
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
