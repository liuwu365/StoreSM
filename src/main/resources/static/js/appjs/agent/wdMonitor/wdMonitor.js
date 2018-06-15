var datatable;
var sendtable;
var picktable;
$(document).ready(function() {
    initDatatable();
    initDatetimepicker();
});

function reSearch(){
    //清空查询条件
    $('#searchForm')[0].reset();
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
            "url": "${base}/platform/operate/monitor/wdPickAndRecived/data",
            "type": "post",
            "data": function (d) {
                d.startCreateTime = $("#startCreateTime").val();
                d.endCreateTime = $("#endCreateTime").val();
                d.province_id = $("#province_id").val();
                d.city_id = $("#city_id").val();
                d.county_id = $("#county_id").val();
                d.agent_name = $("#agent_name").val();
                d.cmn_code = $("#cmn_code").val();
            }
        },
        "columns": [
            {"data": "agent_name", "bSortable": false},
            {"data": "cmn_code", "bSortable": false},
            {"data": "branch_name", "bSortable": false},
            {"data": "cnt_arrive",
                "render": function (data, type, full, meta) {
                    return "<a href='javascript:void(0)' onclick='showArriveOrSendDetail("+full.agent_id+",&quot;arrive&quot;)'><span style='color:blue'>"+data+"</span></a>";
                },"bSortable": false},
            {"data": "cnt_send",
                "render": function (data, type, full, meta) {
                    return "<a href='javascript:void(0)' onclick='showArriveOrSendDetail("+full.agent_id+",&quot;send&quot;)'><span style='color:blue'>"+data+"</span></a>";
                },"bSortable": false},
            {"data": "cnt_pick",
                "render": function (data, type, full, meta) {
                    return "<a href='javascript:void(0)' onclick='showPickDetail("+full.agent_id+")'><span style='color:blue'>"+data+"</span></a>";
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
            "url": "${base}/platform/operate/monitor/wdPickAndRecived/sendData",
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
            "url": "${base}/platform/operate/monitor/wdPickAndRecived/pickData",
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

//导出数据
function exportData(){
    $("#searchForm").attr("action","${base}/platform/operate/monitor/wdPickAndRecived/exportData");
    $("#searchForm").submit();
}
