
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>果壳-壳亮生活，透视记忆；每一张照片，都是一段珍贵的回忆</title>
        <meta name="keywords" content="透视后边记忆；每一张照片，都是一段珍贵的回忆" />
        <meta name="description" content="透视后边记忆；每一张照片，都是一段珍贵的回忆" />
        <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
        <link rel="stylesheet" type="text/css" href="/css/aui.2.0.css" />
        <link rel="stylesheet" type="text/css" href="/css/index.css" />
        <script type="text/javascript" src="/js/jquery.js"></script>
        <script type="text/javascript" src="/js/jquery.min.js"></script>
    </head>
 
    <body class="bimg">
    
    @yield('header')
           <!--  @if(Session::has('message'))
              <p class="alert">{{ Session::get('message') }}</p>
            @endif -->
        <section class="aui-content aui-text-center banner" >
            <h1 style="color:#fff; ">果壳</h1>
            <h3 class="aui-margin-t-15" style="color:#fff">果壳不仅会生活，他还是营销专家</h3>
            <p class="aui-margin-t-15 download" id="showloginfrom">
                <a href="#" class="aui-btn aui-btn-info" >登录/注册  <small></small></a>
                <!-- <a href="#" target="_blank" class="aui-btn aui-btn-outlined">文档教程 <small>2.0</small></a> -->
            </p>
            <p class="aui-margin-t-10 updatetime"></p>
        </section>
        <section class="aui-content aui-border-b aui-info">
            <!-- <div class="aui-row"> -->
                <div class="aui-info-item">
                    <span>我们的果壳AR</span>
                    <span>适用于：<a href="#" target="_blank"><img src="/images/logo.jpg" />任何场景</a></span>
                </div>
                <div class="aui-info-item aui-text-right">
                    <span>IOS</span>
                    <span>ANDROID&nbsp;<strong id="github-stars"></strong></span>
                     
                </div>
            <!-- </div> -->
        </section>
        <section class="aui-content introduce">
            <div class="aui-row-padded aui-text-center">
                <div class="aui-col-xs-3">
                     <img src="/images/gk01.jpg" style="width:200px;border-radius: 10px" />
                    <h3 class="aui-margin-t-15 aui-margin-b-15">企业宣传</h3>
                    <p>使用容器+布局+模块的架构方式，JS组件辅助，更自由灵活，更易扩展使用；flex弹性布局更灵活。</p>
                </div>
                <div class="aui-col-xs-3">
                    <img src="/images/gk02.jpg" style="width:200px;border-radius: 10px"/>
                    <h3 class="aui-margin-t-15 aui-margin-b-15">团体活动</h3>
                    <p>遵循Google Material设计规范，标准严谨的语法，更细致的处理，让APICloud开发像素级应用，完美适配各个机型。</p>
                </div>
                <div class="aui-col-xs-3">
                    <img src="/images/gk03.jpg" style="width:200px;border-radius: 10px"/>
                    <h3 class="aui-margin-t-15 aui-margin-b-15">个人PARTY</h3>
                    <p>几十K的核心CSS文件，移动设备优先，面向 HTML5 开发，使用 CSS3 来做动画交互，平滑、高效，更适合移动设备。</p>
                </div>
                <div class="aui-col-xs-3">
                    <img src="/images/gk04.jpg" style="width:200px;border-radius: 10px"/>
                    <h3 class="aui-margin-t-15 aui-margin-b-15">影视影楼</h3>
                    <p>AUI使用MIT协议，用户可以自由使用、复制、修改、合并、出版发行、散布、再授权及贩售 AUI 及其副本。</p>
                </div>
            </div>
        </section>
        <section class="aui-content module">
            <div class="aui-row-padded">
                <div class="aui-col-xs-7">
                    <h2 style="color:#fff">全新的AR体验，颠覆以往</h2>
                    <p class="aui-margin-t-15" style="color:#fff">AUI2.0的重新架构充分站在项目开发的角度上，以解决布局样式为重点，组件模块化为辅助进行全面优化调整，可以说2.0版本的AUI更合适项目的开发。我们从细节入手，让AUI做出来的APP达到像素及应用的标准，遵循Google Material设计规范，让行里行间的代码发挥她的极致效果。</p>
                   
                </div>
                <div class="aui-col-xs-5 aui-text-center">
                    <div class="mobile-frame">
                        <img src="/images/01.gif" style="width:300px;border-radius: 10px">
                         
                    </div>
                </div>
            </div>
        </section>
        <footer class="aui-content footer">
            <div class="aui-row">
                <div class="aui-col-xs-6">
                    AUI 跨平台移动前端框架
                    <span class="aui-margin-l-15">www.auicss.com</span>
                </div>
                <div class="aui-col-xs-6 aui-text-right">
                    <a href="#" target="_blank">2.0文档</a>
                    <a href="#" target="_blank">1.x文档</a>
                    <a href="#" target="_blank">APICloud</a>
                    <a href="#" target="_blank">GitHub</a>
                    <a href="#" target="_blank">社区问答</a>
                </div>
            </div>
        </footer>
    </body>
 <script type="text/javascript">
     $("#showloginfrom").click(function(){
        $('#userlogin').slideDown();
     })
     //
     $("#closeloginfrom").click(function(){
        $('#userlogin').slideUp();
     })
 </script>
</html>