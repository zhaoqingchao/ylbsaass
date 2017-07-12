<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
     <title>Title</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

    <link rel="stylesheet" href="/css/core.css">
    <link rel="stylesheet" href="/css/register.css">
    <style>


    </style>
</head>
<body>
<div class="logo">
    <img src="/images/logo.png" alt="">
</div>
<form name="login" id="login"  >
     
    <div class="companyName">
        <input id="companyname" type="text" placeholder="请输入公司名称"   required="required" autofocus="autofocus"/>
    </div>
    <div class="userName">
        <input id="usermobile" type="text" placeholder="请输入手机号"   required="required"/>
        <input id="token" value="{{csrf_token()}}"  type="hidden">
    </div>
    <div class="userPwd">
        <input id="userpassword" type="password" placeholder="请输入密码"    required="required"/>
    </div>
    <div class="userPwd">
        <input id="userpassword2" type="password" placeholder="请再次输入密码"   required="required"/>
    </div>
    <div class="set-login">
        <input type="button" value="注册" onclick="$Register.verification();">
    </div>

</form>
</body>
<script type="text/javascript" src="/js/global_functions.js"></script>
<script type="text/javascript" src="/js/jquery.js"></script>
 <script type="text/javascript" src="/lib/layer/layer.js"></script>
<script type="text/javascript" src="/js/controllers/register.js"></script>
</html>