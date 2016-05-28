
function indexInit(animate) {
    //检测浏览器
    if(!window.chrome){
        doc.body.innerHTML='';
        toast('请使用chrome谷歌浏览器打开本系统!',9999)
    }

    //动画开场
    animate && $('.nav-wrap').addClass('animate') && setTimeout(function(){
        $('header').animate({height:360},1200,function(){
            var $this=$(this);
            setTimeout(function(){
                $this.animate({height:110},1600).animate({height:120},200);
            },1600);
        });
    },300);
}
indexInit(localParams.get('indexAnimation'));


window.extending({
    rootTabs:$('#root-tabs'),
    rootNav:$('#root-nav'),
    rootTreeMenu:$('#tree-menu').hide(),
    registry:(function(){
        var obj={};
        for(var i=0;i<molDatas.length;i++){
            obj.extending(molDatas[i].id,{});
        }
        obj.extending('global',{});
        return obj;
    })()
});


//启动选项卡
rootTabs.height(window.height-123).tabs({'scrollIncrement':320});
$(window).on('resize',function(){
    rootTabs.height(window.height-123);
});

//生成导航条
$template(rootNav,molDatas);


//注册导航条事件
$('.nav a').click(function(){
    var mainIframe=byid('main-frame');
    $('#tree-menu').hide();

    var $this=$(this);
    top._currentItem_=$this;
    var mlink=$this.parents('.nav-first').children('a').eq(0);

    $('.nav a').removeClass('current');
    $this.addClass('current');
    mlink.addClass('current');


    //var src=mlink.attr('mol-direct');
    var src=$this.attr('mol-direct');
    var molName=mlink.attr('mol-name')||mlink.html();
    var molId=mlink.attr('mol-id');
    //+(mlink.attr('mol-label')||$this.html());
    var molTab=rootTabs.tabs('getTab',0);
    var molItems;

    //for(var i=molDatas.length-1;i>-1;i--){
    //    if(molDatas[i].id==molId){
    //        molItems=molDatas[i].items;//log(molData);log(molDatas);
    //        break;
    //    }
    //}

    //molDatas.some(function(i){
    //        if(i.id==molId){
    //            molItems= i.items;
    //            return true;
    //        }
    // });
    mainIframe.setAttribute('currentMolId',molId);
    window.currentMolId=molId;
    molItems=molDatas.where(/data => data.id==currentMolId/)[0].items;

    //消除切换闪动
    $('#main').addClass('hidden');
    mainIframe.onload=function(){
        $('#main').removeClass('hidden');
        //var ctWin=mainIframe.contentWindow;
        //var oSrc=mainIframe.getAttribute('o-src');
        //if( ctWin.location.href!==oSrc){
        //    ctWin.location.href=oSrc;
        //}
    }

    //生成左侧功能菜单,并利用左侧菜单默认点击,自动将src载入iframe
    if(molItems){
        $('#tree-menu').treemenu(molItems,function(src){
            //setTimeout(function(){
            src=path+'/view/'+src;
            $('#content').css('padding-left',10);
            mainIframe.setAttribute('o-src',src);
            mainIframe.src=src;
            //},5);
        }).show();
        var clicked=false;
        //与导航条联动
        rootTreeMenu.find('li').each(function(){
            if(!clicked && top._currentItem_ && top._currentItem_.html()==$(this).children('a',0).html()) {
                this.click();
                clicked=true;
            }
        });
        if(!clicked){
            rootTreeMenu.find('li').eq(0).click();
        }
    }
    //无功能就隐藏菜单,载入src
    else{
        $('#content').css('padding-left',0);
        $('#tree-menu').empty().hide();
        mainIframe.setAttribute('o-src',path+'/view/'+src);
        mainIframe.src=path+'/view/'+src;
        //location.href.lastIndexOf('#')==location.href.length-1 ? location=location.href.slice(0,location.length-1):(location=location+'#');
    }

    //更新当前模块名称
    rootTabs.tabs('update',{
        tab:molTab,
        options:{
            title:'当前模块:'+molName
            //content: '<iframe class="mol-content" src="{0}" frameborder="0"></iframe>'.format(src)
        }
    }).tabs('select',0);

    //history.pushState({}, "index", location.href+'#');
    //history.replaceState({}, "index", location.href);
    //window.onpopstate=function(){alert();window.location='sdf'}
    //window.addEventListener("popstate", function() {
    //    var currentState = history.state;
    //});
});

//注销
$('#login-out').on('click',function () {

});

//点击用户名 修改密码
$('#username').on('click',function () {
    var editPwdWin = $open('#edit-pwd-block',{width:516,height:267,title:'&nbsp系统用户修改个人密码',closable:false});
});
$('#close-edit-pwd').on('click',function () {
    $('#edit-pwd-block').window('close');
});

