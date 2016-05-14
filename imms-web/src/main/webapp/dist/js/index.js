(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
    distVersion:"1.0"
};
},{}],2:[function(require,module,exports){


    (function(context){
        Object.defineProperty(Object.prototype,'extending',{
            value:function() { //name,val or obj
                var obj={};
                typeof arguments[0]=='object'? (obj=arguments[0]):(obj[arguments[0]]=arguments[1]);
                for(var n in obj){
                    Object.defineProperty(this, n, {
                        value: obj[n],
                        writable:false, enumerable:false, configurable:false
                    }); 
                }
            },writable:false, enumerable:false, configurable:false
        });
        Object.defineProperty(Object.prototype,'getting',{
            value:function() { //name,getter or obj
                var obj={};
                typeof arguments[0]=='object'? (obj=arguments[0]):(obj[arguments[0]]=arguments[1]);
                for(var n in obj){
                    Object.defineProperty(this, n, {
                        get:obj[n],enumerable:false, configurable:false
                    }); 
                }
            },writable:false, enumerable:false, configurable:false
        });
    })(window);

    
    window.getting({
        doc:function(){return document},
        width:function(){return this.innerWidth;},
        height:function(){return this.innerHeight;},
        scrollTop:function(){return document.documentElement.scrollTop||document.body.scrollTop;},
        scrollLeft:function(){return document.documentElement.scrollLeft||document.body.scrollLeft;}
    });

    Object.prototype.extending('fixing',function(key){this.extending(key,this[key]);});

    //JSON扩展
    JSON.extending({
        equal:function(obj,obj2){return obj===obj2 || ( typeof obj==typeof obj2  && JSON.stringify(obj)===JSON.stringify(obj2) );}
    });
    
    //时间扩展      
    Date.prototype.extending({
        addMonth:function(i){
                var m=this.getMonth();
                var y=this.getFullYear();
                m+i<12 || (y+=1);
                this.setMonth(m+i);
                this.setFullYear(y);
                return this;
            },
        format:function (fmt) {    
            var o = {
                "M+": this.getMonth() + 1, //月份
                "D+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "Q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            fmt=fmt||'YYYY-MM-DD hh:mm:ss';
            for(var n in {8:8,10:10})
                if(fmt.slice(0,+n).toUpperCase().replace(/\-|\.|\s|\//g,'')=='YYYYMMDD'){
                    fmt=fmt.slice(0,+n).toUpperCase()+fmt.slice(+n);
                }
            if (/(Y+)/.test(fmt)){
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            return fmt;
            }  
    });
    
    Date.extending({
        format:function(fmt){fmt=fmt||'YYYY-MM-DD hh:mm:ss';return new Date().format(fmt);}
    });

	//String扩展
    String.prototype.extending({
        isEmpty:function(){return this.replace(/\s+/gm,'').length!=0;},
        format:function(){
                    var vname='\\{i\\}';
                    var str=this;
                    var agmt;
                    for(var i=arguments.length-1;i>-1;i--){
                        agmt=vname.replace('i',i);
                        str=str.replace(RegExp(agmt,'gm'),arguments[i]); 
                    }
                    return str;
                },
        inside:function(strs){
                var the=this.valueOf();
                if(typeof strs=='string'){   
                    return strs.indexOf(the)>-1;
                }else{                                                                               //字符串存在于数组某项? 不接受大小写,要忽略大小写请自己将双方toUpperCase()
                    for(var i=strs.length-1;i>-1;i--){
                        if( the===strs[i].valueOf() )
                            return i+1;	//返回第几项. 不从0开始,避免识别为false, 注意是最后一次出现的位置+1
                    }
                }
                return false;
            },
        like:function(key){
            var bs=key.indexOf('%')==0;
            var be=key.lastIndexOf('%')==key.length-1;
            if(bs&&be)  return this.indexOf(key.slice(1,-1))!=-1;
            else if(bs) return this.lastIndexOf(key.slice(1))==this.length-key.length+1;
            else if(be) return this.indexOf(key.slice(0,-1))==0;
            else return String(this)===String(key);
            },
        trimL:function(){return this.trimLeft();},
        trimR:function(){return this.trimRight();},
        lower:function(){return this.toLowerCase();},
        upper:function(){return this.toUpperCase();}            
    });
    
    /* importing中require不到正确的路径 browserify无法动态解析path    
    var importing=function(filePath,name) {
        var lib=require(filePath),arr,obj,i;
        if(name){
            arr=name.split(',');
            obj={};
            for(i=0;i<arr.length;i++){
                obj[arr[i]]=lib;
            }
            window.extending(obj);  
        }else{
            typeof lib=='object' && window.extending(lib);
        }
        return window;
    };
    window.extending('importing',importing) ;
    
    importing('../lib/jquery','$,jQuery');
    importing('../lib/jquery.autocompleteplus');
    importing('../lib/exdefJquery');
    importing('../lib/exDefEasyui');
    importing('../lib/lambda');
    importing('../lib/echarts-all','echart');
    */
    var config=require('../data/config');
    //var $=require('../lib/jquery');
    //var $easyui=require('../lib/jquery.easyui.min');
    //var $cookie=require('../lib/jquery.cookie');
    //var $autoComolete=require('../lib/jquery.autocompleteplus');
    var exy=require('../lib/exy');
    var lambda=require('../lib/lambda');
    var exdefJquery=require('../lib/exDefJquery');
    var exdefEasyui=require('../lib/exDefEasyui');

    window.extending({config:config});
    //$easyui($);
    //$cookie($);
    //$autoComolete($);
    //window.extending({$:$,jQuery:$});
    window.extending(exy);
    Array.prototype.extending(lambda); 
    window.extending(exdefJquery);
    window.extending(exdefEasyui);

    // var stp=require('../lib/stp.js');
    // var paging=require('../lib/paging.js');
    // var naving=require('../lib/naving.js');
    
    //var convertArray=function (arr) {
    //    var i=arr.length, obj = {};
    //    while (i--){
    //        if(typeof obj[arr[i].name]=='undefined')
    //            obj[arr[i].name] = arr[i].value;
    //        else
    //            obj[arr[i].name] += ','+arr[i].value;
    //    }
    //    return obj;
    //};
    //$.fn.serializeObject=function(){
    //    return convertArray(this.serializeArray());
    //};
    //jQuery from 序列化扩展 将jquery系列化后的值转为name:value的形式。
    //$("#form2").serializeObject() => {id:"007",age:"24""}
    
    //$.extending('serializeObject',serializeObject);
    
    
    //var checkDtd=function(){
    //    //log(window.document.compatMode);
    //    if(document.compatMode=='BackCompat'){
    //        throw new Error('BackCompat！please check DTD！');
    //    }
    //}
    //
    //$(checkDtd);

    
    module.exports={
        log:function(n){log(n);},
        info:function(n){info(n);}
    }
},{"../data/config":1,"../lib/exDefEasyui":4,"../lib/exDefJquery":5,"../lib/exy":6,"../lib/lambda":7}],3:[function(require,module,exports){
require('./base');
//require('./bulbble');



},{"./base":2}],4:[function(require,module,exports){
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
                return ele.window(params).show();
            }else if(isAjax){
                ele=$('<div class="easy-win-wrap">').css('overflow',params.scroll ? 'auto':'hidden');
                return ele.window(params).load(str,cb);
            }else{
                ele=$('<div class="easy-win-wrap overhide"><iframe scrolling="{0}"></iframe></div>'.replace('{0}',params.scroll ? 'auto':'no'));
                return ele.window(params).find('iframe').attr('src',str).end();
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
        jQuery.noOutline();
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
        jQuery.noOutline();
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
    }
};
},{}],5:[function(require,module,exports){
//基于jquery的拓展
module.exports={
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
            }
    };
            
},{}],6:[function(require,module,exports){
module.exports={
        //json与string互转
        obj2str:function(obj){return typeof obj=='object'?JSON.stringify(obj):obj;},
        str2obj:function(str){return typeof str=='string'?JSON.parse(str):str;},
        //简写原生选择器，支持传入第二参数iframe的document

        byid:function(id,doc){return (doc||document).getElementById(id)},
        //获取位置
        getRect:function(ele){return ele.getBoundingClientRect();},
        //调试
        log:function (param){typeof console!='undefined' && console.log(param);},
        info:function(param){typeof console!='undefined' && console.info(param);},
        warn:function(param){typeof console!='undefined' && console.warn(param);},
        logex:function(msg,cssTxt){
                //默认fontsize 18px写前面，后写的可覆盖
                cssTxt= cssTxt ? 'font-size:18px;'+cssTxt : 'font-size:18px;color:red;';
                console.log('%c'+msg,cssTxt);
            },
        //类型判断
        typeOf:(function(){
                var dic={'[object Object]':'object','[object RegExp]':'regexp','[object Date]':'date','[object Array]':'array','[object String]':'string','[object Number]':'number','[object Boolean]':'boolean','[object Error]':'error'};
                var stringify=Object.prototype.toString;
                return function(obj,plus){
                    if(typeof obj !='object')
                        return typeof obj;
                    else if(obj===null)
                        return 'null';
                    else if(plus)
                        return dic[stringify.apply(obj)] || stringify.call(obj).slice(8,-1).toLowerCase()|| 'object';
                    else
                        return dic[stringify.apply(obj)] || 'object';
                };
                })(),
        //queryStr解析
        queryParse:function (p){
                var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]*","g"));
                if(result==null)return false;
                var j=result.length;
                var obj={},arr=[];
                for(var i=0;i<j;i++){
                    arr=result[i].slice(1).split('=');
                    obj[arr[0]]=arr[1];
                }
                return p ? obj[p]||'' : obj;
            },
        //防止百分号标签空白输出在页面上
        getJspData:function(data){
                return data||null;
            },
        replaceDDD:function(value){return value.replace(/\<ddd\>/gmi,"'");},
        //原生弹窗的封装
        open2:function(){
                var features='';
                var config={status:0,width:top.getWidth()-40,height:top.getHeight()-70,top:20,left:20,scrollbars:1,resizable:1,fullscreen:0,channelmode:0,directories:1,help:0,menubar:0,toolbar:0,location:0};
                var obj=typeof arguments[0]=='object' ? arguments[0]:{url:arguments[0],name:arguments[1],width:arguments[2],height:arguments[3],left:arguments[4],top:arguments[5]} ;
                for (var n in obj){
                    typeof obj[n]!='undefined' && (config[n]=obj[n]);
                }
                for (var m in config){
                    if(m!='url' || m!='name')
                    features += ','+ m + '=' +config[m];
                }
                //log(url +'\n'+ name +'\n'+ features.slice(1))
                var win=window.open(config.url,config.name||'_blank',features.slice(1));
                return win;
            },
        //简单加载样式 304改为走200，缓存10天
        $style:function(src,cb){
                src.match(/^http|^\.|^\//)!=null || (src=top.path+'/style/'+src);
                src.match(/\.css$/i)!=null || (src+='.css');
                src+='?version='+Date.format('YYYYMMDD').slice(0,-1);
                var link=document.createElement("link");
                link.rel="stylesheet";
                link.type="text/css";
                link.media="screen";
                link.href=src;
                document.getElementsByTagName('head')[0].appendChild(link);
                cb && cb.call(link);
            },
        $script:function (src,cb){
            var bol=false;
            var tag=document.createElement("script");
            tag.type="text/javascript";
            tag.language="javascript";
            //tag.setAttribute('async','async');
            tag.setAttribute('defer','defer');
            tag.src=src;
            tag.onload=tag.onreadystatechange=function(){
                if(!bol&&(!tag.readyState||tag.readyState=="loaded"||tag.readyState=="complete")){
                    bol=true;
                    tag.onload=tag.onreadystatechange=null;
                    if(cb){
                        cb.call(tag);
                    }
                }
            };
            document.head.appendChild(tag);
        },
        importing:function(){
            var ags=arguments;
            if(typeof ags[0]=='function'){
                return ags[0]();
            }
            window.$script(ags[0]+(window.config.distVersion?'?version='+window.config.distVersion:''),function(){
                window.importing.apply(this,[].slice.call(ags,1));
            })
        }
    };
},{}],7:[function(require,module,exports){

    //lambda临时委托方法工厂
    var $lambda=function(foo){
        var str,i,param,body;
        if(!foo){
            return function(x){return x};   
        }else if(typeof foo=='function'){
            return foo;
        }else if(foo.source){
            str=foo.source.replace(/^\s+|\s+$/g,'');;
        }else{
            str=foo.replace(/^\s+|\s+$/g,'');
        }
            
        //开始解析函数字符串
        var i=str.indexOf('=>');
        if(i==-1)  {
            return new Function(str);
        }else{
            param=str.slice(0,i).replace(/\s+/gm,'');
            body =str.slice(i+2).replace(/^\s+|\s+$/g,'');

            //k=><alert(k);return k;>  //[]可能用来表示数组,{}用来表示对象,()用来表示区间块,只有<>是没有用的
            body= body.indexOf('<')==0 ? body.slice(1,-1) : 'return '+body;
            
            if(param=='args'){
                body='var args=arguments;'+body;
                param='';
            }
            return new Function(param,body);
        }
    }

    module.exports={
        indexAs:function(item){
                    var len=this.length;
                    for(var i=0;i<len;i++){
                        if( JSON.equal(item,this[i]) ) //依赖于JSON.equal扩展，检测是否相等的JSON对象
                            return i;
                    }
                    return -1;
                },
        lastIndexAs:function(item){
                    for(var i=this.length-1;i>-1;i--){
                        if( JSON.equal(item,this[i]) ) //依赖于JSON.equal扩展，检测是否相等的JSON对象
                            return i;
                    }
                    return -1;
                },
        each:this.forEach,
        remove:function(i){return this.splice(i,1);},
        has:function(item,bol){return this.indexOf(item,bol)+1;},
        where:function(foo){
                    var the=this;
                    return the.filter(function(v,i,arr){
                        return $lambda(foo)(v,i,arr);
                    });
                },
        select:function(foo){
                    var the=this;
                    return the.map(function(v,i,arr){
                        return $lambda(foo)(v,i,arr);
                    });
                },
        distinct:function(jsonEqual){
                        var i,j;
                        for(i=this.length-1;i>0;i--){
                                j= jsonEqual ? this.indexAs(this[i]) :this.indexOf(this[i]);
                                j>-1 && j<i && this.remove(i);
                            
                            /*for(var k=i-1;k>-1;k--){
                                var item=this[i];
                                JSON.equal(item,this[k],jsonEqual) && this.remove(i);
                            }*/
                        }
                        return this.where('x => typeof x !="undefined" ');
                },
        orderby:function(func,desc){
                    var orderFn, arr=this.slice();
                    
                    //准备好转换函数定义和排序三大套路
                    var trans=function(x){return x};
                    var orderFns={
                        number:function(a,b){return trans(a) - trans(b)},
                        string:function(a,b){return trans(a).localeCompare(trans(b))},
                        boolean:function(a,b){return !trans(a);}
                    };
                    
                    if(this.length<2) return arr;
                    
                    //trans转换函数重赋值（不传的话等于初始值）
                    trans=$lambda(func);
                    
                    //抽样判断转换函数的返回值类型，来选择对应的比较函数
                    orderFn=orderFns[typeof trans(arr[0])];
                    
                    try{
                        arr.sort(orderFn||null);
                    }catch(e){
                        throw new Error('排序失败,请检测方法和数组内容');
                    }
                    //第二参数为true表示结果需要倒序
                    desc && arr.reverse();
                    return arr;
                },
        max:function(str){
                    var now, j=this.length, func=$lambda(str);
                    if(j==0) return null;
                    if(j==1) return func(this[0])
                    now=func(this[0]);
                    for(var i=1;i<j;i++){
                        now=Math.max(now,func(this[i]));
                    }
                    return now;
                },
        min:function(str){
                var now, j=this.length, func=$lambda(str);
                if(j==0) return null;
                if(j==1) return func(this[0])
                now=func(this[0]);
                for(var i=1;i<j;i++){
                    now=Math.min(now,func(this[i]));
                }
                return now;
            },
        sum:function(str){
                var now, j=this.length, func=$lambda(str);
                if(j==0) return null;
                if(j==1) return func(this[0])
                now=func(this[0]);
                for(var i=1;i<j;i++){
                    next=func(this[i]);
                    if(now==null){
                        now=next;      //前者是null直接取后者         
                    }else{
                        now= next==null ? now : now+next;  //后者是null直接取前者，否则相加
                    } 
                    //null加数字的时候,就是0+数字,而null加字符串,不是''+字符,而是'null'+字符串...所以是null就不加
                }
                return now;
            },
    
        linq:function(query){
            //数据源
            var dataInfo=query.match(/\sfrom\s+([^\s]+\s+\w)/)[1].split(/\s+/); //'from多个空格到where或终点之间的字符'之'前半段'
            var dataName=dataInfo[0]; //数据源名
            var dataMark=dataInfo[1]; //短别名	
            
            var columns=[];
            var where_clause='';
            var order_clause='';
            var desc='';
            
            //用正则捕获where和order条件 TODO
            var cond=query.match(/\swhere\s+(.+)(order\sby){0,1}/); //where和order by一起取出
            if(cond.length && cond.length>1){
                var clause=cond[1].split(' order by ');
                where_clause=clause[0];
                if (clause.length>1){
                    order_clause=clause[1];
                    desc=order_clause.slice(-5)==' desc'; //"order by字段.slice(-5)==' desc'或' DESC'"
                    desc && (order_clause=order_clause.slice(0,-5));
                }
            }else{
                //没有where条件的,尝试找下order by条件
                cond=query.match( new RegExp("\\s#\\s+*\\s+order\\sby(.+)".replace('#',dataName).replace('*',dataMark))  );
                if(cond.length && cond.length>1){
                    var index=cond[0].indexOf(' order by ');
                    order_clause=cond[0].slice(index+10)
                }
            }

            //排除空条件
            if(where_clause.trim())
                where_clause= dataMark+'=>'+where_clause;
            if(order_clause.trim())
                order_clause= dataMark+'=>'+order_clause;

            //用正则捕获选取的字段 TODO
            var cols=query.match(/^select\s+(.+)\s+from/);
            if(cols.length && cols.length>1){
                cols=cols[1].trim();
                if(cols.trim()=='*'){
                    columns[0]='';
                }else{
                    columns=cols.split(/,\s+/gm); //最终选了,和空格,是否改为;分割?
                    var j=columns.length
                    for(var i=0;i<j;i++)
                        columns[i]=dataMark+'=>'+columns[i];
                }
            }
            
            eval('var data='+dataName); 
            //this[dataName] 用this指向上下文，需要使用时将数据挂在某对象上。 
            //或者直接传入第二个Linq参数data引用数据源
            
            return function(){
                return [].select.apply(data.where(where_clause).orderby(order_clause,desc),columns); //cols用select.apply(data,colsArr)传多个字段
            };
        }
            // "select d.name, d.age from datas d where d.age>25 && d.name!='tom' order by d.age desc";
            // 这样的写法其实已经不能成立， columns分隔依赖select的多项合并，和数组combine方法
            //select('d=>d.name','d=>d.age') //这里需要讲两次循环的数组结果项concat，因为性能已经放弃，并且单项还是数组不是对象
            //select('d=>{姓名:d.name,年龄:d.age}') //解析为这样的理想形式需要键名
            //或者这样写
            //"select {姓名:d.name,年龄:d.age－1} from datas d where d.age%2==0"
            //"select [d.name,d.age] from datas d"
    };






},{}]},{},[3]);
