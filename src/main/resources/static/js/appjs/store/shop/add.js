function submitForm(){
    $('#signupForm').submit();
}

$().ready(function() {
    loadSelect();
    //加载所有的品牌
    selectBrand("enterpriseCode");
    //加载所有的网点和分部
    selectBranchOrDel("branchCode");
    loadMap();
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
		url : "/store/store/shop/save",
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
            shopName : {
                required : true,
                minlength : 1,
                maxlength : 10,
                isString : true,
                remote : {
                    url : "/store/store/shop/exit", // 后台处理程序
                    type : "post", // 数据发送方式
                    dataType : "json", // 接受数据格式
                    data : { // 要传递的数据
                        enterpriseName : function() {
                            return $("#enterpriseName").val();
                        }
                    }
                }
            },
            enterpriseCodes : "required",
            provinceId : "required",
            cityId : "required",
            countyId : "required",
            street : {
                required : true,
                minlength : 1,
                maxlength : 100,
                isString : true
            },
            branchCodes : "required",
            chargeName : {
                required : true,
                isName:true
            },
            chargePhone : {
                required : true,
                isMobile:true
            },
            idCard : {
                required : true,
                isIdentity : true
            }
        },
        messages : {
            shopName : {
                required : icon + "请输入门店名称",
                maxlength : icon +'不能超过10个字符',
                remote : icon + "该门店名称已存在"
            },
            street :{
                required : icon + "请输入门店详细地址",
                maxlength : icon + "不能超过100个字符"
            },
            chargeName : {
                required : icon + "请输入负责人姓名",
                isName : icon + "姓名只能用汉字,长度2-4位"
            },
            chargePhone : {
                required : icon + "请输入负责人手机号",
                isMobile : icon + "请填写正确的11位手机号"
            },
            idCard : {
                required : icon + "请输入负责人身份证号",
                isIdentity : icon + "请输入正确的15或18位身份证号,要大写X"
            }　　　　　
        }
    })
}
function loadSelect() {
    $("#branchCode").select2({
        data: selectProvinceId(),
        placeholder: "请选择省 ",
        allowClear: true,
        language: "zh-CN"
    });
    $("#provinceId").select2({
        data: selectProvinceId(),
        placeholder: "请选择省 ",
        allowClear: true,
        language: "zh-CN"
    });
    $("#cityId").select2({
        data: "",
        allowClear: true,
        placeholder: "请选择市",
        language: "zh-CN"
    });
    $("#countyId").select2({
        data: "",
        allowClear: true,
        placeholder: "请选择区",
        language: "zh-CN"
    });

    $('#provinceId').on('change', function (evt) {
        var provinceId = $(this).val();
        $("#cityId").empty();
        $("#county_id").empty();
        if (provinceId) {
            //市
            $("#cityId").select2({
                data: selectCityId(provinceId),
                placeholder: "请选择市",
                allowClear: true,
                language: "zh-CN"
            });
            $("#cityId").val(null).trigger("change");
        }
    });

    $('#cityId').on('change', function (evt) {
        var cityId = $(this).val();
        $("#countyId").empty();
        if (cityId) {
            //区
            $("#countyId").select2({
                data: selectCountyId(cityId),
                placeholder: "请选择区",
                allowClear: true,
                language: "zh-CN"
            });
            $("#countyId").val(null).trigger("change");
        }
    });
}
// function loadBrand() {
//     var html = "";
//     $.ajax({
//         type : "POST",
//         url : "/store/store/shop/searchBrand",
//         success : function(data){
//             console.log(data);
//             for (var i = 0; i < data.length; i++){
//                 html += '<option value="' + data[i].enterpriseCode + '">' + data[i].enterpriseName + '</option>';
//             }
//             $("#enterpriseCodes").append(html);
//             $("#enterpriseCodes").chosen({
//                 maxHeight : 1000
//             });
//             $('#enterpriseCodes').on('change',function (e,params) {
//                 var enterpriseCode = $(this).val();
//                 console.log(params.selected);
//                 if (enterpriseCode) {
//                     if (enterpriseCode.length > 0) {
//                         var opt = {
//                             query : {
//                                 enterpriseCodes : params.selected
//                             }
//                         };
//                         $("#enterpriseCode").val(enterpriseCode);
//                     }
//                 }
//                 $('#exampleTable').bootstrapTable('refresh', opt);
//             });
//         }
//     });
// }
// function loadBranch() {
//     var html = "";
//     $.ajax({
//         type : "POST",
//         url : "/store/store/shop/searchBranch",
//         success : function(data){
//             console.log(data);
//             for (var i = 0; i < data.length; i++){
//                 html += '<option value="' + data[i].id + '">' + data[i].text+ '</option>';
//             }
//             $("#branchCodes").append(html);
//             $("#branchCodes").chosen({
//                 maxHeight : 2000
//             });
//             $('#branchCodes').on('change',function (e,params) {
//                 console.log(params.selected);
//                 var opt = {
//                     query : {
//                         branchCodes : params.selected
//                     }
//                 };
//                 $('#exampleTable').bootstrapTable('refresh', opt);
//             });
//         }
//     });
// }
function loadMap() {
    AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
        var map = new AMap.Map('container', {
            zoom: 16
        });
        var poiPicker = new PoiPicker({
            input: 'street'
        });
        window.poiPicker = poiPicker;
        var marker = new AMap.Marker({draggable: true});
        var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -20)});
        poiPicker.on('poiPicked', function (poiResult) {
            poiPicker.hideSearchResults();
            var poi = poiResult.item;
            marker.setMap(map);
            infoWindow.setMap(map);
            marker.setPosition(poi.location);
            infoWindow.setPosition(poi.location);
            infoWindow.setContent('地址信息 : <pre>' +
                '经度 : ' + poi.location.lng + '</br>' +
                '纬度 : ' + poi.location.lat + '</br>' +
                '地址 : ' + poi.address + '</pre>'
            );
            infoWindow.open(map, marker.getPosition());
            $("#street").val(poi.name);
            $("#lng").val(bd_encrypt(poi.location.lng,poi.location.lat).bd_lon);
            $("#lat").val(bd_encrypt(poi.location.lng,poi.location.lat).bd_lat);
            geocoder(map,marker,infoWindow);
        });
    });
}
