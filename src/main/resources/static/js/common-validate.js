$.validator.setDefaults({
    submitHandler: function(form) {
        form.submit();
    }
});
//手机号码验证身份证正则合并：(^\d{15}$)|(^\d{17}([0-9]|X)$)
jQuery.validator.addMethod("isMobile",function(value,element){
    var length = value.length;
    var phone=/^1[3|4|5|7|8][0-9]\d{8}$/;
    return this.optional(element)||(length == 11 && phone.test(value));
},"请填写正确的11位手机号");
//电话号码验证
jQuery.validator.addMethod("isTel",function(value,element){
    var tel = /^(0\d{2,3}-)?\d{7,8}$/g;//区号3,4位,号码7,8位
    return this.optional(element) || (tel.test(value));
},"请填写正确的座机号码");
//联系电话(手机/电话皆可)验证
jQuery.validator.addMethod("isPhone", function(value,element) {
    var length = value.length;
    var mobile = /^1[3|4|5|7|8][0-9]\d{8}$/;
    var tel = /^d{3,4}-?d{7,9}$/;
    return this.optional(element) || (tel.test(value) || mobile.test(value));
}, "请正确填写您的联系电话,座机号或11位手机号");
//姓名校验
jQuery.validator.addMethod("isName",function(value,element){
    var name=/^[\u4e00-\u9fa5]{2,6}$/;
    return this.optional(element) || (name.test(value));
},"姓名只能用汉字,长度2-4位");
//校验用户名
jQuery.validator.addMethod("isUserName",function(value,element){
    var userName=/^[a-zA-Z0-9]{2,13}$/;
    return this.optional(element) || (userName).test(value);
},'请输入数字或者字母,不包含特殊字符');

//校验身份证
jQuery.validator.addMethod("isIdentity",function(value,element){
    var id= /^(\d{15}$|^\d{18}$|^\d{17}(\d|X))$/;
    return this.optional(element) || (id.test(value));
},"请输入正确的15或18位身份证号,末尾为大写X");
//校验出生日期
jQuery.validator.addMethod("isBirth",function(value,element){
    var birth = /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
    return this.optional(element) || (birth).test(value);
},"出生日期格式示例2000-01-01");
//校验字符串
jQuery.validator.addMethod("isString",function(value,element){
    var string = /.+/;
    return this.optional(element) || (string).test(value);
},"不能为空和包含其他非法字符");
//校验新旧密码是否相同
jQuery.validator.addMethod("isdiff",function(){
    var p1=$("#pwdOld").val();
    var p2=$("#pwdNew").val();
    if(p1==p2){
        return false;
    }else{
        return true;
    }
});
//校验新密码和确认密码是否相同
jQuery.validator.addMethod("issame",function(){
    var p3=$("#confirm_password").val();
    var p4=$("#pwdNew").val();
    if(p3==p4){
        return true;
    }else{
        return false;
    }
});