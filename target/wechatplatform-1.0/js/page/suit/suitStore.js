function init(){
    contentheight()//页面高度
    $("#suitStoretab").bootstrapTable({
        url: basePath+'platform/suitstore/all',
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
        search: true,      //是否显示表格搜索
        clickToSelect: false,    //是否启用点击选中行
        showColumns:true,
        columns: [{
            title: '状态',
            field: 'poi_id',
            align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
                var poi_id=row.poi_id;
                var e='';
                if(poi_id==''){
                    e='<a class="taboperate disabledremove" style="color:#f02449">未审核</a>';
                }else{
                    e='<a class="taboperate disabledremove" style="color:#9bdb69">已审核</a>';
                }
                return e;
            }
        },
            {
                field: 'poi_id',
                title: '微信标识',
                align: 'center',
                valign: 'middle',
            }, {
                field: 'business_name',
                title: '门店名称',
                align: 'left',
                valign: 'middle',
            },
            {
                field: 'branch_name',
                title: '分店名称',
                align: 'left',
                valign: 'middle',
            }, {
                field: 'address',
                title: '地址',
                valign: 'middle',
                align: 'left',
                formatter:function(value,row,index){
                    if(row.province==row.city){
                        searchaddress=row.province+row.district+row.address;
                    }else{
                        searchaddress=row.province+row.city+row.district+row.address;
                    }
                    return searchaddress;
                }
            },
            {
                field: 'telephone',
                title: '电话',
                valign: 'middle',
                align: 'left',

            },
            {
                field: 'open_time',
                title: '营业时间',
                valign: 'middle',
                align: 'left',
            },
            {
                field: 'export',
                title: '操作',
                valign: 'middle',
                align: 'center',
                formatter: function (value, row, index) {
                    var e = '<a data-toggle="tooltip" title="删除" class="taboperate" onclick="deletestore(\''+ row.sid + '\')">删除</a>' +
                        '<a class="taboperate lastchid" onclick="editstore(\''+ row.sid + '\')">编辑</a>'
                    return e;
                }
            }
        ]
    });
}
/*------------------------------------------------------------------------------------------------------
 /*新增
 -------------------------------------------------------------------------------------------------------*/
function  addsuitStore(){
    window.location.href=basePath+"platform/suitstore/new";
}
function saveData(obj) {
    stores=  $("#storetab").bootstrapTable('getAllSelections');
    if(stores.length==0){
        erroMessage("请选择门店");
        return false;
    }
    var sid = stores[0].locId;
    var phone = $("input[name='telephone']").val();
    if(phone==""){
        erroMessage("电话不能为空!");
        return false;
    }
    var r=/^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
    if(!r.test(phone)){
        erroMessage('号码格式错误,固话需加区号和符号‘-’');
        return false;
    };

    var categories = "";
    firstRecipe =  $("#firstRecipe").find("option:selected").text();
    secondRecipe = $("#secondRecipe").find("option:selected").text();
    if(secondRecipe==""){
        categories =  "美食," + firstRecipe;
    }else{
        categories = "美食," + firstRecipe +","+ secondRecipe;
    }
    var avgprice = $("input[name='avgprice']").val();
    var price = 0;
    if(avgprice!=""){
        price = parseInt(avgprice);
    }
    var type = $(obj).attr("data");
    var opentime = $("input[name='opentime']").val();
    var recommend = $("textarea[name='recommend']").val();
    var special = $("textarea[name='special']").val();
    var introduction = $("textarea[name='introduction']").val();
    collectjson={"sid":sid,"categories":categories,"telephone":phone,"avg_price":price,"open_time":opentime,"recommend":recommend,"special":special,"introduction":introduction};
    $.ajax({
        type: "post",
        url: basePath+"platform/suitstore/save",
        data: JSON.stringify(collectjson),
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        timeout: 20000,  //
        success: function (data) {
            if(data.status){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: "保存成功",
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            if(type=='1'){
                                window.location.href=basePath+"platform/suitstore/new";
                            }else{
                                window.location.href=basePath+"platform/suitstore/m";
                            }
                        }
                    }
                    ]
                });
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
/*------------------------------------------------------------------------------------------------------
 /*修改
 -------------------------------------------------------------------------------------------------------*/
function  editstore(obj){
    window.location.href=basePath+"platform/suitstore/modify?id="+obj;
}
function updateData(){
    var recKey = wxloc.recKey;
    var sid = wxloc.sid;
    var phone = $("input[name='telephone']").val();
    if(phone==""){
        erroMessage("电话不能为空!");
        return false;
    }
    var r=/^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
    if(!r.test(phone)){
        erroMessage('号码格式错误,固话需加区号和符号‘-’');
        return false;
    };

    var categories = "";
    firstRecipe =  $("#firstRecipe").find("option:selected").text();
    secondRecipe = $("#secondRecipe").find("option:selected").text();
    if(secondRecipe==""){
        categories =  "美食," + firstRecipe;
    }else{
        categories = "美食," + firstRecipe +","+ secondRecipe;
    }
    var avgprice = $("input[name='avgprice']").val();
    var price = 0;
    if(avgprice!=""){
        price = parseInt(avgprice);
    }
    var opentime = $("input[name='opentime']").val();
    var recommend = $("textarea[name='recommend']").val();
    var special = $("textarea[name='special']").val();
    var introduction = $("textarea[name='introduction']").val();
    collectjson={"recKey":recKey,"sid":sid,"categories":categories,"telephone":phone,"avg_price":price,"open_time":opentime,"recommend":recommend,"special":special,"introduction":introduction};
    $.ajax({
        type: "post",
        url: basePath+"platform/suitstore/update",
        data: JSON.stringify(collectjson),
        dataType : 'json',
        contentType : 'application/json;charset=UTF-8',
        timeout: 20000,  //
        success: function (data) {
            if(data.status){
                BootstrapDialog.show({
                    title: '提示信息',
                    message: "更新成功",
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-primary',
                        action: function(dialog) {
                            dialog.close();
                            window.location.href=basePath+"platform/suitstore/m";
                        }
                    }
                    ]
                });
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
/*------------------------------------------------------------------------------------------------------
 /*初始化新增
 -------------------------------------------------------------------------------------------------------*/
function initAdd(){
    var temp='',info='';
    //拼写门店类型下拉框
    var t = 0;
    for(var i in recipe){
        temp+='<option>'+i+'</option>';
        if(t==0){
            var list=recipe[i];
            var length=list.length;
            if(length>0){
                for(var j in list){
                    info+='<option>'+list[j].category3+'</option>'
                }
                $("#secondRecipe").html(info);
            }else{
                $("#secondRecipe").attr('disabled','disabled');
            }
        };
        t++;
    }
    $("#firstRecipe").html(temp);


    //设置初始化门店
    $("#storetab").bootstrapTable({
        url: basePath+'platform/system/loc/stat',   //请求后台的URL（*）
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
        search: true,
        singleSelect : true,
        clickToSelect: false,    //是否启用点击选中行
        showColumns:true,
        columns: [
            {checkbox: true},
            {title: "门店编码", field: "locId", align: "center", valign: "middle",width:"20%"},
            {title: "门店名称", field: "locName", align: "left", valign: "middle",width:"20%"},
            {title: "地址", field: "address1", align: "left", valign: "middle",width:"60%",
                formatter:function(value,row,index){
                    if(row.address1==row.address2){
                        searchaddress=row.address1+row.address3+row.address4;
                    }else{
                        searchaddress=row.address1+row.address2+row.address3+row.address4;
                    }
                    return searchaddress;
                }
            },
        ],onLoadSuccess:function(data){
            if(data.length>0){
                var row = data[0];
                var info = row.locId + " " + row.locName
                $('.storeinfo').html(info);
                //设置选中
                $("#storetab").bootstrapTable("checkBy", {field:"locId", values:[row.locId]});
                //设置
                setaddress(row);
            }
        }
    });
}
/*------------------------------------------------------------------------------------------------------
 /*初始化修改
 -------------------------------------------------------------------------------------------------------*/
function initModify(){
    //设置基础信息
    var poi_id = wxloc.poi_id;
    if(poi_id==""){
        $('.seccessInfo').hide();
        $('.errorInfo').hide();
        $('.waitloading').show();
    }else{
        $('.waitloading').hide();
        $('.errorInfo').hide();
        $('.seccessInfo').show();
    }
    //菜品类别
    var temp='',info='',first = "",second = "";
    var categories = wxloc.categories;
    var arraycate = categories.split(",");
    if(arraycate.length==3){
        first = arraycate[1];
        second = arraycate[2];
    }else if(arraycate.length==2){
        first = arraycate[1];
    }
    //拼写门店类型下拉框
    for(var i in recipe){
        var selected = "";
        if(first ==  i){
            selected = "selected";
        }
        temp+='<option '+selected+'>'+i+'</option>';
    }
    $("#firstRecipe").html(temp);
    for(var i in recipe){
        if(i==first){
            var list=recipe[i];
            var length=list.length;
            if(length>0){
                for(var j in list){
                    var selected = "";
                    if(second ==  j){
                        selected = "selected";
                    }
                    info+='<option '+selected+'>'+list[j].category3+'</option>'
                }
                $("#secondRecipe").html(info);
            }else{
                $("#secondRecipe").attr('disabled','disabled');
            }
        }
    }
    //设置其他基础信息
    $("input[name='telephone']").val(wxloc.telephone);
    $("input[name='avgprice']").val(wxloc.avg_price);
    $("input[name='opentime']").val(wxloc.open_time);
    $("textarea[name='recommend']").val(wxloc.recommend);
    $("textarea[name='special']").val(wxloc.special);
    $("textarea[name='introduction']").val(wxloc.introduction);
    //设置初始化门店
    var info = wxloc.sid + " " + wxloc.branch_name;
    $('.storeinfo').html(info);
    var datainfo = {"locId": wxloc.sid,"locName":wxloc.branch_name,"address1":wxloc.province,"address2":wxloc.city,
        "address3":wxloc.district,"address4":wxloc.address,"latitude":wxloc.latitude,"longitude":wxloc.longitude};
    //设置
    setaddress(datainfo);
}

function setaddress(row){
    //设置定位的位置
    var addressinfo = "";
    if(row.address1==row.address2){
        searchaddress=row.address1+row.address3+row.address4;
        addressinfo = '<input type="text" class="city" value="'+row.address1+'" disabled/>' +
            '<input type="text" class="discrit" value="'+row.address3+'" disabled/>' +
            '<input type="text" class="storedetailadress" value="'+searchaddress+'" style="width: 220px;" disabled/>';

    }else{
        searchaddress=row.address1+row.address2+row.address3+row.address4;
        addressinfo = '<input type="text" class="city" value="'+row.address1+'" disabled/>' +
            '<input type="text" class="province" value="'+row.address2+'" disabled/>' +
            '<input type="text" class="discrit" value="'+row.address3+'" disabled/>' +
            '<input type="text" class="storedetailadress" value="'+searchaddress+'" style="width: 220px;" disabled/>';
    }
    $('.storeaddress').html(addressinfo);
    searchmark(searchaddress)
}
/*------------------------------------------------------------------------------------
/*搜索标注
 ------------------------------------------------------------------------------------*/
var lng = 0;
var lat=0;
function searchmark(searchaddress){
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
 /*门店弹出 2018-05-21
 ----------------------------------------------------------------------------------------------------*/
function chosestore(){
    //获取当前选中内容
    var info =  $('.storeinfo').html();
    if(info==""){
        erroMessage("尚未定义可选门店");
        return false;
    }
    //设置选中
    var loc = info.split(" ");
    $("#storetab").bootstrapTable("uncheckAll");
    $("#storetab").bootstrapTable("checkBy", {field:"locId", values:[loc[0]]});
    $("#storeradius").modal();
}
/*------------------------------------------------------------------------------------------------------
 /*门店类型改变事件 2018-07-27
 ----------------------------------------------------------------------------------------------------*/
$("#firstRecipe").change(function(){
    var recipeName=$(this).val();
    var temp='';
    for(var i in recipe){
        if(i==recipeName){
            var list=recipe[i];
            var length=list.length;
            if(length>0){
                for(var j in list){
                    temp+='<option>'+list[j].category3+'</option>'
                }
                $("#secondRecipe").html(temp);
            }else{
                $("#secondRecipe").attr('disabled','disabled');
            }
        }
    }
})
/*------------------------------------------------------------------------------------------------------
 /*新增门店 2018-07-27
 ----------------------------------------------------------------------------------------------------*/
$(".btn-store").click(function() {
    stores=  $("#storetab").bootstrapTable('getAllSelections');
    if(stores.length==0){
        erroMessage("请选择门店");
        return false;
    }
    var info = stores[0].locId + " " + stores[0].locName
    $('.storeinfo').html(info);
    //设置地址
    setaddress(stores[0]);
    $("#storeradius").modal('hide');
});
/*------------------------------------------------------------------------------------------------------
 /*删除门店 2018-07-27
 ----------------------------------------------------------------------------------------------------*/
function deletestore(obj){
    BootstrapDialog.show({
        title: '提示',
        message: '是否删除使用门店',
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
                doDelete(obj);
            }
        }]
    });
}
function doDelete(obj){
    $.ajax({
        type: "post",
        url: basePath+"platform/suitstore/delete",
        data:{"id":obj},
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1||data.status=='1'){
                $('#suitStoretab').bootstrapTable('refresh');
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
/*------------------------------------------------------------------------------------------------------
 /*关闭提示框 2018-07-31
 ----------------------------------------------------------------------------------------------------*/
function closetoolip(){
    $(".importToolip").hide()

}