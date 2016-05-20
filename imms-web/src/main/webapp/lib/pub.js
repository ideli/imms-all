//左侧折叠菜单
window.$.fn.treemenu=function(){
    function expandMenu(){
        //console.info(ul)
        var ul=$(this);
        if(ul.data('showed')==1){
            ul.slideUp().data('showed',0).parent().removeClass('expanded');
        }else{
            ul.slideDown().data('showed',1).parent().addClass('expanded');
        }
    }
    function selectItem(selectHandle) {
        var li=$(this);
        event.stopPropagation();
        var src,navlink,ul,secCount=li.attr('sec-count');

        //所有项移除,自身加上selected
        li.parents('.tree-menu-accordion').find('li').removeClass('selected');
        li.addClass('selected').parents('li').addClass('selected');

        //一级,设置二级selected,自动打开二级内部a
        if(li.hasClass('grade-1')){
            ul=li.children('ul').eq(0);
            expandMenu.call(ul);
            li.children('ul>li',0).addClass('selected')
            navlink=li.children('a').eq(0);//TODO 有可能是传进来指定项
        }
        //二级,设置一级selected,打开自己内部a
        else{
            ul=li.parent();
            (ul.data('showed')!=1) && expandMenu.call(ul);
            ul.parent().addClass('selected');
            navlink=li.children('a').eq(0);
        }

        src=navlink.attr('direct');
        selectHandle=selectHandle||function(){info('将载入: '+src);}
        log(src)
        src && selectHandle(src,this);
    }

    var doToggle=function(){
        var $this=$(this);
        var treeMenu=$this.parent();
        var collapsed=treeMenu.data('collapsed');
        if(collapsed){
            treeMenu.width(170).find('.tree-menu-accordion').fadeIn();
            $this.html('◄')
        }else{
            treeMenu.find('.tree-menu-accordion').hide(),treeMenu.width(1);
            $this.html('▶')
        }
        treeMenu.data('collapsed',!collapsed);
    };

    return function(data,selectHandle){
        //$this=$(this);
        //var defaultHTML='<ul class="tree-menu-accordion"></ul><p id="toggle-tag">◄</p>';
        //var template='<li class="grade-1" sec-count="{secItems.length}"><a title="{name}" direct="{direct}">{name}</a><ul class="hide{secItems.length}">{{secItems:#<li class="grade-2"><a class="nav-link" title="{name}" direct="{direct}">项目存储过程</a></li>#}}</ul><b  class="hide{secItems.length}"></b></li>'
        //$this.addClass('tree-menu-accordion').html($compile(template,data));

        var ul=$('<ul class="tree-menu-accordion" tpsource="#tree-menu-tp"></ul>');
        $template(ul,data);
        return $(this).empty().append($('<p class="toggle-tag">◄</p>').click(doToggle)).append(ul).find('li').click(function(){selectItem.call(this,selectHandle);}).end();
    }
}();

//jQuery from 序列化扩展 将jquery系列化后的值转为name:value的形式。
//$("#form2").serializeObject() => {id:"007",age:"24""}
window.$.fn.serializeObject=function(){
    var convertArray=function (arr) {
        var i=arr.length, obj = {};
        while (i--){
            if(typeof obj[arr[i].name]=='undefined')
                obj[arr[i].name] = arr[i].value;
            else
                obj[arr[i].name] += ','+arr[i].value;
        }
        return obj;
    };
    return function(){
        return convertArray(this.serializeArray());
    };
}();



module.exports={
    //----------------基于jquery的拓展------------------
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
    },
    //--------------基于easyui的扩展----------------
    // 弹窗
    $open:function showWin(str,params,isAjax,cb){
        //简写小,中,大 3种尺寸
        if(params=='s' || params=='S'){
            params={width:520,height:360};
        }else if(params=='m' || params=='M'){
            params={width:720,height:540};
        }else if(params=='l' || params=='L'){
            params={width:1020,height:720};
        }
        //默认不可缩小拉伸,模态显示,允许滚动条,空白标题
        ('maximizable' in params) || (params.maximizable=false);
        ('minimizable' in params) || (params.minimizable=false);
        ('collapsible' in params) || (params.collapsible=false);
        ('resizable' in params) || (params.resizable=false);
        ('scroll' in params) || (params.scroll=true);
        ('modal' in params) || (params.modal=true);
        ('title' in params) || (params.title=' ');

        //先分辨是已有元素还是自动生成后ajax加载html或iframe的元素,随后启动,并返回句柄
        var ele;
        if(str.indexOf('#')==0 ){
            ele=$(str);
            return ele.window(params).css('visibility','visible').show();
        }else if(isAjax){
            ele=$('<div class="easy-win-wrap">').css('overflow',params.scroll ? 'auto':'hidden');
            return ele.window(params).load(str,cb);
        }else{
            var id=''+Date.format('MMDDhhmmssS');
            top._mol_wins=top._mol_wins||{};
            ele=$('<div class="easy-win-wrap overhide" win-id="{1}"><iframe scrolling="{0}" win-id="{1}"></iframe></div>'.format(params.scroll ? 'auto':'no',id));
            return (top._mol_wins[id]=ele.window(params).find('iframe').attr('src',str).end());
        }
    },
    // 单确定框
    $alert:function(param){
        var title='提示',icon='info',cb=function(){},msg;
        if(typeof param!='object'){
            msg=param;
            cb=arguments[1]||cb;
        }else{
            title=param.title||title;
            icon=param.icon||icon;
            cb=param.callback||cb;
            msg=param.msg;
        }
        jQuery.messager.alert(title,msg,icon,cb);
        jQuery('.messager-window, .messager-window+.window-shadow').css('top',function(i,v){return parseInt(v)-10;});
        noOutline();
    },
    // 二选一确认框
    $confirm:function(param){
        var title='提示',cb=function(){},msg;
        if(typeof param!='object'){
            msg=param;
            cb=arguments[1]||cb;
        }else{
            title=param.title||title;
            cb=param.callback||cb;
            msg=param.msg;
        }
        jQuery.messager.confirm(title,msg,cb);
        jQuery('.messager-window, .messager-window+.window-shadow').css('top',function(i,v){return parseInt(v)-10;});
        noOutline();
    },
    // 自动关闭提示框
    $show:function(str){
        jQuery.messager.show({
            title:'提示',
            msg:str,
            showType:'fade',
            timeout:1500,
            showSpeed:500,
            width:220,
            height:120,
            style:{
                right:'50%',
                top:'50%',
                margin:'-60px -110px 0  0 '
            }
        });
        noOutline();
    },
    $close:function(isTag){
        if(isTag){
            //关闭整个当前标签页
            var rootTabs=top.rootTabs||top.$('#root-tabs');
            var tab = rootTabs.tabs('getSelected');
            if (tab){
                var index = rootTabs.tabs('getTabIndex', tab);
                index!==0 && rootTabs.tabs('close', index);
            }
        }else{
            //关闭包含本iframe的模态窗
            var ifr=window.iframe;
            if(ifr){
                var win=top._mol_wins[ifr.getAttribute('win-id')];
                win && win.window('close');
            }
        }
        //        //var win=ifr.parentNode.parentNode;
        //        //win.parentNode.removeChild(win);
        //
        //        //var win=parent.$(ifr.parentNode.parentNode);
        //        //win.find('.panel-tool-close').click();

    },
    $append:function(src,label,iconCls,closable){
        var rootTabs=top.rootTabs||top.$('#root-tabs');
        var addTab=function(){
            rootTabs.tabs('add',{
                title: label,//'Tab'+index,
                content:'<iframe class="mol-content" src="{0}" frameborder="0"></iframe>'.format(src),
                iconCls:iconCls||null,//'icon-reload',
                closable: closable!==false
            });
        };
        if(rootTabs.tabs('tabs').length>(parseInt(localStorage.maxtabs)||6)){
            top.$confirm('页签窗口过多!<br>将自动关闭一个页签, 再打开新窗口。<br>是否继续?',function(res){
                if(res) {
                    rootTabs.tabs('close', 1);
                    addTab();
                }
            });
        }else{
            addTab();
        }
    }
    // ,
    // layoutInit:function (autoToggle){
    //     $('.accordion-header').click(function(){
    //         $('.panel-body li').removeClass('current-sec-item');
    //         $('.accordion-header').removeClass('accordion-header-selected');
    //         $(this).addClass('accordion-header-selected');
    //     });
    //     $('.accordion-collapse').click(function(){
    //         $('.accordion-header').removeClass('accordion-header-selected');
    //         $(this.parentNode.parentNode).addClass('accordion-header-selected');
    //     });
    //     var toggleTag=$('.toggle-tag');
    //     var treeMenu=$('#tree-menu');
    //     var content=$('#content')
    //
    //     //content.width(window.width-185);
    //     $('body').css('visibility','visible');
    //     var collapsed=false;
    //     var doToggle=function(){
    //         if(collapsed){
    //             treeMenu.width(170).find('.accordion').fadeIn();
    //             //content.width(window.width-185);
    //             toggleTag.html('◄')
    //         }else{
    //             treeMenu.find('.accordion').hide(),treeMenu.width(1);
    //             // content.width(window.width-16);
    //             toggleTag.html('▶')
    //         }
    //         collapsed=!collapsed;
    //     };
    //     toggleTag.click(doToggle);
    //     typeof autoToggle=='number'&&setTimeout(doToggle,autoToggle);
    // }
};