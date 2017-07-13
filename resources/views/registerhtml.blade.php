<!DOCTYPE html>
<html lang="en">
<head>


    <title>登录</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/css/core.css">
    <link rel="stylesheet" href="/css/register.css">
    <style>

    </style>
</head>
<body>
<div class="app-header">
    <div class="app-header-left-icon l" onclick="$Register.noRegister()">
    <img src="/images/goback.png" alt="">
    </div>
    <div class="app-header-text">
        <span>注册</span>
    </div>
</div>
<div id="container">
    <div class="logo">
        <img src="/images/logo.png" alt="">
    </div>
    <div  id="login" >
        <input id="token" value="{{csrf_token()}}"  type="hidden">
        <div class="userCom">
            <img src="/images/app-company.png" alt="">
            <input id="usercompany" type="text" placeholder="请输入公司名称"  value="" onkeyup="$Register.replaceIcon()"/>
        </div>
        <div class="userName">
            <img src="/images/usermobile.png" alt="">
            <input id="usermobile" type="text" placeholder="请输入手机号" maxlength="11" value="" onkeyup="$Register.replaceIcon()"/>
        </div>
        <div class="userVer">
            <img class="code-icon" src="/images/ver.png" alt="">
            <input id="code" type="password" placeholder="请输入验证码" minlength="6" value="" onkeyup="$Register.replaceIcon()"/>
            <button id="getCode" onclick="$Register.showModal()">获取验证码</button>
        </div>
        <div class="userPwd">
            <img class="pwd-icon" src="/images/password.png" alt="">
            <input id="userpassword" type="password" placeholder="请输入密码" minlength="6" value="" onkeyup="$Register.replaceIcon()"/>
            <input id="userpassword1" style="display: none" type="text" placeholder="请输入密码" minlength="6"/>
            <img class="pwd-see" src="/images/cansee.png" alt="" onclick="$Register.canSeePassword(1)">
        </div>
        <div class="userPwd1">
            <img class="pwd-icon1" src="/images/password.png" alt="">
            <input id="userpasswordonce" type="password" placeholder="请再次输入密码" minlength="6" value="" onkeyup="$Register.replaceIcon()"/>
            <input id="userpasswordonce1" style="display: none" type="text" placeholder="请再次输入密码" minlength="6"/>
            <img class="pwd-see1" src="/images/cansee.png" alt="" onclick="$Register.canSeePassword(2)">
        </div>
        <div class="set-register">
            <input type="button" value="注册" onclick="$Register.verification()">
        </div>

    </div>
    <div class="modal">
        <div class="modal-content">
            <div class="modal-title">
                <span>条形验证码验证</span>
            </div>
            <div class="code-content">

            </div>
            <div class="input-code">
                <input type="text" maxlength="4"placeholder="请输入条形验证码">
            </div>
            <div class="modal-btn">
                <button class="cancel" onclick="$Register.codeCancel()">取消</button>
                <button class="sure" onclick="$Register.codeOk()">确定</button>
            </div>
            <div class="x"  onclick="$Register.codeCancel()">
                X
            </div>
        </div>

    </div>
</div>

</body>
<script type="text/javascript" src="/js/global_functions.js"></script>

<script type="text/javascript" src="/js/plugins/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="/lib/layer/layer.js"></script>
<script src="/js/controllers/register.js"></script>
<script>
    $Register.init();
</script>
</html>