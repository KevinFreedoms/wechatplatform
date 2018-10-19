/*------------------------------------------------------------------------------------------------------
 /*初始化
 -------------------------------------------------------------------------------------------------------*/
var couponType=99;//优惠券类型
var ref2=99;//状态
var receiveType=99;//领取状态
var status=88;//领取记录状态
function querycellect(couponType,ref2,receiveType){
    $("#couponrecord").bootstrapTable({
        url: basePath+"platform/coupon/collect?couponType="+couponType+"&ref2="+ref2+"&receiveType="+receiveType,
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
        columns: [
            {title: "操作", field: "operate", align: "center", valign: "middle",width:"10%",
                formatter: function (value, row, index) {
                    var couponBatch=row.couponBatch;
                    var receiveType=row.receiveType;
                    var couponType=row.couponType;
                    var row=JSON.stringify(row);
                    row=row.replace(/\"/g,"\'");
                    var str= '<div>'+
                        '<a data-toggle="tooltip" title="修改"  class="icon-edit tooltips" onclick="updateCoupon(\''+couponBatch+'\')"></a>'+
                        '<a data-toggle="tooltip" title="查看领用记录" class="icon-eye-open tooltips lookdetail" onclick="queryCoupondetail(\''+couponBatch+'\','+receiveType+','+couponType+')"></a>'+
                        '<div>'
                    return str;
                }
            },
            {title: "优惠券批次", field: "couponBatch", align: "center", valign: "middle",width:"10%" },
            {title: "是否启用", field: "ref2", align: "center", valign: "middle",width:"10%",
                formatter:function(value,row,index){
                    var e = row.ref2==0?"<a>未启用</a>":"<a>启用</a>";
                    return e;
                }
            },
            {title: "优惠券类型", field: "couponType", align: "left", valign: "middle",width:"10%",
                formatter:function(value,row,index){
                    var e = row.couponType==0?"代金券":"折扣菜券";
                    return e;
                }
            },
            {title: "领取类型", field: "receiveType", align: "left", valign: "middle",width:"10%",
                formatter:function(value,row,index){
                    var e='';
                    if(row.receiveType==0){
                        e='免费领取';
                    }else if(row.receiveType==1){
                        e='积分兑换';
                    }else if(row.receiveType==2){
                        e='消费领取';
                    }else if(row.receiveType==3){
                        e='生日领取';
                    }else if(row.receiveType==4){
                        e='会员卡领取';
                    }else if(row.receiveType==5){
                        e='充值领取';
                    }
                    return e;
                }
            },
            {title: "发行类型", field: "lssueType", align: "left", valign: "middle",width:"10%",
                formatter:function(value,row,index){
                    var e = row.lssueType==0?"日期范围":"有效期";
                    return e;
                }
            },
            {title: "有效期", field: "validtime", align: "left", valign: "middle",width:"10%",
                formatter: function (value, row, index) {
                    var lssueType=row.lssueType;
                    var e='';
                    if(lssueType==0){
                        e=row.startDate.substring(0,10)+' - '+row.endDate.substring(0,10);
                    }else{
                        e=row.ref1;
                    }
                    return e;
                }
            },
            {title: "最大发行量", field: "maxPublishQuantity", align: "left", valign: "middle",width:"10%"},
            {title: "已发行量", field: "publishedQuantity", align: "left", valign: "middle",width:"10%"},
            {title: "适用范围", field: "operateshi", align: "center", valign: "middle",width:"10%",
                formatter: function (value, row, index) {
                    var rlocStr='';
                    if (row.locStr!=null){
                        rlocStr=row.locStr;
                    }
                    var rproductStr='';
                    if (row.productStr!=null){
                        rproductStr=row.productStr;
                    }
                    var str='<a class="lookradius" onMouseOver="suitradius(this)"  onMouseOut="hideradius()">查看</a>'+
                        '<span class="locclass display" >'+rlocStr+'</span>'+
                        '<span class="productclass display">'+rproductStr+'</span>'
                    return str;
                }
            }
        ],
    });
    $("#neckbandTb").bootstrapTable({
        url: basePath+"platform/coupon/detail?couponBatch=&status=",
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
        columns: [
            {title: "优惠券编码", field: "couponId", align: "center", valign: "middle",width:"10%"},
            {title: "状态", field: "status", align: "cnter", valign: "middle",width:"9%",
                formatter:function(value,row,index){
                    // var e = row.status==0?'<span>未使用</span>':'<span>已使用</span>';
                    switch (row.status){
                        case 0:
                            var e="<span>未使用</span>"
                            break;
                        case 1:
                            var e="<span>已使用</span>"
                            break;
                        case 2:
                            var e="<span>已过期</span>"
                            break;
                    }
                    return e;
                }
            },
            {title: "会员编号",field:"memberId",align:"center",valign:"middle",width:"10%"},
            {title: "会员名称",field:"memberName",align:"center",valign:"middle",width:"10%"},
            {title: "获取时间",field:"sourceDate",align:"center",valign:"middle",width:"20%"},
            {title: "使用时间",field:"useDate",align:"center",valign:"middle",width:"20%"},
            {title: "使用订单号",field:"bookingId",align:"left",valign:"middle",width:"21%"},
        ]
    });
    //初始化页面高度
    contentheight();
}
/*------------------------------------------------------------------------------------------------------
 /*查询切换
 -------------------------------------------------------------------------------------------------------*/
$("#strutscheck label").click(function () {
    ref2= $(this).attr('data-id');
    $('#couponrecord').bootstrapTable('refresh',{url: basePath+"platform/coupon/collect?couponType="+couponType+"&ref2="+ref2+"&receiveType="+receiveType});
});

$("#coptypecheck label").click(function () {
    couponType= $(this).attr('data-id');
    $('#couponrecord').bootstrapTable('refresh',{url: basePath+"platform/coupon/collect?couponType="+couponType+"&ref2="+ref2+"&receiveType="+receiveType});
});
$("#selected").on("change",function() {
    receiveType = $("option:selected", this).val();
    $('#couponrecord').bootstrapTable('refresh',{url: basePath+"platform/coupon/collect?couponType="+couponType+"&ref2="+ref2+"&receiveType="+receiveType});
});
/*------------------------------------------------------------------------------------------------------
 /*查询切换
 -------------------------------------------------------------------------------------------------------*/
$("#yhqstatu label").click(function () {
    status= $(this).attr('data-id');
    couponBatch =  $("#detailCouponbatch").text();
    $('#neckbandTb').bootstrapTable('refresh',{url:basePath+"platform/coupon/detail?couponBatch="+couponBatch+"&status="+status});
})
/*------------------------------------------------------------------------------------------------------
 /*查看适用范围
 -------------------------------------------------------------------------------------------------------*/
function suitradius(obj){
    var locStrh=$(obj).parent().find('.locclass').text();
    var productStrh=$(obj).parent().find('.productclass').text();
    if(productStrh==''){
        $("#productlist").addClass('display');
        $("#labelproductlist").addClass('display');
    }else{
        $("#productlist").removeClass('display');
        $("#labelproductlist").removeClass('display');
    }
    $("#loclist").html(locStrh);
    $("#productlist").html(productStrh);
    var offset=$(obj).offset()
    var leftoffest=offset.left-240
    var topoffest=offset.top
    var newtopheight=0
    var scrolltop=document.body.scrollTop;
    var windowheight=$(window).height()
    var bottomheight=windowheight-topoffest
    var yhqheight=$('.yhquseradius').height()
    if(yhqheight>bottomheight){
        newtopheight=topoffest-yhqheight-20
    }else{
        newtopheight=topoffest+20
    }
    $('.yhquseradius').removeClass('display')
    $(".yhquseradius").offset({ top: newtopheight, left: leftoffest })
}
/*------------------------------------------------------------------------------------------------------
 /*隐藏适用范围
 -------------------------------------------------------------------------------------------------------*/
function hideradius(){
    $('.yhquseradius').addClass('display')
}
/*------------------------------------------------------------------------------------------------------
 /*查看优惠券明细
 -------------------------------------------------------------------------------------------------------*/
function queryCoupondetail(couponBatch,receiveType,couponType){
    $("#detailCouponbatch").text(couponBatch);
    switch (receiveType) {
        case 0:
            $("#detailCoupontype").text("代金券");
            break;
        case 1:
            $("#detailCoupontype").text("折扣菜券");
            break;
    }
    switch (couponType){
        case 0:
            $("#detailGetype").text("免费领取");
            break;
        case 1:
            $("#detailGetype").text("积分兑换");
            break;
        case 2:
            $("#detailGetype").text("消费领取");
            break;
        case 3:
            $("#detailGetype").text("生日领取");
            break;
        case 4:
            $("#detailGetype").text("会员卡领取");
            break;
        case 5:
            $("#detailGetype").text("充值领取");
            break;
    }
    $('#neckbandTb').bootstrapTable('refresh',{url:basePath+"platform/coupon/detail?couponBatch="+couponBatch+"&status="+status});
    $("#neckband").modal();
}
/*------------------------------------------------------------------------------------------------------
 /*进入新增
 -------------------------------------------------------------------------------------------------------*/
function addcoupon(){
    window.location.href=basePath+"platform/coupon/add";
}
/*------------------------------------------------------------------------------------------------------
 /*进入更新
 -------------------------------------------------------------------------------------------------------*/
function updateCoupon(couponBatch){
    window.location.href=basePath+"platform/coupon/modify?id="+couponBatch;
}