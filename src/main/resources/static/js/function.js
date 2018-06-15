//加载所有的品牌
function selectBrand(id) {
    $("#"+id).select2({
        allowClear: true,
        placeholder: "请输入编码/名称",
        ajax: {
            type: "POST",
            url:  "/store/store/shop/searchBrand",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data) {
                return {
                    results:data
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 2,
        language: "zh-CN"
    });
}
//加载所有的网点和分部
function selectBranchOrDel(id){
    $("#"+id).select2({
        allowClear: true,
        placeholder: "请输入编码/名称",
        ajax: {
            type: "POST",
            url:  "/store/store/shop/searchBranch",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data) {
                return {
                    results:data
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 2,
        language: "zh-CN"
    });
}
//加载省
function selectProvinceId(){
    var proData = "";
    $.ajax({
        type: "POST",
        url: "/store/store/shop/searchProvince",
        async:false,
        dataType:"json",
        contentType: "application/json",
        success: function(data){
            proData = data;
        }
    });
    return proData;
}
//加载市
function selectCityId(provinceId){
    var cityData = "";
    $.ajax({
        type: "GET",
        url: "/store/store/shop/searchCity/"+provinceId,
        async:false,
        dataType:"json",
        contentType: "application/json",
        success: function(data){
            cityData = data;
        }
    });
    return cityData;
}
//加载区
function selectCountyId(cityId){
    var counData = "";
    $.ajax({
        type: "GET",
        url: "/store/store/shop/searchCounty/"+cityId,
        async:false,
        dataType:"json",
        contentType: "application/json",
        success: function(data){
            counData = data;
        }
    });
    return counData;
}
//逆地理编码
function geocoder(map,marker,infoWindow) {
    AMap.event.addListener(marker, "dragend", function (e) {
        $("#lng").val(marker.getPosition().lng);
        $("#lat").val(marker.getPosition().lat);
        lnglatXY = [marker.getPosition().lng, marker.getPosition().lat];
        var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                var address = result.regeocode.formattedAddress; //返回地址描述
                $("#street").val(address);
            }
            marker.setMap(map);
            infoWindow.setMap(map);
            marker.setPosition(marker.getPosition());
            infoWindow.setPosition(marker.getPosition());
            infoWindow.setContent('地址信息 : <pre>' +
                '经度 : ' + marker.getPosition().lng + '</br>' +
                '纬度 : ' + marker.getPosition().lat + '</br>' +
                '地址 : ' + address + '</pre>'
            );
            infoWindow.open(map, marker.getPosition());
        });
    });
}

//高德转百度
function bd_encrypt(gd_lon, gd_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = gd_lon, y = gd_lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    var bd_lon = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return {
        bd_lat: bd_lat.toFixed(6),
        bd_lon: bd_lon.toFixed(6)
    };
}

//百度转高德
function bd_decrypt(bd_lon,bd_lat) {
    var X_PI = Math.Pi * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    var gd_lon = z * Math.cos(theta);
    var gd_lat = z * Math.sin(theta);
    return {
        gd_lon: gd_lon.toFixed(6),
        gd_lat: gd_lat.toFixed(6)
    }
}
