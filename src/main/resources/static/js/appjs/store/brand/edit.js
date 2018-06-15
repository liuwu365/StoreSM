$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/store/store/brand/update",
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
                isString : true
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
                isPhone:true
            },
            email : {
                required : true,
                email:true
            }
        },
        messages : {
            enterpriseName : {
                required : icon + "请输入企业名称",
                maxlength : icon +'不能超过20个字符'
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
                isPhone : icon +"请填写正确的11位手机号"
            },
            email : {
                required : icon +"请输入邮箱"
            }
        }
	})
}