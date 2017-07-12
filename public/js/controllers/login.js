function  UserLogin(){
    //能否进行保存
    this.canNext = 0;
    //手机号
    this.phoneVal;
    //密码
    this.pwdVal;

}

//手机号的验证
UserLogin.prototype.verification = function(){
    var $this = this;
    var phoneReg = /^1[3-9]\d{9}$/;
    this.phoneVal = $('#userName').val();
    this.pwdVal = $('#pwd').val();
    var pwdValLength = $('#pwd').val().length;
    if(this.phoneVal == ''){
        layer.alert('手机号不能为空', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(!phoneReg.test($this.phoneVal)) {
        layer.alert('请输入正确的手机号', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(this.pwdVal == ''){
        layer.alert('密码不能为空', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(pwdValLength<6){
        layer.alert('密码最少为6位', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else{
        this.canNext = 1;
    }
    if(this.canNext){
        $this.userLogin();
    }
}

//登录入口
UserLogin.prototype.userLogin = function(){
    var $this = this;
    var url = '/userlogin' ;
    var params = {
        usermobile: $this.phoneVal,
        userpassword: $this.pwdVal
    }
    jQuery.ajax({
        url: url,
        type: 'get',
        data: params,
        dataType: "jsonp",
        // async:false,
        jsonp: "jsonpcallback",
        success: function(msg){
            console.log(msg.data);
            //var result = {};
            if(msg == 'success'){
                layer.alert('登录成功', {
                    icon: 6,
                    layer: 'layer-ext-moon'
                },function(){
                    location.href = 'appmainhtml';
                });
            }else{
                layer.alert('手机号或密码不正确，请重新输入', {
                    icon: 6,
                    layer: 'layer-ext-moon'
                },function(){
                    location.href = 'login.html';
                });
            }
            //if(msg && msg.data){
            //    result = msg.data;
            //
            //}
            //success(result);
        },
        error: function(err) {
            alert( JSON.stringify(err) );
        }

    });

}

var  $UserLogin = new UserLogin();
