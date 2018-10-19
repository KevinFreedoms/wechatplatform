// JavaScript Document
//订单明细
var proInfo = [];
//支付明细
var payInfo ="";

$(function () {
    init();
    //隐藏表格列
    $('#wetchatOrdertb').bootstrapTable('hideColumn', 'vipcode');
    $('#wetchatOrdertb').bootstrapTable('hideColumn', 'vipName');
    $('#wetchatOrdertb').bootstrapTable('hideColumn', 'remark');
})

/*----------------------------------------------------------------------------------------
/*初始化
/*---------------------------------------------------------------------------------------*/
function init() {
    contentheight()//页面高度

    $('.reservation').val(currenttime() + " 至 " + currenttime())
    $('.reservation').daterangepicker({
        format: 'YYYY-MM-DD HH:mm',
        timePicker: true,
        timePicker12Hour: false,
        timePickerIncrement: 1,
        separator: ' 至 ',
        startDate: currenttime(),
        endDate: currenttime(),
    });
    getDate();
    $("#wetchatOrdertb").bootstrapTable({
       // data: wetchatorder,
        url:basePath+"platform/orderManagement/getOrder.do",
        method: 'post',
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        sidePagination: "server",
        striped: true,
        search: true,
        pagination: true,
        pageSize: 10,
        pageList: [10, 20, 30],
        showColumns: true,
        columns: [{
            title: "订单编号", field: "bookingId", align: "left", valign: "middle"

        },
            {title: "门店名称", field: "locName", align: "left", valign: "middle"},
            {title: "门店编码", field: "locId", align: "center", valign: "middle"},
            {title: "来源", field: "bookingSource", align: "center", valign: "middle"},
            {
                title: "状态", field: "bookingStatus", align: "center", valign: "middle",
                formatter: function (value, row, index) {
                    var statu = row.bookingStatus;
                    var temp = "";
                    if (statu == 0) temp = "未付款";
                    if (statu == 1) temp = "已付款";
                    if (statu == 2) temp = "已获取";
                    if (statu == 3) temp = "已确认";
                    if (statu == 4) temp = "已递送";
                    if (statu == 5) temp = "已结单";
                    if (statu == 6) temp = "已退单";
                    if (statu == 10) temp = "退单中";
                    var e = '<span>' + temp + '</span>';
                    return e;
                }
            },
            {title: "下单时间", field: "createDate", align: "left", valign: "middle"},
            {title: "配送地址", field: "address", align: "left", valign: "middle",formatter:function(value, row, index){
                        var temp=row.company+row.address;
                        return temp;
                }},
            {title: "顾客姓名", field: "ref1", align: "center", valign: "middle"},
            {title: "顾客电话", field: "phone", align: "center", valign: "middle"},
            {title: "订单总额", field: "price", align: "right", valign: "middle",formatter:function (value, row, index) {
                    return row.price.toFixed(2);
                }},
            {title: "会员编码", field: "memberId", align: "center", valign: "middle"},
            {title: "会员名称", field: "memberName", align: "center", valign: "middle"},
            {title: "备注", field: "remark", align: "center", valign: "middle"}
        ],
        queryParams: function (params) {//自定义参数，这里的参数是传给后台的，我这是是分页用的
            search=params.search==undefined?'':params.search;
            return {//这里的params是table提供的
                start: params.offset,//从数据库第几条记录开始
                pageSize: params.limit,//找多少条
                startDate:startDate,
                endDate:endDate,
                locId:loc,
                bookingType:bt,
                bookingStatus:bs,
                search:params.search==undefined?'':params.search

            };
        },
        onDblClickRow: function (row, $element) {
            clearDetail();
            var recourse = row.bookingType;
            $('#bookingId').html(row.bookingId);
            $('#price').html(row.price.toFixed(2));
            $('#sumPrice').html(row.sumPrice.toFixed(2));
            $('#ps').html(row.deliveryPrice.toFixed(2));
            $('#zk').html((row.price-row.sumPrice).toFixed(2));
            $('#bp').html(row.packingPrice.toFixed(2));
            $('#shName').html(row.ref1);
            $('#address').html(row.company+row.address);
            $('#phone').html(row.phone);
            $('#remark').html(row.remark);
            $('#deliveryTime').html(row.deliveryTime);
            getDetailAndSelling(row.bookingId);
            $("#orderDetail").modal();
            if (recourse == '1') {
                $(".deliveryAdress").hide();
                $(".deliveryTime").hide()
            };
            if (recourse == '0') {
                $(".deliveryAdress").show();
                $(".deliveryTime").show()
            }
        }
    });
    //商品详情
    $("#productInfo").bootstrapTable({
        data: proInfo,
        striped: true,
        columns: [{title: "产品编码", field: "productId", align: "left", valign: "middle"},
            {title: "产品名称", field: "productName", align: "center", valign: "middle"},
            {title: "价格", field: "salePrice", align: "right", valign: "middle"},
            {title: "数量", field: "quantity", align: "right", valign: "middle"},
            {title: "备注", field: "remark", align: "left", valign: "middle"}
        ]

    });
    //支付详情
    $("#payInfo").bootstrapTable({
        data: payInfo,
        striped: true,
        columns: [{title: "付款编码", field: "otherPaymentId", align: "left", valign: "middle"},
            {title: "付款名称", field: "otherPaymentName", align: "left", valign: "middle"},
            {title: "金额", field: "totalMoney", align: "left", valign: "middle"}
        ]
    })
}

/*----------------------------------------------------------------------------------------
/*获得订单处于的几种状态
/*---------------------------------------------------------------------------------------*/
var bs="9999";
$("#bookingstatus input[type='checkbox']").on('click', function () {
    bs = "";
    if ($(this).attr('data-bookingstatus') == "9999") {

        if ($(this).is(':checked') == true) {
            $("#bookingstatus input[type='checkbox']").each(function (i) {
                if ($(this).is(':checked') == false) {
                    $(this).parent().click();
                }
                bs = '9999,';
            });
        } else {
            $("#bookingstatus input[type='checkbox']").each(function (i) {
                $(this).attr('checked', false);
                bs = '9999,';
            });
        }
    } else {
        $("#bookingstatus input[type='checkbox']").each(function (i) {
            if ($(this).is(':checked') == true && $(this).attr('data-bookingstatus') != '9999') {
                bs += $(this).attr('data-bookingstatus') + ",";
                if (bs == "0,1,2,3,4,5,6,10,") {
                    $('#bookingstatus input[data-bookingstatus="9999"]').parent().click();
                    bs = "9999,";
                }
            } else {
                if ($('#bookingstatus input[data-bookingstatus="9999"]').is(':checked') == true) {
                    $('#bookingstatus input[data-bookingstatus="9999"]').attr("checked", false);
                }
            }
        });
        if (bs == '') {
            bs = '9999,';
        }
    }
    bs = bs.slice(0, -1);
    createOrderCollect();
});
/*----------------------------------------------------------------------------------------
/*获得bookingType的状态
/*---------------------------------------------------------------------------------------*/
var bt="9999";
$('#bookingType input').on('click',function () {
    $("#bookingType input[type='radio']").each(function (i) {
        if($(this).is(':checked')){
          bt=$(this).attr('data-bookingType');
        }
    });
    createOrderCollect();
});
/*----------------------------------------------------------------------------------------
/*获得门店的编码
/*---------------------------------------------------------------------------------------*/
var loc=$('#wxLoc :selected').attr('data-sid');
function locChange(){
    loc=$('#wxLoc :selected').attr('data-sid');
    createOrderCollect();
}
/*----------------------------------------------------------------------------------------
/*日期处理
/*---------------------------------------------------------------------------------------*/
var startDate="";
var endDate="";
function getDate(){
    var startAndEnd=$('#reservation').val();
    startDate=startAndEnd.split('至')[0].trim();
    endDate=startAndEnd.split('至')[1].trim();
}
function createOrderCollect(){
    $("#wetchatOrdertb").bootstrapTable('refresh', {url:basePath+"platform/orderManagement/getOrder"});
    $("#wetchatOrdertb").bootstrapTable('selectPage', 1);
}
$('#reservation').on('apply.daterangepicker', function () {
    getDate();
    createOrderCollect();
})
/*----------------------------------------------------------------------------------------
/*获得明细和支付方式
/*---------------------------------------------------------------------------------------*/
function  getDetailAndSelling(bookingId){
    $.post(basePath+'platform/orderManagement/getDetailAndSelling.do',{bookingId:bookingId},function(data){
        if(data.status=="success"){
            $("#productInfo").bootstrapTable('load',data.detail);
            $("#payInfo").bootstrapTable('load',data.selling);
        }
    })
}
function clearDetail(){
    $('#bookingId').html("");
    $('#price').html("");
    $('#sumPrice').html("");
    $('#ps').html("");
    $('#zk').html("");
    $('#bp').html("");
    $('#shName').html("");
    $('#address').html("");
    $('#phone').html("");
    $('#remark').html("");
    $('#deliveryTime').html("");
}
/*----------------------------------------------------------------------------------------
/*导出Excel
/*---------------------------------------------------------------------------------------*/
var search="";
function exportExcel() {
    // $("#wetchatOrdertb").tableExport({type: 'excel', separator: ';', escape: 'false'});
    location.href=basePath+"platform/orderManagement/downLoadExcel.do?startDate="+startDate+"&endDate="+endDate+"&bookingType="+bt+"&bookingStatus="+bs+"&locId="+loc+"&search="+search;
}