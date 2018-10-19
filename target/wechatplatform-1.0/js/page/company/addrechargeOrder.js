/*-----------------------------------------------------------------------------------------------------------------------
 /*初始化
 -------------------------------------------------------------------------------------------------------------------------*/
var errordata=[];//异常数据
var correctdata=[];//正常数据
var correctdataId=[];
var rechangedata=[];//修改数据
var companyId='0';//企业单位id
var companyName='';//企业单位名称
var locId='';      //门店编号
var userId='';      //用户编号
var bookingId="";   //获取订单号
var bookingFlag=0;  //订单状态
var  isnew=0;        //是否是新订单
function init(){
    isnew = 0;
    var temp=''
    temp='<li><i class="icon-dashboard"></i>单位客户管理</li>'+
        '<li><a href="'+ basePath +'platform/recharge/m">批量充值单</a></li>'
    '<li class="active">新增充值单</li>'
    $('#breadnav', window.parent.document).html(temp);
    $('#errortable').bootstrapTable({
        data:errordata,   //请求后台的URL（*）
        pageNumber:1,      //初始化加载第一页，默认第一页
        pageSize: 10,      //每页的记录行数（*）
        pageList: [10, 20, 50, 100, 200, 500],  //可供选择的每页的行数（*）
        striped: true,
        columns: [{
            title: '会员卡号',
            field: 'ref2',
            align: 'left',
            valign: 'middle',
            formatter:function(value,row,index){
                var e ='<input type="text" name="'+row.ref2+'" value="'+row.ref2+'"/>';
                return e;
            }
        },
            {
                field: 'staffName',
                title: '职工姓名',
                align: 'left',
                valign: 'middle'
            },{
                field: 'ref1',
                title: '电话',
                align: 'left',
                valign: 'middle'
            },{
                field: 'money',
                title: '充值金额',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'rechargeAmount',
                title: '操作',
                align: 'center',
                valign: 'middle',
                formatter:function(value,row,index){
                    var temp = new Base64();
                    var str = temp.encode(JSON.stringify(row));
                    var e ='<a data="'+str+'" onclick="saveError(this)">保存</a>'
                    return e;
                }
            }]
    });
    $('#viptable').bootstrapTable({
        data: correctdata,   //请求后台的URL（*）
        pageNumber: 1,      //初始化加载第一页，默认第一页
        pagination: true,
        pageSize: 10,      //每页的记录行数（*）
        pageList: [10, 20, 50, 100, 200, 500],  //可供选择的每页的行数（*）
        striped: true,
        search: true,
        columns: [{checkbox: true},
            {
                title: '会员卡号',
                field: 'ref2',
                align: 'left',
                valign: 'middle',
                width:'15%'
            },{
                field: 'memberId',
                title: '会员编号',
                align: 'left',
                valign: 'middle',
                width:'15%'
            },
            {
                field: 'staffName',
                title: '职工姓名',
                align: 'left',
                valign: 'middle',
                width:'15%'
            }, {
                field: 'ref1',
                title: '电话',
                align: 'left',
                valign: 'middle',
                width:'10%'
            }, {
                field: 'before',
                title: '充值前金额',
                align: 'right',
                valign: 'middle'
            },  {
                field: 'money',
                title: '充值金额',
                align: 'right',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if (row.flag == 0) {
                        var e = '<input type="text" class="rechargeinput unflagcheck" value="' + row.money + '" onkeyup="num(this)" onchange="changeMoney(' + index + ',this)"/>'
                    } else {
                        var e = '<input type="text" class="rechargeinput" value="' + row.money + '" onkeyup="num(this)" onchange="changeMoney(' + index + ',this)"/>'
                    }
                    return e;
                }
            },{
                field: 'after',
                title: '充值后金额',
                align: 'right',
                valign: 'middle'
            }],
        onCheck: function (row) {
            var selectList = $('#viptable').bootstrapTable('getAllSelections');
            var dataList = $('#viptable').bootstrapTable('getData');
            if (selectList.length != dataList.length) {
                $("#viptable thead input").removeAttr('checked');
            }
            var leng = selectList.length;
            $("#alreadyCheck").text(leng);
            $(".search").hide();
            $(".batchModify").show();
            return false;
        },
        onUncheck: function (row) {
            var selectList = $('#viptable').bootstrapTable('getAllSelections');
            var dataList = $('#viptable').bootstrapTable('getData');
            if (selectList.length != dataList.length) {
                $("#viptable thead input").removeAttr('checked');
            }
            var leng = selectList.length;
            $("#alreadyCheck").text(leng);
            if (leng == 0) {
                $(".search").show();
                $(".batchModify").hide();
            } else {
                $(".search").hide();
                $(".batchModify").show();
            }
            return false;
        },
        onCheckAll: function (rows) {
            correctdataId = [];
            for (var i in correctdata) {
                correctdataId.push(correctdata[i].ref2)
            }
            $('#viptable').bootstrapTable('checkBy', {field: 'ref2', values: correctdataId});
            var leng = correctdataId.length;
            $("#alreadyCheck").text(leng);
            $(".search").hide();
            $(".batchModify").show();
            return false;
        },
        onUncheckAll: function (rows) {
            correctdataId = [];
            for (var i in correctdata) {
                correctdataId.push(correctdata[i].ref2)
            }
            $('#viptable').bootstrapTable('uncheckBy', {field: 'ref2', values: correctdataId});
            var leng = correctdataId.length;
            $("#alreadyCheck").text(leng);
            $(".search").show();
            $(".batchModify").hide();
            return false;
        },
    });
}
function initBookingInfo(){
    isnew = 1;
    var temp=''
    temp='<li><i class="icon-dashboard"></i>单位客户管理</li>'+
        '<li><a href="'+ basePath +'platform/recharge/m">批量充值单</a></li>'
    '<li class="active">修改充值单</li>'
    $('#breadnav', window.parent.document).html(temp);
    //初始化页面高度
    contentheight();
    //获取订单明细
    bookingId = $('#bookingId').html();
    $('#viptable').bootstrapTable({
        url: basePath+'platform/recharge/detail?id='+bookingId,   //请求后台的URL（*）
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
        striped: true,
        search: true,
        columns: [{checkbox: true},
            {
                title: '会员卡号',
                field: 'ref2',
                align: 'left',
                valign: 'middle',
                width:'15%'
            },{
                field: 'memberId',
                title: '会员编码',
                align: 'left',
                valign: 'middle',
                width:'15%'
            },
            {
                field: 'staffName',
                title: '职工姓名',
                align: 'left',
                valign: 'middle',
                width:'15%'
            }, {
                field: 'ref1',
                title: '电话',
                align: 'left',
                valign: 'middle',
                width:'10%'
            }, {
                field: 'rechargeBefore',
                title: '充值前金额',
                align: 'right',
                valign: 'middle'
            },{
                field: 'rechargeAmount',
                title: '充值金额',
                align: 'right',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var status=bookingFlag;
                    var e=''
                    if(status==0){
                        $("#checkButton").removeClass("display");
                        $("#invalidorderButton").removeClass("display");
                        if(Number(isMoney)==0){
                            e ='<input type="text" class="rechargeinput"  onchange="changeMoney('+index+',this)" value='+row.rechargeAmount+' onkeyup="num(this)"/>'
                        }else{
                            e ='<span>'+row.rechargeAmount+'</span>'
                        }
                    }else if(status==1){
                        $("#checkButton").addClass("display");
                        $("#invalidorderButton").addClass("display");
                        e ='<span>'+row.rechargeAmount+'</span>'
                    }else{
                        $("#checkButton").addClass("display");
                        $("#invalidorderButton").addClass("display");
                        e ='<span>'+row.rechargeAmount+'</span>'
                    }
                    return e;
                }
            },{
                field: 'rechargeAfter',
                title: '充值后金额',
                align: 'right',
                valign: 'middle'
            }],
        onCheck: function (row) {
            var selectList = $('#viptable').bootstrapTable('getAllSelections');
            var dataList = $('#viptable').bootstrapTable('getData');
            if (selectList.length != dataList.length) {
                $("#viptable thead input").removeAttr('checked');
            }
            var leng = selectList.length;
            $("#alreadyCheck").text(leng);
            $(".search").hide();
            $(".batchModify").show();
            return false;
        },
        onUncheck: function (row) {
            var selectList = $('#viptable').bootstrapTable('getAllSelections');
            var dataList = $('#viptable').bootstrapTable('getData');
            if (selectList.length != dataList.length) {
                $("#viptable thead input").removeAttr('checked');
            }
            var leng = selectList.length;
            $("#alreadyCheck").text(leng);
            if (leng == 0) {
                $(".search").show();
                $(".batchModify").hide();
            } else {
                $(".search").hide();
                $(".batchModify").show();
            }
            return false;
        },
        onCheckAll: function (rows) {
            correctdataId = [];
            for (var i in correctdata) {
                correctdataId.push(correctdata[i].ref2)
            }
            $('#viptable').bootstrapTable('checkBy', {field: 'ref2', values: correctdataId});
            var leng = correctdataId.length;
            $("#alreadyCheck").text(leng);
            $(".search").hide();
            $(".batchModify").show();
            return false;
        },
        onUncheckAll: function (rows) {
            correctdataId = [];
            for (var i in correctdata) {
                correctdataId.push(correctdata[i].ref2)
            }
            $('#viptable').bootstrapTable('uncheckBy', {field: 'ref2', values: correctdataId});
            var leng = correctdataId.length;
            $("#alreadyCheck").text(leng);
            $(".search").show();
            $(".batchModify").hide();
            return false;
        },onLoadSuccess:function(data){
            correctdata = data;
            if(bookingFlag!=0) {
                $('#viptable thead').find('input[name="btSelectAll"]').addClass('display');
                $('#viptable tbody').find('input[name="btSelectItem"]').addClass('display');
            }else{
                if(Number(isMoney)==1){
                    $('#viptable thead').find('input[name="btSelectAll"]').addClass('display');
                    $('#viptable tbody').find('input[name="btSelectItem"]').addClass('display');
                }
            }
            summoney();
        }
    });
}
/*-----------------------------------------------------------------------------------------------------------------------
/*打印
-------------------------------------------------------------------------------------------------------------------------*/
$(".btn_print").click(function() {
    var html="";
    var summoney =$("#moneySum").html();
    var checkMoney =$(".oughtmoney").html();
    var dataList = $('#viptable') .bootstrapTable('getData');
    html += '<div id="printtitle">'+
        '<div class="ordertitle" style="text-align:center;">'+
        '<strong>批量充值单</strong>'+
        '</div>'+
        '<div class="ordercontent">'+
        '<label style="margin-right:5px">充值金额:<span>'+summoney+'</span></label>'+
        '<label>实收金额:<span>'+checkMoney+'</span></label>'+
        '<label style="float:right;">单号:<span>'+bookingId+'</span></label>'+
        '</div></div>';
    html+= '<table id="printtable" border="1" width="100%" style="font-size:9px; margin-top:10px">'+
        '<thead>'+
        '<th style="width:30%;text-align:center;">会员卡号</th>'+
        '<th style="width:30%;text-align:center;">职工姓名</th>'+
        '<th style="width:20%;text-align:center;">电话</th>'+
        '<th style="width:20%;text-align:center;">金额</th>'+
        '</thead>'+
        '<tbody>';
    for (var i=0;i<dataList.length;i++){
        html += '<tr>'+
            '<td style="text-align:center;">'+dataList[i].ref2+'</td>'+
            '<td style="text-align:center;">'+dataList[i].staffName+'</td>'+
            '<td style="text-align:center;">'+dataList[i].ref1+'</td>'+
            '<td style="text-align:center;">'+dataList[i].rechargeAmount+'</td>'+
            '</tr>';
    }
    html += '</tbody>'+
            '</table>';
    $("#print").print({
        prepend:html
    });
});
/*-----------------------------------------------------------------------------------------------------------------------
 /*公司改变事件
 -------------------------------------------------------------------------------------------------------------------------*/
function companyChange(){
    companyId=$('#selectCompany option:selected').attr('data-id');
    var errordata=[];//异常数据
    var correctdata=[];//正常数据
    var  correctdataId=[];
    $(".withoutquery").show();
    $(".querycontent").hide();
    $(".errorcontent").hide();
    $('#errortable').bootstrapTable('load',errordata);
    $('#viptable').bootstrapTable('load',correctdata);
}
/*-----------------------------------------------------------------------------------------------------------------------
 /*导入excel
 -------------------------------------------------------------------------------------------------------------------------*/
$(".importexcel").click(function() {
    $("#mFile").click();
});
function toFileLoad(){
   var fileinfo =  $("#mFile").val();
    if(!image_check(fileinfo)){
        return false;
    }
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    userId = staff.staffId;
    locId = staff.locId;
    companyId=$('#selectCompany option:selected').attr('data-id');
    //导入
    $('#loading', window.parent.document).modal();
    $.ajaxFileUpload({
        fileElementId: $("#mFile").attr("id"),
        url: basePath + "platform/recharge/upLoadExcel", //后台方法的路径
        type: 'post',   //当要提交自定义参数时，这个参数要设置成post
        dataType: 'json',   //服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断。
        secureuri: false,   //是否启用安全提交，默认为false。
        data: {userId: userId,"companyId":companyId},//你想传给后台的数据
        async: true,   //是否是异步
        success: function (data) {
            $('#loading', window.parent.document).modal('hide');
            $("#mFile").val('');
            if(data.status==0){
                erroMessage(data.Msg);
            }else{
                errordata=data.errorList;
                correctdata=data.rightList;
                companyId=data.companyId;
                companyName=data.companyName;
                $("#selectCompany option[data-id="+companyId+"]").attr("selected",true);
                $("#successNum").text(correctdata.length);
                $("#errorNum").text(errordata.length);
                $("#peopleNum").text(correctdata.length);
                $(".withoutquery").hide();
                if(errordata.length==0){
                    $(".errorcontent").hide();
                }else{
                    $(".errorcontent").show();
                }
                if(correctdata.length==0){
                    $(".querycontent").hide();
                }else{
                    $(".querycontent").show();
                }
                $('#errortable').bootstrapTable('load',errordata);
                $('#viptable').bootstrapTable('load',correctdata);
                $('#yhmoney').val(0);
                summoney();
            }
        },
        error: function (data, status, e) {
            erroMessage("导入失败");
        }
    })
}
//判断文件格式
function image_check(feid) {
    feid = feid.toLocaleLowerCase();//大小写后缀名都支持,都转换为小写在判断
    return /.(xls|xlsx)$/.test(feid) ? true : (function () {
        BootstrapDialog.show({
            title: '提示信息',
            message: "表格格式仅支持xls、xlsx格式",
            buttons: [{
                label: '确定',
                cssClass: 'btn-primary',
                action: function(dialog) {
                    dialog.close();
                }
            }]
        });
        return false;
    })();
}
/*-----------------------------------------------------------------------------------------------------------------------
 /*保存校验错误 2018-05-30
 -------------------------------------------------------------------------------------------------------------------------*/
function saveError(obj){
    var datastr = $(obj).attr('data');
    var temp = new Base64();
    str = temp.decode(datastr);
    sureJson = JSON.parse(str);
    var code=$(obj).parent().parent().find('input').val();
    var oldcode = sureJson.ref2;
    var staffjson={"staffName":sureJson.staffName,"ref1":sureJson.ref1,"ref2":code,"ref3":sureJson.money,"createUserId":userId,"lastUpdateUserId":userId,"companyName":companyName,"companyId":companyId};
    $.ajax({
        type: "post",
        url: basePath+"platform/recharge/checkMember",
        data:JSON.stringify(staffjson),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                //添加改后的数据
                var indexNum = 0;
                indexNum = indexOfData(code,correctdata);
                if(indexNum>=0){
                    RemoveValByIndex(correctdata,indexNum);
                }
                //sureJson.ref2 = code;
                sureJson = data.staff;
                correctdata.unshift(sureJson);
                $('#viptable').bootstrapTable('load',correctdata);
                //删除异常的数据
                indexNum=indexOferror(oldcode,errordata);
                RemoveValByIndex(errordata,indexNum);
                $('#errortable').bootstrapTable('load',errordata);
                if(errordata.length==0){
                    $("#errorcontent").attr("style","display:none");
                }
                $("#successNum").text(correctdata.length);
                $("#errorNum").text(errordata.length);
                $("#peopleNum").text(correctdata.length);
                //更新总金额
                summoney();
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
/*-----------------------------------------------------------------------------------------------------------------------
/*保存充值单
-------------------------------------------------------------------------------------------------------------------------*/
function saveorder(){
    var bookingId= $("#bookingid").text();//单号
    var remark =$("#remark").val();
    var bookingFlag=0;
    var collectMoney =$("#moneySum").text();
    if(Number(collectMoney)==0 ){
        erroMessage("充值总金额为0,请确认是否填写正确");
        return false;
    }
    var sumStaff=$("#peopleNum").text();
    var dataList = $('#viptable') .bootstrapTable('getData');
    var yhmoney=$('#yhmoney').val();
    var saverecharge={"bookingId":bookingId,"bookingFlag":bookingFlag,"companyId":companyId,"companyName":companyName,"collectMoney":collectMoney,
        "sumStaff":sumStaff,"remark":remark,"ref1":locId,"ref2":yhmoney,"userId":userId ,"stuffArry":dataList};
    $.ajax({
        type: "post",
        url: basePath+"platform/recharge/save",
        data:JSON.stringify(saverecharge),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        beforeSend:function(){
            $('#loading', window.parent.document).modal();
        },
        success: function (data) {
            $('#loading', window.parent.document).modal('hide');
            if(data.status==1||data.status=='1'){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '保存成功！',
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            window.location.href=basePath+"platform/recharge/m";
                        }
                    }]
                });
            }else{
                erroMessage(data.Msg);
            }
        },error: function (request, status, err) {
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
function changeMoney(index,obj){
    var data = $("#viptable").bootstrapTable('getData')[index];
    var money = $(obj).val();
    if(isnew==0){
        var after = Number(data.before) + Number(money);
        $('#viptable').bootstrapTable('updateCell', {index: index,field: 'after',value:after.toFixed(2)});
        $('#viptable').bootstrapTable('updateCell', {index: index,field: 'money',value:$(obj).val()});
    }else{
        var after = Number(data.rechargeBefore) + Number(money);
        $('#viptable').bootstrapTable('updateCell', {index: index,field: 'rechargeAmount',value:$(obj).val()});
        $('#viptable').bootstrapTable('updateCell', {index: index,field: 'rechargeAfter',value:after.toFixed(2)});
    }
    summoney();
}
/*-----------------------------------------------------------------------------------------------------------------------
/*修改批量充值单
-------------------------------------------------------------------------------------------------------------------------*/
function updateOrder () {
    var sumMoney= $("#moneySum").text();
    //优惠金额
    var yhmoney=$('.discountmoney').val();
    if(Number(yhmoney)>=Number(sumMoney)){
        erroMessage("优惠金额不能大于充值金额");
        return false;
    }
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    userId = staff.staffId;
    locId = staff.locId;
    var dataList = $('#viptable') .bootstrapTable('getData');
    for (var i in dataList){
        var memberId=dataList[i].ref2;
        var  rechargeAmount=dataList[i].rechargeAmount;
        var detailjson = {"memberId": memberId, "rechargeAmount": rechargeAmount};
        rechangedata.push(detailjson);
    }

    var saverecharge={"bookingId":bookingId,'locId':locId,'userId':userId,"collectMoney":sumMoney,"ref2":yhmoney,"rechangedata":rechangedata};
    $.ajax({
        type: "POST",
        url: basePath+"platform/recharge/update",
        data:JSON.stringify(saverecharge),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        beforeSend:function(){
            $('#loading', window.parent.document).modal();
        },
        success: function (data) {
            $('#loading', window.parent.document).modal('hide');
            if(data.status==1||data.status=='1'){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '更新成功！',
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            window.location.href=basePath+"platform/recharge/m";
                        }
                    }
                    ]
                });
            }else{
                $('.errortoolip:eq(0)').html(data.Msg);
                $('.errortoolip:eq(0)').show();
            }
        },error: function (request, status, err) {
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
/*-----------------------------------------------------------------------------------------------------------------------
/*复核充值单
-------------------------------------------------------------------------------------------------------------------------*/
function checkOrder(){
    var factgathermoney= $(".factgathermoney").html()
    if(factgathermoney==""){
        erroMessage("实收金额不能为空！");
        return false;
    }
    var oughtmoney = $(".oughtmoney").html();
    if(Number(factgathermoney)!=Number(oughtmoney)){
        erroMessage("实收金额和应收金额不相等！");
        return false;
    }
    $("#sureCheck").modal()
}
//复核
function savecheck(obj){
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    userId = staff.staffId;
    locId = staff.locId;
    var dataList = $('#viptable') .bootstrapTable('getData');
    for (var i in dataList){
        var memberId=dataList[i].ref2;
        var  rechargeAmount=dataList[i].rechargeAmount;
        var detailjson = {"memberId": memberId, "rechargeAmount": rechargeAmount};
        rechangedata.push(detailjson);
    }
    var password = $('.password').val();
    if(password==""){
        $('.errortoolip:eq(0)').html("支付密码不能为空！");
        $('.errortoolip:eq(0)').show();
        return false;
    }
    var sumMoney= $("#moneySum").text();
    var factrecivemoney = $(".oughtmoney").html();
    $('.errortoolip:eq(0)').hide();
    var saverecharge={"bookingId":bookingId,'locId':locId,'password':password,'userId':userId,"checkMoney":factrecivemoney,"collectMoney":sumMoney,"rechangedata":rechangedata};
    $.ajax({
        type: "POST",
        url: basePath+"platform/recharge/check",
        data:JSON.stringify(saverecharge),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        beforeSend:function(){
            $(obj).button('loading');
        },
        success: function (data) {
            $(obj).button('reset');
            if(data.status==1||data.status=='1'){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '复核成功！',
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            window.location.href=basePath+"platform/recharge/m";
                        }
                    }
                    ]
                });
            }else{
                $('.errortoolip:eq(0)').html(data.Msg);
                $('.errortoolip:eq(0)').show();
            }
        },error: function (request, status, err) {
            $(obj).button('reset');
            if (status == "timeout")
            {
                erroMessage("请求超时~请稍后重试");
            }else{
                erroMessage("初始化信息失败~请稍后重试");
            }
        }
    });
}

/*-----------------------------------------------------------------------------------------------------------------------
/*作废
-------------------------------------------------------------------------------------------------------------------------*/
function invalidorder(){
    BootstrapDialog.show({
        title: '提示信息',
        message: '是否作废充值单？',
        buttons: [{
            label: '取消',
            cssClass: 'btn-default',
            action: function(dialog) {
                dialog.close();
            }
            },{
                label: '确定',
                cssClass: 'btn-primary',
                action: function(dialog) {
                    dialog.close();
                    invaliddata();
                }
            }
        ]
    });
}
//作废操作
function invaliddata(){
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    userId = staff.staffId;
    $.ajax({
        type: "get",
        url: basePath+"platform/recharge/invalid?bookingId="+bookingId+"&status=3&userId="+userId,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        beforeSend:function(){
            $('#loading', window.parent.document).modal();
        },
        success: function (data) {
            $('#loading', window.parent.document).modal('hide');
            if(data.status==1||data.status=='1'){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: '作废成功！',
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            window.location.href=basePath+"platform/recharge/m";
                        }
                    }
                    ]
                });
            }else{
                erroMessage(data.Msg);
            }
        },error: function (request, status, err) {
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

function hidebatchrecharge(){
    $(".search").show();
    $(".batchModify").hide();
    // 所有取消选中
    correctdataId=[];
    for (var i in correctdata){
        correctdataId.push(correctdata[i].ref2)
    }
    $('#viptable').bootstrapTable('uncheckBy', {field:'ref2', values:correctdataId});
}
// 批量修改金额
function batchinput(){
    var batchMoney=$("#batchMoney").val();
    var selectList = $('#viptable') .bootstrapTable('getAllSelections');
    var dataList = $('#viptable') .bootstrapTable('getData');
    for(var i in selectList){
        var index = indexOfData(selectList[i].ref2,dataList);
        if(isnew==0){
            var after = Number(selectList[i].before) + Number(batchMoney);
            $('#viptable').bootstrapTable('updateCell', {index: index,field: 'after',value:after.toFixed(2)});
            $('#viptable').bootstrapTable('updateCell', {index: index,field: 'money',value:batchMoney});
        }else{
            var after = Number(selectList[i].rechargeBefore) + Number(batchMoney);
            $('#viptable').bootstrapTable('updateCell', {index: index,field: 'after',value:after.toFixed(2)});
            $('#viptable').bootstrapTable('updateCell', {index: index,field: 'rechargeAmount',value:batchMoney});
        }
    }
    summoney();
}
/*-----------------------------------------------------------------------------------------------------------------------
/*设置支付密码
-------------------------------------------------------------------------------------------------------------------------*/
function setpassword(){
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    locId = staff.locId;
    userId = staff.staffId;
    $.ajax({
        type: "get",
        url: basePath+"platform/pay/check?id="+locId,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            isnew = data.status;
            if(isnew==1||isnew=='1'){
                erroMessage("你已经设置的支付密码，请输入！");
            }else{
                $(".validateform").hide()
                $(".setpassword").show()
                $(".rechargebtn").hide()
                $(".setpasswordbtn").show()
                $("#sureCheck .modal-header h4").text('设置支付密码')
            }
        }, error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时，请稍后重试！");
            }else{
                erroMessage("初始化信息失败，请稍后重试！");
            }
        }
    });
}
/*-----------------------------------------------------------------------------------------------------------------------
/*设置支付密码返回
-------------------------------------------------------------------------------------------------------------------------*/
function backrecharge(){
    $(".validateform").show();
    $(".setpassword").hide();
    $(".rechargebtn").show();
    $(".setpasswordbtn").hide();
    $("#sureCheck .modal-header h4").text('复核确认');
}
$(".btn-password").click(function() {
    var newpassword =  $("input[name='newpassword']").val();
    var regEx = /^[a-zA-Z0-9_]{4,16}$/;
    if(newpassword==""){
        $('.errortoolip:eq(1)').html("支付密码不能为空！");
        $('.errortoolip:eq(1)').show();
        return false;
    }
    if(!regEx.test(newpassword)){
        $('.errortoolip:eq(1)').html("密码设置在4-16位字符之间！");
        $('.errortoolip:eq(1)').show();
        return false;
    }
    $('.errortoolip:eq(1)').hide();
    var replaypassword = $("input[name='replaypassword']").val();
    if(replaypassword==""){
        $('.errortoolip:eq(2)').html("确认支付密码不能为空！");
        $('.errortoolip:eq(2)').show();
        return false;
    }
    if(newpassword!=replaypassword){
        $('.errortoolip:eq(2)').html("确认密码和支付密码不一致！");
        $('.errortoolip:eq(2)').show();
        return false;
    }
   var oldpassword="";
    $('.errortoolip:eq(2)').hide();
    datajson={"loc":locId,"oldp":oldpassword,"newp":newpassword,"id":userId};
    $.ajax({
        type: "post",
        url: basePath+"platform/pay/modify",
        data:JSON.stringify(datajson),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            status = data.status;
            if(status==1||status=='1'){
                backrecharge();
            }else{
                $('.errortoolip:eq(2)').html("网络出走，请稍后重试");
                $('.errortoolip:eq(2)').show();
            }
        }, error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时，请稍后重试！");
            }else{
                erroMessage("初始化信息失败，请稍后重试！");
            }
        }
    });
});

/*-----------------------------------------------------------------------------------------------------------------------
 /*工具类 2018-05-30
 -------------------------------------------------------------------------------------------------------------------------*/
//确定数组的索引值
function indexOferror(val,list){
    for(var i = 0; i < list.length; i++){
        if(list[i].memberId== val){return i;}
    }
    return -1;
}
//确定数组的索引值
function indexOfData(val,list){
    for(var i = 0; i < list.length; i++){
        if(list[i].ref2== val){return i;}
    }
    return -1;
}
//删除数组的对应索引元素
function RemoveValByIndex(arr, index) {
    arr.splice(index, 1);
}
//计算总金额
function summoney(){
    var allDataList= $('#viptable').bootstrapTable('getData');
    var sumMoney=0;
    for(var i in allDataList){
        if(isnew==0){
            sumMoney=Number(sumMoney)+Number(allDataList[i].money);
        }else{
            sumMoney=Number(sumMoney)+Number(allDataList[i].rechargeAmount);
        }
    }
    if(isnew==0){
        yhmoney = $("#yhmoney").val();
    }else{
        if(Number(isMoney)==0){
            yhmoney = $(".discountmoney").val();
        }else{
            yhmoney = $(".discountmoney").html();
        }
    }
    $("#moneySum").text(sumMoney.toFixed(2));
    oughtmoney = sumMoney - Number(yhmoney);
    $(".oughtmoney").text(oughtmoney.toFixed(2));
}
//优惠金额
function changyhmoney(obj){
    var str=obj.value;
    if(str.substr(str.length-1,1)=="."){
        str=str.substr(0,str.length-1)
    }
    var yhmoney=Number(str);
    var moneySum=Number($("#moneySum").text());
    if(yhmoney>moneySum){
        erroMessage('优惠金额不能大于充值金额！');
        $(obj).val(0);
        $(".oughtmoney").text(moneySum);
        return false;
    }
    var ought=moneySum-yhmoney;
    $(".oughtmoney").text(ought.toFixed(2));
}
/*-----------------------------------------------------------------------------------------------------------------------
/*关闭提示信息
-------------------------------------------------------------------------------------------------------------------------*/
function closetoolip(){
    $(".importToolip").hide()
}
/*-----------------------------------------------------------------------------------------------------------------------
/*检索付款单
-------------------------------------------------------------------------------------------------------------------------*/
$(".btn_check").click(function() {
    $(this).button('loading');
    receiptbooking =  $('.receiptbooking').val();
    if(""==receiptbooking){
        erroMessage("付款单号不能为空");
        $(this).button('reset');
        return false;
    }
    refid = $('#bookingId').html();
    $.ajax({
        type: "get",
        url: basePath+"platform/receipt/get?id="+receiptbooking+"&refid="+refid,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            $(".btn_check").button('reset');
            status = data.status;
            if(status==1||status=='1'){
               map = data.map;
               $('.factgathermoney').html(map.payMoney);
            }else{
                $('.factgathermoney').html("");
                erroMessage(data.Msg);
            }
        }, error: function (request, status, err) {
            $(".btn_check").button('reset');
            if (status == "timeout")
            {
                erroMessage("请求超时，请稍后重试！");
            }else{
                erroMessage("初始化信息失败，请稍后重试！");
            }
        }
    });
});