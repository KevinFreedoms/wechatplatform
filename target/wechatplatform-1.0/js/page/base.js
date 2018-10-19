// JavaScript Document
/*------------------------------------------------------------------------------------------------------
/*获取页面高度
-------------------------------------------------------------------------------------------------------*/
function contentheight(){
	var windowHeight=$(window).height()
	var headHeight=$(".header").height();
	var contheight=windowHeight-headHeight-40
	$(".wrapper").css('margin-top',headHeight)
	$(".content").css('min-height',contheight)
	$(".wedget").css("height",contheight-10)
	$("ul.sidebar-menu").css("margin-top",headHeight)
}
/*------------------------------------------------------------------------------------------------------
/*注销
-------------------------------------------------------------------------------------------------------*/
$(".returnlogin").click(function() {
    BootstrapDialog.show({
        title: '提示信息',
        message: '确定注销当前系统么？',
        buttons: [{
            id: 'btn-close',
            icon: 'glyphicon glyphicon-remove',
            label: '关闭',
            action: function(dialogItself){
                dialogItself.close();
            }
        },{
            id: 'btn-ok',
            icon: 'glyphicon glyphicon-check',
            label: '确定',
            cssClass: 'btn-primary',
            action: function(dialogItself){
                dialogItself.close();
                location.href = basePath+"platform";
            }
        }]
    });
});
/*------------------------------------------------------------------------------------------------------
/*日期转换
-------------------------------------------------------------------------------------------------------*/
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();
    var seperator1 = "-";
    var seperator2 = ":";
	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + seperator1 + mymonth + seperator1+ myweekday);
}

function fmtDate(obj){
	var date =  new Date(obj);
	var y = 1900+date.getYear();
	var m = "0"+(date.getMonth()+1);
	var d = "0"+date.getDate();
	return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}
/*------------------------------------------------------------------------------------------------------
/*获取当天时间
-------------------------------------------------------------------------------------------------------*/
function nowtime() {
	var mydate = new Date();
	return(formatDate(mydate))
};
/*------------------------------------------------------------------------------------------------------
/*日历
-------------------------------------------------------------------------------------------------------*/
function calendar(){
    $('.reservation').val(nowtime()+' - '+nowtime())
	$('.reservation').daterangepicker({
		startDate: nowtime(),
	    endDate: nowtime(),
		separator : ' - ',
	});
}
/*----------------------------------------------------------------------------------------
/*获取当前时间
/*---------------------------------------------------------------------------------------*/
function currenttime(){
	var mydate = new Date();
	var myyear = mydate.getFullYear();
	var mymonth = mydate.getMonth() + 1;
	var myweekday = mydate.getDate();
	var hours=mydate.getHours(); 
	var minutes=mydate.getMinutes();
	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	return (myyear + "-" + mymonth + "-" + myweekday+" "+hours+":"+minutes);
}
//获取当前时间
function getnowdate(){
    var date = new Date();
    var month=date.getMonth()+1
    var day=date.getDate();
    var nowdate="";
    if(month<=9){
        if(day>=0 && day<=9){
            nowdate = date.getFullYear()+"0"+(date.getMonth()+1)+"0"+date.getDate();
        }else{
            nowdate = date.getFullYear()+"0"+(date.getMonth()+1)+""+date.getDate();
        }
    }else{
        if(day>=0 && day<=9){
            nowdate = date.getFullYear()+""+(date.getMonth()+1)+"0"+date.getDate();
        }else{
            nowdate = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate();
        }
    }
    return nowdate;
}
/*---------------------------------------------------------------------------------------------------------
/*查看隐藏按钮
----------------------------------------------------------------------------------------------------------*/
function hidearea(obj){
	 var offset=$(obj).offset()
	 var width=$(".yhquseradius").width()
	 var leftoffest=offset.left-width
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
/*---------------------------------------------------------------------------------------------------------
/*限制输入框只能输数字
----------------------------------------------------------------------------------------------------------*/
function num(obj){
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
    obj.value = obj.value.replace(/^\./g,"");   //保证第一位只可输数字
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj.value= parseFloat(obj.value);
    }
}
function changeinput(obj){
    var str=obj.value
    if(str.substr(str.length-1,1)=="."){
        var newvalue=str.substr(0,str.length-1)
        obj.value=newvalue
    }
}

/*---------------------------------------------------------------------------------------------------------
/*信息提示框
----------------------------------------------------------------------------------------------------------*/
function erroMessage(content){
	BootstrapDialog.show({
		title: '提示信息',
		message: content,
		  buttons: [{
					label: '确定',
					cssClass: 'btn-primary',
					action: function(dialog) {
						 dialog.close(); 
					}
				}
			]
	});
}
/*---------------------------------------------------------------------------------------------------------
 /*功能项
 ----------------------------------------------------------------------------------------------------------*/
function createFunction() {
	var temp = new Base64();
	var str = temp.decode(window.localStorage.getItem("functions"));
	var functions = JSON.parse(str);
	var content = '';
	$.each(functions, function(index,father){
		var fatherflag = false;
		var child = '';
		if(parseFloat(father.functionLevel)==2){
			var functionid = father.functionId;
			child += '<ul class="sub">';
			for(i in functions){
				var children = functions[i];
				if(children.parentFunctionId == functionid){
					fatherflag = true;
					child += '<li src="'+basePath+children.operation+'" ><a>'+children.functionName+'</a></li>';
				}
			}
			child +='</ul>';
			content += '<li class="sub-menu" >';
			if(fatherflag){
				content += '<a>'
				content += '<i class="'+father.icon+'"></i>'+
					'<span>'+father.functionName+'</span>'+
					'</a>';
				content += child;
			}else{
				content += '<a>';
				content += '<i class="'+father.icon+'"></i>'+
					'<span>'+father.functionName+'</span>'+
					'</a>';
			}
			content += '</li>';
		}
	});
	$('.sidebar-menu').html(content);
	function a() {
		var a = $(window).width();
		768 >= a && ($("#container").addClass("sidebar-close"), $("#sidebar > ul").hide()), a > 768 && ($("#container").removeClass("sidebar-close"), $("#sidebar > ul").show())
	}
	$(window).on("load", a), $(window).on("resize", a);
	$("#nav-accordion").dcAccordion({
		eventType: "click",
		autoClose: !0,
		saveState: !0,
		disableLink: !0,
		speed: "slow",
		showCount: !1,
		autoExpand: !0,
		classExpand: "dcjq-current-parent"
	});
	// JavaScript Document
	var headheigh =$(window).height() //高度
	var ifreamheigh=parseInt(headheigh-60)
	$(".sub li").click(function(){
		var temp='';
		if($(this).attr("id")=="index")return;
		var items=$(this).find("a").text();
		var src=$(this).attr("src");
		var strHtml = '<iframe width="100%" height="'+ifreamheigh+'px" frameborder="0" scrolling="yes" src="' + src + '"></iframe>';
		$(".wrapper").html(strHtml)
		$(".sub li").removeClass('current')
		$(this).addClass("current")
		var str=''
		var parentName=$(this).parent().parent().find('a').find('span').text();
		var chosemenu=$(this).text()
		str='<li><i class="icon-dashboard"></i>'+parentName+'</li>'+
			'<li class="active">'+chosemenu+'</li>'
		$("#breadnav").html(str)
	});
};
