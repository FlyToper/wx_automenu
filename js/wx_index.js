//20170105

$(function(){
	//���˵�ѡ��
	//$(".jsMenu").click(jsMenuClick);
	

	//���Ӳ˵�
	$("#add_jsMenu").click(addMenu);
	
	
	$("#jsDelBt").click(function(){
		//��ȡ��ǰ��Ԫ��
		var currentElement = $('.current');
		
		//1. ɾ�����˵�
		//�ж��Ƿ�Ϊ���˵�
		if(currentElement.hasClass('jsMenu')){
			//alert(currentElement.siblings().length);
			var size = currentElement.siblings().length;
			if(confirm("��ȷ��Ҫɾ���ò˵���ɾ����ò˵������õ����ݽ���ɾ��!")){
				if(size <= 3)
					currentElement.siblings("#add_jsMenu").show();
				currentElement.remove();
			}
			else
				return;
			
			$('.pre_menu_list > li').removeClass("size1of"+(size+1));
			$('.pre_menu_list > li').addClass("size1of"+size);
			return;
		}
		
		//2. ɾ���Ӳ˵�
		var subMenuLength = currentElement.siblings().length;
		var mainMenu = currentElement.parent().parent().prev();
		if(confirm("��ȷ��Ҫɾ���ò˵���ɾ����ò˵������õ����ݽ���ɾ��!"))
			currentElement.remove();
		else
			return;
		
		
		
		//�ж��Ӳ˵��Ƿ�ɾ��,����Ӳ˵����ɾ������ѡ�����˵�
		if(subMenuLength <= 1){
			mainMenu.find('i').hide();
			mainMenu.click();
		}else{
			//alert(mainMenu.next().find('ul').attr('class'));
			//alert(mainMenu.next().find('ul').children().eq(-2).attr('class'));
			mainMenu.next().find('ul').children().eq(-2).click();//ѡ���ֵ��Ӳ˵�
		}
	});

});




//��̬���Ӳ˵�
function addMenu(){
	
	var size = $(".pre_menu_list > li").length;
	
	//0-->1, 1-->2, 3-->3 
	$('.pre_menu_list > li').removeClass("size1of"+size);
	
	$("#add_jsMenu").before("<li class='jsMenu pre_menu_item grid_item jslevel1 ui-sortable ui-sortable-disabled  '  data-toggle='popover' data-placement='top'><a href='javascript:void(0);' class='pre_menu_link' draggable='false'><i class='icon_menu_dot js_icon_menu_dot dn' style='display: none;'></i><i class='icon20_common sort_gray'></i><span class='js_l1Title'>�²˵�"+size+"</span> </a> <div class='sub_pre_menu_box js_l2TitleBox' style='display:none;' id='sub_pre_menu_box"+size+"'><ul class='sub_pre_menu_list'> <li class='js_addMenuBox'><a href='javascript:void(0);' class='jsSubView js_addL2Btn' title='������5���Ӳ˵�' draggable='false'><span class='sub_pre_menu_inner js_sub_pre_menu_inner'><i class='icon14_menu_add'></i></span></a></li></ul><i class='arrow arrow_out'></i><i class='arrow arrow_in'></i></div></li>");
	
	//0--> 2, 1-->3, 2-->3,hide()
	if(size  == 3){
		$('.pre_menu_list > li').addClass("size1of"+size);
		$("#add_jsMenu").hide();
	}else{
		$('.pre_menu_list > li').addClass("size1of"+(size+1));
	}
	
	//�Ȱѵ���¼����
	$(".pre_menu_link").unbind("click");
	
	//Ȼ������ӵ���¼�
	$(".pre_menu_link").click(jsMenuClick);
	
	
	
}



//���˵���ť���
function jsMenuClick(){
		//alert($(this).attr('class'));
		
		//�����ʽ
		$('.pre_menu_list > li').removeClass("current selected");
		if($(this).next().find('ul').children().length <= 1){
			
			$(this).parent().addClass("current selected");
		}
		else{
			//������˵�����ʽ
			$(this).next().find('ul').children().removeClass("current selected");
			//����Ӳ˵�����ʽ
			$(this).parent().siblings().find('ul').children().removeClass("current selected");
			$(this).next().find('ul').children().eq(-2).addClass("current selected");
		}
		
		
		
		//�Ӳ�+������¼�
		$(".js_addMenuBox").unbind('click');
		$(".js_addMenuBox").click(addChildMenu);
		
		//��ʾ�Ӳ˵�+
		$(".pre_menu_list > li").find('div').css('display','none');
		$(this).parent().find('div').css('display', '');
		
		//չʾ����
		showTitle($(this).text(), 1);
}

//����Ӳ˵�
function addChildMenu(){
	//alert($(this).parent().parent().parent().attr('class'));
	//��ʾ���Ӳ˵���ͼ��
	$(this).parent().parent().prev().find('i').show();
	$(this).parent().parent().parent().removeClass("current selected");
	
	//������5���Ӳ˵�
	if($(this).parent().children().length -1 >= 5)
		return;

	$(this).parent().prepend(" <li class='jslevel2 jsSubMenu'><a href='javascript:void(0);' class='jsSubView' draggable='false'><span class='sub_pre_menu_inner js_sub_pre_menu_inner'><i class='icon20_common sort_gray'></i><span class='js_l2Title'>�Ӳ˵�����</span></span></a></li>");
	
	
	//�Ȱѵ���¼����
	$(".jsSubMenu").unbind("click");
	
	//Ȼ������ӵ���¼�
	$(".jsSubMenu").click(subMenuClick);

	
}

//�Ӳ˵�����¼�
function subMenuClick(){
	
	$(this).siblings().removeClass('current selected');
	$(this).addClass('current selected');
	
	showTitle($(this).text(),2);
}


//�˵���������
function showTitle(title, type){
	$("#txtMenuTitle").text(title);
	$("#txtMenuName").val(title);
		
}

