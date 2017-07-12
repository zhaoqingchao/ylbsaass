
var postList = [
];


var property = function() {

}

property.httpMode = 'http://'; // https://
property.jsonp = '/hw/invokejsonp';
property.json = '/hw/invoke';
property.ajaxHostMap = {
    'dev': '192.168.1.160:8088',
    'test8': '192.168.1.8:8080',
    'test6': '192.168.1.6:8080',
    'test6_out': '222.222.181.238:8585',
    'product': '222.222.181.238:8787',
};

property.CURRENT_ENV = 'test8';


var UPLOAD_HOST_LIST = {
    'product': '222.222.181.238:8787',
    'test6_out': '222.222.181.238:8585',
    'test6': '192.168.1.6:8080',
    'test8': '192.168.1.8:8080',
    'dev': '192.168.1.160:8088'
};

var UPLOAD_ENV = property.CURRENT_ENV;

var UPLOAD_IMG_ENV = property.CURRENT_ENV;

/** 导出表格 **/
var ExportHostMap = {
    'test6': 'http://192.168.1.6:8080',
    'test6_out': 'http://222.222.181.238:8585',
    'test8': 'http://192.168.1.8:8080',
    'product': 'http://222.222.181.238:8289'
};
var EXPORT_ENV = property.CURRENT_ENV;

