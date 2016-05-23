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
                <iframe id="main-frame" class="tab-content-frame" src="${path}/view/fst-page.html"></iframe>
            </div>
        </div>
    </div>
</div>
<div id="root-mask"></div>
<iframe src="" frameborder="0" width="0" height="0 "id="upframe" name="upframe" class="hidePlus"></iframe>
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

<script>
    top.path='${path}';
    //取得后端数据menus
    console.log(${menus});
</script>

<script src="${path}/dist/js/base.js"></script>
<script src="${path}/dist/js/index.js"></script>
</html>