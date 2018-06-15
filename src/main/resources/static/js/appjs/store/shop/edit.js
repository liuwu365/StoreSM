function submitForm(){
    $('#signupForm').submit();
}

$().ready(function() {
    loadSelect();
    //加载所有的网点和分部
    selectBranchOrDel("branchCode");
    loadMap($("#lng").val(),$("#lat").val());
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
		url : "/store/store/shop/update",
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
                isString : true
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
                maxlength : icon +'不能超过10个字符'
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
function loadBranch() {
    var html = "";
    $.ajax({
        type : "POST",
        url : "/store/store/shop/searchBranch",
        success : function(data){
            console.log(data);
            for (var i = 0; i < data.length; i++){
                html += '<option value="' + data[i].branch_code + '">' + data[i].branch_name+ '</option>';
            }
            $("#branchCodes").append(html);
            $("#branchCodes").chosen({
                maxHeight : 2000
            });
            $('#branchCodes').on('change',function (e,params) {
                console.log(params.selected);
                var opt = {
                    query : {
                        branchCodes : params.selected
                    }
                };
                $('#exampleTable').bootstrapTable('refresh', opt);
            });
        }
    });
}
function loadMap(lng,lat) {
    var map = new AMap.Map('container', {
        zoom: 16
    });
    var marker = new AMap.Marker(
         {
             map : map,
             position : [bd_decrypt(lng,lat).gd_lon, bd_decrypt(lng,lat).gd_lat],
             draggable : true
         });

    var infoWindow = new AMap.InfoWindow(
        {
            map : map,
            position : marker.getPosition()
        });
    infoWindow.setContent('地址信息 : <pre>' +
        '经度 : ' + bd_decrypt(lng,lat).gd_lon + '</br>' +
        '纬度 : ' + bd_decrypt(lng,lat).gd_lat + '</br>' +
        '地址 : ' + $("#street").val() + '</pre>'
    );
    infoWindow.open(map, marker.getPosition());
    geocoder(map,marker,infoWindow);
    AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
        var poiPicker = new PoiPicker({
            input: 'street'
        });
        window.poiPicker = poiPicker;
        var marker1 = new AMap.Marker(
            {
                draggable: true
            });
        var infoWindow1= new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -20)
        });
        poiPicker.on('poiPicked', function (poiResult) {
            poiPicker.hideSearchResults();
            var poi = poiResult.item;
            marker1.setMap(map);
            marker1.setPosition(poi.location);
            infoWindow1.setMap(map);
            infoWindow1.setPosition(poi.location);
            infoWindow1.setContent('地址信息 : <pre>' +
                '经度 : ' + poi.location.lng + '</br>' +
                '纬度 : ' + poi.location.lat + '</br>' +
                '地址 : ' + poi.address + '</pre>'
            );
            infoWindow1.open(map, marker1.getPosition());
            $("#street").val(poi.name);
            $("#lng").val(bd_encrypt(poi.location.lng,poi.location.lat).bd_lon);
            $("#lat").val(bd_encrypt(poi.location.lng,poi.location.lat).bd_lat);
            geocoder(map,marker1,infoWindow1);
            marker.setMap(null);
        });
    });
}
