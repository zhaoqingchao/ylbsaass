/*
 * 全局方法，函数库
 */


/**
 * 避免重复提交友情提示
 */
var submitBtn = function ( ele, time ) {//ele:this , time:延迟时间（s）选填默认2s
    var submitDom = $(ele);
    var subimtClick = submitDom.attr("onclick");
    var tt = time ? time*1000 : 2000;
    submitDom.attr("onclick", 'layer.msg("您请求的太频繁了！")');
    setTimeout(function () {
        submitDom.attr("onclick", subimtClick);
    }, tt);
};


/**
 * 获取url参数
 */
var getUrlParams = function(){
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            var s = strs[i].split("=");
            theRequest[s[0]] = decodeURI(s[1]);
        }
    }
    return theRequest;
};

/**
 * 当前页面
 * @return {Object}
 * {projectName:'',page:''}
 */
var currentPage = function() {
    var url = window.location.pathname || '';
    var pageArr = url.split('/') || [];
    var result = {};
    if(pageArr.length >= 2){
        result['projectName'] = pageArr[pageArr.length - 2] || '';
        result['page'] = pageArr[pageArr.length - 1] || '';
    }
    return result;
};

var showLoading = function(){
    layer && layer.load(2, {shade: 0.1});
};

var hideLoading = function(){
    setTimeout(function() {
        layer && layer.closeAll();
    }, 700);
};

/**
 *
 ******************************* js 数组方法扩展 *************************************
 *
 */

/**
 * 取得数组最小值
 * @param array
 * @returns
 */
var arrayMin = function(array) {
    return array.sort(function(a, b) {
        return a - b;
    })[0];
};

/**
 * 取得数组最大值
 * @param array
 * @returns
 */
var arrayMax = function(array) {
    return array.sort(function(a, b) {
        return b - a;
    })[0];
};

/**
 * 根据给定的值 删除数组的某项
 * @param array
 * @param item 给定的值
 * @return 删除某项后的数组
 */
var arrayRemoveItem = function(array, item) {
    var i = array.indexOf(item);
    if (i >= 0) {
        array.splice(i, 1);
    }
    return array;
};

/**
 * 添加数组项目，如果已存在则不在添加
 */
var arrayAddItem = function(array, item) {
    var i = array.indexOf(item);
    if (i < 0) {
        array.push(item);
    }
    return array;
};

/**
 * 通过key获取数组的项目 数组例如[{},{}]
 * @param array 所查询的数组
 * @param key 某个key值，通过此字段获取数组项目
 * @param val 与key所对应的值
 */
var arrayGetItemByKey = function(array, key, val) {
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (item[key] == val) {
            return item;
        }
    };
};

/**
 * 通过key删除商品
 * @param array
 * @param key
 * @param val
 * @private
 */
var arrayDeleteItemByKey = function(array, key, val) {
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (item[key] == val) {
            array.splice(i, 1);
        }
    };
};

/**
 * 数组排序
 * @param  {Array} array 需要排序的数组
 * @param  {String} attr  排序的字段
 * @param  {String} sort  排序方式 'asc'|'desc'
 * @return {Array}       排序后的字段
 * @example
 * arraySort([{id:1,sort:100},{id:2,sort:99}],'sort','desc')
 */
var arraySort = function(array, attr, sort) {
    return array.sort(function(a, b) {
        switch (sort) {
            case 'asc':
                return a[attr] - b[attr];
                break;
            case 'desc':
                return b[attr] - a[attr];
                break;
            default:
                return a[attr] - b[attr];
        }
    });
};

/****************** 数学 **********************/
/**
 * 获取 n m 之间的随机数， n < m
 * @param min 小数
 * @param max 大数
 */
var getRandomNum = function(n, m) {
    var min = parseFloat(n);
    var max = parseFloat(m);
    var Range = max - min;
    var Rand = Math.random();
    return parseFloat((min + Rand * Range).toFixed(1));
}

/**
 * 获取随机 n 个字符
 * @param n 返回结果的个数
 */
var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var generateMixed = function(n) {
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }
    /****************** 数学 **********************/
    /****************** Object  **********************/

/**
 * 获取hash的所有key
 * @param hash
 */
var hashGetKeys = function(hash) {
    var _list = [];
    for (var key in hash) {
        _list.push(key);
    };
    return _list;
};

/**
 * 判断该对象是否是为空   非空返回：true    空返回：false
 * @param {} obj
 * @return {Boolean}
 */
var existObj = function(obj) {
    if (typeof obj === "object" && !(obj instanceof Array)) {
        var hasProp = false;
        for (var key in obj) {
            hasProp = true;
            break;
        }
        if (hasProp) {
            obj = [obj];
        } else {
            //            throw "model.rows is empty object";
            hasProp = false;
        }
        return hasProp
    } else return false;
};

/**
 * 克隆一个已有的对象
 * @param {Object} myObj
 * @return {Object}
 */
var cloneObj = function(myObj) {
    if (typeof(myObj) != 'object') return myObj;
    if (myObj == null) return myObj;
    var myNewObj = new Object();
    for (var i in myObj) {
        myNewObj[i] = this.cloneObj(myObj[i]);
    }
    return myNewObj;
};

/**
 * 扩展合并 Object 对象
 * @param {Object} targetObj 需要扩展的对象
 * @example
 *   var user = {name: '小明'};
 *   var newUser = extendsObject({}, user, {age:20}, {tall:180,weight:80}, ...);
 */
var extendsObject = function(targetObj) {
    if (targetObj.constructor != Object) {
        return {};
    }
    for (var i = 1; i < arguments.length; i++) {
        if (arguments[i].constructor == Object) {
            for (k in arguments[i]) {
                targetObj[k] = arguments[i][k];
            }
        }
    };
    return targetObj;
};

/**********浮点数的加减乘除开始**********/
/**
 * accAdd 加法, accSub 减法, accMul 乘法, accDiv 除法
 * @param {} arg1
 * @param {} arg2
 * @param {Number} scale    保留几位小数
 * @return {}
 */
var accAdd = function(arg1, arg2, scale) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    var result = (arg1 * m + arg2 * m) / m;
    return scale ? result.toFixed(scale) : result;
};

var accSub = function(arg1, arg2, scale) {
    return accAdd(arg1, -arg2, scale);
};

var accMul = function(arg1, arg2, scale) {
    if (arg1 == 0) return 0;
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {}
    try {
        m += s2.split(".")[1].length;
    } catch (e) {}
    var result = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    return scale ? result.toFixed(scale) : result;
};

var accDiv = function(arg1, arg2, scale) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}
    with(Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        var result = (r1 / r2) * pow(10, t2 - t1);
        return scale ? result.toFixed(scale) : result;
    }
};
/**********浮点数的加减乘除结束**********/

/********************** 时间剩余 ************************/

var timeDiff = function(timeStart, timeEnd) {
    var diff = timeEnd - timeStart; // 时间差的毫秒值
    return timeDiffCounter(diff);
};
/**
 * 时间差
 * @param diff 时间差的毫秒值
 * @param opts 选项，显示哪些信息
 * 默认 {noSeconds:false,noMinuts:false,noHours:false}
 * 如果不需要显示秒，则需要 opts => {noSeconds:true}
 */
var timeDiffCounter = function(diff, opts) {
    var setting = opts || {};
    var diff = Math.max(diff, 0);
    if(diff <= 0){
        return '0秒';
    }

    //计算出相差天数
    var days = Math.floor(diff / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = diff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    var result = '';
    if(!setting.noSeconds){
        result = seconds + '秒';
    }

    if (minutes) {
        result = minutes + '分' + result;
    }
    if (hours) {
        result = hours + '小时' + result;
    }
    if (days) {
        result = days + '天' + result;
    }
    return result;
};


/**
 * 将日期转换为微秒 YYYY-MM-DD hh:mm:ss => 微秒
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
var parseDateToMillisecond = function (date) {
    return new Date((date).replace(new RegExp("-","gm"),"/")).getTime()
}


/*
 * 全局方法，函数库
 */
/************************ js 两点经纬度的距离计算 ************************************/
var EARTH_RADIUS = 6378137.0; //单位M
var PI = Math.PI;
var getRad = function(d) {
    return d * PI / 180.0;
};

/**
 * 计算圆形地球两点的距离
 * caculate the great circle distance
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
var getGreatCircleDistance = function(lat1, lng1, lat2, lng2) {
    var radLat1 = getRad(lat1);
    var radLat2 = getRad(lat2);
    var a = radLat1 - radLat2;
    var b = getRad(lng1) - getRad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;
    return s || 0;
};

/**
 * 计算椭圆地球的两点距离
 * approx distance between two points on earth ellipsoid
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
var getFlatternDistance = function(lat1, lng1, lat2, lng2) {
    var f = getRad((lat1 + lat2) / 2);
    var g = getRad((lat1 - lat2) / 2);
    var l = getRad((lng1 - lng2) / 2);

    var sf = Math.sin(f);
    var sg = Math.sin(g);
    var sl = Math.sin(l);

    var s, c, w, r, d, h1, h2;
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;
    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;
    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;
    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg)) || 0;
};


/**
 * 计算两条线段是否相交
 * @param  {Object} a 线段1的点a {x:115.6666,y:38.7777}
 * @param  {Object} b 线段1的点b
 * @param  {Object} c 线段2的点c
 * @param  {Object} d 线段2的点d
 * @return {Boolean}  true|false
 */
var segmentsIntr = function(a, b, c, d) {

    // 三角形abc 面积的2倍
    var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);

    // 三角形abd 面积的2倍
    var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
    if (area_abc * area_abd >= 0) {
        return false;
    }

    // 三角形cda 面积的2倍
    var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
    // 三角形cdb 面积的2倍
    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
    var area_cdb = area_cda + area_abc - area_abd;
    if (area_cda * area_cdb >= 0) {
        return false;
    }

    // 其他情况返回true，即两条线段相交
    return true;

    //计算交点坐标
    // var t = area_cda / ( area_abd- area_abc );
    // var dx= t*(b.x - a.x),
    //     dy= t*(b.y - a.y);
    // return { x: a.x + dx , y: a.y + dy };

};

/**
 * 计算一个点是否在多边形里
 * @param {Object} pt 标注点 {lat:38.6666, lng:115.88888}
 * @param {Object} poly 多边形数组[{lat:38.6666, lng:115.88888}, ...]
 */
var isInsidePolygon = function(pt, poly) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].lat <= pt.lat && pt.lat < poly[j].lat) || (poly[j].lat <= pt.lat && pt.lat < poly[i].lat)) && (pt.lng < (poly[j].lng - poly[i].lng) * (pt.lat - poly[i].lat) / (poly[j].lat - poly[i].lat) + poly[i].lng) && (c = !c);
    return c;
};

/*弧度转角度*/
var toDegrees = function(brng) {
    return 180/Math.PI * brng;
};


/**
 * 坐标转角度
 * @param  {[type]} lat1 [description]
 * @param  {[type]} lng1 [description]
 * @param  {[type]} lat2 [description]
 * @param  {[type]} lng2 [description]
 * @return {[type]}      [description]
 */
var angleFromCoordinate = function(lat1,lng1,lat2,lng2) {
    var lngDistance = lng2 -lng1;

    var y = Math.sin(lngDistance) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lngDistance);

    var brng = Math.atan2(y,x);

    brng = toDegrees(brng);
    brng = (brng + 360 ) % 360;
    brng = 360 -brng ; // count degrees counter-clockwise - remove to make clockwise

    return brng;
}


var directionJudge = function (brng) {
    var brng = Math.abs(brng);
    if(brng == 0 || brng == 360) {
        return '正北';
    }else if(brng && brng < 90) {
        return '东北';
    }else if(brng == 90) {
        return '正东';
    }else if(brng > 90 && brng < 180) {
        return '东南';
    }else if(brng == 180) {
        return '正南';
    }else if(brng > 180 && brng < 270) {
        return '西南';
    }else if(brng == 270) {
        return '正西';
    }else if(brng >270 && brng < 360) {
        return '西北';
    }
}

/**
 * 计算指南针方向
 * @param  {[type]} lng1 [description]{lng1,lat1}为起点
 * @param  {[type]} lat1 [description]{lng2,lat2}为终点
 * @param  {[type]} lng2 [description]
 * @param  {[type]} lat2 [description]
 * @return {[type]}      [description]
 */
var compassDirection = function(lng1,lat1,lng2,lat2) {
    if(lng1  == lng2 && lat1 > lat2 ) {
        return '正南'
    }
    if(lng1  == lng2 && lat1 < lat2 ) {
        return '正北';
    }
    if( lng1 > lng2 && lat1 == lat2 ) {
        return '正东';
    }
    if( lng1 < lng2 && lat1 == lat2) {
        return '正西';
    }
    if(lng1 > lng2 && lat1 > lat2) {
        return '东南';
    }
    if(lng1 > lng2 && lat1 < lat2) {
        return '东北';
    }
    if(lng1 < lng2 && lat1 > lat2) {
        return '西南';
    }
    if(lng1 < lng2 && lat1 < lat2) {
        return '西北';
    }

    return '没动';
}

