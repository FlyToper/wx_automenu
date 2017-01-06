//20170105

$(function(){
	//主菜单选择
	//$(".jsMenu").click(jsMenuClick);
	

	//增加菜单
	$("#add_jsMenu").click(function(){
		var size = $(".pre_menu_list > li").length - 1 ;
		//size = 0;
		addMenu(size + 1);
		
	});

});



//动态增加菜单
function addMenu(size){
	
	//0-->1, 1-->2, 3-->3 
	$('.pre_menu_list > li').removeClass("size1of"+size);
	
	$("#add_jsMenu").before("<li class='jsMenu pre_menu_item grid_item jslevel1 ui-sortable ui-sortable-disabled  '  data-toggle='popover' data-placement='top'><a href='javascript:void(0);' class='pre_menu_link' draggable='false'><i class='icon_menu_dot js_icon_menu_dot dn' style='display: none;'></i><i class='icon20_common sort_gray'></i><span class='js_l1Title'>新菜单"+size+"</span> </a> <div class='sub_pre_menu_box js_l2TitleBox' style='display:none;' id='sub_pre_menu_box"+size+"'><ul class='sub_pre_menu_list'> <li class='js_addMenuBox'><a href='javascript:void(0);' class='jsSubView js_addL2Btn' title='最多添加5个子菜单' draggable='false'><span class='sub_pre_menu_inner js_sub_pre_menu_inner'><i class='icon14_menu_add'></i></span></a></li></ul><i class='arrow arrow_out'></i><i class='arrow arrow_in'></i></div></li>");
	
	//0--> 2, 1-->3, 2-->3,hide()
	if(size  == 3){
		$('.pre_menu_list > li').addClass("size1of"+size);
		$("#add_jsMenu").hide();
	}else{
		$('.pre_menu_list > li').addClass("size1of"+(size+1));
	}
	
	//先把点击事件清除
	$(".pre_menu_link").unbind("click");
	
	//然后再添加点击事件
	$(".pre_menu_link").click(jsMenuClick);
	
	
	
}



//主菜单按钮点击
function jsMenuClick(){
		//alert($(this).attr('class'));
		
		//添加样式
		$('.pre_menu_list > li').removeClass("current selected");
		if($(this).next().find('ul').children().length <= 1)
			$(this).parent().addClass("current selected");
		else{
			$(this).next().find('ul').children().removeClass("current selected");
			$(this).next().find('ul').children().eq(-2).addClass("current selected");
		}
		
		
		
		//子菜+单点击事件
		$(".js_addMenuBox").unbind('click');
		$(".js_addMenuBox").click(addChildMenu);
		
		//显示子菜单+
		$(".pre_menu_list > li").find('div').css('display','none');
		$(this).parent().find('div').css('display', '');
		
		//展示标题
		showTitle($(this).text(), 1);
}

//添加子菜单
function addChildMenu(){
	//alert($(this).parent().parent().parent().attr('class'));
	$(this).parent().parent().prev().find('i').show();
	$(this).parent().parent().parent().removeClass("current selected");
	
	//最多添加5个子菜单
	if($(this).parent().children().length -1 >= 5)
		return;

	$(this).parent().prepend(" <li class='jslevel2 jsSubMenu'><a href='javascript:void(0);' class='jsSubView' draggable='false'><span class='sub_pre_menu_inner js_sub_pre_menu_inner'><i class='icon20_common sort_gray'></i><span class='js_l2Title'>子菜单名称</span></span></a></li>");
	
	
	//先把点击事件清除
	$(".jsSubMenu").unbind("click");
	
	//然后再添加点击事件
	$(".jsSubMenu").click(subMenuClick);

	
}

//子菜单点击事件
function subMenuClick(){
	
	$(this).siblings().removeClass('current selected');
	$(this).addClass('current selected');
	
	showTitle($(this).text(),2);
}


//菜单标题设置
function showTitle(title, type){
	$("#txtMenuTitle").text(title);
	$("#txtMenuName").val(title);
		
}

