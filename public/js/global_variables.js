/* 定义验证手机号的正则 */
var checkMobile = /^1[3|4|5|7|8]\d{9}$/;
/* 验证电话号方法 */
var checkTelephone = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|((1[3-9]\d{9})$)/;
/* 定义验证密码的正则 */
var checkPassword = /^[A-Za-z0-9]{6,15}$/;

/* 寄件付款方式 Enum */
var sendPayEnum = {
    0: '寄付现结',
    1: '到付',
    2: '寄付账期'
};

// 任务类型中文提示
var taskTypeCnMap = {
    'TAKE': '取件',
    'SEND_STATION': '派送区站',
    'TAKE_STATION': '取货区站',
    'SEND': '派件'
};

// 任务状态中文提示(以文字为key值)
var taskStatusCnMap = {
    'unAllot': '未分配',
    'allot': '待执行', // '已分配',
    'execute': '执行中',
    'finish': '完成',
    'cancle': '已取消'
};


//任务状态Id
var taskStatusIdCnMap = {
    '0': '未分配',
    '1': '待执行', // '已分配',
    '2': '执行中',
    '3': '完成',
    '-1': '已取消'
};

// 物流人员状态
var persionStatusMap = {
    '0': '正常',
    '-1': '停权'
};

/**
 * 车状态
 * @type {Object}
 */
var carStatusMap = {
    '0': '停权',
    '1': '正常'
}

/**
 * 货车在线状态
 * @type {Object}
 */
var carOnlineStatusMap = {
    '0': '正常',
    '1': '脱机'
}

// 物流人员类别
var persionPartTimeMap = {
    0: '全职',
    1: '兼职',
    2: '全职计件'
};

// 物流人员载具
var persionVehicleMap = {
    2: '两轮',
    3: '三轮',
    4: '四轮'
};


// 任务类型 字体颜色
var colorStatus = {
    'unAllot': '',
    'allot': 'color-yellow',
    'execute': 'color-blue-dark',
    'finish': 'color-aqua',
    'cancle': ''
};

//任务状态颜色(以id来判断)
var colorStatusById = {
    '0': '',
    '1': 'color-yellow',
    '2': 'color-blue-dark',
    '3': 'color-aqua',
    '-1': ''
};


// 任务类型 背景颜色
var colorBgStatus = {
    '1': 'bg-yellow',
    '2': 'bg-aqua',
    '3': 'bg-blue',
    '4': 'bg-green',
    '5': 'bg-green',
    '-1': 'bg-gray',
    '-2': 'bg-gray'
};

var goodsStatusColor = {
    DEFAULT: 'color-gray',
    TAKED: 'color-green',
    STOCKOUT: 'color-red',
    REFUSE: 'color-red'
};

var goodsStatusCn = {
    'DEFAULT': '未处理',
    TAKED: '取货完成',
    STOCKOUT: '取货失败',
    REFUSE: '拒收'
};

var gpsStatusMap = {
    NORMAL: '',
    CLOSE: 'GPS已被关闭',
    STOP: 'GPS服务停止',
    ERROR: 'GPS发生错误'
};


/* zTree */
var IDMark_Switch = "_switch",
    IDMark_Icon = "_ico",
    IDMark_Span = "_span",
    IDMark_Input = "_input",
    IDMark_Check = "_check",
    IDMark_Edit = "_edit",
    IDMark_Remove = "_remove",
    IDMark_Ul = "_ul",
    IDMark_A = "_a";

//订单类型 1--及时达 2--当日达 3--异地 4--次晨达 5--次日达 6--隔日达 默认-1
var orderTypeMsg  = {
    '1':'及时达',
    '2':'当天达',
    //'3':'异地',
    '4':'次晨达',
    '5':'次日达',
    '6':'隔日达',
}

//订单类型返回值为文字的 样式对应
var orderTypeTextMsgStyle = {
    '及时达':'inTime-style',
    '当天达':'today-style',
    '异地':'allopatry-style',
    '次日达':'today-style',
    '次晨达':'today-style',
    '隔日达':'allopatry-style',
}

//订单类型颜色样式
var orderTypeMsgStyle = {
    '1':'inTime-style',
    '2':'today-style',
    '4':'today-style',
    '5':'today-style',
    '3':'allopatry-style',
    '6':'allopatry-style',
}

//接单方式 1--系统 2--后台指派 3-个人录入
//改 1--荷粉到家  3--物流揽件  4--速运APP  5--速运微信  6--速运商家  7--客服录入与批量导入
// var confirmTypeMsg = {
//     '1':'系统',
//     '2':'后台指派',
//     '3':'个人录入',
// }
var orderSourceMsg = {
    '1':'荷粉到家',
    '3':'物流揽件',
    '4':'速运APP',
    '5':'速运微信',
    '6':'速运商家',
    '7':'客服录入',
}

//订单状态 1--待付款 2--待发货 3--待收货 4--待评价 -2--已取消 默认-10
//改！！！！！！！！！！
//YIXIADAN(1,"已下单","","10,20"),
// YIJIEDAN(2,"已接单","","30"),
// QUJIANZHONG(3,"取件中","","40"),
// YIQUJIAN(4,"已取件","","50"),
// ZHONGZHUANZHAN(5,"中转站","","51,52"),
// DAIFAHUO(6,"待发货","","53"),
// PAISONGZHONG(7,"派送中","","60"),
// DAIPINGJIA(8,"待评价","","70"),
// YIWANCHENG(9,"已完成","",""),
// YIQUXIAO(-2,"已取消","","80,81");

var orderStatusMsg = {
    '1':'已下单',
    '2':'已接单',
    '3':'取件中',
    '4':'已取件',
    '5':'中转站',
    '6':'待发货',
    '7':'派送中',
    '8':'待评价',
    '9':'已完成',
    '-2':'已取消',
    '-3':'已拒收',
}


/*var orderStatusMsg = {
    '1':'待付款',
    '2':'待发货',
    '3':'待收货',
    '4':'待评价',
    '-2':'已取消',
}*/

//以文字对应样式
var orderStatusTextMsgStyle = {
    '已下单':'yixiadan',
    '已接单':'yijiedan',
    '取件中':'qujianzhong',
    '已取件':'yiqujian',
    '中转站':'zhongzhuanzhan',
    '待发货':'daifahuo',
    '派送中':'paisongzhong',
    '待评价':'daipingjia',
    '已完成':'yiwancheng',
    '已取消':'yiquxiao',
    '已拒收':'yijushou',
}


var orderStatusMsgStyle = {
    '1':'yixiadan',
    '2':'yijiedan',
    '3':'qujianzhong',
    '4':'yiqujian',
    '5':'zhongzhuanzhan',
    '6':'daifahuo',
    '7':'paisongzhong',
    '8':'daipingjia',
    '9':'yiwancheng',
    '-2':'yiquxiao',
    '-3':'yijushou',
}
/*var orderStatusTextMsgStyle = {
    '待付款':'obligation-style',
    '待发货':'unprocessed-style',
    '待收货':'ready-receive-style',
    '待评价':'ready-assess-style',
    '已取消':'cancled-style',
}*/

//订单详情页以id对应样式
var orderDetailsStatusMsgStyle = {
    '1':'details-yixiadan-style',
    '2':'details-yijiedan-style',
    '3':'details-qujianzhong-style',
    '4':'details-yiqujian-style',
    '5':'details-zhongzhuanzhan-style',
    '6':'details-daifahuo-style',
    '7':'details-paisongzhong-style',
    '8':'details-daipingjia-style',
    '9':'details-yiwancheng-style',
    '-2':'details-yiquxiao-style',
}

/*//订单详情页状态样式
var orderDetailsStatusMsgStyle = {
    '1':'details-obligation-style',
    '2':'details-unprocessed-style',
    '3':'details-ready-receive-style',
    '4':'details-ready-assess-style',
    '-2':'details-cancled-style',
}*/



/*//以订单状态id对应的样式
var orderStatusMsgStyle = {
    '1':'obligation-style',
    '2':'unprocessed-style',
    '3':'ready-receive-style',
    '4':'ready-assess-style',
    '-2':'cancled-style',
}*/

//商户类型 1-线上微商 2-线下实体 3-快递公司 4-散户
var merchantTypeMSg = {
    '1':'线上微商',
    '2':'线下实体',
    '3':'快递公司',
    '4':'散户',
}


