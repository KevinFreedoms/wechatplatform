/* ------------------------------------------------------------------------------------------------------------------------ */
/* 登录密码校验 xxx 2016-06-29 */
/* ------------------------------------------------------------------------------------------------------------------------ */
var locId="";   //门店编号
var userId="";  //用户编号
var  isnew=0;   //设置当前状态
$(".loginbtn").click(function() {
    var user_id = $("#user_id").val();
    if(user_id==""){
        erroMessage("用户名不能为空");
        return false;
    }
    var user_password = $("#user_password").val();
    if(user_password==""){
        erroMessage("密码不能为空");
        return false;
    }
    $.ajax({
        type: "get",
        url: basePath+"platform/user/get?id="+user_id+"&password="+user_password,
        dataType: "json",
        timeout: 20000,  //
        success: function (data) {
            if(data.status==1){
                var systemflag = data.system;
                if(1==systemflag){
                    location.href = basePath+"platform/system";
                }else{
                    //获取员工对应菜单项
                    var temp = new Base64();
                    var str = temp.encode(JSON.stringify(data.functions));
                    window.localStorage.setItem("functions",str);
                    //获取员工基础信息
                    str = temp.encode(JSON.stringify(data.staff));
                    window.localStorage.setItem("staff",str);
                    location.href = basePath+"platform/main";

                }
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
});
/* ------------------------------------------------------------------------------------------------------------------------ */
/* 登录密码校验 xxx 2018-06-01 */
/* ------------------------------------------------------------------------------------------------------------------------ */
$(".btn_modifypassword").click(function() {
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    userId = staff.staffId;
    var oldpassword =  $("input[name='oldpassword']").val();
    if(oldpassword==""){
        $('.errortoolip:eq(0)').html("原始密码不能为空！");
        $('.errortoolip:eq(0)').show();
        return false;
    }
    $('.errortoolip:eq(0)').hide();
    var newpassword =  $("input[name='newpassword']").val();
    var regEx = /^[a-zA-Z0-9_]{4,16}$/;
    if(newpassword==""){
        $('.errortoolip:eq(1)').html("新密码不能为空！");
        $('.errortoolip:eq(1)').show();
        return false;
    }
    if(!regEx.test(newpassword)){
        $('.errortoolip:eq(1)').html("密码设置在4-16位字符之间！");
        $('.errortoolip:eq(1)').show();
        return false;
    }
    $('.errortoolip:eq(1)').hide();
    var replaypassword = $("input[name='replaypassword']").val();
    if(replaypassword==""){
        $('.errortoolip:eq(2)').html("重复密码不能为空！");
        $('.errortoolip:eq(2)').show();
        return false;
    }
    if(newpassword!=replaypassword){
        $('.errortoolip:eq(2)').html("重复密码和新密码不一致！");
        $('.errortoolip:eq(2)').show();
        return false;
    }
    $('.errortoolip:eq(2)').hide();
    collectjson={"id":userId,"oldp":oldpassword,"newp":newpassword};
    $.ajax({
        type: "post",
        url: basePath+"platform/staff/password",
        data:JSON.stringify(collectjson),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            status = data.status;
            if(status==1||status=='1'){
                $("input[name='oldpassword']").val("");
                $("input[name='newpassword']").val("");
                $("input[name='replaypassword']").val("");
                erroMessage("更新密码成功");
            }else if(status==0){
                $('.errortoolip:eq(0)').html("原始密码输入错误！");
                $('.errortoolip:eq(0)').show();
            }else{
                erroMessage("数据库访问异常！");
            }
        }, error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时，请稍后重试！");
            }else{
                erroMessage("初始化信息失败，请稍后重试！");
            }
        }
    });
});
/* ------------------------------------------------------------------------------------------------------------------------ */
/* 验证是否设置了支付密码 xxx 2018-06-01 */
/* ------------------------------------------------------------------------------------------------------------------------ */
function  checkLocPay() {
    //获取用户存储信息的门店信息
    var temp = new Base64();
    str = temp.decode(window.localStorage.getItem("staff"));
    staff = JSON.parse(str);
    locId = staff.locId;
    userId = staff.staffId;
    $.ajax({
        type: "get",
        url: basePath+"platform/pay/check?id="+locId,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            isnew = data.status;
            if(isnew==1||isnew=='1'){
                $('.importToolip').hide();
                $('.form-group:eq(0)').show();
            }else{
                $('.importToolip').show();
                $('.form-group:eq(0)').hide();
            }
        }, error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时，请稍后重试！");
            }else{
                erroMessage("初始化信息失败，请稍后重试！");
            }
        }
    });
    contentheight();
}
$(".btn_locpassword").click(function() {
    var oldpassword = "";
    if(isnew==1){
        oldpassword =  $("input[name='oldpassword']").val();
        if(oldpassword==""){
            $('.errortoolip:eq(0)').html("原始密码不能为空！");
            $('.errortoolip:eq(0)').show();
            return false;
        }
        $('.errortoolip:eq(0)').hide();
    }
    var newpassword =  $("input[name='newpassword']").val();
    var regEx = /^[a-zA-Z0-9_]{4,16}$/;
    if(newpassword==""){
        $('.errortoolip:eq(1)').html("新密码不能为空！");
        $('.errortoolip:eq(1)').show();
        return false;
    }
    if(!regEx.test(newpassword)){
        $('.errortoolip:eq(1)').html("密码设置在4-16位字符之间！");
        $('.errortoolip:eq(1)').show();
        return false;
    }
    $('.errortoolip:eq(1)').hide();
    var replaypassword = $("input[name='replaypassword']").val();
    if(replaypassword==""){
        $('.errortoolip:eq(2)').html("重复密码不能为空！");
        $('.errortoolip:eq(2)').show();
        return false;
    }
    if(newpassword!=replaypassword){
        $('.errortoolip:eq(2)').html("重复密码和新密码不一致！");
        $('.errortoolip:eq(2)').show();
        return false;
    }
    $('.errortoolip:eq(2)').hide();
    datajson={"loc":locId,"oldp":oldpassword,"newp":newpassword,"id":userId};
    $.ajax({
        type: "post",
        url: basePath+"platform/pay/modify",
        data:JSON.stringify(datajson),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        timeout: 20000,
        success: function (data) {
            status = data.status;
            if(status==1||status=='1'){
                isnew = 1;
                $('.importToolip').hide();
                $('.form-group:eq(0)').show();
                $("input[name='oldpassword']").val("");
                $("input[name='newpassword']").val("");
                $("input[name='replaypassword']").val("");
                erroMessage("支付密码设置成功");
            }else if(status==0){
                if(isnew==1){
                    $('.errortoolip:eq(0)').html("原始密码输入错误！");
                    $('.errortoolip:eq(0)').show();
                }
            }else{
                erroMessage("数据库访问异常！");
            }
        }, error: function (request, status, err) {
            if (status == "timeout")
            {
                erroMessage("请求超时，请稍后重试！");
            }else{
                erroMessage("初始化信息失败，请稍后重试！");
            }
        }
    });
});