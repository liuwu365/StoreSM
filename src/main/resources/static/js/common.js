/**
 * 项目公用
 */
var _CommonJS = {
    /**
     * 特殊字符过滤[把特殊字符踢掉]
     * @param {Object} s
     */
    checkCharFilter: function (s) {
        //var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+%]")
        var pattern = new RegExp("[`~!@#$^*()=|{}:;,\\[\\]<>/?~！@#￥……*（）——|{}【】‘；：”“。，、？+%]");
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    },
    /**
     * 把英文单词的首字母大写
     */
    replaceFirstUper: function (str) {
        if (str.length <= 0 || str == "") {
            return;
        }
        str = str.toLowerCase();
        return str.replace(/\b(\w)|\s(\w)/g, function (m) {
            return m.toUpperCase();
        });
    },
    /**
     * 转换成数组，去掉重复，再组合好。
     * 需 jquery支持
     */
    removeRepeat: function (str) {
        var strArr = str.split(",");
        strArr.sort(); //排序
        var result = $.unique(strArr);
        return result;
    },
    /**
     * 如果字符串是null返回空字符,否则返回空str
     */
    checkNull: function (str) {
        if (str == null) {
            return "";
        } else {
            return str;
        }
    },
    /**
     * 验证手机号
     */
    checkMobile: function (str) {
        var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        }
        return true;
    },
    /**
     * 验证输入内容是否为数字
     */
    isDigit: function (value) {
        var patrn = /^[0-9]*$/;
        if (!patrn.test(value) || value == "" || value == null || value == "null") {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 验证输入内容是否为大于等于0的正整数,允许为小数
     */
    isNumber: function (value) {
        return /^\d+(\.\d+)?$/.test(value + "");
    },
    /**
     * 验证输入内容是否为大于等于0的正整数
     */
    isPositiveNumber: function (value) {
        return /^[0-9]+$/.test(value + "");
    },
    /**
     * 验证输入内容是否为双精度
     */
    isDouble: function (value) {
        if (value.length != 0) {
            var reg = /^[-\+]?\d+(\.\d+)?$/;
            if (reg.test(value)) {
                return true;
            } else {
                return false;
            }
        }
    },
    /**
     * 验证是否为经度  经度范围：-180.0000~180.0000;
     */
    isLng: function (value) {
        var reg = /^(((\d|[1-9]\d|1[1-7]\d|0)\.\d{0,10})|(\d|[1-9]\d|1[1-7]\d|0{1,3})|180\.0{0,10}|180)$/;
        ;
        return reg.test(value);
    },
    /**
     * 验证是否为纬度  纬度范围：-90.0000~90.0000
     */
    isLat: function (value) {
        var reg = /^([0-8]?\d{1}\.\d{0,10}|90\.0{0,10}|[0-8]?\d{1}|90)$/;
        return reg.test(value);
    },
    /**
     * 验证网址
     */
    checkUrl: function (str) {
        if (str == null || str == "") {
            return false;
        } else {
            var RegUrl = new RegExp();
            RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
            if (!RegUrl.test(str)) {
                return false;
            }
        }
        return true;
    },
    /**
     * 验证邮箱
     */
    checkEmail: function (str) {
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!myreg.test(str)) {
            return false;
        }
        return true;
    },
    /**
     * 验证账号，英文字母、数字、下划线组合 //6-20位字符
     * @param str
     */
    checkAccount: function (str) {
        if (str == null || str == "") {
            return false;
        } else {
            var regEx = /\w{6,20}/; // /\w{4,16}/
            if (!regEx.test(str)) {
                return false;
            }
        }
        return true;
    },

    /**
     * 比较时间大小
     * 0:data1>data2
     * 1:data1<data2
     * 2:data1=data2
     */
    dateCompare: function (data1, data2) {
        var d1 = new Date(data1.replace(/\-/g, '/'));
        var d2 = new Date(data2.replace(/\-/g, '/'));
        if (d1 > d2) {
            return 0;
        } else if (d1 < d2) {
            return 1;
        } else if (d1 - d2 == 0) {
            return 2;
        }
    },
    /**
     * 获取当前时间,格式[2015-08-18 12:00:00]
     */
    currentTime: function () {
        var d = new Date();
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + d.getHours() + ':' + d.getMinutes() + ":" + d.getSeconds();
    },
    /**
     * 提取字符串中的所有数字
     */
    getNum: function (text) {
        var spaceInputStr = text.replace(/\s+/g, ""); //先去掉空格
        var filterStr = spaceInputStr.replace(/[^0-9]/ig, " ");  //提取数字,并以空格分割
        var value = filterStr.replace(/\s+/g, ' '); //剔除多余的空格[多个空格转为1个空格]
        return value;
    },
    /**
     * 分割标题得到标签,小于1个字符的将被过滤掉
     */
    splitStrTolabel: function (str) {
        if (str == null || str == "") {
            return "";
        } else {
            var spaceStr = str.replace(/\s+/g, ' '); //剔除多余的空格[多个空格转为1个空格]
            var arrayStr = spaceStr.split(" ");
            var newStr = "";
            for (var i = 0; i < arrayStr.length; i++) {
                if (arrayStr[i].length < 2) {
                    continue;
                }
                newStr.append(arrayStr[i])
            }
            return newStr;
        }
    }

};