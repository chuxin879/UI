$(function(){
	$("#btnUApi").click(function(){
		$.ajax({
			url:lemon.config.global.rootUrl+"/case/update",
			data:$("[name='caseForm']").serialize(),
			type:'post',
			dataType:'json',
			success:function(ret){
				if(ret!=null){
					alert(ret.message);
					if(ret.status=="1"){
						window.parent.location.reload();
					}
				}
			}
		});
	});
	$(".btn-send").click(function(){
		$.ajax({
			url:lemon.config.global.rootUrl+"/case/run",
			data:$("[name='caseForm']").serialize(),
			type:'post',
			dataType:'json',
			success:function(ret){
				if(ret.status=="1"){
					$("[name='responseHeaders']").html("<pre>"+ret.data.responseHeaders+"</pre>");
					$("[name='responseBody']").html("<pre>"+ret.data.responseBody+"</pre>");
				}else{
					alert(ret.message);
				}
			}
		});
	});
	
	$(".restit-interrun").find("div").click(function(){
		var index = $(this).index();
		$(this).css("border-bottom","2px solid #2395f1");
		$(this).css("color","#2395f1");
		$(this).siblings().css("border-bottom","");
		$(this).siblings().css("color","");
		if(index==0){
			//显示
			$(".reslist-interrun").show();
			//隐藏
			$(".testlist-interrun").hide();
		}else if(index==1){
			//显示
			$(".testlist-interrun").show();
			//隐藏
			$(".reslist-interrun").hide();
			//找到表中配置的断言规则,用于数据回显
			var url = lemon.config.global.rootUrl+"/suite/findCaseTestRule";
			var caseId = $("[name='caseId']").val();
			$.post(url,{"caseId":caseId},function(ret){
				if(ret.status=="1"){
					if(ret.data!==null){
						//数据回填到页面
						$("[name='caseTestRule.expression']").val(ret.data.expression);
						$("[name='caseTestRule.expected']").val(ret.data.expected);
					}
				}else{
					alert(ret.message);
				}
			},'json');
		}
	});
	
	$("#addRule").click(function(){
		var siblingsLength = $(this).siblings().length;
		var appendIndex = siblingsLength;
		var toAddHtml = '<div class="line-interedit line-com">'
									+'<input placeholder="jsonpath表达式" name="testRules['+appendIndex+'].expression" value="" style="width:40%;margin-left:5px" type="text">'
									+'<select name="testRules['+appendIndex+'].operator" id="" style="width:10%;margin-left:10px">'
									+'<option value="=">=</option>'
									+'<option value="contains">contains</option>'
									+'</select>'
									+'<input placeholder="期望值" name="testRules['+appendIndex+'].expected" value="" style="width:30%;margin-left:5px" type="text">'
									+'<i class="icon icon-delete f-l"></i>'
									+'</div>';
		$(this).parent().append(toAddHtml);
	});
	
	//删除当前行参数
	$('.linebox-interedit').on('click','.line-interedit .icon-delete',function(){
		$(this).parent().remove();
	});
	
	$("[name='relatedApi']").click(function(){
		var baseUrl = lemon.config.global.rootUrl;
		//获取菜单的接口
		var menuFindurl = baseUrl+"/index/findApiSelectedMenu";
		var apiId = $("[name='apiId']").val();
		var projectId = $("[name='projectId']").val();
		var data = {"apiId":apiId};
		var turn2Page = baseUrl+"/index/toIndex?projectId="+projectId+"&tab=1";
		////跳转到对应页面，并选中对应菜单
		selectMenuAndTurn2Page(menuFindurl,data,turn2Page,"测试集合");
	});
});