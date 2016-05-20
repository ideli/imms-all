
//for null,undefined,number,xss and others
function $encode(str,desc4null){
    var dic={'<':'&lt;','>':'&gt;','"':'&quot',"'":'‘',':':'：'};//&#39; &apos;
    // 除非显示设定为false，否则数字0会做‘’处理(字符串'0'不会)
    if($encode.zeroAsEmpty!==false && str===0){
        return '';
    }
    // 0做空处理，但不使用空值描述
    if(str==null || str=='null' || str=='NULL'){
        return desc4null||'';
    }
    str =   $encode.allowHTML ? String(str).replace(/\<\/?script[^\>]*\>/gmi,function(s){return s.replace(/\<|\>/gm,function($){return dic[$]})})
        : String(str).replace(/\<|\>/gm,function($){return dic[$]});
    //后台没做转义才开启，避免性能消耗
    return $encode.tranSymbol ? str.replace(/\"\'\{\}\:/gm,function($){return dic[$];}):str;
}
//core
function $compile(source,data,arg2,arg3) {
    var desc4null;
    var helper;
    if(typeof arg2=='string'){
        desc4null=arg2;
        typeof arg3=='function' && (helper=arg3);
    }else{
        typeof arg2=='function' && (helper=arg2);
    }
    var the=this;
    if(!source){
        throw new Error('source undefined! please chekout the template id or url!');
    }
    var format=function (obj,str,prefix) {
        if(obj==null || (typeof obj.pop=='function' && obj.length==0)){
            return '';
        }else if(typeof obj=='object'){
            var keys='';
            for(var n in obj) keys+=n;
            if(!keys) return '';
        }
        prefix=prefix||'';
        //{{arr:#tp2}}
        str=str.replace(/{{\w*:?#[\w\-]+}}|{{\w*:?#[^#].+#}}/g,function(g){
            g=g.replace(/{{|}}/gm,'').replace(/^\s+|\s+$/gm,'');
            var d,t,e,i=g.indexOf(':');
            if(i>-1){
                d=g.slice(0,i);
                if(g.lastIndexOf('#')==g.length-1){
                    t=g.slice(i+2,-1);
                }else{
                    t=$(g.slice(i+1)).html();
                    e=$(g.slice(i+1)).attr('desc4null');
                }
                return obj[d]?$compile(t,obj[d],e||desc4null):'';
            }else{
                return $(g).html()||(typeof console=='object' && console.error('can`t find the inlaid template: '+id))||'';
            }
        });

        str=str.replace(/{[A-z]+(\.?\w+)*}/gm,function(key){
            var val=obj;
            var arr=key.slice(1,-1).split('.');
            //console.warn(key)
            for(var i=0;i<arr.length;i++){
                //如果是this则指向代入的this, 直接赋值走向下个属性
                if(i==0 && arr[i]=='this'){
                    val=the;
                    continue;
                }
                if(typeof val=='number' && arr[i]=='length'){
                    //val=val;
                }else{
                    val=typeof val[arr[i]]=='function'? val[arr[i]]():val[arr[i]];
                }
                if((val==null||val=='null' || val=='NULL') && typeof arr[i+1]!='undefined'){
                    val='';
                }
                //console.info('一次循环结束\n\n  ')
            }
            return $encode(val,desc4null);
            //return the[key.replace(/{|}|(this)|\./g,'')];
        });
        return str;
    }
    data = typeof data.pop=='function' ? data : [data];
    var i=0,j=data.length,sb=[];
    for(;i<j;i++){
        helper && !data[i]._done_ && helper(data[i],i) && (data[i]._done_=true);
        sb.push(format(data[i],source).replace(new RegExp('{$index}','g'),i+1).replace(new RegExp('{$native_index}','g'),$encode(i)).replace(new RegExp('{$nth2}','g'),i%2==1?'nth-even':'nth-odd'));
    }
    return sb.join('');
}
//seal4quick
var $template=(function($){
    var cache={};
    return function (container,data,arg2,arg3){
        var $container=$(container);
        var source=$container[0].getAttribute('tpsource')||container;
        if(cache[source]){
            return $container.html($compile.apply(this,[cache[source],data,arg2,arg3]));
        }else if(source.indexOf('#')==0){
            cache[source]=$(source).html();
            return $container.html($compile.apply(this,[cache[source],data,arg2,arg3]));
        }else{
            $.get(source,function(res){
                cache[source]=res;
                $container.html($compile.apply(this,[res,data,arg2,arg3]));
            });
            return $container;
        }
    }
})(window.jQuery);

// 这个方法和$compile一样暴露出来，供特殊情况时手动使用。
function $makeTemplate(tempstr,colsData,isHead){
    var wrapArr = isHead ? ['<thead>','','</thead>']:['<tr>','','</tr>'];
    tempstr = $compile(tempstr,colsData,'nullkey');
    isHead ||  (tempstr = tempstr.replace(/\[/g,'{').replace(/\]/g,'}'));
    wrapArr[1] =  tempstr ;
    return wrapArr.join('');
}

// 执行有权限列配置的template注入生成
var $templatePlus=(function($){
    var singleTable='<td class="{labelClass} {name}-lable">{label}</td><td class="{valClass} {name}-val">[{name}]</td>';
    var commonBody='<td class="{valClass} {name}-val">[{name}]</td>';
    var commonHead='<th class="{labelClass} {name}-lable">{label}</th>';
    var commonForm='<div class="stp-cell {name}-cell"><div class="stp-label {labelClass} {name}-lable">{label}</div><div class="stp-val {vallClass} {name}-val">[{name}]</div></div>';
    return function (container,config,data,desc4null){
                var tempHead;
                var tempBody;
                var html = '';
                if(config.type=='map'){              
                    tempBody=$makeTemplate(commonForm,config.cols);
                    html=$compile(tempBody,data);
                }else{
                    tempHead=$makeTemplate(commonHead,config.cols,true);
                    tempBody=$makeTemplate(commonBody,config.cols);
                    html=tempHead + '<tbody>'+$compile(tempBody,data)+'</tbody>'; 
                }
                $(container).html(html);
            }
})(window.jQuery);

var stp={
    $encode:$encode,
    $compile:$compile,
    $template:$template,
    $templatePlus:$templatePlus,
    $makeTemplate:$makeTemplate
}
//window.extending(obj);
if ( typeof module === "object" && typeof module.exports === "object" )module.exports=stp;