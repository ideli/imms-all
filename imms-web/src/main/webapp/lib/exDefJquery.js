//基于jquery的拓展
module.exports={
        //清除linkbutton点击后的虚线
        noOutline:function(selector){ 
            jQuery(selector||'a').on('focus',function(){this.blur();});
            },
        //吐司消息
        toast:function(str){
                var holding;
                var callback;
                var itv;
                str=String(str);
                var bol= str.length>15;
                var len= bol ? str.length : 15;
                if(typeof arguments[1]=='number'){
                    holding=arguments[1];
                }else if(typeof arguments[1]=='function'){
                    callback=arguments[1];
                }
                // 根据文字长度增加延时, 限制最高秒数
                holding= holding || 1600+(len-15)*30;
                var p=jQuery('<div><p>str</p></div>'.replace('str',str));
                var fadeOut=function(){
                    jQuery('.the-mask').remove();
                    p.animate({'opacity':0},500,function(){callback && callback(p);p.remove();});
                };
                jQuery('.toast').hide();
                jQuery('body').click(fadeOut);
                // 预制样式 
                return  p.addClass('toast').appendTo('body')
                        //透明度 文字居中居左判断
                        .css({'text-align':bol?'left':'center'})
                        // 移入暂停 
                        .bind('mouseenter',function(){clearTimeout(itv);})
                        .bind('mouseleave',function(){itv=setTimeout(fadeOut,200);})
                        // 增加icon
                        .extend({
                        ok:function(){return p.addClass('ok');},
                        err:function(){return p.addClass('err');}
                        })        		
                        // 显示
                        .fadeIn(function(){
                            itv=setTimeout(fadeOut,holding||960);
                        });
            },
        //tab控件
        tabsInit:function (selector){
                $(selector||document.body).find('.tabs-list').find('li').on('click', function(event) {
                    var tabsList = this.parentNode//$('.tabs-list');
                    var tabsWrap = tabsList.parentNode;//$('.tabs-wrap');
                    tabsList.find('.current').removeClass('current');
                    tabsWrap.find('.tabs-content').hide();
                    $(this).addClass('current');
                    $(this.getAttribute('direct')).show();
                }); 
            }
    };
            