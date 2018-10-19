function init(){
    calendar();
    contentheight();
    LoadMessage("数据加载中请稍后");
    $('#loading', window.parent.document).modal();
    $("#vipmessageTab").bootstrapTable({
        url:basePath+'platform/memberManagement/getMembersByFy.do',
        method: 'post',
       // async:true,
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        search: true,  //是否显示搜索框功能
        striped: true,
        pagination: true,
        sidePagination: "server",
        pageSize: 10,
        pageList: [10, 20, 30],
        columns: [{title: "会员编码", field: "memberId", align: "left", valign: "middle",width:"12%"},
            {title: "会员名称", field: "memberName", align: "left", valign: "middle",width:"12%"},
            {title: "性别", field: "sex", align: "left", valign: "middle",width:"7%", formatter: function (value, row, index) {
                    var e = row.sex == 0 ? '女' : '男';
                    return e;
                }},
            {title: "电话", field: "phone", align: "left", valign: "middle",width:"12%"},
            {title: "生日", field: "birthday", align: "left", valign: "middle",width:"12%"},
            {title: "注册时间", field: "registrationDate", align: "left", valign: "middle",width:"15%"},
            {title: "积分", field: "currentIntegration", align: "right", valign: "middle",width:"10%"},
            {title: "余额", field: "balance", align: "right", valign: "middle",width:"10%"},
            {title: "累积消费", field: "cumulative", align: "right", valign: "middle",width:"10%"}
        ],
        queryParams: function (params) {//自定义参数，这里的参数是传给后台的，我这是是分页用的
            return {//这里的params是table提供的
                start: params.offset,//从数据库第几条记录开始
                pageSize: params.limit,//找多少条
                startDate:startDate,
                endDate:endDate,
                search:params.search==undefined?'':params.search

            };
        },
        onLoadSuccess:function () {
            $('#loading', window.parent.document).modal('hide');
            dialog.close();
        }
    })

}


var startDate="9999";
var endDate="9999";
var search="";
//时间过滤 点击不同的日期显示不同的数据
function filterTime(obj) {
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
    createTable(startDate, endDate);
    $('.reservation').data('daterangepicker').setStartDate(startDate);
    $('.reservation').data('daterangepicker').setEndDate(endDate);

}

$('#reservation').on('apply.daterangepicker', function () {
    LoadMessage("数据加载中请稍后");
    $('.yhmenu>li>input').attr('checked', false);
    var ftime = $('#reservation').val();
    startDate = ftime.split(' - ')[0];
    endDate = ftime.split(' - ')[1];
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
        $("#vipmessageTab").bootstrapTable('refresh', {url:basePath+'platform/memberManagement/getMembersByFy'});
        $("#vipmessageTab").bootstrapTable('selectPage', 1);
        //$("#vipmessageTab").bootstrapTable('refresh', {url:basePath+'platform/memberManagement/getMembersByFy?startDate='+ startDate+'&endDate='+endDate});
        //$("#vipmessageTab").bootstrapTable('selectPage', 1);
}

var dialog;
function LoadMessage(content){
    dialog=BootstrapDialog.show({
        title: '提示信息',
        closable: false,
        message: content
    });
}