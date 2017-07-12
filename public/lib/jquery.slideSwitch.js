(function($){
    $.fn.extend({
        slideSwitch: function(options, closeCallback, openCallback){
            var setting = $.extend({}, $.slideSwitchDefault, options);
            var $this = $(this);
            var bar = $(setting.bar, $this);
            var target = $(setting.target, $this);
            var direction = setting.direction;
            var evt = setting.trigger;
            var switch_start = setting.switch_start;
            var switch_end = setting.switch_end;
            var switch_time = setting.switch_time;
            var closeCallback = closeCallback || $.noop;
            var openCallback = openCallback || $.noop;


            var init = function(){
                bindEvent(bar, evt);
            }
            var bindEvent = function(obj, evt){
                obj.on(evt, function(){
                    if(switch_end <= switch_start){
                        alert('不能执行');
                        return false;
                    }
                    if(direction == 'left' || direction == 'right'){
                        switchHorizontal();
                    }
                    if(direction == 'up' || direction == 'down'){
                        switchVertical();
                    }

                })
            }
            var switchHorizontal = function(){
                if(target.width() == switch_start){
                    target.animate({width: switch_end}, switch_time, function(){ openCallback() });
                }else{
                    target.animate({width: switch_start}, switch_time, function(){ closeCallback() });
                }
            }
            var switchVertical = function(){
                if(target.height() == switch_start){
                    target.animate({height: switch_end}, switch_time, function(){ openCallback() });
                }else{
                    target.animate({height: switch_start}, switch_time, function(){ closeCallback() });
                }
            }

            init();
        }
    });
    $.extend({
        slideSwitchDefault: {
            trigger: 'click',
            bar: '.bar',
            target: '.target',
            direction: 'left', // left | right | up | down
            switch_start: 0,
            switch_end: 0,
            switch_time: 200
        }
    })
})(jQuery)