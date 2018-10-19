// JavaScript Document
var rechargeorder=[];
var locid = "";//门店编号
var phonenumber = ""; //手机号
/*-----------------------------------------------------------------------------------------------------------------------
/*初始化
-------------------------------------------------------------------------------------------------------------------------*/
function  initRecharge(){
    var chooseDate=localStorage.getItem("chooseDate");
    if(chooseDate==null){
        $('.reservation').val(nowtime()+' 至 '+nowtime())
    }else{
        $('.reservation').val(chooseDate);
    }
    var startDate =$('#reservation').val().substring(0,10);
    var endDate =$('#reservation').val().substring(13);
    $('.reservation').daterangepicker({
        startDate:startDate,
        endDate: endDate,
        separator : ' 至 ',
    })
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    locid = staff.locId;
    phonenumber=staff.phone;
    var str = "手机号："+phonenumber.substring(0,3)+"*****"+phonenumber.substring(8);
    $(".pay-iphone").html(str);
    //初始化页面高度
    contentheight();
    //初始化信息
    showRechangecollect();
};
$(".reservation").on('apply.daterangepicker',function(){
    var chooseDate=$("#reservation").val();
    var startDate =chooseDate.substring(0,10);
    var endDate =chooseDate.substring(13);
    //存储选择的查询时间
    localStorage.setItem("chooseDate",chooseDate);
    $('.batchRechargeOrder').bootstrapTable('refresh',{url: basePath+'platform/recharge/list?locId='+locid+"&startDate="+startDate+"&endDate="+endDate});
});
function showRechangecollect(){
    var startDate =$('#reservation').val().substring(0,10);
    var endDate =$('#reservation').val().substring(13);
    var screenwidth=$(window).width();
    $('.batchRechargeOrder').bootstrapTable({
        url: basePath+'platform/recharge/list?locId='+locid+"&startDate="+startDate+"&endDate="+endDate,   //请求后台的URL（*）
        method: 'get',      //请求方式（*）
        striped: true,       //是否显示行间隔色
        pagination: true,    //是否显示分页（*）
        pageNumber:1,        //初始化加载第一页，默认第一页
        pageSize: 10,        //每页的记录行数（*）
        pageList: [10, 20, 50, 100, 200, 500],  //可供选择的每页的行数（*）
        search: true,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        showColumns:true,
        columns: [{
                field: 'bookingFlag',
                title: '状态',
                valign: 'middle',
                align: 'center',
                formatter:function(value,row,index){
                    var flag=row.bookingFlag
                    var e=''
                    if(flag==0){
                        e='<span class="waitcheck">待复核</span>'
                    }
                    if(flag==1){
                        e='<span class="finfish">已完成</span>'
                    }
                    if(flag==3){
                        e='<span class="invalid">已作废</span>'
                    }
                    return e;
                }
            },{
            title: '订单编码',
            field: 'bookingId',
            align: 'center',
            valign: 'middle'
            }, {
                field: 'companyId',
                title: '企业编码',
                align: 'center',
                valign: 'middle'
             },{
                field: 'companyName',
                title: '企业名称',
                align: 'center',
                valign: 'middle'
            },{
                field: 'collectMoney',
                sortable: true,
                title: '充值金额',
                align: 'right',
                valign: 'middle'
            }, {
                field: 'ref2',
                sortable: true,
                title: '优惠金额',
                align: 'right',
                valign: 'middle'
            },{
                field: 'checkMoney',
                sortable: true,
                title: '复核金额',
                align: 'right',
                valign: 'middle'
            }, {
                field: 'sumStaff',
                sortable: true,
                title: '总人数',
                align: 'right' ,
                valign: 'middle'
            }, {
                field: 'createUserId',
                title: '创建人',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'createDate',
                title: '创建时间',
                align: 'center',
                valign: 'middle',
                formatter:function(value,row,index){
                    var e=ChangeDateFormat(row.createDate);
                    return e;
                }

             },{
                field: 'lastupdateUserId',
                title: '更新人',
                align: 'center',
                valign: 'middle'
            },{
                field: 'lastupDate',
                title: '更新时间',
                align: 'center',
                valign: 'middle',
                formatter:function(value,row,index){
                    var e=ChangeDateFormat(row.lastupDate);
                    return e;
                }
            },
            {
                field: 'checkUserId',
                title: '复核人',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'checkDate',
                title: '复核时间',
                align: 'center',
                valign: 'middle',
                formatter:function(value,row,index){
                    if (row.checkDate==null||row.checkDate==''){

                    }else{
                        var e=ChangeDateFormat(row.checkDate);
                        return e;
                    }
                }
            },
            {
                field: 'invalidDate',
                title: '作废时间',
                align: 'center',
                valign: 'middle',
                formatter:function(value,row,index){
                    if (row.invalidDate==null||row.invalidDate==''){

                    }else{
                        var e=ChangeDateFormat(row.invalidDate);
                        return e;
                    }
                }
            },
            {
                field: 'invalidUserId',
                title: '作废人',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                valign: 'middle',
                formatter:function(value,row,index){
                    var e ='<a onclick="lookdetail(\''+row.bookingId+'\')">查看详情</a>';
                    return e;
                }
            }],
        onColumnSwitch:function(field, checked){
            var checkedleng=$(".dropdown-menu input[type='checkbox']:checked").length
            if(checkedleng>10&&checkedleng<14){
                $(".setTaboverflow").css('width','100%')
                $(".batchRechargeOrder").css('width',screenwidth+'px')
                return
            }
            if(checkedleng>=14){
                $(".batchRechargeOrder").css('width','1800px')
                return
            }
            $(".batchRechargeOrder").css('width','100%')

        },
        onLoadSuccess:function(data){

        },
        onCheckAll:function(rows){
            $('.batchRechargeOrder').bootstrapTable('checkBy', {field:'companyId', values:['0101001']});
            var obj = $('.batchRechargeOrder').bootstrapTable('getAllSelections');

            var rows = {
                index : 0,  //更新列所在行的索引
                field : "companyId", //要更新列的field
                value : "INITIALIZATION" //要更新列的数据
            }//更新表格数据
            $('.batchRechargeOrder').bootstrapTable("updateCell",rows)
        }

    });
    $('.batchRechargeOrder').bootstrapTable('hideColumn', 'checkDate');
    $('.batchRechargeOrder').bootstrapTable('hideColumn', 'checkUserId');
    $('.batchRechargeOrder').bootstrapTable('hideColumn', 'invalidDate');
    $('.batchRechargeOrder').bootstrapTable('hideColumn', 'invalidUserId');
    $('.batchRechargeOrder').bootstrapTable('hideColumn', 'lastupdateUserId');
    $('.batchRechargeOrder').bootstrapTable('hideColumn', 'lastupDate');
}
/*-----------------------------------------------------------------------------------------------------------------------
/*新增
-------------------------------------------------------------------------------------------------------------------------*/
function newaddrecharge(){
    //$("#checkphone").modal();
    window.location.href=basePath+"platform/recharge/new?headtype="+locid;
}
/*-----------------------------------------------------------------------------------------------------------------------
/*验证手机号  2018-07-11
-------------------------------------------------------------------------------------------------------------------------*/
var countdown = 60;
function getCode(obj){
    if(phonenumber==""){
        errorAlter("手机号不能为空");
        return false;
    }else if(!(/^1[34578]\d{9}$/.test(phonenumber))){
        errorAlter("请输入正确的手机号格式");
        return false;
    }
    timecut(obj);
    $.ajax({
        url: basePath+"platform/recharge/message?phone="+phonenumber,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 60000,
        success:function(data){
            if(data.status==1||data.status=='1'){
                temp = new Base64();
                var str = temp.encode(JSON.stringify(data.mobile_code));
                window.localStorage.setItem("mobile_code",str);
            }else{
                countdown = 0;
                erroMessage(data.info);
            }
        },
        error: function (request, status, err) {
            countdown = 0;
            if (status == "timeout")
            {
                erroMessage("请求超时请稍后重试");
            }else{
                erroMessage("获取失败");
            }
        }
    });
}
function timecut(obj) {
    if (countdown == 0) {
        obj.removeAttribute("disabled");
        obj.value="获取验证码";
        countdown = 60;
        return;
    }else {
        obj.setAttribute("disabled", true);
        obj.value="重新发送(" + countdown + "秒)";
        countdown--;
    }
    setTimeout(function() {
            timecut(obj)}
        ,1000);
}
$(".btn-code").click(function() {
    var temp = new Base64();
    var code = $(".code").val();
    if(code==""){
        erroMessage("请先输入验证码");
        return false;
    }
    mobile_code = localStorage.getItem("mobile_code")||"";
    if(mobile_code==""){
        erroMessage("请先获取验证码");
        return false;
    }
    mobile_code =temp.decode(mobile_code);//解密并获取本地的验证码

    if(code!=mobile_code){
        erroMessage("验证码输入有误");
        return false;
    }
    window.localStorage.removeItem("mobile_code");
    window.location.href=basePath+"platform/recharge/new?headtype="+locid;
});
/*-----------------------------------------------------------------------------------------------------------------------
/*查看详情
-------------------------------------------------------------------------------------------------------------------------*/
function lookdetail(obj){
    window.location.href=basePath+"platform/recharge/get?id="+obj;
}
// 日期格式转化
function ChangeDateFormat(jsondate) {
    var date = new Date(parseInt(jsondate, 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getMilliseconds() / 1000 < 10 ? "0" + parseInt(date.getMilliseconds() / 1000) : parseInt(date.getMilliseconds() / 1000);
    return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + second;
}