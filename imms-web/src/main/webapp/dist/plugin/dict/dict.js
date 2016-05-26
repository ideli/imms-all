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
                var data = [
                    {id: '330000',name:'浙江省', pId: null},
                    {id: '330100',name:'杭州市', pId: '330000'},
                    {id: '330200',name:'宁波市', pId: '330000'},
                    {id: '330300',name:'温州市', pId: '330000'},
                    {id: '440000',name:'广东省', pId: null},
                    {id: '440100',name:'广州市', pId: '440000'},
                    {id: '440300',name:'深圳市', pId: '440000'}
                ];
                initTreeDict(target, data, initValue);
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
            url: '/api/dict/' + root,
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
        key: {},
        simpleData: {
            enable: true
        }
    },
    callback: {
        onDblClick: function (event, treeId, treeNode) { //鼠标双击选中
            $('#'+currentDictId).val(treeNode.id);
            $('#'+currentDictId + '_displayValue').val(treeNode.name);
            window.dictWin.$close();
        },
        onClick:function(event, treeId, treeNode){ //鼠标单击展开
            zTreeObj.expandNode(treeNode, !treeNode.open, false, false);
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
                        <span class="treeButton" id="{target_id}_treeButton">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
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

        $('#'+target_id+'_treeButton').bind("click", function(e){
            var x = e.pageX-100;
            var y = e.pageY+15;
            $('#baseTree').remove();
            $('<ul id="baseTree" class="ztree"></ul>').appendTo('body').hide();
            window.dictWin = $open('#baseTree',{width:320,height:500, top:y,left:x});
            window.currentDictId = target_id;
            zTreeObj = $.ztree.init($('#baseTree'), setting, data);
        });

}