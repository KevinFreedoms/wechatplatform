/*------------------------------------------------------------------------------------------------------
 /*初始化门店编号 2018-03-29
 ----------------------------------------------------------------------------------------------------*/
var countdelivery=0,countscan=0,countmember=0;
function initloc(){
     $('#storeList').bootstrapTable({
            url: basePath+'platform/system/loc/all',   //请求后台的URL（*）
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
                field: 'locId',
                title: '微信门店编号',
                valign: 'middle'
            }, {
                field: 'locName',
                title: '微信门店名称',
                valign: 'middle'
            }, {
                field: 'orgId',
                title: 'C服门店编号',
                valign: 'middle',
                formatter:function(value,row,index){
                    var data =row.orgId==null?"":row.orgId;
                    return data;
                }
            },{
                field: 'orgName',
                title: 'C服门店名称',
                valign: 'middle',
                formatter:function(value,row,index){
                    var data =row.orgName==null?"":row.orgName;
                    return data;
                }
            },{
                field: 'employeeName',
                title: '联系人',
                valign: 'middle'
            },{
                field: 'contractWay',
                title: '联系方式',
                valign: 'middle'
            },{
                field: 'contractAddress',
                title: '地址',
                valign: 'middle',
                formatter:function(value,row,index){
                    var e = "";
                    if(row.orgId!=null){
                        e = row.contractAddress;
                    }
                    return e;
                }
            },{
                field: 'startDate',
                title: '开始时间',
                valign: 'middle',
                formatter:function(value,row,index){
                    var date =row.startDate==null?"":fmtDate(row.startDate);
                    return date;
                }
            },{
                field: 'endDate',
                title: '结束时间',
                valign: 'middle',
                formatter:function(value,row,index){
                    var date =row.endDate==null?"":fmtDate(row.endDate);
                    return date;
                }
            },{
                field: 'isScan',
                title: '扫码点餐',
                valign: 'middle',
                formatter:function(value,row,index){
                    var e = "";
                    if(row.orgId!=null){
                        e = row.isScan==1?"启用":"停用";
                        countscan = row.isScan==1?countscan+1:countscan;
                    }
                    return e;
                }
            },{
                field: 'isDelivery',
                title: '外送点餐',
                valign: 'middle',
                formatter:function(value,row,index){
                    var e = "";
                    if(row.orgId!=null){
                        e = row.isDelivery==1?"启用":"停用";
                        countdelivery = row.isDelivery==1?countdelivery+1:countdelivery;
                    }
                    return e;
                }
            },{
                field: 'isMember',
                title: '会员状态',
                valign: 'middle',
                formatter:function(value,row,index){
                    var e = "";
                    if(row.orgId!=null){
                        e = row.isMember==1?"启用":"停用";
                        countmember = row.isMember==1?countmember+1:countmember;
                    }
                    return e;
                }
            }, {
                field: 'status',
                title: '启用状态',
                valign: 'middle',
                formatter:function(value,row,index){
                    var e = "";
                    if(row.orgId!=null){
                        e = row.status==1?"启用":"停用";
                    }
                    return e;
                }
            }, {
                field: 'createUserId',
                title: '创建人',
                valign: 'middle'
            }, {
                field: 'createDate',
                title: '创建时间',
                valign: 'middle',
                formatter:function(value,row,index){
                    var date =row.createDate==null?"":fmtDate(row.createDate);
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
                    var date =row.lastUpDate==null?"":fmtDate(row.lastUpDate);
                    return date;
                }
            },{
                title: '操作',
                field: 'roleId',
                align: 'center',
                valign: 'middle',
                width:"10%",
                formatter:function(value,row,index){
                    var e =row.roleId=="9999"?'<a data-toggle="tooltip" title="编辑" class="taboperate lastchid" style="pointer-events:none;color: #ccc;">编辑</a>':'<a data-toggle="tooltip" title="编辑" class="taboperate lastchid" href="javascript:void(0);" mce_href="javascript:void(0);" onclick="editloc(\''+ row.locId + '\')">编辑</a>'
                    return e;
                }
            }],
             onColumnSwitch:function(field, checked){
                 var checkedleng=$(".dropdown-menu input[type='checkbox']:checked").length;
                 var screenwidth=$(window).width();
                 if(checkedleng>10&&checkedleng<14){
                     alert("sss");
                     $(".setTaboverflow").css('width','100%')
                     $("#storeList").css('width',screenwidth +"px");
                     return
                 }
                 if(checkedleng>=14){
                     screenwidth = screenwidth + 100;
                     $("#storeList").css('width',screenwidth +"px");
                     return
                 }
                 $(".storeList").css('width','100%')
             },
             onLoadSuccess:function(data){
                 //初始化页面高度
                 $('#countscan').html(countscan);
                 $('#countmember').html(countmember);
                 $('#countdelivery').html(countdelivery);
                 var checkedleng=$(".dropdown-menu input[type='checkbox']:checked").length
                 var screenwidth=$(window).width();
                 if(checkedleng>10&&checkedleng<14){
                     $(".setTaboverflow").css('width','100%')
                     $("#storeList").css('width',screenwidth +"px")
                     return
                 }
                 if(checkedleng>=14){
                     screenwidth = screenwidth + 100;
                     $("#storeList").css('width',screenwidth +"px")
                     return
                 }
                 $(".storeList").css('width','100%');

             },
     });
    contentheight();
}

/*------------------------------------------------------------------------------------------------------
 /*新增门店 2018-05-21
 ----------------------------------------------------------------------------------------------------*/
function addstore(){
    $.ajax({
        type: "get",
        url: basePath+"platform/system/loc/limit",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                window.location.href=basePath+"platform/system/loc/add";
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

/*------------------------------------------------------------------------------------------------------
 /*初始化城市地标 2018-05-21
 ----------------------------------------------------------------------------------------------------*/
function initAddInfo(){
    map.centerAndZoom("北京",12);//地图初始化设为北京
    map.enableScrollWheelZoom(true)//启用地图滚轮放大缩小
    contentheight();
    //带搜索下拉框
    $('.selectpicker').selectpicker({
        'selectedText': 'cat'
    });
    $(".selectpicker").change(function(){
        id=$(this).find("option:selected").text();
        name = $(this).children('option:selected').attr("data-id");
        $("input[name='locName']").val(name);
        $("input[name='orgId']").val(id);
    })

    //日历
    $(".usestart").val(nowtime())
    $(".usestart").daterangepicker({
        singleDatePicker: true,//设置成单日历
        format: 'YYYY-MM-DD',
        startDate: nowtime(),
    });
}

function initModifyInfo(){
    //获取门店
    var orgId= baselocinfo.orgId;
    if (typeof(orgId) == "undefined") {
        $(".usestart").daterangepicker({
            singleDatePicker: true,//设置成单日历
            format: 'YYYY-MM-DD',
            startDate: nowtime(),
        });
        orgId =$('.selectpicker').selectpicker('val');
        $("input[name='startDate']").val(nowtime());
        $("input[name='endDate']").val(nowtime());
    }else{
        $("input[name='startDate']").daterangepicker({
            singleDatePicker: true,//设置成单日历
            format: 'YYYY-MM-DD',
            startDate:fmtDate(baselocinfo.startDate),
        });
        $("input[name='startDate']").val(fmtDate(baselocinfo.startDate));
        $("input[name='endDate']").daterangepicker({
            singleDatePicker: true,//设置成单日历
            format: 'YYYY-MM-DD',
            startDate:fmtDate(baselocinfo.startDate),
        });
        $("input[name='endDate']").val(fmtDate(baselocinfo.endDate));
        var status = baselocinfo.status;
        if(status==1){
            $("#raUsing").attr("checked","checked");
        }else {
            $("#raUnUsing").attr("checked", "checked");
        }
        var isScan =  baselocinfo.isScan;
        var isMember = baselocinfo.isMember;
        var isDelivery = baselocinfo.isDelivery;
        if(isScan==1){
            $("input[name='isScan']").attr("checked","checked");
        }
        if(isMember==1){
            $("input[name='isMember']").attr("checked","checked");
        }
        if(isDelivery==1){
            $("input[name='isDelivery']").attr("checked","checked");
        }
        $("#province2").val(locinfo.address1);
        $("#province2").trigger("change");
        $("#city2").val(locinfo.address2);
        $("#city2").trigger("change");
        $("#district2").val(locinfo.address3);
        $("#district2").trigger("change");
        $("#detailAdrss").val(locinfo.address4);
        searchmark();
    }

    $('.selectpicker').selectpicker({
        'selectedText': 'cat'
    });
    $(".selectpicker").change(function(){
        id=$(this).find("option:selected").text();
        name = $(this).children('option:selected').attr("data-id");
        $("input[name='locName']").val(name);

    })
    $('.selectpicker').selectpicker('val',orgId);
    //原始门店编号
    var locId = locinfo.locId;
    $("input[name='orgId']").val(locId);
    contentheight();
}
/*------------------------------------------------------------------------------------
/*选择省份改变事件
 ------------------------------------------------------------------------------------*/
$("#province2").change(function(){
    province=$(this).find("option:selected").text();
    if(province!= ""){
        map.centerAndZoom(province,11);      // 用城市名设置地图中心点
        $("#detailAdrss").val("");
    }
})
/*------------------------------------------------------------------------------------
/*选择城市改变事件
 ------------------------------------------------------------------------------------*/
$("#city2").change(function(){
    city=$(this).find("option:selected").text();
    var procity=province+city
    map.centerAndZoom(procity,12);      // 用城市名设置地图中心点
    $("#detailAdrss").val("");
})
/*------------------------------------------------------------------------------------
/*选择区改变事件
 ------------------------------------------------------------------------------------*/
$("#district2").change(function(){
    district=$(this).find("option:selected").text();
    var procity=province+city+district
    map.centerAndZoom(procity,14);
    $("#detailAdrss").val("");

})
/*------------------------------------------------------------------------------------
/*搜索标注
 ------------------------------------------------------------------------------------*/
var lng = 0;
var lat=0;
function searchmark(){
    var searchaddress='';
    var address=$("#detailAdrss").val();
    var province2=$("#province2").val();
    var city2=$("#city2").val();
    var district2=$("#district2").val();
    if(province2==city2){
        searchaddress=province2+district2+address
    }else{
        searchaddress=province2+city2+district2+address
    }
    if(province2==""||city2==""||district2==""){
        erroMessage("省市区不可为空！");
        return;
    }
    if(address==""){
        erroMessage("详细地址不可为空!");
        return;
    }
    map.clearOverlays();    //清除地图上所有覆盖物
    function myFun(){
        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            lng = pp.lng;
            lat = pp.lat;
            map.centerAndZoom(pp, 16);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }else{
            erroMessage("未找到地址！");
        }
    }
    var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    local.search(searchaddress);
}
/*------------------------------------------------------------------------------------------------------
 /*编辑门店 2018-05-21
 ----------------------------------------------------------------------------------------------------*/
function editloc(id) {
    window.location.href=basePath+"platform/system/loc/modify?id="+id;
}
/*------------------------------------------------------------------------------------------------------
 /*保存门店 2018-05-22
 ----------------------------------------------------------------------------------------------------*/
function saveData(){
    var orgId=$("input[name='orgId']").val();
    if(orgId==""){
        erroMessage("原门店编号不能为空");
        return;
    }
    var searchaddress='';
    var address=$("#detailAdrss").val();
    var province2=$("#province2").val();
    var city2=$("#city2").val();
    var district2=$("#district2").val();
    if(province2==city2){
        searchaddress=province2+district2+address
    }else{
        searchaddress=province2+city2+district2+address
    }
    if(province2==""||city2==""||district2==""){
        erroMessage("省市区不可为空！");
        return;
    }
    if(address==""){
        erroMessage("详细地址不可为空!");
        return;
    }
    if(lng == 0&& lat==0){
        erroMessage("尚未获得当前定位地址，请重新查询");
        return;
    }
    var status=Number($("input[name='status']:checked").attr('data-id'));
    var isScan = $("input[name='isScan']").is(":checked")?1:0;
    var isMember = $("input[name='isMember']").is(":checked")?1:0;
    var isDelivery = $("input[name='isDelivery']").is(":checked")?1:0;
    var startDate=$("input[name='startDate']").val();
    var endDate=$("input[name='endDate']").val();
    locId=$('.selectpicker').find("option:selected").text();
    locName = $("input[name='locName']").val();
    orgId = $("input[name='orgId']").val();
    phone = $('.selectpicker').find("option:selected").attr("data-phone");


    var storejson = {"locId":locId,"locName":locName,"orgId":orgId,"address1":province2,"address2":city2,"address3":district2,"address4":address,"phone":phone,
        "status":status,"latitude":lat,"longitude":lng,"isScan":isScan,"isMember":isMember,"isDelivery":isDelivery,"startDate":startDate,"endDate":endDate};
    $.ajax({
        type: "post",
        url: basePath+"platform/system/loc/save",
        data:JSON.stringify(storejson),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: "保存成功",
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            window.location.href=basePath+'platform/system/loc';
                        }
                    }
                    ]
                });
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
function updateData(){
    var orgId=$("input[name='orgId']").val();
    if(orgId==""){
        erroMessage("原门店编号不能为空");
        return;
    }
    var searchaddress='';
    var address=$("#detailAdrss").val();
    var province2=$("#province2").val();
    var city2=$("#city2").val();
    var district2=$("#district2").val();
    if(province2==city2){
        searchaddress=province2+district2+address
    }else{
        searchaddress=province2+city2+district2+address
    }
    if(province2==""||city2==""||district2==""){
        erroMessage("省市区不可为空！");
        return;
    }
    if(address==""){
        erroMessage("详细地址不可为空!");
        return;
    }
    if(lng == 0&& lat==0){
        erroMessage("尚未获得当前定位地址，请重新查询");
        return;
    }
    var status=Number($("input[name='status']:checked").attr('data-id'));
    var isScan = $("input[name='isScan']").is(":checked")?1:0;
    var isMember = $("input[name='isMember']").is(":checked")?1:0;
    var isDelivery = $("input[name='isDelivery']").is(":checked")?1:0;
    var startDate=$("input[name='startDate']").val();
    var endDate=$("input[name='endDate']").val();
    locId=$('.selectpicker').find("option:selected").text();
    locName = $("input[name='locName']").val();
    orgId = $("input[name='orgId']").val();
    phone = $('.selectpicker').find("option:selected").attr("data-phone");


    var storejson = {"locId":locId,"locName":locName,"orgId":orgId,"address1":province2,"address2":city2,"address3":district2,"address4":address,"phone":phone,
        "status":status,"latitude":lat,"longitude":lng,"isScan":isScan,"isMember":isMember,"isDelivery":isDelivery,"startDate":startDate,"endDate":endDate};

    $.ajax({
        type: "post",
        url: basePath+"platform/system/loc/update",
        data:JSON.stringify(storejson),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            if(data.status==1||data.status=='1'){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: "更新成功",
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            window.location.href=basePath+'platform/system/loc';
                        }
                    }
                    ]
                });
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

function back(){
    window.location.href=basePath+'platform/system/loc';
}