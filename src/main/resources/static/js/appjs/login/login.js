$(document).ready(function () {
        $("#login").on('click',function(){$("#signupForm").submit();});
        validateRule();
    });

    $.validator.setDefaults({
        submitHandler: function () {
            login();
        }
    });

    function login() {
    	var password = $("#password").val();
    	var username = $("#username").val();
    	password = encryptByDES(password,"12345678");
    	username = encryptByDES(username,"12345678");
        $.ajax({
            type: "POST",
            url: ctx+"login",
            data: {
            	username : username,
            	password : password
            },
            success: function (r) {
                if (r.code == 0) {
                    var index = layer.load(1, {
                        shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });
                    parent.location.href = '/store/index';
                } else {
                    layer.msg(r.msg);
                }
            }
        });
    }

    function validateRule() {
        var icon = "<i class='fa fa-times-circle'></i> ";
        $("#signupForm").validate({
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: icon + "请输入您的用户名",
                },
                password: {
                    required: icon + "请输入您的密码",
                }
            }
        })
    }
    function encryptByDES(message, key) { 
        var keyHex = CryptoJS.enc.Utf8.parse(key);  
        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {    
        mode: CryptoJS.mode.ECB,    
        padding: CryptoJS.pad.Pkcs7    
        });   
        return encrypted.toString();    
    }    
   