
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


var molDatas=[
    {
        name:'首页',
        id:'fst-page',
        direct:'fst-page.html',
        items:null
    },
    {
        name:'信息管理',
        id:'info-mng',
        items:[
            {name:'实施项目管理',id:'',direct:'info-mng/info-mng-ssxmgl.html',items:null},
            {name:'存储过程管理',id:'',direct:null,items:[
                {name:'项目存储过程',id:'',direct:'info-mng-xmcc.html'},
                {name:'工作存储过程',id:'',direct:'info-mng-gzcc.html'}
            ]},
            {name:'系统版本管理',id:'',direct:'info-mng-xtbb.html',items:null},
            {name:'系统参数管理',id:'',direct:'info-mng-xtcs.html',items:null},
            {name:'模块语句管理',id:'',direct:'info-mng-mkyj.html',items:null},
            {name:'问题共享管理',id:'',direct:'info-mng-wtgx.html',items:null}
        ]
    },
    {
        name:'项目监控',
        id:'prj-watch',
        items:[
            {name:'数据实时统计',id:'prj-watch-sjsstj',direct:'prj-watch-sjsstj.html',items:null},
            {name:'数据实时监控',id:'prj-watch-sjssjk',direct:'prj-watch-sjssjk.html',items:null},
            {name:'应用服务监控',id:'prj-watch-yyfwjk',direct:'prj-watch-yyfwjk.html',items:null}
        ]
    },
    {
        name:'用户反馈',
        id:'feed-back',
        items:[
            {name:'用户反馈管理',id:'feed-back-mng',direct:'feed-back-mng.html',items:null},
            {name:'培训情况维护',id:'feed-back-pxqkwh',direct:'feed-back-pxqkwh.html',items:null},
            {name:'案例情况维护',id:'feed-back-alqkwh',direct:'feed-back-alqkwh.html',items:null}
        ]
    },
    {
        name:'统计报表',
        id:'reports',
        items:[
            {name:'系统使用情况统计',id:'',direct:'reports-sys-use.html',items:null}
        ]
    },
    {
        name:'管理维护',
        id:'sys',
        items:[
            {name:'登录用户管理',id:'',direct:'sys-dlyhgl.html',items:null},
            {name:'系统角色管理',id:'',direct:'sys-xtjsgl.html',items:null},
            {name:'系统模块管理',id:'',direct:'sys-xtmkgl.html',items:null},
            {name:'统计报表管理',id:'',direct:'sys-tjbbgl.html',items:null},
            {name:'统计报表维护',id:'',direct:'sys-tjbbwh.html',items:null},
            {name:'字典控件',id:'',direct:'sys-dict.html',items:null}
        ]
    }

];


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


//生成导航条
$template(rootNav,molDatas);


//注册导航条事件
$('.nav a').click(function(){
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

    //alert(molId)
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

    window.currentMolId=molId;
    molItems=molDatas.where(/data => data.id==currentMolId/)[0].items;

    //消除切换闪动
    $('#main').addClass('hidden');
    byid('main-frame').onload=function(){
        $('#main').removeClass('hidden');
    }

    //生成左侧功能菜单,并利用左侧菜单默认点击,自动将src载入iframe
    if(molItems){
        $('#tree-menu').treemenu(molItems,function(src){
            //setTimeout(function(){
            byid('main-frame').src=path+'/view/'+src;
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
        $('#tree-menu').empty().hide();
        byid('main-frame').src=path+'/view/'+src;
    }

    //更新当前模块名称
    rootTabs.tabs('update',{
        tab:molTab,
        options:{
            title:'当前模块:'+molName
            //content: '<iframe class="mol-content" src="{0}" frameborder="0"></iframe>'.format(src)
        }
    }).tabs('select',0);


});

//注销
$('#login-out').on('click',function () {
    
});

