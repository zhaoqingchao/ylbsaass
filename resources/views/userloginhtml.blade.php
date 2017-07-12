<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/css/core.css">
    <link rel="stylesheet" href="/css/login.css">
    <style>


    </style>
</head>
<body>
<div class="logo">
    <img src="/images/logo.png" alt="">
</div>
<form name="login" id="login"  >
    {{ csrf_field() }}
    <div class="userName">
        <input id="userName" name="runnername" type="text" placeholder="请输入手机号" required="required" autofocus="autofocus"/>
    </div>
    <div class="userPwd">
        <input id="pwd"name="pwd" type="password" placeholder="请输入密码"/>
    </div>
    <div class="lost-pwd">
        <div class="lose-pwd">忘记密码</div>
        <div class="register"><a href="registerhtml" >注册账号</a></div>
    </div>
    <div class="set-login">
        <input type="button" value="登录" onclick="$UserLogin.verification()">
    </div>

</form>
</body>
<script type="text/javascript" src="/js/global_functions.js"></script>

<script type="text/javascript" src="/js/plugins/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/lib/layer/layer.js"></script>
<script src="/js/controllers/login.js"></script>
<script>

</script>
</html>