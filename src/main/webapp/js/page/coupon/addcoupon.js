var locarry=[];//已选门店
var allloc = []; //所有门店
var sort=[];//菜品类别
var dishes=[];//所有菜品
var productarry=[];//已选菜品
var describeinfo="";
var locnowcount=0;
var productnowcount=0;
var firstype='01';//优惠券类型
var secondtype='01';//领取类型
var locAround="";//门店范围
var productAround="";//菜品范围
/*------------------------------------------------------------------------------------------------------
 /*不同类型下的切换
 -------------------------------------------------------------------------------------------------------*/
KindEditor.ready(function(K) {
    window.editor = K.create('#editor_id',{
        cssPath:'js/kindeditior/prettify.css',
        uploadJson:'/upload/image.php',
        resizeType :1,
        allowPreviewEmoticons : true,
        allowImageUpload : true,
        items : [
            'undo', 'redo', '|', 'preview','copy', 'paste',
            'wordpaste', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'indent', 'outdent','fullscreen','formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor','bold','italic', 'underline', 'strikethrough', 'lineheight',  'image', 'multiimage','|' ,'table', 'hr', 'emoticons', 'pagebreak','link', 'unlink'
        ]
    });
});
//编辑器初始化
$('#tagsinputloc').tagsInput({
        width: '100%',
        'interactive': false,
        onRemoveTag: function (tag) {
            var row = Number(rowOfloc(tag, locarry));
            row = row - 1;
            $("#storetab").bootstrapTable('uncheck', row);
            //移除
            var index = indexOfloc(tag, locarry)
            locarry.splice(index, 1);
            $("#loccheckcount").html(locarry.length);
            $("#dianxuanshu ").html(locarry.length);
        }
    }
);
//编辑器初始化
$('#tagsinputproduct').tagsInput({
        width: '100%',
        'interactive': false,
        onRemoveTag: function (tag) {
            var row = Number(rowOfPro(tag, productarry));
            row = row - 1;
            $("#dishtab").bootstrapTable('uncheck', row);
            //移除
            var index = indexOfPro(tag, productarry)
            productarry.splice(index, 1);
            $("#caixuanshu").html(productarry.length);
            $("#sortallcount").html(data.length);
        }
    }
);

//确定数组的行号
function rowOfloc(val,list){
    for(var i = 0; i < list.length; i++){
        if(list[i].locName== val){
            return list[i].recKey;
        }
    }
    return -1;
}
function rowOfPro(val,list){
    var sortId = $("#selectsort").val();
    for(var i = 0; i < list.length; i++){
        if((list[i].productName== val&&sortId=="")||list[i].productName== val&&list[i].sortId==sortId) {
            return list[i].recKey;
        }
    }
    return -1;
}
//确定数组的索引
function indexOfloc(val,list){
    for(var i = 0; i < list.length; i++){
        if(list[i].locName== val){
            return i;
        }
    }
    return -1;
}
function indexOfPro(val,list){
    for(var i = 0; i < list.length; i++){
        if(list[i].productName== val){
            return i;
        }
    }
    return -1;
}
//根据门店编号获取
function getloc(id){
    for(var i = 0; i < allloc.length; i++){
        if(allloc[i].locId== id){
            return allloc[i];
        }
    }
    return null;
}
//根据单品编号获取单品信息
function getpro(id){
    for(var i = 0; i < dishes.length; i++){
        if(dishes[i].productId== id){
            return dishes[i];
        }
    }
    return null;
}
function init(){
    //设置类别
    $("#selectsort").html('<option value="">全部</option>');
    for (var i in sort){
        var sortId=sort[i].sortId;
        var sortName=sort[i].sortName;
        $("#selectsort").append("<option value='"+sortId+"'>"+sortName+"</option>");
    }
    //获取类别下的单品
    $("#storetab").bootstrapTable({
        url: basePath+'platform/gift/loc',   //请求后台的URL（*）
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
        clickToSelect: true,    //是否启用点击选中行
        columns: [
            {checkbox: true,width:"10%"},
            {title: "行号", field: "recKey", align: "center", valign: "middle",width:"20%"},
            {title: "门店编码", field: "locId", align: "center", valign: "middle",width:"30%"},
            {title: "门店名称", field: "locName", align: "center", valign: "middle",width:"50%"},

        ],
        onCheckAll:function(rows){
            $(".loccheckcount").html(rows.length);
        },
        onCheck:function(row){
            var list =  $("#storetab").bootstrapTable('getAllSelections');
            $(".loccheckcount").html(list.length);
        },
        onUncheck: function (rows) {
            var list =  $("#storetab").bootstrapTable('getAllSelections');
            $(".loccheckcount").html(list.length);
        },
        onUncheckAll: function (rows) {
            var list =  $("#storetab").bootstrapTable('getAllSelections');
            $(".occheckcount").html(list.length);
        },onLoadSuccess:function(data){
            allloc = data;
            //拼接选择门店
            if(locAround!=""){
                var arrlocAround=locAround.split(",");
                for(var i=0;i<arrlocAround.length;i++ ){
                    var jsonloc=getloc(arrlocAround[i]);
                    $("#storetab").bootstrapTable("checkBy", {field:"locId", values:[arrlocAround[i]]});
                    $("#tagsinputloc").addTag(jsonloc.locName,{focus:false,callback:false});
                    locarry.push(jsonloc);
                }
            }
            $("#loccheckcount").html(locarry.length);
            $("#dianxuanshu ").html(locarry.length);
            $("#loctallcount").html(data.length);
        },
    });
    //菜品数据
    $("#dishtab").bootstrapTable({
        url: basePath+'platform/product/allcheck?id=',   //请求后台的URL（*）
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
        clickToSelect: true,    //是否启用点击选中行
        columns: [
            {checkbox: true},
            {title: "行号", field: "recKey", align: "center", valign: "middle",width:"20%"},
            {title: "菜品编码", field: "productId", align: "center", valign: "middle",width:"30%"},
            {title: "菜品名称", field: "productName", align: "center", valign: "middle",width:"50%"},
        ],
        onCheckAll:function(rows){
            var stlength=$("#dishtab tbody").find("tr").length;
            // $("#loccheckcount").html(stlength);
            var checknumber=$("#sortcheckcount").html();
            $("#sortcheckcount").html(Number(checknumber)+Number(stlength)-Number(productnowcount));
        },
        onCheck:function(row){
            var checknumber=$("#sortcheckcount").html();
            $("#sortcheckcount").html(Number(checknumber)+1);
        },
        onUncheck: function (rows) {
            var checknumber=$("#sortcheckcount").html();
            $("#sortcheckcount").html(Number(checknumber)-1);
        },
        onUncheckAll: function (rows) {
            var unstlength=$("#dishtab tbody").find("tr").length;
            var checknumber=$("#sortcheckcount").html();
            $("#sortcheckcount").html(Number(checknumber)-Number(unstlength));
        },onLoadSuccess:function(data){
            dishes = data;
            var sortId = $("#selectsort").val();
            if(productAround!=""){
                var arrproAround = productAround.split(",");
                for(var i=0;i<arrproAround.length;i++) {
                    var jsonloc = getpro(arrproAround[i]);
                    $("#dishtab").bootstrapTable("checkBy", {field:"productId", values:[arrproAround[i]]});
                    $("#tagsinputproduct").addTag(jsonloc.productName,{focus:false,callback:false});
                    productarry.push(jsonloc);
                }
            }
            $("#sortcheckcount").html(productarry.length);
            $("#caixuanshu").html(productarry.length);
            $("#sortallcount").html(data.length);
        },
    })
    //日历初始化
    $('.reservation').daterangepicker({});
    calendar();
    $(".usestart").val(nowtime())
    $(".usestart").daterangepicker({
        singleDatePicker: true,//设置成单日历
        format: 'YYYY-MM-DD',
        startDate: nowtime(),
    });
    //初始化页面高度
    contentheight();
}
//优惠券类型筛选
$("#yhqtype label").click(function(){
    var yhqtype=$(this).attr('data-id')
    //代金券
    if(yhqtype=='0'){
        $(".dishradius").addClass('display')
        $(".limitmoney").removeClass('display')
        return
    }
    //折扣菜券
    if(yhqtype=='1'){
        $(".dishradius").removeClass('display')
        $(".limitmoney").addClass('display')
    }
})
//领取类型
function recivetype(key){
    switch(key){
        //免费领取
        case 0:
            $(".totalintergral").addClass('display')
            $(".minconsume").addClass('display')
            $(".dataradius").removeClass('display')
            $(".useDataradiu").removeClass('display')
            var publishId=$("input[name='dataradius']:checked").parent().attr('data-id')
            if(publishId=='0'){
                $(".period .inputday").attr('disabled','disabled')
            }else{
                $(".dataradius .reservation").attr('disabled','disabled')
            }
            break;
        //积分兑换
        case 1:
            $(".totalintergral").removeClass('display')
            $(".minconsume").addClass('display')
            $(".dataradius").addClass('display')
            $(".period .inputday").removeAttr('disabled')
            $(".period label input").attr('checked','checked')
            break;
        //消费领取
        case 2:
            $(".totalintergral").addClass('display')
            $(".minconsume").removeClass('display')
            $(".dataradius").removeClass('display')
            $(".period .inputday").attr('disabled')
            var publishId=$("input[name='dataradius']:checked").parent().attr('data-id')
            if(publishId=='0'){
                $(".period .inputday").attr('disabled','disabled')
            }else{
                $(".dataradius .reservation").attr('disabled','disabled')
            }
            break;
        //生日领取
        case 3:
            $(".totalintergral").addClass('display')
            $(".minconsume").addClass('display')
            $(".dataradius").addClass('display')
            $(".period .inputday").removeAttr('disabled')
            $(".period label input").attr('checked','checked')
            break;
        //领卡领取
        case 4:
            $(".totalintergral").addClass('display')
            $(".minconsume").addClass('display')
            $(".dataradius").addClass('display')
            $(".period .inputday").removeAttr('disabled')
            $(".period label input").attr('checked','checked')
            break;
        //充值领取
        case 5:
            $(".totalintergral").addClass('display')
            $(".minconsume").addClass('display')
            $(".dataradius").addClass('display')
            $(".period .inputday").removeAttr('disabled')
            $(".period label input").attr('checked','checked')
            break;
    }
}
//发行类型
$(".publishtype .radiobeuty").click(function(){
    var publishid=$(this).attr('data-id')
    //日期范围
    if(publishid=='0'){
        $(".period .inputday").attr('disabled','disabled')
        $(".dataradius .reservation").removeAttr('disabled')
        return
    }
    //有效期
    if(publishid=='1'){
        $(".period .inputday").removeAttr('disabled')
        $(".dataradius .reservation").attr('disabled','disabled')
        return
    }
})
/*------------------------------------------------------------------------------------------------------
 /*生成优惠券批次号
 -------------------------------------------------------------------------------------------------------*/
//类型切换
$("#coupontype label").click(function () {
        firstype= $(this).attr('data-name');
        createCouponBatch();
    }
)
// 领取类型qiehuan
$("#recivetype label").click(function () {
        secondtype= $(this).attr('data-name');
        createCouponBatch();
    }
)

//菜品类别过滤
$("#selectsort").on("change",function() {
    var sortId = $("option:selected", this).val();
    $('#dishtab').bootstrapTable('refresh',{url: basePath+'platform/product/allcheck?id='+sortId});
});
//简单描述
function adddescription(){
    $("#description").modal({backdrop: 'static', keyboard: false})
}
//门店范围
function chosestore(){
    //拼接选择门店
    $("#storetab").bootstrapTable("uncheckAll");
   for(var i=0;i<locarry.length;i++ ){
       $("#storetab").bootstrapTable("checkBy", {field:"locId", values:[locarry[i].locId]});
   }
    $("#loccheckcount").html(locarry.length);
    $("#dianxuanshu ").html(locarry.length);
    $("#storeradius").modal({backdrop: 'static', keyboard: false})
}
//获取已选的门店--选择门店的确定按钮
function getCheckloc(){
    locarry=  $("#storetab").bootstrapTable('getAllSelections');
    $('#tagsinputloc').importTags('');
    for(var i=0;i<locarry.length;i++) {
        locname = locarry[i].locName;
        $("#tagsinputloc").addTag(locname,{focus:false,callback:false});
    }
    $("#dianxuanshu").html(locarry.length);
    $("#storeradius").modal('hide');
}

//获取已选的菜品--选择菜品的确定按钮
function getCheckproduct() {
    productarry =  $("#dishtab").bootstrapTable('getAllSelections');
    $('#tagsinputproduct').importTags('');
    for(var i=0;i<productarry.length;i++) {
        productName = productarry[i].productName;
        $("#tagsinputproduct").addTag(productName,{focus:false,callback:false});
    }
    $("#caixuanshu").html(productarry.length);
    $("#dishradius").modal('hide');
}

//菜品范围
function chosedish(){
    $("#dishtab").bootstrapTable("uncheckAll");
    for(var i=0;i<productarry.length;i++) {
        $("#dishtab").bootstrapTable("checkBy", {field:"productId", values:[productarry[i].productId]});
    }
    $("#sortcheckcount").html(productarry.length);
    $("#caixuanshu").html(productarry.length);
    $("#dishradius").modal({backdrop: 'static', keyboard: false})
}
/*------------------------------------------------------------------------------------------------------
 /*生成优惠券
 -------------------------------------------------------------------------------------------------------*/
function createCouponBatch(){
    var headtype=firstype+secondtype+getnowdate();
    $.ajax({
        type: "get",
        url: basePath+"platform/coupon/couponbatch",
        data:{"headtype":headtype},
        dataType: "json",
        timeout: 20000,
        beforeSend:function(){
            $('#loading', window.parent.document).modal();
        },
        success: function (data) {
            sort=data.productsortlist;
            $('#loading', window.parent.document).modal('hide');
            var querycouponbatch = data.couponbatch;
            if(querycouponbatch==0 || querycouponbatch=='0'){
                var couponbatch =headtype+'0001';
            }else {
                var headquerycouponbatch=querycouponbatch.substring(0,12);
                var endquerycouponbatch=querycouponbatch.substring(12);
                var couponbatch = headquerycouponbatch+''+PrefixInteger(Number(endquerycouponbatch) + 1,4);
            }
            $("#yhqpc").val(couponbatch);
            init();
        },
        error: function (request, status, err) {
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

/*------------------------------------------------------------------------------------------------------
 /*获取优惠券
 -------------------------------------------------------------------------------------------------------*/
function getCouponBatch(){
    $('#loading', window.parent.document).modal();
    var publishedQuantity=modifcouponRow.publishedQuantity;//已发行量
    var couponbatch=modifcouponRow.couponBatch;
    var couponType=modifcouponRow.couponType;   //优惠券类型
    var receiveType=modifcouponRow.receiveType; //领取类型
    var lssueType=modifcouponRow.lssueType; //有效期类型
    var ref1=modifcouponRow.ref1;
    var ref2=modifcouponRow.ref2;
    var publishStartDate=modifcouponRow.publishStartDate;
    var publishEndDate=modifcouponRow.publishEndDate;
    var startDate=modifcouponRow.startDate;
    var endDate=modifcouponRow.endDate;
    var maxPublishQuantity=modifcouponRow.maxPublishQuantity;
    var amount=modifcouponRow.amount;
    var quota=modifcouponRow.quota;
    var lowConSumption=modifcouponRow.lowConSumption;
    var exchangePoints=modifcouponRow.exchangePoints;
    var remark=modifcouponRow.remark;
    var locStr=modifcouponRow.locStr;
    var productStr=modifcouponRow.productStr;
    locAround =modifcouponRow.locAround ;
    productAround=modifcouponRow.productAround;
    createDate=modifcouponRow.createDate;
    describeinfo=modifcouponRow.describeinfo;
    $("#yhqpc").val(couponbatch);
    $("#maxPublishQuantity").val(maxPublishQuantity);
    $("#amount").val(amount);
    $("#quota").val(quota);
    $("#lowConSumption").val(lowConSumption);
    $("#exchangePoints").val(exchangePoints);
    $("#remark").val(remark);
    $("#ref1").val(ref1);
    switch (couponType){
        case 0:
            $("#couponTypeed").val("代金券");
            $(".dishradius").addClass('display');
            $(".limitmoney").removeClass('display');
            break;
        case 1:
            $("#couponTypeed").val("折扣菜券");
            $(".dishradius").removeClass('display')
            $(".limitmoney").addClass('display')
            break;
    }
    switch (ref2){
        case 0:
            $("#noradio").attr('checked','checked');
            break;
        case 1:
            $("#yesradio").attr('checked','checked');
            break;
    }
    switch (receiveType){
        case 0:
            $("#reciveTypeed").val("免费领取");
            $(".totalintergral").addClass('display')
            $(".minconsume").addClass('display')
            $(".dataradius").removeClass('display')
            $(".useDataradiu").removeClass('display')
            var publishId=$("input[name='dataradius']:checked").parent().attr('data-id')
            if(publishId=='0'){
                $(".period .inputday").attr('disabled','disabled')
            }else{
                $(".dataradius .reservation").attr('disabled','disabled')
            }
            break;
        case 1:
            $("#reciveTypeed").val("积分兑换");
            $(".totalintergral").removeClass('display')
            $(".minconsume").addClass('display')
            $(".dataradius").addClass('display')
            $(".period .inputday").removeAttr('disabled')
            $(".period label input").attr('checked','checked')
            break;
        case 2:
            $("#reciveTypeed").val("消费领取");
            $(".totalintergral").addClass('display')
            $(".minconsume").removeClass('display')
            $(".dataradius").removeClass('display')
            $(".period .inputday").attr('disabled')
            var publishId=$("input[name='dataradius']:checked").parent().attr('data-id')
            if(publishId=='0'){
                $(".period .inputday").attr('disabled','disabled');
            }else{
                $(".dataradius .reservation").attr('disabled','disabled')
            }
            break;
        case 3:
            $("#reciveTypeed").val("生日领取");
            $(".totalintergral").addClass('display')
            $(".minconsume").addClass('display')
            $(".dataradius").addClass('display')
            $(".period .inputday").removeAttr('disabled')
            break;
        case 4:
            $("#reciveTypeed").val("会员卡领取");
            $(".totalintergral").addClass('display')
            $(".minconsume").addClass('display')
            $(".dataradius").addClass('display')
            $(".period .inputday").removeAttr('disabled')
            break;
        case 5:
            $("#reciveTypeed").val("充值领取");
            $(".totalintergral").addClass('display')
            $(".minconsume").addClass('display')
            $(".dataradius").addClass('display')
            $(".period .inputday").removeAttr('disabled')
            break;
    }
    switch (lssueType){
        case 0:
            $(".dataradius label input").attr('checked','checked');
            $(".period .inputday").attr('disabled','disabled');
            $(".dataradius .reservation").removeAttr('disabled');
            $("#ref1").val("");
            break;
        case 1:
            $(".period label input").attr('checked','checked');
            $(".dataradius .reservation").attr('disabled','disabled');
            $(".period .inputday").removeAttr('disabled');
            break;
    }
    $("#public").val(publishStartDate+" - "+publishEndDate);
    $('#public').daterangepicker({
        startDate: publishStartDate,
        endDate: publishEndDate,
        separator : ' - ',
    });
    $("#usedate").val(startDate+" - "+endDate);
    $('#usedate').daterangepicker({
        startDate: startDate,
        endDate: endDate,
        separator : ' - ',
    });
    //已发行情况只能改简单描述
    if(Number(publishedQuantity)>0){
        $("#usedate") .attr('disabled','disabled');
        $("#ref1") .attr('disabled','disabled');
        $("#public") .attr('disabled','disabled');
        // $("#maxPublishQuantity") .attr('disabled','disabled');
        $("#amount") .attr('disabled','disabled');
        $("#quota") .attr('disabled','disabled');
        $("#exchangePoints") .attr('disabled','disabled');
        $("#lowConSumption") .attr('disabled','disabled');
        $("#remark") .attr('disabled','disabled');
        $("#locButton").addClass('display');
        $("#productButton").addClass('display');
        $("#dateradio").addClass('display');
        $("#udayradio").addClass('display');
        $("#openchose").addClass('display');
        $("#openread").removeClass('display');
        switch (lssueType){
            case 0:
                $(".period").attr('style','display:none');
                break;
            case 1:
                $(".dataradius").attr('style','display:none');
                break;
        }
        if(ref2==0||ref2=='0') {
            $("#openval").text('否');
        }else{
            $("#openval").text('是');
        }
        $('.tagsinput-remove-link').removeClass('tagsinput-remove-link');
    };
    init();
    $('#loading', window.parent.document).modal('hide');
}
//保存按钮
function save(){
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    var staffId = staff.staffId;
    var couptype='0';
    $("#coupontype  input" ).each(function () {
        if (this.checked){
            couptype=$(this).parent().attr('data-id');
        }
    });

    var recivetype='0';
    $("#recivetype  input" ).each(function () {
        if (this.checked){
            recivetype=$(this).parent().attr('data-id');
        }
    });

    var publictype='0';
    $("#publictypeid  input" ).each(function () {
        if (this.checked){
            publictype=$(this).parent().attr('data-id');
        }
    });

    if(publictype==0||publictype=='0'){
        var ref1='';
    }else {
        var ref1=$("#ref1").val();
        if(ref1==''||ref1==null ||Number(ref1)==0){
            erroMessage("有效期不能为空或0");
            return false;
        }
    }
    var lssueType=$("input[name='dataradius']:checked").parent().attr('data-id');
    var ref2=$("input[name='open']:checked").attr('data-id');

    var ref3='';
    var couponBatch=$("#yhqpc").val();
    var amount=$("#amount").val();//总金额
    var quota=$("#quota").val();//面值
    var public=$("#public").val();
    var usedate=$("#usedate").val();
    var publishStartDate=public.substring(0,10)+" 00:00:00";
    var publishEndDate=public.substring(13)+" 23:59:59";
    var startDate=usedate.substring(0,10)+" 00:00:00";
    var endDate=usedate.substring(13)+" 23:59:59";
    var discount=0;
    var maxPublishQuantity=$("#maxPublishQuantity").val();
    if(maxPublishQuantity==''||maxPublishQuantity==null||Number(maxPublishQuantity)==0){
        erroMessage("最大发行量不能为空或0");
        return false;
    }
    if(quota==''||quota==null||Number(quota)==0){
        erroMessage("面值不能为空或0");
        return false;
    }
    if(amount==''||amount==null||Number(amount)==0){
        amount = 0;
    }
    var publishedQuantity=0;
    var section=0;
    var locAround='';
    locarry=  $("#storetab").bootstrapTable('getAllSelections');
    for (var i in locarry){
        if (i==0){
            locAround=locarry[i].locId;
        }else{
            locAround=locAround+","+locarry[i].locId;
        }
    }
    var productAround='';
    productarry =  $("#dishtab").bootstrapTable('getAllSelections');
    for (var i in productarry){
        if (i==0){
            productAround=productarry[i].productId;
        }else{
            productAround=productAround+","+productarry[i].productId;
        }
    }
    var remark=$("#remark").val();
    var createUser=staffId;
    var createDate=getNowFormatTime();
    var lastUpdateUser=staffId;
    var lastUpdateDate=getNowFormatTime();
    var lowConSumption=$("#lowConSumption").val();
    var exchangePoints=$("#exchangePoints").val();
    switch (recivetype){
        case '0':
            exchangePoints=0;
            lowConSumption=0;
            break;
        case '1':
            lowConSumption=0;
            if(exchangePoints==''||exchangePoints==null||Number(exchangePoints)==0){
                erroMessage("兑换积分不能为空或0");
                return false;
            }
            break;
        case '2':
            exchangePoints=0;
            if(lowConSumption==''||lowConSumption==null||Number(lowConSumption)==0){
                erroMessage("最低消费不能为空或0");
                return false;
            }
            break;
        case '3':
            lowConSumption=0;
            exchangePoints=0;
            break;
        case '4':
            lowConSumption=0;
            exchangePoints=0;
            break;
        case '5':
            lowConSumption=0;
            exchangePoints=0;
            break;
    }
    switch (couptype){
        case '0':
            if(amount==''||amount==null||Number(amount)==0){
                erroMessage("限额不能为空或0");
                return false;
            }
            if(locAround==''||locAround==null){
                erroMessage("门店范围不能为空");
                return false;
            }
            productAround='';
            break;
        case '1':
            if(locAround==''||locAround==null){
                erroMessage("门店范围不能为空");
                return false;
            }
            if(productAround==''||productAround==null){
                erroMessage("菜品范围不能为空");
                return false;
            }
            break;
    }
    var describeinfo=$(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html();
    var  collectjson={
        "couponType":couptype,"couponBatch":couponBatch,"amount": amount,"quota":quota,"publishStartDate":publishStartDate,
        "publishEndDate": publishEndDate,"startDate": startDate, "endDate": endDate,"discount":discount,"maxPublishQuantity":maxPublishQuantity,
        "publishedQuantity":publishedQuantity,"section":section,"locAround":locAround,"productAround":productAround,"ref1":ref1,
        "ref2":ref2,"ref3":ref3,"describeinfo":describeinfo,"remark": remark,"createUser": createUser,"createDate":createDate,
        "lastUpdateUser":lastUpdateUser,"lastUpdateDate":lastUpdateDate,"lssueType":lssueType,"receiveType":recivetype,
        "lowConSumption":lowConSumption,"exchangePoints":exchangePoints};
    $.ajax({
        type: "post",
        url: basePath+"platform/coupon/addCoupon",
        data:JSON.stringify(collectjson),
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
                            window.location.href=basePath+"platform/coupon/m";
                        }
                    }]
                });
            }else{
                erroMessage(data.Msg);
            }
        },
        error: function (request, status, err) {
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

function saveupdate(){
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    var staffId = staff.staffId;
    var coupontype=modifcouponRow.couponType;   //优惠券类型
    var recivetype=modifcouponRow.receiveType; //领取类型
    var publictype='0';
    $("#publictypeid  input" ).each(function () {
        if (this.checked){
            publictype=$(this).parent().attr('data-id');
        }
    });

    if(publictype==0||publictype=='0'){
        var ref1='';
    }else {
        var ref1=$("#ref1").val();
        if(ref1==''||ref1==null ||Number(ref1)==0){
            erroMessage("有效期不能为空或0");
            return false;
        }
    }
    var lssueType=$("input[name='dataradius']:checked").parent().attr('data-id');
    var ref2=$("input[name='open']:checked").attr('data-id');

    var ref3='';
    var couponBatch=$("#yhqpc").val();
    var amount=$("#amount").val();//总金额
    var quota=$("#quota").val();//面值
    var public=$("#public").val();
    var usedate=$("#usedate").val();
    var publishStartDate=public.substring(0,10)+" 00:00:00";
    var publishEndDate=public.substring(13)+" 23:59:59";
    var startDate=usedate.substring(0,10)+" 00:00:00";
    var endDate=usedate.substring(13)+" 23:59:59";
    var discount=0;
    var maxPublishQuantity=$("#maxPublishQuantity").val();
    if(maxPublishQuantity==''||maxPublishQuantity==null||Number(maxPublishQuantity)==0){
        erroMessage("最大发行量不能为空或0");
        return false;
    }
    if(quota==''||quota==null||Number(quota)==0){
        erroMessage("面值不能为空或0");
        return false;
    }
    if(amount==''||amount==null||Number(amount)==0){
        amount = 0;
    }
    var publishedQuantity=0;
    var section=0;
    var locAround='';
    locarry=  $("#storetab").bootstrapTable('getAllSelections');
    for (var i in locarry){
        if (i==0){
            locAround=locarry[i].locId;
        }else{
            locAround=locAround+","+locarry[i].locId;
        }
    }
    var productAround='';
    productarry =  $("#dishtab").bootstrapTable('getAllSelections');
    for (var i in productarry){
        if (i==0){
            productAround=productarry[i].productId;
        }else{
            productAround=productAround+","+productarry[i].productId;
        }
    }
    var remark=$("#remark").val();
    var createUser=staffId;
    var createDate=getNowFormatTime();
    var lastUpdateUser=staffId;
    var lastUpdateDate=getNowFormatTime();
    var lowConSumption=$("#lowConSumption").val();
    var exchangePoints=$("#exchangePoints").val();
    switch (recivetype){
        case '0':
            exchangePoints=0;
            lowConSumption=0;
            break;
        case '1':
            lowConSumption=0;
            if(exchangePoints==''||exchangePoints==null||Number(exchangePoints)==0){
                erroMessage("兑换积分不能为空或0");
                return false;
            }
            break;
        case '2':
            exchangePoints=0;
            if(lowConSumption==''||lowConSumption==null||Number(lowConSumption)==0){
                erroMessage("最低消费不能为空或0");
                return false;
            }
            break;
        case '3':
            lowConSumption=0;
            exchangePoints=0;
            break;
        case '4':
            lowConSumption=0;
            exchangePoints=0;
            break;
        case '5':
            lowConSumption=0;
            exchangePoints=0;
            break;
    }
    switch (coupontype){
        case '0':
            if(amount==''||amount==null||Number(amount)==0){
                erroMessage("限额不能为空或0");
                return false;
            }
            if(locAround==''||locAround==null){
                erroMessage("门店范围不能为空");
                return false;
            }
            productAround='';
            break;
        case '1':
            if(locAround==''||locAround==null){
                erroMessage("门店范围不能为空");
                return false;
            }
            if(productAround==''||productAround==null){
                erroMessage("菜品范围不能为空");
                return false;
            }
            break;
    }
    var describeinfo=$(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html();
    var  collectjson={
        "couponType":coupontype,"couponBatch":couponBatch,"amount": amount,"quota":quota,"publishStartDate":publishStartDate,
        "publishEndDate": publishEndDate,"startDate": startDate, "endDate": endDate,"discount":discount,
        "publishedQuantity":publishedQuantity,"section":section,"locAround":locAround,"productAround":productAround,"ref1":ref1,
        "ref2":ref2,"ref3":ref3,"describeinfo":describeinfo,"remark": remark,"createUser": createUser,"createDate":createDate,
        "lastUpdateUser":lastUpdateUser,"lastUpdateDate":lastUpdateDate,"lssueType":lssueType,"receiveType":recivetype,
        "lowConSumption":lowConSumption,"exchangePoints":exchangePoints};
    $.ajax({
        type: "post",
        url: basePath+"platform/coupon/updateCoupon",
        data:JSON.stringify(collectjson),
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
                            window.location.href=basePath+"platform/coupon/m";
                        }
                    }]
                });
            }else{
                erroMessage(data.Msg);
            }
        },
        error: function (request, status, err) {
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
//获取现在具体时间
function getNowFormatTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes=date.getMinutes();
    var strSeconds=date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHours >= 0 && strHours <= 9) {
        strHours = "0" + strHours;
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
        strMinutes = "0" + strMinutes;
    }
    if (strSeconds >= 0 && strSeconds <= 9) {
        strSeconds = "0" + strSeconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + strHours + seperator2 + strMinutes + seperator2 + strSeconds;
    return currentdate;
}
function cancelsave(){
    window.location.href="coupon.do";
}
//位数补0
function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}