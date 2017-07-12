function WriteReport(){
    this.num = 1 ;
    //工作计划是新增还是编辑;
    this.workPlanIsAdd = 1;
    //工作计划点击li的下标;
    this.workPlanIndex = 0;

    //工作记录是新增还是编辑;
    this.workLogIsAdd = 1;
    //工作记录点击li的下标;
    this.workLogIndex = 0;

    //工作总结是新增还是编辑;
    this.workAllIsAdd = 1;
    //工作总结点击li的下标;
    this.workAllIndex = 0;
}
//初始化方法
WriteReport.prototype.init = function(){

    $('.work-content textarea').val('');
    $('.log-content textarea').val('');
    $('.all-content textarea').val('');
    if($('.work-plan-li li').length == 0){
        $('.work-plan-li').hide();
        $('.ol-text').prev().removeClass('work-plan');
    }else{
        $('.work-plan-li').show();
        $('.ol-text').prev().addClass('work-plan');
    }
    if($('.work-log-li li').length == 0){
        $('.work-log-li').hide();
        $('.ol-text-log').prev().removeClass('work-log');
    }else{
        $('.work-log-li').show();
        $('.ol-text-log').prev().addClass('work-log');
    }
    if($('.work-all-li li').length == 0){
        $('.work-all-li').hide();
        $('.ol-text-all').prev().removeClass('work-all');
    }else{
        $('.work-all-li').show();
        $('.ol-text-all').prev().addClass('work-all');
    }
    $('.work-modal').hide();
    $('.log-modal').hide();
    $('.all-modal').hide();
    this.typeClick();
    var month = (new Date().getMonth()+1)<10?'0'+(new Date().getMonth()+1):(new Date().getMonth()+1);
    var date = new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate();
    $('.type-date').val(new Date().getFullYear()+'-'+month+'-'+date);


}

//我的汇报点击事件
WriteReport.prototype.writeReportSave = function(){
    location.href = "index.html";
}
//上传附件功能
WriteReport.prototype.drawOnCanvas = function(file) {
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
        var url = e.target.result;
    }

};
WriteReport.prototype.uploadImage = function () {
    var input = document.getElementById("fileInput");
    var result;
    $('#fileInput').change(function(){
        for(var i=0;i<this.files.length;i++){
            if (!input['value'].match(/.jpg|.gif|.png|.bmp/i)){
                return alert("上传的图片格式不正确，请重新选择")
            }
            var reader = new FileReader();
            reader.readAsDataURL(this.files[i]);

        }
        reader.onload = function(e){
            result = '<img src="'+this.result+'">';
            $('.last-img').append(result);
        }
    });
}
//类型的点击事件
WriteReport.prototype.typeClick = function () {
    $('.modal-content li').click(function(){
        $('.modal-title').html($(this).html());
    })
}
//类型选择
WriteReport.prototype.chooseType = function(){
    $(".modal").show();
}

//类型选择取消按钮
WriteReport.prototype.cancel = function(item){
    $('.modal').hide();
}
//类型选择确定按钮
WriteReport.prototype.sure = function(item){
    $('.content-detail-text span').html($('.modal-title').html());
    if($('.modal-title').html() == '周报'){
        $('.type-week').show();
        $('.type-date').hide();
        $('.type-month').hide();

    }else if($('.modal-title').html() == '日报'){
        $('.type-date').show();
        $('.type-week').hide();
        $('.type-month').hide();
    }else {
        $('.type-month').show();
        $('.type-date').hide();
        $('.type-week').hide();
    }
    $('.modal').hide();
}

//日期的选择
WriteReport.prototype.chooseDate = function(){

    var currYear = (new Date()).getFullYear();
    var opt={};
    opt.date = {preset : 'date'};
    //opt.datetime = { preset : 'datetime', minDate: new Date(2012,3,10,9,22), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.month = {preset : 'month'};
    opt.week = {preset : 'week'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        lang:'zh',
        startYear:currYear - 50, //开始年份
        endYear:currYear + 50 //结束年份
    };
    if($('.modal-title').html() == '月报'){
        opt.default.dateFormat =  'yyyy-mm';
    }else if($('.modal-title').html() == '周报'){
        opt.default.dateFormat =  'yyyy-mm-dd至yyyy-mm-dd';
    }else{
        opt.default.dateFormat =  'yyyy-mm-dd';
    }
    $("#appDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
    $("#appDateTime").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
    $("#appTime").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
    //    var optDateTime = $.extend(opt['datetime'], opt['default']);
    //    var optTime = $.extend(opt['time'], opt['default']);
    //    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
    //    $("#appTime").mobiscroll(optTime).time(optTime);

}
//工作选择
WriteReport.prototype.chooseWork = function(){
    this.workPlanIsAdd = 1;
    $(".work-modal").show();

}
//工作记录选择
WriteReport.prototype.chooseWorkLog = function(){
    this.workLogIsAdd = 1;
    $(".log-modal").show();

}
//工作总结选择
WriteReport.prototype.chooseWorkAll = function(){
    this.workAllIsAdd = 1;
    $(".all-modal").show();

}
//工作计划 li的点击事件
WriteReport.prototype.clickWorkPlanLi = function(dom){
    $(".work-modal").show();
    $('.work-content textarea').val($(dom).html());
    this.workPlanIndex = $(dom).index()+1;
    this.workPlanIsAdd = 0;
}
//工作记录 li的点击事件
WriteReport.prototype.clickWorkLogLi = function(dom){
    $(".log-modal").show();
    $('.log-content textarea').val($(dom).html());
    this.workLogIndex = $(dom).index()+1;
    this.workLogIsAdd = 0;
}
//工作总结 li的点击事件
WriteReport.prototype.clickWorkAllLi = function(dom){
    $(".all-modal").show();
    $('.all-content textarea').val($(dom).html());
    this.workAllIndex = $(dom).index()+1;
    this.workAllIsAdd = 0;
}
//工作计划删除按钮
WriteReport.prototype.workDelete= function(item){
    if(item ==0){
        if(!this.workPlanIsAdd){
            var len = $('.work-plan-li li').length;
            var textVal = $('.work-content textarea').val();
            for(var i=0;i<len;i++){
                var j= i+1;
                var html = $('.work-plan-li li:nth-child('+j+')').html();

                if(html == textVal){
                    $('.work-plan-li li:nth-child('+j+')').remove();

                    this.init();
                }
            }

        }
        $('.work-content textarea').val('');
        $('.work-modal').hide();
    }else if(item ==1){
        if(!this.workLogIsAdd){
            var textVal = $('.log-content textarea').val();
            for(var i=0;i<$('.work-log-li li').length;i++){
                var j= i+1;
                var html = $('.work-log-li li:nth-child('+j+')').html();
                console.log(html);
                if(html == textVal){
                    $('.work-log-li li:nth-child('+j+')').remove();
                    this.init();
                }
            }
        }
        $('.log-content textarea').val('');
        $('.log-modal').hide();

    }else if(item ==2){
        if(!this.workAllIsAdd){
            var len = $('.work-all-li li').length;
            var textVal = $('.all-content textarea').val();
            for(var i=0;i<len;i++){
                var j= i+1;
                var html = $('.work-all-li li:nth-child('+j+')').html();
                if(html == textVal){
                    $('.work-all-li li:nth-child('+j+')').remove();

                    this.init();
                }
            }
        }
        $('.all-content textarea').val('');
        $('.all-modal').hide();
    }



}
//工作选择取消按钮
WriteReport.prototype.workCancel = function(item){
    this.init();

}
//工作选择确定按钮
WriteReport.prototype.workSure = function(item){
    if(item ==0){
        var textVal = $('.work-content textarea').val();
        if(this.workPlanIsAdd){
            if(textVal != ''){
                var html = '<li onclick="$WriteReport.clickWorkPlanLi(this)">'+textVal+'</li>';
                $('.work-plan-li').append(html);
            }
        }else{
            if(textVal ==''){
                $('.work-plan-li li:nth-child('+this.workPlanIndex+')').remove();
            }else{
                $('.work-plan-li li:nth-child('+this.workPlanIndex+')').html(textVal);
            }
        }


    }else if(item == 1){
        var textVal = $('.log-content textarea').val();
        if(this.workLogIsAdd){
            if(textVal != ''){
                var html = '<li onclick="$WriteReport.clickWorkLogLi(this)">'+textVal+'</li>';
                $('.work-log-li').append(html);
            }
        }else{
            if(textVal ==''){
                $('.work-log-li li:nth-child('+this.workLogIndex+')').remove();
            }else{
                $('.work-log-li li:nth-child('+this.workLogIndex+')').html(textVal);
            }
        }
    }else if(item == 2){
        var textVal = $('.all-content textarea').val();
        if(this.workAllIsAdd){
            if(textVal != ''){
                var html = '<li onclick="$WriteReport.clickWorkAllLi(this)">'+textVal+'</li>';
                $('.work-all-li').append(html);
            }
        }else{
            if(textVal ==''){
                $('.work-all-li li:nth-child('+this.workAllIndex+')').remove();
            }else{
                $('.work-all-li li:nth-child('+this.workAllIndex+')').html(textVal);
            }
        }
    }
    this.init();


}

//点击项目的跳转

WriteReport.prototype.goToChooseItem = function(){
    location.href = 'choose_item.html';
}
//点击项目的跳转

WriteReport.prototype.peopleIsSee = function(){
    location.href = 'people_is_see.html';
}

var $WriteReport = new WriteReport();
