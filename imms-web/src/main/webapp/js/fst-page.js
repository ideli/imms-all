//var base=require('./base');
//var echarts=require('../lib/echarts-all');
var geoData=require('../data/geo.json');

//checkDtd();
importing('../lib/echarts-all.js',function(){mapInit(geoData);})

function mapInit(geoData){
    var stars=[{"name":"福建省厅","value":"111"},{"name":"江西省厅","value":"111"},{"name":"上饶","value":"111"},{"name":"吉安","value":"111"},{"name":"潍坊","value":"111"},{"name":"济宁","value":"111"},{"name":"河南省厅","value":"222"},{"name":"郑州","value":"111"},{"name":"鹤壁","value":"222"},{"name":"新乡","value":"111"},{"name":"南阳","value":"111"},{"name":"驻马店","value":"111"},{"name":"武汉","value":"111"},{"name":"宜昌","value":"111"},{"name":"湖南省厅","value":"111"},{"name":"怀化","value":"111"},{"name":"广东省厅","value":"111"},{"name":"广州","value":"222"},{"name":"深圳","value":"222"},{"name":"梅州","value":"222"},{"name":"云浮","value":"222"},{"name":"拉萨","value":"111"},{"name":"陕西省厅","value":"111"},{"name":"青海省厅","value":"111"},{"name":"西宁","value":"111"},{"name":"宁夏省厅","value":"111"},{"name":"梧州","value":"333"},{"name":"北海","value":"333"},{"name":"实施管理平台省厅","value":"111"},{"name":"山东省厅","value":"333"},{"name":"新疆省厅","value":"111"},{"name":"银川","value":"333"},{"name":"崇左","value":"333"},{"name":"上海","value":"333"},{"name":"重庆","value":"333"},{"name":"泸州","value":"333"},{"name":"贵州省厅","value":"111"},{"name":"广西省厅","value":"333"},{"name":"内蒙古省厅","value":"111"},{"name":"北京","value":"222"},{"name":"天津","value":"111"},{"name":"河北省厅","value":"222"},{"name":"石家庄","value":"222"},{"name":"秦皇岛","value":"222"},{"name":"山西省厅","value":"111"},{"name":"太原","value":"111"},{"name":"晋城","value":"111"},{"name":"吕梁","value":"111"},{"name":"临汾","value":"111"},{"name":"辽宁省厅","value":"111"},{"name":"沈阳","value":"111"},{"name":"本溪 ","value":"111"},{"name":"吉林省厅","value":"111"},{"name":"浙江省厅","value":"111"},{"name":"杭州","value":"111"},{"name":"芜湖","value":"111"},{"name":"淮南","value":"111"}];
    var histars=stars.where(/o=>o.value==111/);
    var nostars=stars.where(/o=>o.value==0/);
    var yunstars=stars.where(/o=>o.value==222/);
    var getstars=stars.where(/o=>o.value==333/);
    var myChart = echarts.init(document.getElementById('main'));
    var option =  {
        backgroundColor:'rgb(233,244,255)',
        animation:true,
        //地图标题
        title : {
            text: '云节点分布',
            subtext: '',
            x:'center',
            textStyle : {color: 'steelblue','fontSize':'22px'}
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
            //textStyle : {color: '#fff','fontSize':'12px'},
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
                mark : {show: false},
                dataView : {show: false, readOnly: 0},
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
                        borderColor:'silver',//'rgb(100,199,237)',//省份边框颜色
                        borderWidth:1,
                        areaStyle:{color:'rgba(105,105,109,0.5)'},// '#E1CDB2'}//'rgba(221,143,86,0.35)'} //省份背景色
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
                data : nostars,
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
                    symbol:'emptyCircle',
                    //散列点尺寸
                    symbolSize : function (v){
                        return (3 + v/100);
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
                    symbol:'emptyCircle',
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
                    symbol:'emptyCircle',
                    symbolSize : function (v){ return (6 + v/100); },
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

$(doc.body).css('background','gray').on('dblclick',function(){
    mapInit(geoData);
})


//$script('../lib/echarts-all',function(){
//$.getJSON('../data/geo.json',function(geo){

//});
//});

