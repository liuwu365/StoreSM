var loginname = '${loginname!}';
//vip客户身份昨日新增门店隐藏
if (loginname.startsWith("vipUser")) {
    document.getElementById("vipHidden").style.display="none";//隐藏
}
var datatable;
var sendtable;
var picktable;
var toptable;
var Jdata = {
    xTime: ['0000-00-00'],
    cnt_arrive: [0],
    cnt_send: [0],
    cnt_pick: [0]
};
$(document).ready(function() {
    $("#province_id").select2({
        data:selectProvinceId(),
        placeholder: "请选择省 ",
        allowClear: true,
        language: "zh-CN"
    });
    $("#city_id").select2({
        data:"",
        placeholder: "请选择市",
        allowClear: true,
        language: "zh-CN"
    });
    $("#county_id").select2({
        data:"",
        placeholder: "请选择区",
        allowClear: true,
        language: "zh-CN"
    });
    initDatatable();
    initDatetimepicker();
    initData();
    initJdata(15);
    initChose();
    createChart(15);

});
//计算数据

function initJdata(chartLong){
    $.ajax({
        async:false,
        data:{"chartLong":chartLong},
        url:"${base}/platform/operate/monitor/pickAndRecived/chartData",
        success:function(result){
            Jdata = result;
        }
    });
    return Jdata;
}

function createChart(chartLong){
    Jdata = initJdata(chartLong);
    createLineChart(Jdata);
}

function createLineChart(data) {
    if(data){
        Jdata=data;
    }
    var myChart = echarts.init(document.getElementById('amountChart'));

    // 指定图表的配置项和数据
    var option = {
        color: ['#3399EE','#27AAA2','#3F9F00','#cfc702'],
        title: {
            text: '揽派件总量趋势图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            right: '5%',
            top: '5%',
            data: [{
                name: '到件量',
                icon: 'rect',
                textStyle: {
                    color: '#3399EE'
                }
            },
                {
                    name: '签收量',
                    icon: 'rect',
                    textStyle: {
                        color: '#27AAA2'
                    }
                },
                {
                    name: '揽件量',
                    icon: 'rect',
                    textStyle: {
                        color: '#3F9F00'
                    }
                },
                {
                    name: '短信量',
                    icon: 'rect',
                    textStyle: {
                        color: '#cfc702'
                    }
                }
            ]
        },
        toolbox: {
            show: true,
            feature: {
                myTool1: {
                    show: true,
                    title: '导出',
                    icon: 'path://M25 28.125l12.5-12.5h-9.375v-12.5h-6.25v12.5h-9.375zM36.364 23.011l-3.503 3.503 12.699 4.736-20.56 7.667-20.56-7.667 12.699-4.736-3.503-3.503-13.636 5.114v12.5l25 9.375 25-9.375v-12.5z',
                    onclick: function (){
                        exportCsv(Jdata);
                    }
                }
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: Jdata.xTime
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:'到件量',
                type:'line',
                data:Jdata.cnt_arrive,
                markLine: {
                    data: [
                        {type: 'average', name: '平均值',
                            label: {
                                normal: {
                                    formatter: '{a}日均: {c}'}
                            }
                        }]
                },
                lineStyle: {
                    normal: {
                        color: '#3399EE'
                    }
                }
            },
            {
                name:'签收量',
                type:'line',
                data:Jdata.cnt_send,
                markLine: {
                    data: [
                        {type: 'average', name: '平均值',
                            label: {
                                normal: {
                                    formatter: '{a}日均: {c}'}
                            }
                        }]
                },
                lineStyle: {
                    normal: {
                        color: '#27AAA2'
                    }
                }
            },
            {
                name:'揽件量',
                type:'line',
                data:Jdata.cnt_pick,
                markLine: {
                    data: [
                        {type: 'average', name: '平均值',
                            label: {
                                normal: {
                                    formatter: '{a}日均: {c}'}
                            }
                        }]
                },
                lineStyle: {
                    normal: {
                        color: '#3F9F00'
                    }
                }
            },
            {
                name:'短信量',
                type:'line',
                data:Jdata.cnt_pick,
                markLine: {
                    data: [
                        {type: 'average', name: '平均值',
                            label: {
                                normal: {
                                    formatter: '{a}日均: {c}'}
                            }
                        }]
                },
                lineStyle: {
                    normal: {
                        color: '#cfc702'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function exportCsv() {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var data = typeof Jdata != 'object' ? JSON.parse(Jdata) : Jdata;

    var CSV = '日期, 到件量, 签收量, 揽件量, 短信总量' + '\r\n';

    var xTime = data.xTime;
    var cnt_arrive = data.cnt_arrive;
    var ave_arrive = 0;
    var cnt_send = data.cnt_send;
    var ave_send = 0;
    var cnt_pick = data.cnt_pick;
    var ave_pick = 0;
    //1st loop is to extract each row
    for (var i = 0; i < xTime.length; i++) {
        var row = "";
        row = row + xTime[i] + "," + cnt_arrive[i] + "," + cnt_send[i] + "," + cnt_pick[i] + "," + "短信总量";
        row.slice(0, row.length - 1);
        //add a line break after each row
        row  = row + '\r\n';
        CSV += row;

        ave_arrive += cnt_arrive[i];
        ave_send += cnt_send[i];
        ave_pick += cnt_pick[i];
    }


    CSV += '日均量,' + (ave_arrive / cnt_arrive.length).toFixed(2) + ',' + (ave_send / cnt_send.length).toFixed(2) + ',' + (ave_pick / cnt_pick.length).toFixed(2);

    var date = new Date();
    var fileName = "揽派件趋势报表_" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();

    var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURI(CSV);

    var link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function initChose(){
    $('.ui-choose').ui_choose();
    var uc_02 = $('#uc_02').data('ui-choose');
    uc_02.click = function(value, item) {
    };
    uc_02.change = function(value, item) {
        createChart(value);
        $("#date_line").val(value);
        $("#active_type").val("dateLine");
        toptable.ajax.reload();

    };
    var uc_03 = $('#uc_03').data('ui-choose');
    uc_03.click = function(value, item) {
    };
    uc_03.change = function(value, item) {
        if(value=="total"){
            var column1 = toptable.column(1);
            column1.visible(true);
            var column2 = toptable.column(2);
            column2.visible(false);
            var column3 = toptable.column(3);
            column3.visible(false);
            var column4 = toptable.column(4);
            column4.visible(false);

        }else if(value=="cnt_arrive"){
            var column1 = toptable.column(1);
            column1.visible(false);
            var column2 = toptable.column(2);
            column2.visible(true);
            var column3 = toptable.column(3);
            column3.visible(false);
            var column4 = toptable.column(4);
            column4.visible(false);
        }else if(value=="cnt_send"){
            var column1 = toptable.column(1);
            column1.visible(false);
            var column2 = toptable.column(2);
            column2.visible(false);
            var column3 = toptable.column(3);
            column3.visible(true);
            var column4 = toptable.column(4);
            column4.visible(false);
        }else if(value=="cnt_pick"){
            var column1 = toptable.column(1);
            column1.visible(false);
            var column2 = toptable.column(2);
            column2.visible(false);
            var column3 = toptable.column(3);
            column3.visible(false);
            var column4 = toptable.column(4);
            column4.visible(true);
        }
        $("#agent_top_type").val(value);
        toptable.ajax.reload();
    };
}
//
function initData(){
    //昨日总订单量
    if(${totalWeekOrder!}>0){
        $("#span1").html("<span class='fa fa-sort-asc' style='color:green'>"+(${totalWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }else if(${totalWeekOrder!}<0){
        $("#span1").html("<span class='fa fa-sort-desc' style='color:red'>"+(${totalWeekOrder!}*100*-1).toFixed(2)+'%'+"</span>对比上周");
    }else{
        $("#span1").html("<span class='fa fa-minus' style='color:gray'>"+(${totalWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }
    //昨日签收量
    if(${singedWeekOrder!}>0){
        $("#span2").html("<span class='fa fa-sort-asc' style='color:green'>"+(${singedWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }else if(${singedWeekOrder!}<0){
        $("#span2").html("<span class='fa fa-sort-desc' style='color:red'>"+(${singedWeekOrder!}*100*-1).toFixed(2)+'%'+"</span>对比上周");
    }else{
        $("#span2").html("<span class='fa fa-minus' style='color:gray'>"+(${singedWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }
    //昨日揽件量
    if(${pickWeekOrder!}>0){
        $("#span3").html("<span class='fa fa-sort-asc' style='color:green'>"+(${pickWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }else if(${pickWeekOrder!}<0){
        $("#span3").html("<span class='fa fa-sort-desc' style='color:red'>"+(${pickWeekOrder!}*100*-1).toFixed(2)+'%'+"</span>对比上周");
    }else{
        $("#span3").html("<span class='fa fa-minus' style='color:gray'>"+(${pickWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }
    //新增门店数
    if(${singedWeekUser!}>0){
        $("#span4").html("<span class='fa fa-sort-asc' style='color:green'>"+(${singedWeekUser!}*100).toFixed(2)+'%'+"</span>对比上周");
    }else if(${singedWeekUser!}<0){
        $("#span4").html("<span class='fa fa-sort-desc' style='color:red'>"+(${singedWeekUser!}*100*-1).toFixed(2)+'%'+"</span>对比上周");
    }else{
        $("#span4").html("<span class='fa fa-minus' style='color:gray'>"+(${singedWeekUser!}*100).toFixed(2)+'%'+"</span>对比上周");
    }
    //昨日收益
    if(${sumWeekOrder!}>0){
        $("#span5").html("<span class='fa fa-sort-asc' style='color:green'>"+(${sumWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }else if(${sumWeekOrder!}<0){
        $("#span5").html("<span class='fa fa-sort-desc' style='color:red'>"+(${sumWeekOrder!}*100*-1).toFixed(2)+'%'+"</span>对比上周");
    }else{
        $("#span5").html("<span class='fa fa-minus' style='color:gray'>"+(${sumWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }
    //昨日到件量
    if(${arriveWeekOrder!}>0){
        $("#span6").html("<span class='fa fa-sort-asc' style='color:green'>"+(${arriveWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }else if(${arriveWeekOrder!}<0){
        $("#span6").html("<span class='fa fa-sort-desc' style='color:red'>"+(${arriveWeekOrder!}*100*-1).toFixed(2)+'%'+"</span>对比上周");
    }else{
        $("#span6").html("<span class='fa fa-minus' style='color:gray'>"+(${arriveWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }

    //昨日短信量
    if(${arriveWeekOrder!}>0){
        $("#span7").html("<span class='fa fa-sort-asc' style='color:green'>"+(${arriveWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }else if(${arriveWeekOrder!}<0){
        $("#span7").html("<span class='fa fa-sort-desc' style='color:red'>"+(${arriveWeekOrder!}*100*-1).toFixed(2)+'%'+"</span>对比上周");
    }else{
        $("#span7").html("<span class='fa fa-minus' style='color:gray'>"+(${arriveWeekOrder!}*100).toFixed(2)+'%'+"</span>对比上周");
    }
}

function reSearch(){
    //清空查询条件
    $("#province_id").val(null).trigger("change");
    $('#searchForm')[0].reset();
}

$('#province_id').on('change', function (evt) {
    var province_id = $(this).val();
    $("#city_id").empty();
    $("#county_id").empty();
    if(province_id){
        $("#city_id").select2({
            data:selectCityId(province_id),
            placeholder: "请选择市",
            allowClear: true,
            language: "zh-CN"
        });
        $("#city_id").val(null).trigger("change");
    }
});

$('#city_id').on('change', function (evt) {
    var city_id = $(this).val();
    $("#county_id").empty();
    if(city_id){
        $("#county_id").select2({
            data:selectCountyId(city_id),
            placeholder: "请选择区",
            allowClear: true,
            language: "zh-CN"
        });
        $("#county_id").val(null).trigger("change");
    }
});

function selectProvinceId(){
    var province = "";
    $.ajax({
        type: "POST",
        url: "${base}/platform/agent/agent/info/searchProvince",
        async:false,
        dataType:"json",
        contentType: "application/json",
        success: function(data){
            if (data.code == 0) {
                province = data.data;
            } else {
                Toast.error(data.msg);
            }
        }
    });
    return province;
}

function selectCityId(province_id){
    var city ="";
    $.ajax({
        type: "POST",
        url: "${base}/platform/agent/agent/info/searchCity?province_id="+province_id,
        async:false,
        dataType:"json",
        contentType: "application/json",
        success: function(data){
            if (data.code == 0) {
                city = data.data;
            } else {
                Toast.error(data.msg);
            }
        }
    });
    return city;
}

function selectCountyId(city_id){
    var county="";
    $.ajax({
        type: "POST",
        url: "${base}/platform/agent/agent/info/searchCounty?city_id="+city_id,
        async:false,
        dataType:"json",
        contentType: "application/json",
        success: function(data){
            if (data.code == 0) {
                county = data.data;
            } else {
                Toast.error(data.msg);
            }
        }
    });
    return county;
}

function showInfo(info,id,handle_state){
    var dialog = $("#dialog");
    dialog.modal("show");
    document.getElementById("infoDetail").innerHTML=info;
    if(handle_state=="feedback_undo"){
        updateState(id,"feedback_waitting");
    }

}

function updateState(id,state){
    $.ajax({
        data:{"id":id,"state":state},
        url:"${base}/platform/agent/agent/feedback/updateDo",
        success:function(){
            datatable.ajax.reload();
        }
    });
}

function initDatatable() {
    datatable = $('#totalData').DataTable({
        "dom":'<"top"i>rt<"bottom"flp> <"clear">',
        "bProcessing": false,   //显示是否加载提示字段
        "serverSide":true,//让数据顺序准确
        "bLengthChange":true, //开启显示多少条数据
        "searching": false,//关闭搜索框
        "aLengthMenu": [[20,30], [20,30]],
        "ordering": false,
        "language": {
            "url": "${base}/assets/plugins/datatables/cn.json"
        },
        "preDrawCallback": function () {
            sublime.showLoadingbar($(".main-content"));
        },
        "drawCallback": function () {
            sublime.closeLoadingbar($(".main-content"));
        },
        "ajax": {
            "url": "${base}/platform/operate/monitor/pickAndRecived/data",
            "type": "post",
            "data": function (d) {
                d.startCreateTime = $("#startCreateTime").val();
                d.endCreateTime = $("#endCreateTime").val();
                d.province_id = $("#province_id").val();
                d.city_id = $("#city_id").val();
                d.county_id = $("#county_id").val();
                d.agent_name = $("#agent_name").val();
                d.branch_name = $("#branch_name").val();
                d.cmn_code = $("#cmn_code").val();
            }
        },
        "columns": [
            {"data": "agent_name", "bSortable": false},
            {"data": "cmn_code", "bSortable": false},
            {"data": "branch_name", "bSortable": false},
            {"data": "cnt_arrive",
                "render": function (data, type, full, meta) {
                    return "<a href='javascript:void(0)' onclick='showArriveOrSendDetail("+full.agent_id+",&quot;arrive&quot;)'>"+data+"</a>";
                },"bSortable": false},
            {"data": "cnt_send",
                "render": function (data, type, full, meta) {
                    return "<a href='javascript:void(0)' onclick='showArriveOrSendDetail("+full.agent_id+",&quot;send&quot;)'>"+data+"</a>";
                },"bSortable": false},
            {"data": "cnt_pick",
                "render": function (data, type, full, meta) {
                    return "<a href='javascript:void(0)' onclick='showPickDetail("+full.agent_id+")'>"+data+"</a>";
                },"bSortable": false},
            {"data": "address",
                "render": function (data, type, full, meta) {
                    return ""+full.province_name+"/"+full.city_name+"/"+full.county_name+"/"+full.address+"";
                },"bSortable": false}
        ]
    });

    datatable.on('click', 'tr', function () {
        $('#totalData tbody tr').removeClass('selected');
        $(this).toggleClass('selected');

    });
    /* 到件/签收量 */
    sendtable = $('#sendData').DataTable({
        "dom":'<"top"i>rt<"bottom"flp> <"clear">',
        "bProcessing": false,   //显示是否加载提示字段
        "serverSide":true,//让数据顺序准确
        "bLengthChange":true, //开启显示多少条数据
        "searching": false,//关闭搜索框
        "aLengthMenu": [[20,30], [20,30]],
        "ordering": false,
        "language": {
            "url": "${base}/assets/plugins/datatables/cn.json"
        },
        "preDrawCallback": function () {
            sublime.showLoadingbar($(".main-content"));
        },
        "drawCallback": function () {
            sublime.closeLoadingbar($(".main-content"));
        },
        "ajax": {
            "url": "${base}/platform/operate/monitor/pickAndRecived/sendData",
            "type": "post",
            "data": function (d) {
                d.cnt_type = $("#cnt_type").val();
                d.startCreateTime = $("#hidden_time_start").val();
                d.endCreateTime = $("#hidden_time_end").val();
                d.agent_id = $("#agent_hidden_id").val();
            }
        },
        "columns": [
            {"data": "agent_name", "bSortable": false},
            {"data": "cmn_code", "bSortable": false},
            {"data": "name", "bSortable": false},
            {"data": "shipment_id","bSortable": false},
            {"data": "arrive_time", "bSortable": false},
            {"data": "scan_time", "render": function (data, type, full, meta) {
                    if(full.arrive_time==full.scan_time){
                        return "";
                    }else{
                        return full.scan_time;
                    }
                },"bSortable": false}
        ]
    });

    sendtable.on('click', 'tr', function () {
        $('#sendData tbody tr').removeClass('selected');
        $(this).toggleClass('selected');

    });
    /* 揽件详情 */
    picktable = $('#pickData').DataTable({
        "dom":'<"top"i>rt<"bottom"flp> <"clear">',
        "bProcessing": false,   //显示是否加载提示字段
        "serverSide":true,//让数据顺序准确
        "bLengthChange":true, //开启显示多少条数据
        "searching": false,//关闭搜索框
        "aLengthMenu": [[20,30], [20,30]],
        "ordering": false,
        "language": {
            "url": "${base}/assets/plugins/datatables/cn.json"
        },
        "preDrawCallback": function () {
            sublime.showLoadingbar($(".main-content"));
        },
        "drawCallback": function () {
            sublime.closeLoadingbar($(".main-content"));
        },
        "ajax": {
            "url": "${base}/platform/operate/monitor/pickAndRecived/pickData",
            "type": "post",
            "data": function (d) {
                d.startCreateTime = $("#hidden_time_start").val();
                d.endCreateTime = $("#hidden_time_end").val();
                d.agent_id = $("#agent_hidden_id").val();
            }
        },
        "columns": [
            {"data": "agent_name", "bSortable": false},
            {"data": "cmn_code", "bSortable": false},
            {"data": "name", "bSortable": false},
            {"data": "order_no","bSortable": false},
            {"data": "scan_time", "bSortable": false}
        ]
    });

    picktable.on('click', 'tr', function () {
        $('#pickData tbody tr').removeClass('selected');
        $(this).toggleClass('selected');

    });

    toptable = $('#topData').DataTable({
        "dom":'<"top"i>rt<"bottom"flp> <"clear">',
        "bProcessing": false,   //显示是否加载提示字段
        //"serverSide":true,//让数据顺序准确
        "bLengthChange":false, //开启显示多少条数据
        "searching": false,//关闭搜索框
        "ordering": false,
        "bPaginate" : false,
        "bInfo": false,
        "language": {
            "url": "${base}/assets/plugins/datatables/cn.json"
        },
        "preDrawCallback": function () {
            sublime.showLoadingbar($(".main-content"));
        },
        "drawCallback": function () {
            sublime.closeLoadingbar($(".main-content"));
        },
        "ajax": {
            "url": "${base}/platform/operate/monitor/pickAndRecived/topData",
            "type": "post",
            "data": function (d) {

                console.log(d);
                d.topChar = $("#agent_top_type").val();
                d.activeType = $("#active_type").val();
                d.dateLine = $("#date_line").val();
                d.topStartTime = $("#top_start_time").val();
                d.topEndTime = $("#top_end_time").val();
            }
        },
        "columns": [
            {"data": "agent_name", "bSortable": false},
            {"data": "total", "bSortable": false},
            {"data": "cnt_arrive", "bSortable": false,"visible":false},
            {"data": "cnt_send", "bSortable": false,"visible":false},
            {"data": "cnt_pick", "bSortable": false,"visible":false},
            {"data": "cnt_duanxin", "bSortable": false,"visible":false},
            {"data": "week_date",
                "render": function (data, type, full, meta) {

                    // console.log(data);
                    // console.log(type);
                    // console.log(full);
                    // console.log(meta);

                    if(data>0){
                        return "<span class='fa fa-sort-asc' style='color:green'>"+(data*100).toFixed(2)+'%'+"</span>";
                    }else if(data<0){
                        return "<span class='fa fa-sort-desc' style='color:red'>"+(data*100).toFixed(2)+'%'+"</span>";
                    }else{
                        return "<span class='fa fa-minus' style='color:gray'>"+(data*100).toFixed(2)+'%'+"</span>";
                    }
                },"bSortable": false}
        ]
    });

    toptable.on('click', 'tr', function () {
        $('#topData tbody tr').removeClass('selected');
        $(this).toggleClass('selected');

    });

}

function reload(){
    var start = $("#startCreateTime").val();
    var end = $("#endCreateTime").val();
    if(GetDateDiff(start,end)>30){
        Toast.warning("时间间隔不能超过30天！");
        return false;
    }
    $("#hidden_time_start").val(start);
    $("#hidden_time_end").val(end);
    datatable.ajax.reload();
}

//计算时间差
function GetDateDiff(startDate,endDate)  {
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
    return  dates;
}

//显示到件/签收报表
function showArriveOrSendDetail(agent_id,cnt_type){
    $("#agent_hidden_id").val(agent_id);
    $("#cnt_type").val(cnt_type);
    $("#sendDiv").css("display","");
    $("#pickDiv").css("display","none");
    sendtable.ajax.reload();
}

//显示揽件报表
function showPickDetail(agent_id){
    $("#agent_hidden_id").val(agent_id);
    $("#sendDiv").css("display","none");
    $("#pickDiv").css("display","");
    picktable.ajax.reload();
}

function initDatetimepicker(){
    $('.form_datetime').datetimepicker({
        language:  'zh-CN',
        format:'yyyy-mm-dd',
        minView: "month",
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        endDate:new Date((new Date()).getTime()-24*60*60*1000)
    });

    $('.pick_datetime').datetimepicker({
        language:  'zh-CN',
        format:'yyyy-mm-dd',
        minView: "month",
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    }).on('changeDate', function(e){
        setByTime();
    });;
}
//设置echart图的值
function setByTime(){
    var startPickTime = $("#startPickTime").val();
    var endPickTime = $("#endPickTime").val();
    if(startPickTime&&endPickTime){
        var date1 = new Date(startPickTime.replace(/-/,"/"));
        var date2 = new Date(endPickTime.replace(/-/,"/"));
        var date3 = date2.getTime() - date1.getTime();
        var days=Math.floor(date3/(24*3600*1000))
        if(days>30){
            Toast.error("时间范围请控制在30天以内！");
        }else if(days<0){
            Toast.error("开始时间大于结束时间！");
        }else{
            $("#top_start_time").val(startPickTime);
            $("#top_end_time").val(endPickTime);
            $("#active_type").val("dateTime");
            toptable.ajax.reload();
            var data = {
                xTime: ['0000-00-00'],
                cnt_arrive: [0],
                cnt_send: [0],
                cnt_pick: [0]
            }
            $.ajax({
                async:false,
                data:{"startPickTime":startPickTime,"endPickTime":endPickTime,"totalDays":days},
                url:"${base}/platform/operate/monitor/pickAndRecived/chartDataTime",
                success:function(result){
                    if(result&&result!=null&&result!=""){
                        data = result;
                    }
                }

            });
            createLineChart(data);
        }

    }

}

//导出订单详情数据
function exportData(){
    $("#searchForm").attr("action","${base}/platform/operate/monitor/pickAndRecived/exportData");
    $("#searchForm").submit();
}

function exportTopData(){
    $("#top5").attr("action","${base}/platform/operate/monitor/pickAndRecived/exportTopData");
    $("#top5").submit();
}

//导出到件/签收详情
function exportSendData(){
    $("#sendAndPickForm").attr("action","${base}/platform/operate/monitor/pickAndRecived/exportSendData");
    $("#sendAndPickForm").submit();
}
//导出揽件详情
function exportPickData(){
    $("#sendAndPickForm").attr("action","${base}/platform/operate/monitor/pickAndRecived/exportPickData");
    $("#sendAndPickForm").submit();
}