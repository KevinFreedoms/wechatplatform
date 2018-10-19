/**
 * Created by xxx on 2018/7/31.
 */
var messageAll;
var ck;
var newMessage=false;
/* ------------------------------------------------------------------------------------------------------------------------ */
/* 登录密码校验 xxx 2018-08-01 */
/* ------------------------------------------------------------------------------------------------------------------------ */
function init() {
    contentheight();
    $('#sendmessagetab').bootstrapTable({
        url: basePath + "platform/notify/all",
        striped: true,      //是否显示行间隔色
        pagination: true,     //是否显示分页（*）
        sortable: false,      //是否启用排序
        sortOrder: "asc",     //排序方式
        pageNumber: 1,      //初始化加载第一页，默认第一页
        pageSize: 10,      //每页的记录行数（*）
        pageList: [10, 20, 50, 100, 200, 500],  //可供选择的每页的行数（*）
        search: true,      //是否显示表格搜索
        clickToSelect: false,    //是否启用点击选中行
        columns: [
            {
                checkbox: true
            },
            {
                field: 'messagecode',
                title: '状态',
                align: 'left',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var statu = row.ref1;
                    var e = '';
                    if (statu == 0) {
                        e = '<span style="color:#ffca42">待推送</span>'
                    }
                    if (statu == 1) {
                        e = '<span style="color:#9bdb69" >已推送</span>'
                    }
                    if (statu == 2) {
                        e = '<span style="color:#F00">推送失败</span>'
                    }
                    return e;
                },
            },
            {
                field: 'messageId',
                title: '消息编码',
                align: 'left',
                valign: 'middle'
            }, {
                field: 'messageSubject',
                title: '消息主题',
                align: 'left',
                valign: 'middle',
            }, {
                field: 'messageDescription',
                title: '消息描述',
                align: 'left',
                valign: 'middle',
            }
            , {
                field: 'createDate',
                title: '创建时间',
                align: 'left',
                valign: 'middle',
            }
            , {
                field: 'createUserId',
                title: '创建人',
                align: 'left',
                valign: 'middle',
            }
            , {
                field: 'updateDate',
                title: '更新时间',
                align: 'left',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var e = '';
                    if(row.updateDate=="0001-01-01 00:00:00"){
                        e='-'
                    }else{
                        e=row.updateDate;
                    }

                    return e;
                },
            }
            , {
                field: 'updateUserId',
                title: '更新人',
                align: 'left',
                valign: 'middle',
            }
            , {
                field: 'remark',
                title: '备注',
                align: 'left',
                valign: 'middle',
            },
            {
                title: "操作", field: "operate", align: "right", valign: "middle",
                formatter: function (value, row, index) {
                    var e="";
                    if(row.ref1==1){
                        e = '<a class="taboperate" onclick="removeMessage(this)" data-recKey="' + row.recKey + '" data-messageId="' + row.messageId + '">删除</a>';
                    }else{
                        e = '<a class="taboperate" onclick="editmessage(this)" data-messageId="' + row.messageId + '" data-recKey="' + row.recKey + '">编辑</a><a class="taboperate" onclick="removeMessage(this)" data-recKey="' + row.recKey + '" data-messageId="' + row.messageId + '">删除</a>';

                    }
                    return e;
                }
            }]
    });
}
/*----------------------------------------------------------------------------------------
 /*过滤
 /*---------------------------------------------------------------------------------------*/
$('#checkMessage input').on('click', function () {
    var ns = $('#ns').is(':checked');
    var readys = $('#readyS').is(':checked');
    var waits = $('#waitS').is(':checked');
    if (ns && readys && waits || !ns && !readys && !waits)
        statusCheck(['0', '1', '2']);
    if (!ns && !readys && waits)
        statusCheck('0');
    if (ns && !readys && !waits)
        statusCheck('2');
    if (!ns && readys && !waits)
        statusCheck('1');
    if (!ns && readys && waits)
        statusCheck(['0', '1']);
    if (ns && !readys && waits)
        statusCheck(['0', '2']);
    if (ns && readys && !waits)
        statusCheck(['1', '2']);
});

function statusCheck(status) {
    $('#sendmessagetab').bootstrapTable('filterBy', {ref1: status});
}
/*-----------------------------------------------------------------------------------------------------------------
 /*编辑器
 ------------------------------------------------------------------------------------------------------------------*/
KindEditor.ready(function (K) {
    window.editor = K.create('#editor_id', {
        cssPath: 'js/kindeditior/prettify.css',
        uploadJson: '/upload/image.php',
        resizeType: 1,
        allowPreviewEmoticons: true,
        allowImageUpload: true,
        items: [
            'preview', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'indent', 'outdent', 'fullscreen', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'hr'
        ]
    });
});

/*----------------------------------------------------------------------------------------
 /*新增
 /*---------------------------------------------------------------------------------------*/
function addmessage() {
    $('.label_warning').html("");
    $.ajax({
        type: "get",
        url: basePath+"platform/notify/new",
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                newMessage=true;
                clearMessage();
                detail = data.detail;
                $('.btn-save').show();
                $('.btn-update').hide();
                $("#messageId").val(detail.messageId);
                $('#myModalLabel').html('新增微信推送');
                $("#addmessage").modal();
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

function savemessage(){
    $('.label_warning').html("");
    var title = $(".messagetitle").val();
    var content = $(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html();
    if (title.trim() == "") {
        $('.label_warning').html("错误提示：主题不可为空！");
        return;
    }
    if (content == "") {
        $('.label_warning').html("错误提示：内容不可为空！");
        return;
    }
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    var staffId = staff.staffId;
    var remark = $('#messageRemark').val();
    collectjson={
        messageSubject: title,
        messageDescription: content,
        remark: remark,
        messageId: $('#messageId').val(),
        createUserId:staffId
    },
    $.ajax({
        type: "post",
        url: basePath+"platform/notify/insert",
        data: JSON.stringify(collectjson),
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        timeout: 20000,  //
        success: function (data) {
            if(data.status){
                $("#addmessage").modal('hide');
                $('#sendmessagetab').bootstrapTable('refresh');
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
//清除消息内容
function clearMessage() {
    $('#messageId').val('');
    $('#messageTitle').val('');
    $(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html('');
    $('#messageRemark').val('');
}
/*----------------------------------------------------------------------------------------
 /*修改
 /*---------------------------------------------------------------------------------------*/
function updatemessage(){
    $('.label_warning').html("");
    var title = $(".messagetitle").val();
    var content = $(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html();
    if (title.trim() == "") {
        $('.label_warning').html("错误提示：主题不可为空！");
        return;
    }
    if (content == "") {
        $('.label_warning').html("错误提示：内容不可为空！");
        return;
    }
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    var staffId = staff.staffId;
    var remark = $('#messageRemark').val();
    var reckey = $('#reckey').val();
    collectjson={
        messageSubject: title,
        messageDescription: content,
        remark: remark,
        messageId: $('#messageId').val(),
        updateUserId:staffId,
        recKey:reckey
    },
        $.ajax({
            type: "post",
            url: basePath+"platform/notify/update",
            data: JSON.stringify(collectjson),
            dataType : 'json',
            contentType : 'application/json;charset=UTF-8',
            timeout: 20000,  //
            success: function (data) {
                if(data.status){
                    $("#addmessage").modal('hide');
                    $('#sendmessagetab').bootstrapTable('refresh');
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
/*--------------------------------------------------------------------------------------------
 *编辑消息
 -----------------------------------------------------------------------------------------------*/
var updateRecKey = "";
function editmessage(obj) {
    newMessage=false;
    $('.btn-save').hide();
    $('.btn-update').show();
    $("#addmessage").modal();
    $('#myModalLabel').html('编辑微信推送');
    updateRecKey = $(obj).attr("data-recKey");
    $('#sendmessagetab').on('click-row.bs.table', function ($element, row) {
        $('#messageId').val(row.messageId);
        $('#messageTitle').val(row.messageSubject);
        $(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html(row.messageDescription);
        $('#messageRemark').val(row.remark);
        $('#reckey').val(row.recKey);
    });
}
/*----------------------------------------------------------------------------------------
 /*删除
 /*---------------------------------------------------------------------------------------*/
function removeMessage(obj){
    var recKey = $(obj).attr("data-recKey");
    var messageId = $(obj).attr("data-messageId");
    BootstrapDialog.show({
        title: '提示',
        message: '是否删除消息编码为:' + messageId + "的消息",
        closeable: true,
        buttons: [{
            label: '取消',
            action: function (dialog) {
                dialog.close();
            }
        }, {
            label: '确定',
            cssClass: 'btn-primary',
            action: function (dialog) {
                dialog.close();
                doDelete(recKey);
            }
        }]
    });
}

function doDelete(id){
    $.ajax({
        type: "post",
        url: basePath+"platform/notify/delete?id="+id,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1||data.status=='1'){
                $('#sendmessagetab').bootstrapTable('refresh');
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
/*--------------------------------------------------------------------------------------------
 *推送消息
 -----------------------------------------------------------------------------------------------*/
//TODO 没有完成推送消息实现
//实现了推送成功后数据库的修改
function sendmessage() {
    str="";
    arry =  $("#sendmessagetab").bootstrapTable('getAllSelections');
    if(arry.length==0 ){
        erroMessage("请选择要推送的信息");
        return false;
    }
    for (var i in arry){
        if (i==0){
            str=arry[i].messageId;
        }else{
            str=str+","+arry[i].messageId;
        }
    }
    BootstrapDialog.show({
        title: '提示',
        message: '是否要推送所有的选中项',
        closeable: true,
        buttons: [{
            label: '取消',
            action: function (dialog) {
                dialog.close();
            }
        }, {
            label: '确定',
            cssClass: 'btn-primary',
            action: function (dialog) {
                dialog.close();
                messageToSend(str);
            }
        }]
    });
}

 function  messageToSend(str){
     $.ajax({
         type: 'get',
         url: basePath + 'platform/notify/send?str='+str,
         dataType: 'json',
         contentType:'application/json',
         success: function (data) {
             if(data.status==1||data.status=='1'){
                 erroMessage("发送成功");
                 $('#sendmessagetab').bootstrapTable('refresh');
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
