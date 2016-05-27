/**
 * 系统字典控件
 * @param customData 自定义数据
 */
typeof $style==='function'&& $style((top.path||'')+'/dist/plugin/dict/dict.css');

$.fn.dict = function(initValue, customData){
    var _target = $(this);
    $.each(_target, function(i, o) {
        var target = $(o);
        var root = target.attr('root'); //字典类型
        var type = target.attr('type'); //字典展示方式
        //下拉字典
        if(type === 'select') {
            var data = getDataForDict(target, customData);
            initSelectDict(target, data, initValue);
        }else if(type === 'tree'){
            importing('ztree',function() {
                var data = localData.get(type + '_' + root);
                if(data === undefined){
                    $.ajax({
                        type: 'get',
                        url: '/api/dict/multi/' + root,
                        data: {},
                        async: true,//同步
                        success: function (remoteData) {
                            data = remoteData;
                            localData.set(type + '_' + root, data);
                            initTreeDict(target, data, initValue);
                        }
                    });
                }else{
                    initTreeDict(target, data, initValue);
                }

                //var data = [
                //    {key: '330000',value:'浙江省', parentKey: null},
                //    {key: '330100',value:'杭州市', parentKey: '330000'},
                //    {key: '330200',value:'宁波市', parentKey: '330000'},
                //    {key: '330300',value:'温州市', parentKey: '330000'},
                //    {key: '440000',value:'广东省', parentKey: null},
                //    {key: '440100',value:'广州市', parentKey: '440000'},
                //    {key: '440300',value:'深圳市', parentKey: '440000'}
                //];

            });
        }
    });
    return _target;
}


/**
 * 下拉字典选中给定值
 * @param initValue
 */
$.fn.dictSelect = function(initValue){
    var _target = $(this);
    $.each(_target, function(i, o) {
        $(o).find('option[value="'+initValue+'"]').attr("selected", true);
    });
}

/**
 * 获取字典数据
 * @param root
 * @returns {{root: *, items: *}}
 */
function getDataForDict(target, customData){
    var root = target.attr('root');
    var type = target.attr('type');
    if(customData != undefined){
        return  {root:'customData', items:customData};
    }
    var data = localData.get(type + '_' + root);
    if(data === undefined) {
        $.ajax({
            type: 'get',
            url: '/api/dict/single/' + root,
            data: {},
            async: false,//同步
            success: function (remoteData) {
               data = remoteData;
               localData.set(type + '_' + root, data);
            }
        });
    }
    return {root:root, items:data};
}

/**
 * 初始化下拉字典
 * @param target
 * @param data
 */
function initSelectDict(target, data, initValue){
    var target_id = target.attr('id') || 'id_'+ Math.floor(Math.random()*100000);
    var target_name = target.attr('name') || 'name_' + Math.floor(Math.random()*100000);
    data.id = target_id;
    data.name = target_name;
    if(target.attr('id') === target_id){
        target.removeAttr('id');
    }
    if(target.attr('name') === target_name){
        target.removeAttr('name');
    }
    var isEmpty = target.attr('empty');
    var returnValue = target.attr('return-value');
    var template = '<select name="{name}" id="{id}">';
    if(isEmpty !== 'false'){
       template += '<option value=""></option>';
    }
    var _value = returnValue === 'true'?'value':'key';
    template += '{{items:#<option class="abc" value="{' + _value + '}">{value}</option>#}}';
    template += '</select>';
    target.html($compile(template,data));

    if(initValue !== undefined){
        $('#'+target_id +' option[value="'+initValue+'"]').attr("selected", true);
    }
}

var zTreeObj ;
var setting = {
    data: {
        key: {
            id: 'key',
            name: 'value'
        },
        simpleData: {
            enable: true,
            idKey: "key",
            pIdKey: "parentKey",
            rootPId: 0
        }
    },
    callback: {
        onDblClick: function (event, treeId, treeNode) { //鼠标双击选中
            $('#'+currentDictId).val(treeNode.key);
            $('#'+currentDictId + '_displayValue').val(treeNode.value);
            window.dictWin.$close();
        },
        onClick:function(event, treeId, treeNode){ //鼠标单击展开
            zTreeObj.expandNode(treeNode, !treeNode.open, false, false);
            window.currentDictNode = treeNode;
        }
    },
    view: {
        showIcon: false,
        fontCss: getFontCss
    }
};


function getFontCss(treeId, treeNode) {
    return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}


function initTreeDict(target, data, initValue){
        var target_id = target.attr('id') || 'id_'+ Math.floor(Math.random()*100000);
        var target_name = target.attr('name') || 'name_' + Math.floor(Math.random()*100000);
        var template = '<input type="text" readonly="readonly" name="{target_name}_displayValue" id="{target_id}_displayValue">\
                        <input type="hidden" name="{target_name}" id="{target_id}">\
                        <a href="#" id="{target_id}_treeButton"><i class="icon-circle-arrow-right"></i></a>';
        if(target.attr('id') === target_id){
            target.removeAttr('id');
        }
        if(target.attr('name') === target_name){
            target.removeAttr('name');
        }
        var config = {
            target_name: target_name,
            target_id: target_id
        }
        target.html($compile(template,config));

        /*
        $('#'+target_id+'_treeButton').bind("click", function(e){
            var x = e.pageX-100;
            var y = e.pageY+15;
            $('#baseTree').remove();
            $('<ul id="baseTree" class="ztree"><a href="#">确定</a><a href="#">选择空值</a></ul>').appendTo('body').hide();
            window.dictWin = $open('#baseTree',{width:320,height:500, top:y,left:x});
            window.currentDictId = target_id;
            zTreeObj = $.ztree.init($('#baseTree'), setting, data);
        });
        */

    $('#'+target_id+'_treeButton').bind("click", function(e){
        var x = e.pageX-100;
        var y = e.pageY+15;
        $('#baseTree').remove();
        window.currentDictId = target_id;
        window.dictWin = $open(top.path + '/dist/plugin/dict/dict-tree.html', {title:'多级字典',width:320,height:500, top:y,left:x}, true, function(){
            zTreeObj = $.ztree.init($('#baseTree'), setting, data);
        });
    });
}

function treeDictOk(){
    if(window.currentDictNode === undefined ){
        alert('请选择字典节点');
        return;
    }
    $('#'+currentDictId).val(window.currentDictNode.key);
    $('#'+currentDictId + '_displayValue').val(window.currentDictNode.value);
    window.dictWin.$close();
}

function  treeDictEmpty(){
    $('#'+currentDictId).val('');
    $('#'+currentDictId + '_displayValue').val('');
    window.dictWin.$close();
}