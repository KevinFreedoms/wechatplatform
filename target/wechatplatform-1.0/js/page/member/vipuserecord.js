
/*-----------------------------------------------------------------------------------------------------------------
/*初始化
------------------------------------------------------------------------------------------------------------------*/
var type="recharge";
function init(){
	contentheight();
	//日历初始化
	calendar();
    $('#loading', window.parent.document).modal();
    LoadMessage("数据加载中请稍后");
        var columns=[{title: "会员编码", field: "memberId", align: "center", valign: "middle",width:"10%"},
            {title: "会员名称", field: "memberName", align: "center", valign: "middle",width:"8%"},
            {title: "卡号", field: "code", align: "center", valign: "middle",width:"10%"},
            {title: "充值单号", field: "rechargeId", align: "center", valign: "middle",width:"10%"},
            {title: "充值时间", field: "createDate", align: "center", valign: "middle",width:"10%"},
            {title: "充值金额", field: "money", align: "center", valign: "middle",width:"8%"},
            {title: "实充金额", field: "actualMoney", align: "center", valign: "middle",width:"8%"},
            {title: "赠送金额", field: "presentMoney", align: "center", valign: "middle",width:"8%"},
            {title: "充值前金额", field: "beforeRechargeBalance", align: "center", valign: "middle",width:"8%"},
            {title: "充值后金额", field: "afterRechargeBalance", align: "center", valign: "middle",width:"8%"},
            {title: "赠送金额占比", field: "rate", align: "center", valign: "middle",width:"8%", formatter: function (value, row, index) {
                    var e = row.rate+"%";
                    return e;
                }}
        ];
        createBootStrapTable (basePath+"platform/memberManagement/get"+type,columns);
}
/*-----------------------------------------------------------------------------------------------------------------
/*切换不同类型的记录
------------------------------------------------------------------------------------------------------------------*/
$(".navtab li").click(function(){
    $('#loading', window.parent.document).modal();
    LoadMessage("数据加载中请稍后");
    type=$(this).attr("data-type");
    $(".navtab li").removeClass("active");
	$(this).addClass('active');
    $('.reservation').data('daterangepicker').setStartDate(new Date());
    $('.reservation').data('daterangepicker').setEndDate(new Date());
    //calendar();
    startDate="9999";
    endDate="9999";
    $('#reservation').val(getDateStr3(new Date()) + " - " + getDateStr3(new Date()));
    $('.yhmenu>li>input').attr('checked', false);
    $("#viprecordTab").bootstrapTable('destroy');
    var url=basePath+"platform/memberManagement/get"+type;
	if(type=='recharge'){
	    var columns=[{title: "会员编码", field: "memberId", align: "center", valign: "middle",width:"10%"},
            {title: "会员名称", field: "memberName", align: "center", valign: "middle",width:"8%"},
            {title: "卡号", field: "code", align: "center", valign: "middle",width:"10%"},
            {title: "充值单号", field: "rechargeId", align: "center", valign: "middle",width:"10%"},
            {title: "充值时间", field: "createDate", align: "center", valign: "middle",width:"10%"},
            {title: "充值金额", field: "money", align: "center", valign: "middle",width:"8%"},
            {title: "实充金额", field: "actualMoney", align: "center", valign: "middle",width:"8%"},
            {title: "赠送金额", field: "presentMoney", align: "center", valign: "middle",width:"8%"},
            {title: "充值前金额", field: "beforeRechargeBalance", align: "center", valign: "middle",width:"8%"},
            {title: "充值后金额", field: "afterRechargeBalance", align: "center", valign: "middle",width:"8%"},
            {title: "赠送金额占比", field: "rate", align: "center", valign: "middle",width:"8%", formatter: function (value, row, index) {
                    var e = row.rate+"%";
                    return e;
                }}
        ];
        createBootStrapTable (url,columns);
        return;
    }
    if(type=='consume'){
	    var  columns= [{title: "会员编码", field: "memberId", align: "center", valign: "middle",width:"10%"},
            {title: "会员名称", field: "memberName", align: "center", valign: "middle",width:"8%"},
            {title: "卡号", field: "code", align: "center", valign: "middle",width:"10%"},
            {title: "消费单号", field: "consumeId", align: "center", valign: "middle",width:"10%"},
            {title: "消费时间", field: "createDate", align: "center", valign: "middle",width:"10%"},
            {title: "应扣金额", field: "actualMoney", align: "center", valign: "middle",width:"8%"},
            {title: "实扣金额", field: "money", align: "center", valign: "middle",width:"8%"},
            {title: "折扣金额", field: "discountMoney", align: "center", valign: "middle",width:"8%"},
            {title: "扣款前金额", field: "beforeConsumeBalance", align: "center", valign: "middle",width:"8%"},
            {title: "扣款后金额", field: "afterConsumeBalance", align: "center", valign: "middle",width:"8%"}
        ];
        createBootStrapTable (url,columns);
        return
    }
    if(type=='changeintegration'){
	    var columns=[{title: "会员编码", field: "memberId", align: "center", valign: "middle",width:"15%"},
            {title: "会员名称", field: "memberName", align: "center", valign: "middle",width:"15%"},
            {title: "卡号", field: "code", align: "center", valign: "middle",width:"15%"},
            {title: "来源", field: "source", align: "center", valign: "middle",width:"15%"},
            {title: "产生日期", field: "sourceDate", align: "center", valign: "middle",width:"15%"},
            {title: "变更前积分", field: "changeIntegration", align: "center", valign: "middle",width:"15%"},
            {title: "变更后积分", field: "nowIntegration", align: "center", valign: "middle",width:"15%"},
        ];
        createBootStrapTable (url,columns);
        return
    }
});
//构建bootStrapTable
function createBootStrapTable (url,columns){
    $("#viprecordTab").bootstrapTable({
        url:url,
        contentType: "application/x-www-form-urlencoded",
        method: 'post',
        search: true,  //是否显示搜索框功能
        striped: true,
        pagination: true,
        pageSize: 10,
        pageList: [10, 20, 30],
        columns:columns,
        queryParams: function () {
            return {startDate: startDate, endDate: endDate};
        },
        onLoadSuccess:function (data) {
            $('#loading', window.parent.document).modal('hide');
            dialog.close();

        },
    })

}
var startDate="9999";
var endDate="9999";

//时间过滤 点击不同的日期显示不同的数据
function filterTime(obj) {
    $('#loading', window.parent.document).modal();
    LoadMessage("数据加载中请稍后");
    var ftime = $(obj).attr('data-id');
    var startend = "";
    switch (ftime) {
        case '0':
            var date = getDateStr3(new Date());
            startDate = date;
            endDate = date;
            break;
        case '1':
            startend = getWeekStartAndEnd(0);
            startDate = startend[0];
            endDate = startend[1];
            break;
        case '2':
            startend = getMonthStartAndEnd(0);
            startDate = startend[0];
            endDate = startend[1];
            break;
    }
    $('#reservation').val(startDate + " - " + endDate);
    createTableCurrent(startDate,endDate);
    $('.reservation').data('daterangepicker').setStartDate(startDate);
    $('.reservation').data('daterangepicker').setEndDate(endDate);

}
/**
 * 当日期切换时
 */
$('#reservation').on('apply.daterangepicker', function () {
    $('#loading', window.parent.document).modal();
    LoadMessage("数据加载中请稍后");
    $('.yhmenu>li>input').attr('checked', false);
    var ftime = $('#reservation').val();
    startDate = ftime.split(' - ')[0];
    endDate = ftime.split(' - ')[1];
    createTableCurrent(startDate,endDate);
    //createTable(type,startDate, endDate);
    if (startDate == endDate && startDate == getDateStr3(new Date())) {
        $("#filterdata0").attr("checked", "checked");
        return;
    }
    var startend = getWeekStartAndEnd(0);
    var startDate1 = startend[0];
    var endDate1 = startend[1];
    if (startDate == startDate1 && endDate == endDate1) {
        $("#filterdata1").attr("checked", "checked");
        return;
    }
    startend = getMonthStartAndEnd(0);
    startDate1 = startend[0];
    endDate1 = startend[1];
    if (startDate == startDate1 && endDate == endDate1) {
        $("#filterdata2").attr("checked", "checked");
        return;
    }
});
function createTableCurrent(){
    $("#viprecordTab").bootstrapTable('refresh', {url:basePath+"platform/memberManagement/get"+ type});
    $("#viprecordTab").bootstrapTable('selectPage', 1);
}
var dialog;
function LoadMessage(content){
    dialog=BootstrapDialog.show({
        title: '提示信息',
        closable: false,
        message: content
    });
}