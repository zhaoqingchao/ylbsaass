function Register(){
    //能否进行保存
    this.canNext = 0;
    //手机号
    this.phoneVal = '';
    //密码
    this.pwdVal ='';

}

//手机号的验证
Register.prototype.verification = function(){
    var $this = this;
    var phoneReg = /^1[3-9]\d{9}$/;
    this.companyName = $('#companyName').val().replace(/\s/g,'');
    this.phoneVal = $('#userName').val().replace(/\s/g,'');
    this.pwdVal = $('#pwd').val().replace(/\s/g,'');
    var pwdVal1 = $('#pwd1').val().replace(/\s/g,'');
    var pwdValLength = $('#pwd').val().length;
    if(this.companyName == ''){
        layer.alert('公司名称不能为空', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(!phoneReg.test($this.phoneVal)) {
        layer.alert('请输入正确的手机号', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(pwdValLength<6){
        layer.alert('密码最少为6位', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if($this.pwdVal != pwdVal1){
        layer.alert('请输入相同的密码', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else{
        this.canNext = 1;
    }
    if(this.canNext){
        $this.register();
    }
} 
//注册入口
Register.prototype.register = function(){
    var $this = this;
    var companyName = $('#companyName').val();
    var url = '/register' ;
    var params = {
        _token:$("#tt").val(),
        companyname:companyName,
        usermobile:$this.phoneVal,
        userpassword : $this.pwdVal

    };
    $.post(url,params,function(msg){
        console.log(msg);
        if(msg && msg == 'exist'){
            layer.alert('手机号已存在，请登录', {
                icon: 6,
                layer: 'layer-ext-moon'
            },function(){
                location.href = 'login.html';
            });
        }else if(msg == 'success'){
            layer.alert('注册成功，请登录', {
                icon: 6,
                layer: 'layer-ext-moon'
            },function(){
                location.href = 'login.html';
            });
        } 
    });

}

var  $Register = new Register();