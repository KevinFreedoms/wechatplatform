/*-----------------------------------------------------------------------------------------------------------------
/*初始化
------------------------------------------------------------------------------------------------------------------*/
function init() {
    contentheight();
    calendar();
    //日历初始化
    $("#intergralTab").bootstrapTable({
        url: basePath+'platform/memberManagement/getFreeDay.do',
        method: 'post',//请求方法
        //data:vipinfo,
        contentType: "application/x-www-form-urlencoded",
        search: true,  //是否显示搜索框功能
        striped: true,
        queryParams: function () {
            return {startDate: startDate, endDate: endDate};
        },
        pagination: true,
        pageSize: 10,
        pageList: [10, 20, 30],
        columns: [{title: "会员编码", field: "memberId", align: "left", valign: "middle", width: "15%"},
            {title: "会员名称", field: "memberName", align: "left", valign: "middle", width: "15%"},
            {title: "卡号", field: "code", align: "left", valign: "middle", width: "12%"},
            {title: "优惠券编码", field: "sourceBooking", align: "left", valign: "middle", width: "12%"},
            {title: "来源", field: "source", align: "center", valign: "middle", width: "8%"},
            {title: "产生日期", field: "sourceDate", align: "center", valign: "middle", width: "14%"},
            {title: "兑换前积分", field: "beforeIntegration", align: "right", valign: "middle", width: "8%"},
            {title: "兑换积分", field: "changeIntegration", align: "right", valign: "middle", width: "8%"},
            {title: "兑换后积分", field: "nowIntegration", align: "right", valign: "middle", width: "8%"}
        ]
    });
}
var startDate="9999";
var endDate="9999";
//时间过滤 点击不同的日期显示不同的数据
function filterTime(obj) {
    var ftime = $(obj).attr('data-id');
    // var startDate = "";
    // var endDate = "";
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
    createTable(startDate, endDate);
    $('.reservation').data('daterangepicker').setStartDate(startDate);
    $('.reservation').data('daterangepicker').setEndDate(endDate);

}

//当日起变化时超找对应的数据
$('#reservation').on('apply.daterangepicker', function () {
    $('.yhmenu>li>input').attr('checked', false);
    var ftime = $('#reservation').val();
    startDate = ftime.split(' - ')[0].trim();
    endDate = ftime.split(' - ')[1].trim();
    createTable(startDate, endDate);
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

//构建table
function createTable() {
    //$.post('getFreeDay.do', {startDate: startDate, endDate: endDate}, function (data) {
        //$("#intergralTab").bootstrapTable('load', data);
         $("#intergralTab").bootstrapTable('refresh', {url:basePath+'platform/memberManagement/getFreeDay.do'});
        $("#intergralTab").bootstrapTable('selectPage', 1);
    //})
}
