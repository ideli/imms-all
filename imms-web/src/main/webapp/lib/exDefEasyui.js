//基于easyui的扩展
module.exports={
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
    },
    layoutInit:function (autoToggle){
        $('.accordion-header').click(function(){
            $('.panel-body li').removeClass('current-sec-item');
            $('.accordion-header').removeClass('accordion-header-selected');
            $(this).addClass('accordion-header-selected');
        });
        $('.accordion-collapse').click(function(){
            $('.accordion-header').removeClass('accordion-header-selected');
            $(this.parentNode.parentNode).addClass('accordion-header-selected');
        });
        var toggleTag=$('#toggle-tag');
        var treeMenu=$('#tree-menu');
        var content=$('#content')

        //content.width(window.width-185);
        $('body').css('visibility','visible');
        var collapsed=false;
        var doToggle=function(){
            if(collapsed){
                treeMenu.width(170).find('.accordion').fadeIn();
                //content.width(window.width-185);
                toggleTag.html('◄')
            }else{
                treeMenu.find('.accordion').hide(),treeMenu.width(1);
                // content.width(window.width-16);
                toggleTag.html('▶')
            }
            collapsed=!collapsed;
        };
        toggleTag.click(doToggle);
        typeof autoToggle=='number'&&setTimeout(doToggle,autoToggle);
    }

};