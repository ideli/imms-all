//var base=require('./base');
//var echarts=require('../lib/echarts-all');
var geoData=require('../data/geo.json');

//checkDtd();
importing('echarts3','echarts2',function(){
    mapInit(geoData);
    barInit();
    pieInit();
    if(localParams.get('indexAnimation')){
        $('#main').animate({opacity:'0.1'},1200);
        setTimeout(function(){
            $('#main').animate({opacity:'1'},2400);
        },3000)
    }
});

function mapInit(geoData){
    var stars=[{"name":"福建省厅","value":"111"},{"name":"江西省厅","value":"111"},{"name":"上饶","value":"111"},{"name":"吉安","value":"111"},{"name":"潍坊","value":"111"},{"name":"济宁","value":"111"},{"name":"河南省厅","value":"222"},{"name":"郑州","value":"111"},{"name":"鹤壁","value":"222"},{"name":"新乡","value":"111"},{"name":"南阳","value":"111"},{"name":"驻马店","value":"111"},{"name":"武汉","value":"111"},{"name":"宜昌","value":"111"},{"name":"湖南省厅","value":"111"},{"name":"怀化","value":"111"},{"name":"广东省厅","value":"111"},{"name":"广州","value":"222"},{"name":"深圳","value":"222"},{"name":"梅州","value":"222"},{"name":"云浮","value":"222"},{"name":"拉萨","value":"111"},{"name":"陕西省厅","value":"111"},{"name":"青海省厅","value":"111"},{"name":"西宁","value":"111"},{"name":"宁夏省厅","value":"111"},{"name":"梧州","value":"333"},{"name":"北海","value":"333"},{"name":"实施管理平台省厅","value":"111"},{"name":"山东省厅","value":"333"},{"name":"新疆省厅","value":"111"},{"name":"银川","value":"333"},{"name":"崇左","value":"333"},{"name":"上海","value":"333"},{"name":"重庆","value":"333"},{"name":"泸州","value":"333"},{"name":"贵州省厅","value":"111"},{"name":"广西省厅","value":"333"},{"name":"内蒙古省厅","value":"111"},{"name":"北京","value":"222"},{"name":"天津","value":"111"},{"name":"河北省厅","value":"222"},{"name":"石家庄","value":"222"},{"name":"秦皇岛","value":"222"},{"name":"山西省厅","value":"111"},{"name":"太原","value":"111"},{"name":"晋城","value":"111"},{"name":"吕梁","value":"111"},{"name":"临汾","value":"111"},{"name":"辽宁省厅","value":"111"},{"name":"沈阳","value":"111"},{"name":"本溪 ","value":"111"},{"name":"吉林省厅","value":"111"},{"name":"浙江省厅","value":"111"},{"name":"杭州","value":"111"},{"name":"芜湖","value":"111"},{"name":"淮南","value":"111"}];
    var histars=stars.where(/o=>o.value==111/);window.hicount=histars.length;
    var nostars=stars.where(/o=>o.value==0/);
    var yunstars=stars.where(/o=>o.value==222/);window.yuncount=yunstars.length;
    var getstars=stars.where(/o=>o.value==333/);window.getcount=getstars.length;
    var myChart = echarts2.init(byid('map-ct'));
    var option =  {
        //backgroundColor:'rgb(233,244,255)',
        //animation:true,
        //地图标题
        title : {
            text: '部署地一览',
            subtext: '',
            x:'center',
            textStyle : {color: '#999','fontSize':'24px'}
        },
        color: ['#FF6262','steelblue','green'],
        legend: {
            x:'center',
            y:'10%',
            selectedMode:'multiple',
            selected:{
                '一般部署地':yunstars.length+getstars.length<6,
                '云节点':true,
                '已握手节点':true
            },
            textStyle : {color: '#888','fontSize':'12px'},
            data:['一般部署地','云节点','已握手节点']
        },
        //移入提示
        tooltip : {
            show:false,
            trigger: 'item',
            formatter: '{b}'
        },

        dataRange: {
            show:true,
            min : 0,
            max : 333,
            splitNumber:4,
            calculable : false,//测量标尺 或是 分级色块
            text:['',''],
            //textStyle : {color: '#fff','fontSize':'12px'},
            color: ['green','#1E60C9','#e55','#E3D3AB']//max到min,由浅到深,最后面颜色应用到散列点和有数据的区域上
        },

        //工具条
        toolbox: {
            show : 1,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: false, readOnly: true},
                restore : {show: 1},
                saveAsImage : {show: 1}
            }
        },
        //层级系列--------------------------------------------------------------------------------------------------------------
        series : [

            //省份
            {
                name: '中国',
                type: 'map',
                mapType: 'china',
                selectedMode : 'multiple',
                //zlevel:0,//一级层叠控制
                //z:2,//二级层叠控制
                //clickable:false,
                //移入提示
                tooltip : {
                    show:false,
                    showDelay:50,
                    trigger: 'item',//'axis',
                    formatter:function(a,b,c){
                        return a.name + (a.value==0?' 暂无部署':'');
                    }//a是配置对象,b是name和index,c是function(e,t){return l.__setContent(e,t)}
                },
                //省份样式
                itemStyle:{
                    //普通
                    normal:{
                        label:{show:true},//显示省份文字
                        borderColor:'#ddd',//'rgb(100,199,237)',//省份边框颜色
                        borderWidth:1,
                        areaStyle:{color:'rgba(105,105,109,0.5)'}//function(obj){if(obj.data.value==1)return '#33e';}}//'rgba(105,105,109,0.5)'},// '#E1CDB2'}//'rgba(221,143,86,0.35)'} //省份背景色
                    },
                    //高亮
                    emphasis: {
                        borderColor:'rgb(100,199,237)',// '#1e90ff',
                        borderWidth: 1.5,
                        areaStyle:{color: 'rgba(221,143,86,0.15)'}
                    }
                },
                hoverable: true,//鼠标移入省份高亮
                roam:true,
                //未部署省份
                //data:nostars,
                data : [{name:'广东',value:1},{name:'广西',value:1},{name:'四川',value:1},{name:'重庆',value:1},{name:'宁夏',value:1},{name:'上海',value:1},{name:'河南',value:1},{name:'北京',value:1},{name:'河北',value:1},{name:'山东',value:1}],//nostars,
                // 坐标数据库
                geoCoord:geoData
            },

            //数据二 散列点----------------------------------------------------------------------------------------------------
            {
                //默认加在鼠标移入提示文字中
                name: '一般部署地',
                type: 'map',
                mapType: 'china',
                roam:true,
                zlevel:1,//层叠控制
                z:3,
                //数据视图
                data:[],
                //移入提示
                tooltip : {
                    show:true,
                    trigger: 'item',
                    formatter:function(a,b,c){
                        return a.name; //+ (a.value=='111'?'√已开通':'');
                    }//a是配置对象,b是name和index,c是function(e,t){return l.__setContent(e,t)}
                },
                /*markLine:{
                 lineWidth:5
                 },*/
                markPoint : {
                    //散列点图形(可用图片)
                    symbol:'star',//'emptyCircle',
                    //散列点尺寸
                    symbolSize : function (v){
                        return (7 + v/100);
                    },
                    //闪动效果
                    effect : {
                        show: false,
                        shadowBlur : 0,
                        color:'#FF6262', //不设置颜色的话,按数据级别显示对应颜色
                        scaleSize:1.1, //放大倍数
                        period:35//间隔时间
                    },
                    //指示文字
                    itemStyle:{
                        normal:{
                            label:{
                                show:false,
                                textStyle:{
                                    align:'left',
                                    baseline:'bottom',
                                    color:'navy',
                                    fontSize:'24px'//字号设置无效
                                },
                                formatter:' {b}'//{a}-{b}-{c} 散列点统称-散列点名称-散列点值
                            }
                        }
                    },
                    //云部署节点-----
                    data:histars
                }
            },

            //数据二 散列点----------------------------------------------------------------------------------------------------
            {
                //默认加在鼠标移入提示文字中
                name: '云节点',
                type: 'map',
                mapType: 'china',
                roam:true,
                zlevel:1,//层叠控制
                z:3,
                //数据视图
                data:[],
                //移入提示
                tooltip : {
                    show:true,
                    trigger: 'item',
                    formatter:function(a,b,c){
                        return a.name + (a.value=='222'?' 已开通,可申请握手':'');
                    }//a是配置对象,b是name和index,c是function(e,t){return l.__setContent(e,t)}
                },
                /*markLine:{
                 lineWidth:5
                 },*/
                markPoint : {
                    //散列点图形(可用图片)
                    symbol:'star',//'emptyCircle',
                    //散列点尺寸
                    symbolSize : function (v){return (9 + v/100);},
                    //闪动效果
                    effect : {
                        show: true,
                        shadowBlur : 0,
                        //color:'#e33', //不设置颜色的话,按数据级别显示对应颜色
                        scaleSize:1.1, //放大倍数
                        period:25//间隔时间
                    },
                    //指示文字
                    itemStyle:{
                        normal:{
                            label:{
                                show:false,
                                textStyle:{
                                    align:'left',
                                    baseline:'bottom',
                                    color:'navy',
                                    fontSize:'24px'//字号设置无效
                                },
                                formatter:' {b}'//{a}-{b}-{c} 散列点统称-散列点名称-散列点值
                            }
                        }
                    },
                    //云部署节点-----
                    data:yunstars
                }
            },

            //数据三 握手机制---
            {
                name: '已握手节点',
                type: 'map',
                mapType: 'china',
                roam:true,
                zlevel:1,//一级层叠控制
                z:3,//二级层叠控制
                data:[],
                tooltip : {
                    show:true,
                    trigger: 'item',
                    formatter:function(a,b,c){return a.name + (a.value=='333'?' √已握手!':'');}
                },
                markPoint : {
                    symbol:'star',//'emptyCircle',
                    symbolSize : function (v){ return (9 + v/100); },
                    effect : {
                        show: true,
                        scaleSize:1.1, //放大倍数
                        shadowBlur : 0,
                        period:25//间隔时间
                    },
                    itemStyle:{
                        normal:{
                            label:{
                                show:false,
                                textStyle:{
                                    align:'left',
                                    baseline:'bottom',
                                    color:'navy'
                                },
                                formatter:' {b}'//{a}-{b}-{c} 散列点统称-散列点名称-散列点值
                            }
                        }
                    },
                    //握手节点
                    data:getstars
                }
            }

        ]
    };
    //启动
    window.onresize = myChart.resize;
    myChart.setOption(option);
}

function barInit() {
    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['首页访问','客户端','云节点访问','串并案查询','一查通搜索','其他']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'首页访问',
                type:'bar',
                data:[320, 332, 301, 334, 390, 130, 120]
            },
            {
                name:'客户端',
                type:'bar',
                stack: '广告',
                data:[120, 132, 101, 134, 90, 130, 110]
            },
            {
                name:'云节点访问',
                type:'bar',
                stack: '广告',
                data:[220, 182, 191, 234, 290, 130, 110]
            },
            {
                name:'串并案查询',
                type:'bar',
                stack: '广告',
                data:[150, 232, 201, 154, 190, 30, 40]
            },
            {
                name:'一查通搜索',
                type:'bar',
                data:[862, 1018, 964, 1026, 1679, 100, 170],
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'dashed'
                        }
                    },
                    data : [
                        [{type : 'min'}, {type : 'max'}]
                    ]
                }
            },
            {
                name:'其他',
                type:'bar',
                stack: '搜索引擎',
                data:[62, 82, 91, 84, 109, 10, 10]
            }
        ]
    };
    var myChart = echarts.init(byid('bar-ct'));
    //window.onresize = myChart.resize;
    myChart.setOption(option);
}

function pieInit(){
    var option = {
        title : {
            text: '',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            //orient: 'vertical',
            left: 'left',
            data: ['普通部署地','云部署地','握手云部署地'],
            show:false
        },
        series : [
            {
                name: '云部署情况',
                type: 'pie',
                radius : '55%',
                center: ['40%', '40%'],
                data:[
                    {value:hicount, name:'普通部署地'},
                    {value:yuncount, name:'云部署地'},
                    {value:getcount, name:'握手云部署地'}
                ],
                itemStyle: {
                    normal:{
                        color: function (obj){
                            var color;
                            var value=obj.data.value;
                            if(value==hicount) color= '#e66';
                            if(value==yuncount) color= 'steelblue';
                            if(value==getcount) color= 'green';
                            return color;
                            //return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    var myChart = echarts.init(byid('pie-ct'));
    //window.onresize = myChart.resize;
    myChart.setOption(option);
    var app={currentIndex:-1};
    app.timeTicket = setInterval(function () {
        var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
        });
        app.currentIndex = (app.currentIndex + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
        });
        // 显示 tooltip
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
        });
    }, 1000);
}


//$script('../lib/echarts-all',function(){
//$.getJSON('../data/geo.json',function(geo){

//});
//});

