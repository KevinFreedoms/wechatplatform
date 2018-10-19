var storelist=[];  //门店列表
var companylist=[];//单位列表
var selectstore="";//获取选中的门店
var companyrecharge = []; //企业报表
var rechargeInfo=[];//企业充值单明细
var personlist = []; //个人充值报表
function init() {
    contentheight();
    //日历初始化
    calendar();
    //设置初始化
    initReport();
    //初始化充值单明细
    initRecharge();
}
function initReport() {
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    staffid = staff.staffId;
    $.ajax({
        type: "get",
        url: basePath+"platform/recharge/report/select?staffid="+staffid,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                storelist = data.locs;
                companylist = data.companys;
                storeSelect();
                bussinessSelect();
                storeSelectReprot();
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
function initRecharge() {
    $('#rechargesr').bootstrapTable({
        data:rechargeInfo,   //请求后台的URL（*）
        striped: true,      //是否显示行间隔色
        pagination: true,     //是否显示分页（*）
        pageNumber:1,      //初始化加载第一页，默认第一页
        pageSize: 10,      //每页的记录行数（*）
        pageList: [10, 20, 50, 100, 200, 500],  //可供选择的每页的行数（*）
        clickToSelect: false,    //是否启用点击选中行
        columns: [
            {
                title: '会员卡号',
                field: 'ref2',
                align: 'left',
                valign: 'middle'
            },
            {
                field: 'memberName',
                title: '姓名',
                align: 'left',
                valign: 'middle'
            },{
                field: 'rechargeAmount',
                title: '充值金额（元）',
                align: 'left',
                valign: 'middle'
            }],
    });
}
/*------------------------------------------------------------------------------------------
/*获取查询条件下的报表数据
----------------------------------------------------------------------------------------------*/
//查询企业报表
function storeSelectReprot(){
    companystr=$('#companyselect').val();
    var startDate =$('#reservation').val().substring(0,10);
    var endDate =$('#reservation').val().substring(13);
    $.ajax({
        type: "get",
        url: basePath+"platform/recharge/report/unit?str="+companystr+"&startDate="+startDate+"&endDate="+endDate,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                companyrecharge = data.collectList;
                $("#unittab").bootstrapTable('destroy');
                storeTab();//表格数据拼写
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
//拼接单位充值
function createCompanyTable(){
    var recharge="";
    var recivemoney=0;//收款金额
    var rechargemoney=0;//充值金额
    var overflowmoney=0;//溢充金额
    var rechargenum=0;//充值人数
    var sumrecivemoney = 0;
    var sumrechargemoney = 0;
    var sumoverflowmoney = 0;
    var sumrechargenum = 0;
    for(var i in companyrecharge){
        var list=companyrecharge[i].items;
        for(var j in list){
            var date = fmtDate(list[j].createDate);
            var collectMoney = Number(list[j].collectMoney);
            var checkMoney = Number(list[j].checkMoney);
            var ref2 = Number(list[j].ref2);
            var sumStaff = Number(list[j].sumStaff);
            var every = collectMoney/sumStaff;
            recharge+='<tr>'+
                '<td>'+companyrecharge[i].locName+'</td>'+
                '<td>'+list[j].bookingId+'</td>'+
                '<td>'+list[j].companyName+'</td>'+
                '<td>'+date+'</td>'+
                '<td>'+collectMoney.toFixed(2)+'</td>'+
                '<td>'+checkMoney.toFixed(2)+'</td>'+
                '<td>'+ref2.toFixed(2)+'</td>'+
                '<td>'+sumStaff.toFixed(0)+'</td>'+
                '<td>'+every.toFixed(2)+'</td>'+
                '<td>'+list[j].createUserId+'</td>'+
                '<td>'+list[j].checkUserId+'</td></tr>';
            recivemoney+=collectMoney;
            rechargemoney+=checkMoney;
            overflowmoney+=ref2;
            rechargenum+=sumStaff;
        }
        recharge+='<tr>'+
            '<td class="storesum">门店小计</td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td>'+recivemoney.toFixed(2)+'</td>'+
            '<td>'+rechargemoney.toFixed(2)+'</td>'+
            '<td>'+overflowmoney.toFixed(2)+'</td>'+
            '<td>'+rechargenum.toFixed(0)+'</td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td></tr>'
        sumrecivemoney += recivemoney;
        sumrechargemoney +=rechargemoney;
        sumoverflowmoney +=overflowmoney;
        sumrechargenum +=rechargenum;
    }
    $("#sumrecivemoney").html(sumrecivemoney.toFixed(2));
    $("#sumrechargemoney").html(sumrechargemoney.toFixed(2));
    $("#sumoverflowmoney").html(sumoverflowmoney.toFixed(2));
    $("#sumrechargenum").html(sumrechargenum.toFixed(0));

    $("#unitTbody").html(recharge);
}
function storeTab() {
    createCompanyTable();
    $("#unittab").bootstrapTable({
        search: true,  //是否显示搜索框功能
        striped: true,
        pagination: true,
        pageSize: 10,
        pageList: [10, 20, 30],
        clickToSelect: false,    //是否启用点击选中行
        onDblClickRow: function (row) {
            var id = row[1];
            if(id!=""){
                getRechargeDetail(row);
            }
        },
        onSearch:function(text) {
            if(text==""){
                $("#unittab").rowspan(0);
                $(".storesum").attr('colspan',4)
                $(".storesum").next().hide();
                $(".storesum").next().next().hide()
                $(".storesum").next().next().next().hide();
            }
        }
    });
    $("#unittab").rowspan(0);
    $(".storesum").attr('colspan',4)
    $(".storesum").next().hide();
    $(".storesum").next().next().hide()
    $(".storesum").next().next().next().hide();
    $("#unittab").on('page-change.bs.table', function (e, number, size) {
        $("#unittab").rowspan(0);
        $(".storesum").attr('colspan',4)
        $(".storesum").next().hide();
        $(".storesum").next().next().hide()
        $(".storesum").next().next().next().hide();
    });
}
function createMemberTable(){
    var content = "";
    var rechargemoney=0;//充值金额
    for(var i in personlist){
        var date = fmtDate(personlist[i].createDate);
        var str = personlist[i].ref3=='2'?"单位":"微信";
        var collectMoney = Number(personlist[i].actualMoney);
        content+='<tr>'+
            '<td>'+personlist[i].code+'</td>'+
            '<td>'+personlist[i].memberName+'</td>'+
            '<td>'+date+'</td>'+
            '<td>'+collectMoney.toFixed(2)+'</td>' +
            '<td>'+str+'</td></tr>';
        rechargemoney+=collectMoney;
    }
    $(".sumrechargemoney").html(rechargemoney.toFixed(2));
    $("#memberbody").html(content);
}
function memberTab() {
    createMemberTable();
    $('#persontab').bootstrapTable({
        search: true,  //是否显示搜索框功能
        striped: true,
        pagination: true,
        pageSize: 10,
        pageList: [10, 20, 30],
        clickToSelect: false,    //是否启用点击选中行
        onSearch:function(text) {
            if(text==""){
                $("#persontab").rowspan(0);
                $("#persontab").rowspan(1);
            }
        }
    });
    $("#persontab").rowspan(0);
    $("#persontab").rowspan(1);
    $("#persontab").on('page-change.bs.table', function (e, number, size) {
        $("#persontab").rowspan(0);
        $("#persontab").rowspan(1);
    });
}
//查询个人报表
function memberSelectReport(){
    var startDate =$('#reservation').val().substring(0,10);
    var endDate =$('#reservation').val().substring(13);
    var str1 = $('#startmember').val();
    var str2 = $('#endmember').val();
    $.ajax({
        type: "get",
        url: basePath+"platform/recharge/report/member?startDate="+startDate+"&endDate="+endDate+"&str1="+str1+"&str2="+str2,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                personlist = data.collectList;
                $("#persontab").bootstrapTable('destroy');
                memberTab();
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
function selectAll() {
    $('#startmember').val("");
    $('#endmember').val("");
    memberSelectReport();
}
function selectReport() {
    var str1 = $('#startmember').val();
    var str2 = $('#endmember').val();
    if(str1==""){
        erroMessage("请输入开始会员号");
        return false;
    }
    if(str2==""){
        erroMessage("请输入结束会员号");
        return false;
    }
    memberSelectReport();
}
/*------------------------------------------------------------------------------------------
/*门店下拉列表数据
----------------------------------------------------------------------------------------------*/
function storeSelect(){
    var temp="";
    for(var i in storelist){
        temp+='<option value='+storelist[i].locId+'>'+storelist[i].locName+'</option> '
    }
    $('#storeselelct').html(temp)
    $("#storeselelct option").attr("selected",true)
    selectstore=$('#storeselelct').val()//获取门店选中数据
    $('#storeselelct').multiselect({
        includeSelectAllOption: true,
        buttonWidth: '400px',
        dropRight: true,
        maxHeight: 200,
        onChange: function(option, checked) {
            var chosestore=$(option).val(); //选择的单位
            if(checked){
                setCompanyCheck(chosestore);
            }else{
                for(var j in companylist ){
                    var businessName=companylist[j].locId;
                    if(businessName==chosestore){
                        $('#companyselect option').each(function() {
                            if($(this).val()==companylist[j].companyId){
                                $(this).attr("selected",false);
                                $('#companyselect').multiselect('refresh');
                            }
                        });
                    }
                }
            }
            selectstore=$('#storeselelct').val();
            if(selectstore==null){
                $('#companyselect').next().find('.multiselect').attr('disabled',true)
            }else{
                $('#companyselect').next().find('.multiselect').attr('disabled',false)
            }
            storeSelectReprot();
        },
        onSelectAll:function(){
            $('#storeselelct').next().removeClass('open')
            $('#companyselect').next().find('.multiselect').removeAttr('disabled')
            $("#companyselect option").attr("selected",true)
            $('#companyselect').multiselect('refresh');
            storeSelectReprot();
        },
        onDeselectAll:function(){
            $("#companyselect option").attr("selected",false)
            $('#companyselect').multiselect('refresh');
            $('#companyselect').next().find('.multiselect').attr('disabled',true);
            $('#storeselelct').next().removeClass('open');
            storeSelectReprot();
        },
        nonSelectedText: '请选择',
        numberDisplayed: 10,
        enableFiltering: true,
        selectAllText:"全部" ,
        filterPlaceholder:"搜索",
        allSelectedText:"共选",
        nSelectedText: '个被选中',//有n个值的时候显示n个被选中
    });
}
/*------------------------------------------------------------------------------------------
/*单位下拉列表数据
----------------------------------------------------------------------------------------------*/
function bussinessSelect(){
    var str="";
    for(var i in companylist){
        str+='<option value='+companylist[i].companyId+'>'+companylist[i].companyName+'</option>'
    }
    $('#companyselect').html(str)
    $("#companyselect option").attr("selected",true)
    $('#companyselect').multiselect({
        enableClickableOptGroups: true,
        enableCollapsibleOptGroups: true,
        includeSelectAllOption: true,
        buttonWidth: '400px',
        dropRight: true,
        maxHeight: 200,
        onChange: function(option, checked) {
            var chosebusiness=$(option).val(); //选择的单位
            selectstore=$('#storeselelct').val(); //获取选中的门店
            if(checked){
                for(var i in companylist){
                    var chosestoreNum=0
                    if(companylist[i].companyId==chosebusiness){
                        for(var j in selectstore){
                            if(companylist[i].locId==selectstore[j]){
                                chosestoreNum+=1
                            }
                        }
                        if(chosestoreNum==0){
                            erroMessage("所选择的门店下，没有'"+companylist[i].companyName+"'单位会员")
                            $('#companyselect option').each(function() {
                                if($(this).val()==chosebusiness){
                                    $(this).attr("selected",false)
                                    $('#companyselect').multiselect('refresh');
                                }
                            });
                        }
                    }
                }
            }
            storeSelectReprot();
        },
        onSelectAll:function(){
            selectstore=$('#storeselelct').val(); //获取选中的门店
            for(var i in companylist){
                var chosestoreNum=0
                for(var j in selectstore){
                    if(companylist[i].locId==selectstore[j]){
                        chosestoreNum+=1
                    }
                }
                if(chosestoreNum==0){
                    $("#companyselect option").attr("selected",false)
                    $('#companyselect').multiselect('refresh');
                    erroMessage("所选择的门店下，没有'"+companylist[i].companyName+"'单位会员");
                    return false;
                }
            }
            storeSelectReprot();
        },
        onDeselectAll:function(){
            $("#companyselect option").attr("selected",false)
            $('#companyselect').multiselect('refresh');
            storeSelectReprot();
        },
        nonSelectedText: '请选择',
        numberDisplayed: 10,
        enableFiltering: true,
        selectAllText:"全部" ,
        filterPlaceholder:"搜索",
        allSelectedText:"共选",
        nSelectedText: '个被选中',//有n个值的时候显示n个被选中
    });
}

/*------------------------------------------------------------------------------------------------------
/*合并行
--------------------------------------------------------------------------------------------------------*/
jQuery.fn.rowspan = function(colIdx) { //封装的一个iQuery小插件
    return this.each(function(){
        var that;
        $('tr', this).each(function(row) {
            $('td:eq('+colIdx+')', this).filter(':visible').each(function(col) {
                if (that!=null && $(this).html() == $(that).html()) {
                    rowspan = $(that).attr("rowSpan");
                    if (rowspan == undefined) {
                        $(that).attr("rowSpan",1);
                        rowspan = $(that).attr("rowSpan"); }
                    rowspan = Number(rowspan)+1;
                    $(that).attr("rowSpan",rowspan);
                    $(this).hide();
                } else {
                    that = this;
                }
            });
        });
    });
}
/*------------------------------------------------------------------------------------------
/*根据订单编号获取充值明细
----------------------------------------------------------------------------------------------*/
function getRechargeDetail(obj) {
    $.ajax({
        type: "get",
        url: basePath+"platform/recharge/report/info?id="+obj[1],
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                //拼接表头汇总
                var collect = data.collect;
                var content = "";
                content +='<div class="rechargeOrderinfo">' +
                    '<div class="message">' +
                    '<span class="labelname">门店名称：</span>\n' +
                    '<span>'+obj[0]+'</span>\n' +
                    '</div>\n' +
                    '<div class="message">\n' +
                    '<span class="labelname">单位名称：</span>\n' +
                    '<span>'+obj[2]+'</span>\n' +
                    '</div>\n' +
                    '<div class="message">\n' +
                    '<span class="labelname">溢充金额：</span>\n' +
                    '<span>'+obj[6]+'</span>\n' +
                    '</div>\n' +
                    '<div class="message">\n' +
                    '<span class="labelname">充值人：</span>\n' +
                    '<span>'+obj[10]+'</span>\n' +
                    '</div>\n' +
                    '</div>\n' +
                    '<div class="rechargeOrderinfo">\n' +
                    '<div class="message">\n' +
                    '<span class="labelname">充值日期：</span>\n' +
                    '<span>'+obj[3]+'</span>\n' +
                    '</div>\n' +
                    '<div class="message">\n' +
                    '<span class="labelname">收款金额：</span>\n' +
                    '<span>'+obj[4]+'</span>\n' +
                    '</div>\n' +
                    '<div class="message">\n' +
                    '<span class="labelname">充值人数：</span>\n' +
                    '<span>'+obj[7]+'</span>\n' +
                    '</div>\n' +
                    '<div class="message">\n' +
                    '<span class="labelname">复 核 人：</span>\n' +
                    '<span>'+obj[10]+'</span>\n' +
                    '</div>\n' +
                    '</div>\n' +
                    '<div class="rechargeOrderinfo">\n' +
                    '<div class="message">\n' +
                    '<span class="labelname">查询日期：</span>\n' +
                    '<span>'+currenttime()+'</span>\n' +
                    '</div>\n' +
                    '<div class="message">\n' +
                    '<span class="labelname">充值金额：</span>\n' +
                    '<span>'+obj[5]+'</span>\n' +
                    '</div>\n' +
                    '<div class="message">\n' +
                    '<span class="labelname">人均充值：</span>\n' +
                    '<span>'+obj[8]+'</span>\n' +
                    '</div>\n' +
                    '</div>';
                $('.rechargecollect').html(content);
                $('#rechargecsum').html(obj[5]);
                $("#rechargesr").bootstrapTable("load",data.detail);
                $("#rechargedetail").modal();
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
/*选择充值类型
--------------------------------------------------------------------------------------------------------*/
function rechargeType(obj){
    var rechargetype=$(obj).attr("data-type");
    if(rechargetype=="0"){
        storeSelectReprot();
        $(".companyrecharge").show()
        $(".personrecharge").hide();
    }else{
        memberSelectReport();
        $(".companyrecharge").hide()
        $(".personrecharge").show();
    }
}
$(".reservation").on('apply.daterangepicker',function(){
    var chooseDate=$("#reservation").val();
    var startDate =chooseDate.substring(0,10);
    var endDate =chooseDate.substring(13);
    var rechargetype=$('input[name=yhtype]:checked').attr("data-type");
    if(rechargetype=="0"){
        storeSelectReprot();
    }else{
        memberSelectReport();
    }
});
/*------------------------------------------------------------------------------------------
/*设置单位下拉框选中
----------------------------------------------------------------------------------------------*/
function setCompanyCheck(name){
    for(var j in companylist ){
        var businessName=companylist[j].locId
        if(businessName==name){
            $('#companyselect option').each(function() {
                if($(this).val()==companylist[j].companyId){
                    $(this).attr("selected",true)
                    $('#companyselect').multiselect('refresh');
                }
            });
        }
    }
}
/*------------------------------------------------------------------------------------------
/*打印
----------------------------------------------------------------------------------------------*/
function toPrint(){
    var rechargetype=$('input[name=yhtype]:checked').attr("data-type");
    var startDate =$('#reservation').val().substring(0,10);
    var endDate =$('#reservation').val().substring(13);
    html = "";
    if(rechargetype=="0"){
       if(companyrecharge.length==0){
           erroMessage("单位充值为空！");
           return false;
        }
        var recivemoney=0;//收款金额
        var rechargemoney=0;//充值金额
        var overflowmoney=0;//溢充金额
        var rechargenum=0;//充值人数
        html += '<div id="printtitle">'+
            '<div class="ordertitle" style="text-align:center;">'+
            '<strong>单位充值一览</strong>'+
            '</div>'+
            '<div class="ordercontent">'+
            '<label style="float:right;">日期范围:<span>'+startDate+' - '+endDate+'</span></label>'+
            '</div></div>';
        html+= '<table id="printtable" border="1" width="100%" style="font-size:9px; margin-top:10px">'+
            '<thead>'+
            '<th style="width:10%;text-align:center;">门店</th>'+
            '<th style="width:10%;text-align:center;">单位</th>'+
            '<th style="width:10%;text-align:center;">充值日期</th>'+
            '<th style="width:10%;text-align:center;">收款金额</th>'+
            '<th style="width:10%;text-align:center;">充值金额</th>'+
            '<th style="width:10%;text-align:center;">溢充金额</th>'+
            '<th style="width:10%;text-align:center;">充值人数</th>'+
            '<th style="width:10%;text-align:center;">金额/人</th>'+
            '<th style="width:10%;text-align:center;">操作人</th>'+
            '<th style="width:10%;text-align:center;">审核人</th>'+
            '</thead>'+
            '<tbody>';
        for(var i in companyrecharge) {
            var list = companyrecharge[i].items;
            for (var j = 0; j < list.length; j++) {
                var date = fmtDate(list[j].createDate);
                var collectMoney = Number(list[j].collectMoney);
                var checkMoney = Number(list[j].checkMoney);
                var ref2 = Number(list[j].ref2);
                var sumStaff = Number(list[j].sumStaff);
                var every = collectMoney / sumStaff;
                html += '<tr>' +
                    '<td style="text-align:center;">' + companyrecharge[i].locName + '</td>' +
                    '<td style="text-align:center;">' + list[j].companyName + '</td>' +
                    '<td style="text-align:center;">' + date + '</td>' +
                    '<td style="text-align:center;">' + collectMoney.toFixed(2) + '</td>' +
                    '<td style="text-align:center;">' + checkMoney.toFixed(2) + '</td>' +
                    '<td style="text-align:center;">' + ref2.toFixed(2) + '</td>' +
                    '<td style="text-align:center;">' + sumStaff.toFixed(0) + '</td>' +
                    '<td style="text-align:center;">' + every.toFixed(2) + '</td>' +
                    '<td style="text-align:center;">' + list[j].createUserId + '</td>' +
                    '<td style="text-align:center;">' + list[j].checkUserId + '</td>' +
                    '</tr>';
                recivemoney+=collectMoney;
                rechargemoney+=checkMoney;
                overflowmoney+=ref2;
                rechargenum+=sumStaff;
            }
            html+='<tr>'+
                '<td colspan="3" style="text-align:center;">门店小计</td>'+
                '<td style="text-align:center;">'+recivemoney.toFixed(2)+'</td>'+
                '<td style="text-align:center;">'+rechargemoney.toFixed(2)+'</td>'+
                '<td style="text-align:center;">'+overflowmoney.toFixed(2)+'</td>'+
                '<td style="text-align:center;">'+rechargenum.toFixed(0)+'</td>'+
                '<td></td>'+
                '<td></td>'+
                '<td></td></tr>'

        }
        html += '</tbody>'+
            '</table>';
        $("#temptab").html(html);
        $("#temptab").rowspan(0);
    }else{
        if(personlist.length==0){
            erroMessage("个人充值为空！");
            return false;
        }
        html += '<div id="printtitle">'+
            '<div class="ordertitle" style="text-align:center;">'+
            '<strong>个人充值一览</strong>'+
            '</div>'+
            '<div class="ordercontent">'+
            '<label style="float:right;">日期范围:<span>'+startDate+' - '+endDate+'</span></label>'+
            '</div></div>';
        html+= '<table id="printtable" border="1" width="100%" style="font-size:9px; margin-top:10px">'+
            '<thead>'+
            '<th style="width:20%;text-align:center;">会员卡号</th>'+
            '<th style="width:20%;text-align:center;">会员姓名</th>'+
            '<th style="width:20%;text-align:center;">充值日期</th>'+
            '<th style="width:20%;text-align:center;">充值金额（元）</th>'+
            '<th style="width:20%;text-align:center;">充值方式</th>'+
            '</thead>'+
            '<tbody>';
        for(var i in personlist){
            var date = fmtDate(personlist[i].createDate);
            var str = personlist[i].ref3=='2'?"单位":"微信";
            var collectMoney = Number(personlist[i].actualMoney);
            html+='<tr>'+
                '<td style="text-align:center;">'+personlist[i].code+'</td>'+
                '<td style="text-align:center;">'+personlist[i].memberName+'</td>'+
                '<td style="text-align:center;">'+date+'</td>'+
                '<td style="text-align:center;">'+collectMoney.toFixed(2)+'</td>' +
                '<td style="text-align:center;">'+str+'</td></tr>';
        }
        html += '</tbody>'+
            '</table>';
        $("#temptab").html(html);
        $("#temptab").rowspan(0);
        $("#temptab").rowspan(1);
    }
    $("#print").print({
        prepend:$("#temptab").html()
    });
}


/*------------------------------------------------------------------------------------------
/*导出EXECL
----------------------------------------------------------------------------------------------*/
function toExecl() {
    var rechargetype=$('input[name=yhtype]:checked').attr("data-type");
    if(rechargetype=="0"){
        toRechargeExecl();
    }else{
        toMemberExecl();
    }
}

function toRechargeExecl() {
    companystr=$('#companyselect').val();
    var startDate =$('#reservation').val().substring(0,10);
    var endDate =$('#reservation').val().substring(13);
    $('#loading', window.parent.document).modal();
    window.document.location.href=basePath+"platform/recharge/report/unitexecl?str="+companystr+"&startDate="+startDate+"&endDate="+endDate;
    $('#loading', window.parent.document).modal('hide');
}
function toMemberExecl() {
    var startDate =$('#reservation').val().substring(0,10);
    var endDate =$('#reservation').val().substring(13);
    var str1 = $('#startmember').val();
    var str2 = $('#endmember').val();
    $('#loading', window.parent.document).modal();
    window.document.location.href=basePath+"platform/recharge/report/memberexecl?startDate="+startDate+"&endDate="+endDate+"&str1="+str1+"&str2="+str2;
    $('#loading', window.parent.document).modal('hide');
}