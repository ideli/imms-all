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
    <script>
    top.path='${path}';
    //取得后端数据menus
    console.log(${menus});
    window.molDatas=[
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
    {name:'模块语句管理',id:'',direct:'info-mng/info-mng-mkyj.html',items:null},
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
    </script>
</head>
<body>
<header>
    <canvas id="bubbleCanvas" width="320" height="150"></canvas>
    <h1 id="head-txt">刑技实施管理平台</h1>
    <nav class="nav-wrap">
        <ul id="root-nav" class="nav" tpsource="#nav-tp"></ul>
        <div class="nav-operation">
            <a id="username" href="javascript:void(0);">用户名</a>
            <%--TODO: 注销 login-out绑定的click事件在index.js中--%>
            <a id="login-out" href="javascript:void(0);">注销</a>
        </div>
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
                <iframe id="main-frame" class="tab-content-frame" src="${path}/view/fst-page.html"></iframe>
            </div>
        </div>
    </div>
</div>
<div id="root-mask"></div>
<iframe src="" frameborder="0" width="0" height="0 "id="upframe" name="upframe" class="hidePlus"></iframe>
<div id="edit-pwd-block" class="hide">
    <div class="btn-div">
        <a class="save-btn ui-btn">保 存</a>
        <a id="close-edit-pwd" class="close-btn ui-btn">关 闭</a>
    </div>
    <div class="edit-div">
        <%--<p>修改个人密码</p>--%>
        <span class="red">* </span><input class="common-input mt10" type="text" placeholder="原密码">
        <span class="red">* </span><input class="common-input mt10" type="text" placeholder="新密码">
        <span class="red">* </span><input class="common-input mt10" type="text" placeholder="确认新密码">
    </div>
</div>
</body>
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


<script src="${path}/dist/js/base.js"></script>
<script src="${path}/dist/js/index.js"></script>
</html>