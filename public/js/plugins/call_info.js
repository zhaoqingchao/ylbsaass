/**
 * 生成请求url
 *
 */
/**
 *
 * @param serviceName
 * @param methodName
 * @constructor
 */
var CallInfo = function(serviceName, methodName, dataUrl) {
    this.methodName = methodName;
    this.queueName = serviceName;
    this.dataUrl = dataUrl == null ? property.ajaxHostMap[property.CURRENT_ENV] : dataUrl;
    this.dataObj = {};
}

/**
 * 设置需要发送给服务的参数
 * @param name  参数名
 * @param value 参数值
 */
CallInfo.prototype.setData = function(name, value) {
    this.dataObj[name] = value;
}

/**
 * 清空数据
 */
CallInfo.prototype.cleanData = function() {
    this.dataObj = {};
}

/**
 *
 * 发送数据
 *
 * @param success   请求成功后callback function;
 * @param error 请求失败callback function;
 */
CallInfo.prototype.sendData = function(success, error) {
    // console.log('==>',postList);
    // console.log('==>',this.queueName, this.methodName, this.dataObj);
    var isPost = this.isPost();

    if(isPost){
        this.post(success, error);
    }else{
        this.jsonp(success, error);
    }

    // var url = this.generateUrl();
    // jQuery.ajax({
    //     url: url,
    //     dataType: "jsonp",
    //     // async:false,
    //     jsonp: "jsonpcallback",
    //     success: function(msg){
    //         var result = {};
    //         if(msg && msg.data){
    //             result = msg.data;
    //             //console.log("jsonp返回的数据",result);就是各js文件调用服务时生成的东西
    //         }
    //         success(result);
    //     },
    //     error: function(err) {
    //         //alert( JSON.stringify(err) );
    //         success({})
    //     }

    // });
}
//http://hostaddress/hw/invokejsonp?queue=servieceName&param=uri(方法名+数据)
// CallInfo.prototype.generateUrl = function() {
//     var param = encodeURIComponent('{"methodName":"'+this.methodName+'","data":'+JSON.stringify(this.dataObj)+'}');
//     var host = property.CURRENT_ENV;

//     return property.httpMode + property.ajaxHostMap[host] + property.jsonp + "?queue=" + this.queueName + "&param=" + param;
// }


/**
 * 发送 jsonp 请求
 * @param  {function} success 请求发送成功后回调函数
 * @param  {function} error   请求发送失败后回调函数
 *
 */
CallInfo.prototype.jsonp = function(success, error) {
    // //console.log('jsonp 提交');
    var url = this.generateUrl();
    jQuery.ajax({
        url: url,
        dataType: "jsonp",
        // async:false,
        jsonp: "jsonpcallback",
        success: function(msg){
            var result = {};
            if(msg && msg.data){
                result = msg.data;
            }
            success(result);
        },
        error: function(err) {
            //alert( JSON.stringify(err) );
        }

    });
};

/**
 * 构造 jsonp 请求地址
 * @return {String} "http://xxx.xxx.xxx/yyyy?a=111&b=222"
 */
CallInfo.prototype.generateUrl = function() {
    var param = encodeURIComponent('{"methodName":"'+this.methodName+'","data":'+JSON.stringify(this.dataObj)+'}');
    var host = property.CURRENT_ENV;

    return "http://" + this.dataUrl +'/hw/invokejsonp' + "?queue=" + this.queueName + "&param=" + param;
};

/**
 * 发送 post 请求
 * @param  {function} success 请求发送成功后回调函数
 * @param  {function} error   请求发送失败后回调函数
 *
 */
CallInfo.prototype.post = function(success, error) {
    // //console.log('post 提交');
    var url = this.generatePostUrl();
    var params = this.generatePostData();
    jQuery.ajax({
        url: url,
        type: 'POST',
        data: params,
        dataType: "json",
        success: function(msg){
            // //console.log(msg);
            var result = {};
            if(msg && msg.data){
                result = msg.data;
            }
            success(result);
        },
        error: function(err) {
            //alert( JSON.stringify(err) );
            // //console.log(err);
        }

    });
};

/**
 * 构造 post 请求地址
 * @return {String} "http://xxx.xxx.xxx/yyyy"
 */
CallInfo.prototype.generatePostUrl = function() {
    var host = property.CURRENT_ENV;
    return property.httpMode + property.ajaxHostMap[host] + property.json;
};

/**
 * 构造 post 参数数据
 * @return {Object} {a:'',b:''}
 */
CallInfo.prototype.generatePostData = function() {
    return {
        queue: this.queueName,
        method: this.methodName,
        data: JSON.stringify(this.dataObj)
    };
};

/**
 * 判断是否发送 post 请求
 * @return {Boolean}
 */
CallInfo.prototype.isPost = function() {
    var str = this.queueName+':'+this.methodName;
    return (postList||[]).indexOf(str) > -1;
};
