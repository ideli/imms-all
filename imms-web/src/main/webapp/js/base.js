

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

    !window._mol_wins && window.extending({_mol_wins:{}});

    window.getting({
        doc:function(){return document},
        width:function(){return this.innerWidth;},
        height:function(){return this.innerHeight;},
        scrollTop:function(){return document.documentElement.scrollTop||document.body.scrollTop;},
        scrollLeft:function(){return document.documentElement.scrollLeft||document.body.scrollLeft;},
        iframe:function(){
            var frs=parent.document.getElementsByTagName('iframe');
            for(var i=frs.length-1;i>-1;i--){
                if(frs[i].contentWindow==self){return frs[i];}
            }
            return null;
        }
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
        format:function(fmt){return new Date().format(fmt);}
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
                        str=str.replace(RegExp(agmt,'g'),arguments[i]);
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
    var $=require('../lib/jquery');
    var $eui=require('../lib/eui');
    var $cookie=require('../lib/jquery.cookie');
    var $autoComolete=require('../lib/jquery.autocompleteplus');
    var exy=require('../lib/exy');
    var lambda=require('../lib/lambda');
    var exdefJquery=require('../lib/exDefJquery');
    var exdefEasyui=require('../lib/exDefEasyui');

    window.extending({config:config});
    $eui($);
    $cookie($);
    $autoComolete($);
    window.extending({$:$,jQuery:$});
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
    //window.importing('/webapp/dist/css/base');

    if ( typeof module === "object" && typeof module.exports === "object" ){
        module.exports={
            log:function(n){log(n);},
            info:function(n){info(n);}
        }
    }