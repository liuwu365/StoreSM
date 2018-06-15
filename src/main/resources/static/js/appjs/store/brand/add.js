function submitForm(){
    $('#signupForm').submit();
}
$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/store/store/brand/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
            enterpriseName : {
				required : true,
                minlength : 1,
                maxlength : 20,
                isString : true,
                remote : {
                    url : "/store/store/brand/exit", // 后台处理程序
                    type : "POST", // 数据发送方式
                    dataType : "json", // 接受数据格式
                    data : { // 要传递的数据
                        enterpriseName : function() {
                            return $("#enterpriseName").val();
                        }
                    }
				}
			},
            enterpriseAddress : {
                required : true,
				minlength : 1,
                maxlength : 100,
                isString : true

            },
            contactName : {
                required : true,
				isName : true
			},
            mobile : {
                required : true,
                isMobile:true,
                remote : {
                    url : "/store/store/brand/exit", // 后台处理程序
                    type : "post", // 数据发送方式
                    dataType : "json", // 接受数据格式
                    data : { // 要传递的数据
                        mobile : function() {
                            return $("#mobile").val();
                        }
                    }
				}
			},
            email : {
                required : true,
                // email:true,
                remote : {
                    url : "/store/store/brand/exit", // 后台处理程序
                    type : "post", // 数据发送方式
                    dataType : "json", // 接受数据格式
                    data : { // 要传递的数据
                        email : function() {
                            return $("#email").val();
                        }
                    }
				}
			}
		},
		messages : {
            enterpriseName : {
				required : icon + "请输入企业名称",
                maxlength : icon +'不能超过20个字符',
                remote : icon + "企业名称已存在"
			},
            enterpriseAddress : {
                required : icon +"请输入 企业地址",
                maxlength : icon +"不能超过100个字符"
			},
            contactName : {
                required : icon +"请输入姓名",
                isName : icon +"姓名只能用汉字,长度2-4位"
			},
            mobile : {
                required : icon +"请输入手机号",
                isMobile : icon +"请填写正确的11位手机号",
                remote : icon + "该手机号已使用"
			},
            email : {
                required : icon +"请输入邮箱",
                remote : icon + "该邮箱已存在"
			}
		}
	})
}