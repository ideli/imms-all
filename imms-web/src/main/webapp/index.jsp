<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false"%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Index For New IMMS</title>
    <link rel="stylesheet" href="${path}/dist/css/base.css">
    <link rel="stylesheet" href="${path}/dist/css/index.css">
</head>
<body>
<header>
    <canvas id="bubbleCanvas" width="320" height="150"></canvas>
    <h1 id="head-txt">刑技实施管理平台</h1>
    <nav class="nav-wrap">

        <ul id="root-nav" class="nav" tpsource="#nav-tp"></ul>
        <div class="arr-l-wrap"><p class="arr-l"></p></div>
        <div class="arr-r-wrap"><p class="arr-r"></p></div>
    </nav>
</header>

<div id="root-main"></div>
<div id="root-tabs"  style="height:720px;width:100%;">
    <div title="当前模块:首页" no-data-options="iconCls:'icon-reload',closable:false">
        <div id="main">
            <div id="tree-menu"></div>
            <div id="content">
                <iframe id="main-frame" class="tab-content-frame" src="view/fst-page.html"></iframe>
            </div>
        </div>
    </div>
</div>
<div id="root-mask"></div>
<iframe src="" frameborder="0" width="0" height="0 "id="upframe" name="upframe" class="hidePlus"></iframe>
</body>
<script src="${path}/dist/js/base.js"></script>

<script type="text/template" id="tree-menu-tp">
    <li class="grade-1" sec-count="{items.length}">
        <a title="{name}" direct="{direct}">{name}</a>
        <ul class="hide{items.length}">
            {{items:#<li class="grade-2"><a class="nav-link" title="{name}" direct="{direct}">{name}</a></li>#}}
        </ul>
        <b  class="hide{items.length}"></b>
    </li>
</script>

<script type="text/template" id="nav-tp">
    <li class="nav-first">
        <a href="javascript:;" mol-id="{id}" mol-direct="{direct}">{name}</a>
        <div class="nav-seconds hide{items.length}">
            {{items:#nav-sec-tp}}
        </div>
    </li>
</script>

<script type="text/template" id="nav-sec-tp">
    <div class="nav-second-wrap  no-items{items.length}">
        <a class="nav-second-item" href="javascript:;" mol-id="{id}" mol-direct="{direct}">{name}</a><b class="hide{items.length}">▶</b>
        <div class="nav-third-wrap hide{items.length}">{{items:#<a class="nav-third-item" href="javascript:;" mol-id="{id}" mol-direct="{direct}">{name}</a>#}}</div>
    </div>
</script>

<script>
    top.path='view/';
    //取得后端数据menus
    alert('${menus}');
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
                {name:'实施项目管理',id:'',direct:'info-mng-ssxm.html',items:null},
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
                {name:'统计报表维护',id:'',direct:'sys-tjbbwh.html',items:null}
            ]
        }

    ];


    window.extending({
        rootTabs:$('#root-tabs'),
        rootNav:$('#root-nav'),
        rootTreemenu:$('#tree-menu').hide(),
        registry:(function(){
            var obj={};
            for(var i=0;i<molDatas.length;i++){
                obj.extending(molDatas[i].id,{});
            }
            return obj;
        })()
    });

    //启动选项卡
    rootTabs.height(window.height-130).tabs({'scrollIncrement':320});

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
        for(var i=molDatas.length-1;i>-1;i--){
            if(molDatas[i].id==molId){
                molItems=molDatas[i].items;//log(molData);log(molDatas);
                break;
            }
        }

        //消除切换闪动
        $('#main').addClass('hidden');
        byid('main-frame').onload=function(){
            $('#main').removeClass('hidden');
        }

        //生成左侧功能菜单,并利用左侧菜单默认点击,自动将src载入iframe
        if(molItems){
            $('#tree-menu').treemenu(molItems,function(src){
                //setTimeout(function(){
                byid('main-frame').src=path+src;
                //},5);
            }).show();
            var clicked=false;
            //与导航条联动
            rootTreemenu.find('li').each(function(){
                if(!clicked && top._currentItem_ && top._currentItem_.html()==$(this).children('a',0).html()) {
                    this.click();
                    clicked=true;
                }
            });
            if(!clicked){
                rootTreemenu.find('li').eq(0).click();
            }
        }
        //无功能就隐藏菜单,载入src
        else{
            $('#tree-menu').empty().hide();
            byid('main-frame').src=path+src;
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






</script>
</html>