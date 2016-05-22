<%@ page language="java" contentType="text/html; charset=utf-8" %>
<<<<<<< HEAD
<%
    String path = request.getContextPath();
%>
=======

>>>>>>> c64f7e28a5266270b5b112eaa536096c4bb974e0
<!DOCTYPE html>
<!--<%@ page language="java" contentType="text/html; charset=utf-8" %>-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Index For New IMMS</title>
    <link rel="stylesheet" href="dist/css/base.css">
    <link rel="stylesheet" href="dist/css/index.css">
</head>
<body>
<header>
    <canvas id="bubbleCanvas" width="320" height="150"></canvas>
    <nav class="nav-wrap">
        <ul id="main-ul" class="nav">
            <li class="nav-first">
                <a class="current" href="#" mol-direct="view/fst-page.html">首页</a>
            </li>
            <li class="nav-first">
                <a href="javascript:void(0);" mol-direct="view/info-mng-index.html">信息管理</a>
                <div class="nav-second">
                    <a href="#">实施项目管理</a>
                    <a href="#">存储过程管理(项目)</a>
                    <a href="#">存储过程管理(工作)</a>
                    <a href="#">系统版本管理</a>
                    <a href="#">系统参数管理</a>
                    <a href="#">模块语句管理</a>
                    <a href="#">问题共享管理</a>
                </div>
            </li>
            <li class="nav-first">
                <a href="#" mol-direct="view/project-watch-index.html">项目监控</a>
                <div class="nav-second">
                    <a href="#">数据实时统计</a>
                    <a href="#">数据实时监控</a>
                    <a href="#">应用服务监控</a>
                </div>
            </li>
            <li class="nav-first hidePlus">
                <a href="#">二三级菜单</a>
                <div class="nav-second">
                    <a href="#">工作文档</a>
                    <div class="nav-third">
                        <h5><a href="#">工作日志</a></h5>
                        <a href="#">周报</a>
                        <a href="#">工作内容</a>
                        <a href="#">工作存储</a>
                    </div>
                    <div class="nav-third">
                        <h5><a href="#">存储过程</a></h5>
                        <a href="#">项目存储</a>
                        <a href="#">工作存储</a>
                    </div>
                    <div class="nav-third">
                        <h5><a href="#">过程管理</a></h5>
                        <a href="#">项目存储过程</a>
                        <a href="#">工作存储过程</a>
                    </div>
                    <div class="nav-third">
                        <h5><a href="#">日志反馈</a></h5>
                    </div>
                </div>
            </li>
            <li class="nav-first hidePlus">
                <a href="#">导航面板</a>
                <div class="nav-second nav-pannel">
                    <div class="nav-third-wrap">
                        <div class="nav-third">
                            <h5><a href="#">工作日志</a></h5>
                            <a href="#">周报</a>
                            <a href="#">工作内容</a>
                            <a href="#">工作存储</a>
                        </div>
                    </div>
                    <div class="nav-third-wrap">
                        <div class="nav-third">
                            <h5><a href="#">存储过程</a></h5>
                            <a href="#">项目存储</a>
                            <a href="#">工作存储</a>
                        </div>
                    </div>
                    <div class="nav-third-wrap">
                        <div class="nav-third">
                            <h5><a href="#">过程管理</a></h5>
                            <a href="#">项目存储过程</a>
                            <a href="#">工作存储过程</a>
                        </div>
                    </div>
                    <div class="nav-third-wrap">
                        <div class="nav-third">
                            <h5><a href="#">日志反馈</a></h5>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-first hidePlus">
                <a href="#">导航面板2</a>
                <div class="nav-second nav-table">
                    <div class="nav-table-row">
                        <div class="nav-third">
                            <h5><a href="#">工作日志</a></h5>
                            <a href="#">周报</a>
                            <a href="#">工作内容</a>
                            <a href="#">工作存储</a>
                        </div>
                        <div class="nav-third">
                            <h5><a href="#">存储过程</a></h5>
                            <a href="#">项目存储</a>
                            <a href="#">工作存储</a>
                        </div>
                    </div>
                    <div class="nav-table-row">
                        <div class="nav-third">
                            <h5><a href="#">过程管理</a></h5>
                            <a href="#">项目存储过程</a>
                            <a href="#">工作存储过程</a>
                        </div>
                        <div class="nav-third">
                            <h5><a href="#">日志反馈</a></h5>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-first">
                <a href="#" mol-direct="view/feed-back-index.html">用户反馈</a>
                <div class="nav-second">
                    <a href="#">用户反馈管理</a>
                </div>
            </li>
            <li class="nav-first">
                <a href="#" mol-direct="view/reports-index.html" mol-label="统计报表"><b class="large-icon hidePlus">▤</b>统计报表</a>
                <div class="nav-second">
                    <a href="#">系统使用情况统计</a>
                </div>
            </li>
            <li class="nav-first bigger">
                <a  href="#" mol-direct="view/sys-index.html" mol-label="系统设置"><b class="icon-settings"></b></a>
            </li>
        </ul>
        <div class="arr-l-wrap"><p class="arr-l"></p></div>
        <div class="arr-r-wrap"><p class="arr-r"></p></div>
    </nav>
</header>

<div id="root-tabs" class="easyui-tabs" style="height:720px;width:100%;">
    <!--<div title="应用面板" class="pd10">-->
    <!--<p style="font-size:14px">jQuery EasyUI framework helps you build your web pages easily.</p>-->
    <!--</div>-->

    <div title="首页" no-data-options="iconCls:'icon-reload',closable:true" style="padding:10px">
        <iframe class="mol-content" src="view/fst-page.html" frameborder="0"></iframe>
    </div>
</div>
<!--<iframe id="content" name="content" src="view/reports/reports-sys-use.html" frameborder="0"></iframe>-->

</body>

<!--<script src="lib/easyloader.js"></script>-->
<script src="dist/js/base.js"></script>
<!--<script src="dist/js/index.js"></script>-->

<script>
    window.extending({
        //limits:
        path:'<%=path%>',
        rootTabs:$('#root-tabs'),
        molData:[
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
                        {name:'工作存储过程',id:'',direct:'info-mng-gzccgc.html'}
                    ]},
                    {name:'系统版本管理',id:'',direct:'info-mng-xxbb.html',items:null},
                    {name:'系统参数管理',id:'',direct:'info-mng-xxcs.html',items:null},
                    {name:'模块语句管理',id:'',direct:'info-mng-mkyj.html',items:null},
                    {name:'问题共享管理',id:'',direct:'info-mng-wtgx.html',items:null}
                ]
            },
            {
                name:'项目监控',
                id:'project-watch',
                items:[
                    {name:'数据实时统计',id:'',direct:'info-mng-xxbb.html',items:null},
                    {name:'数据实时监控',id:'',direct:'info-mng-xxcs.html',items:null},
                    {name:'应用服务监控',id:'',direct:'info-mng-mkyj.html',items:null}
                ]
            },
            {
                name:'用户反馈',
                id:'feed-back',
                items:[
                    {name:'用户反馈管理',id:'',direct:'info-mng-xxbb.html',items:null},
                    {name:'培训情况维护',id:'',direct:'info-mng-xxcs.html',items:null},
                    {name:'案例情况维护',id:'',direct:'info-mng-mkyj.html',items:null}
                ]
            },
            {
                name:'统计报表',
                id:'reports',
                items:[
                    {name:'系统使用情况统计',id:'',direct:'info-mng-xxbb.html',items:null}
                ]
            },
            {
                name:'管理维护',
                id:'sys',
                items:[
                    {name:'登录用户管理',id:'',direct:'info-mng-xxbb.html',items:null},
                    {name:'系统角色管理',id:'',direct:'info-mng-xxbb.html',items:null},
                    {name:'系统模块管理',id:'',direct:'info-mng-xxbb.html',items:null},
                    {name:'登录用户管理',id:'',direct:'info-mng-xxbb.html',items:null},
                    {name:'统计报表管理',id:'',direct:'info-mng-xxbb.html',items:null},
                    {name:'统计报表维护',id:'',direct:'info-mng-xxbb.html',items:null}
                ]
            }

<<<<<<< HEAD
        ],
        status:{}
    });
    function indexInit(animate) {
=======
    function indexInit() {
>>>>>>> c64f7e28a5266270b5b112eaa536096c4bb974e0
        //$('#content').height(window.height-120);
        $('.nav a').on('click',function(){
            var $this=$(this);
            //frames['content'].location=$this.attr('direct');
            $('.nav a').removeClass('current');
            $this.addClass('current');
        });

        setTimeout(function(){
            $('header').animate({height:360},1200,function(){
                var $this=$(this);
                setTimeout(function(){
                    $this.animate({height:110},1600)
                            .animate({height:120},200);
                },2000);
            });
        },500);
    }

<<<<<<< HEAD

    indexInit(localStorage.indexAnimation!=='0');


    rootTabs.height(window.height-130).tabs({'scrollIncrement':320});
=======
    var winTabs=$('#root-tabs');
    window.rootTabs=winTabs;
    winTabs.height(window.height-130);
>>>>>>> c64f7e28a5266270b5b112eaa536096c4bb974e0
    $('.nav a').click(function(){
        var $this=$(this);
        var src=$this.attr('mol-direct');
        var label=$this.attr('mol-label')||$this.html();
        if(winTabs.tabs('getTab',label)){
            winTabs.tabs('select',label);
        }else{
            src && $append(src,label);
        }
    });

</script>
</html>