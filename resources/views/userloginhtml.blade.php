<!DOCTYPE html>
<html lang="en">
<head>


    <title>登录</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/css/core.css">
    <link rel="stylesheet" href="/css/login.css">
    <style>

    </style>
</head>
<body>
<div class="app-header">
    <!--<div class="app-header-left-icon l">-->
        <!--<img src="/images/reportIcon.png" alt="">-->
    <!--</div>-->
    <div class="app-header-text">
        <span>账号登录</span>
    </div>
    <div class="app-header-right-icon r">
        <img src="/images/app-close.png" alt="">
    </div>
</div>
<div id="container">
    <div class="logo">
        <img src="/images/logo.png" alt="">
    </div>
    <div  id="login" >
        <input id="token" value="{{csrf_token()}}"  type="hidden">
        <div class="userName">
            <img src="/images/usermobile.png" alt="">
            <input id="usermobile" type="text" placeholder="请输入手机号" maxlength="11" value="" onkeyup="$UserLogin.replaceIcon()"/>
        </div>
        <div class="userPwd">
            <img class="pwd-icon" src="/images/password.png" alt="">
            <input id="userpassword" type="password" placeholder="请输入密码" minlength="6" value="" onkeyup="$UserLogin.replaceIcon()"/>
            <input id="userpassword1" style="display: none" type="text" placeholder="请输入密码" minlength="6"/>
            <img class="pwd-see" src="/images/cansee.png" alt="" onclick="$UserLogin.canSeePassword()">
        </div>

        <div class="set-login">
            <input type="button" value="登录" onclick="$UserLogin.verification()">
        </div>
        <div class="set-register">
            <input type="button" value="注册新用户" onclick="$UserLogin.toRegister()">
        </div>
        <div class="lost-pwd">
            <div class="remind-me" onclick="$UserLogin.remindMe(this)">
                <img src="/images/remind.png" alt="">
                <span class="remind">记住我</span>
            </div>
            <div class="lose">
                忘记密码?
            </div>
        </div>
    </div>
</div>

</body>
<script type="text/javascript" src="/js/global_functions.js"></script>

<script type="text/javascript" src="/js/plugins/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/lib/layer/layer.js"></script>
<script src="/js/controllers/login.js"></script>
<script>
    $UserLogin.init();
</script>
</html>