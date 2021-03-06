/**
 * Created by evans on 16/5/25.
 */

window.version=top.version;
window.path=top.path;
//简单加载样式 304改为走200，缓存10天
window.$style=function(src,cb){
    //src.match(/^http|^\.|^\//)!=null || (src=top.path+'/style/'+src);
    src.match(/\.css$/i)!=null || (src+='.css');
    //src+='?version='+Date.format('YYYYMMDD').slice(0,-1);
    var link=document.createElement("link");
    link.rel="stylesheet";
    link.type="text/css";
    link.media="screen";
    link.href=src+(version?'?version='+version:'');
    document.head.appendChild(link);
    cb && cb.call(link);
};

window.$script=function (src,cb){
    var bol=false;
    var tag=document.createElement("script");
    tag.type="text/javascript";
    tag.language="javascript";
    //tag.setAttribute('async','async');
    //tag.setAttribute('defer','defer');
    src.match(/\.js$/i)!=null || (src+='.js');
    tag.src=src+(version?'?version='+version:'');
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
};

window.importing=function(){
    var ags=arguments;
    var ag=ags[0];
    if(typeof ag!='string'){
        typeof ag=='function' && ag();
        return false;
    }
    //无路径
    if(ag.indexOf('/')<0){
        if(ag.match(/.*.css$/i)){
            ag=(top.path||'')+'/dist/css/'+ag;
        }
        else if(ag.match(/.*.js$/i)){
            ag=(top.path||'')+'/dist/js/'+ag;
        }
        else{
            //识别插件
            var plugins=window.config.plugins;
            if(plugins[ag]){
                ag=(top.path||'')+'/dist/plugin/'+plugins[ag];
            }
        }
    }
    //识别加载方式
    window[ag.match(/.*\/css\/.+|.css$/i)?'$style':'$script'](ag,function(){
        window.importing.apply(this,[].slice.call(ags,1));
    })
}