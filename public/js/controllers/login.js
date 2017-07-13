function  UserLogin(){
    //能否进行保存
    this.canNext = 0;
    //手机号
    this.usermobile = '';
    //密码
    this.userpassword ='';
    //密码是否可视
    this.cansee = 1;
    //是否记住我
    this.isRemind = 1;
}

//初始化方法
UserLogin.prototype.init = function(){
    var height = window.screen.height-64;
    $('#container').css("height",height+'px');

}
//更换手机和密码图标
UserLogin.prototype.replaceIcon = function(){

    var usermobileval = $('#usermobile').val().replace(/\s/,'');
    var userpasswordval = $('#userpassword').val().replace(/\s/,'');
    if(usermobileval !=''){
        $('.userName img').attr('src','/images/usermobile-set.png');
    }else{
        $('.userName img').attr('src','/images/usermobile.png');
    }
    if(userpasswordval !=''){
        $('.pwd-icon').attr('src','/images/password-set.png');
    }else{
        $('.pwd-icon').attr('src','/images/password.png');
    }
}
//密码是否可视
UserLogin.prototype.canSeePassword = function(){
    if(this.cansee){
        $('#userpassword').hide();
        $('#userpassword1').show();
        $('#userpassword1').val($('#userpassword').val());
        $('.pwd-see').attr('src','/images/cansee-set.png');
        this.cansee = 0;
    }else{
        $('#userpassword1').hide();
        $('#userpassword').show();
        $('#userpassword').val($('#userpassword1').val());
        $('.pwd-see').attr('src','images/cansee.png');
        this.cansee = 1;
    }
}
//记住我的点击
UserLogin.prototype.remindMe = function(dom){
    if(this.isRemind){
        $(dom).find('img').attr('src',"/images/remind-set.png");
        this.isRemind = 0;
        localStorage.setItem('usermobile',$('#usermobile').val());
        localStorage.setItem('userpassword',$('#userpassword').val());
    }else{
        $(dom).find('img').attr('src',"/images/remind.png");
        this.isRemind = 1;
        localStorage.removeItem('usermobile');
        localStorage.removeItem('userpassword');
    }
}
//注册新账号跳转
UserLogin.prototype.toRegister = function(dom){
    location.href = 'register.html';
}
//手机号的验证
UserLogin.prototype.verification = function(){
    var $this = this;
    var phoneReg = /^1[3|5|7|8|9]\d{9}$/;
    this.usermobile = $('#usermobile').val().replace(/\s/g,'');
    this.userpassword = $('#userpassword').val().replace(/\s/g,'');
    var pwdValLength = $('#userpassword').val().length;
    if(this.phoneVal == ''){
        layer.alert('手机号不能为空', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(!phoneReg.test($this.usermobile)) {
        layer.alert('请输入正确的手机号', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(this.userpassword == ''){
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
    this.canNext = 0;
    var $this = this;
    var url = './userlogin' ;
    console.log($('#token').val());
    console.log($this.usermobile);
    console.log($this.userpassword);
    var params = {
        _token:$('#token').val(),
        usermobile:$this.usermobile,
        userpassword : $this.userpassword
    }
    $.post(
        url, params,function(msg){
        console.log(msg);
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
                location.href = 'userloginhtml';
            });
        }
    });
    jQuery.ajax({
        url: url,
        type: 'post',
        data: params,
        dataType: "json",
        // async:false,
        success: function(msg){
            console.log(msg);
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
                    location.href = 'userloginhtml';
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
