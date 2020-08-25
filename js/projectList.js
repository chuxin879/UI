$.fn.serializeObject = function(){
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
	
};
	

	



//添加项目的弹窗
	$('.btn-addinter2').click(function(){
		
	
		var dialog = jqueryAlert({
			'style'   : 'pc',
			'title'   : '添加项目',
			'content' :  $('#addForm2'), //$("#alert-blockquote")
			'modal'   : true,
			'contentTextAlign' : 'left',
			'width'   : '620px',
			'animateType' : 'linear',
			'buttons' :{
				'取消' : function(){
					dialog.close();
				},
				'提交':function(){
					
					var ifViladate = true;
					var $form = $('.pcAlert').last().find('#addForm2');
					ifViladate = $form.validate('submitValidate');
					if(!ifViladate)return;
					$.ajax({
						headers:{"Authorization": $.cookie("sessionId")},
						contentType: "application/json;charset=utf-8",
						url:lemon.config.global.admin+"/project/add",
						data:JSON.stringify($form.serializeObject()),
						type:'post',
						dataType:'json',
						async:false,
						success:function(ret){
							if(ret.status=="1"){
								dialog.close();
								window.location.reload();
							}
						}
					});

				}
			}
		})
	});