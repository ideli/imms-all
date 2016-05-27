/**
 * 系统字典控件
 * @param customData 自定义数据
 */
typeof $style==='function'&& $style((top.path||'')+'/dist/plugin/dict/dict.css');


$.fn.dict = function(customData){
    var _target = $(this);
    $.each(_target, function(i, o) {
        var target = $(o);
        var root = target.attr('root'); //字典类型
        var type = target.attr('dict-type'); //字典展示方式
        var dictData = null; //
        //下拉字典
        if(type === 'select') {
            var remoteUrl = '/api/dict/single/'+root;

            if(customData != undefined){
                dictData = customData; //自定义数据
            }else{
                dictData = localData.get(remoteUrl);//本地存储数据
            }
            if(dictData != null){
                initSelectDict(target, dictData);//初始化下拉字典
            }else{
                getDictDataFromRemote(remoteUrl, target, initSelectDict); //服务器查询数据后初始化
            }

        }else if(type === 'tree'){
            var remoteUrl = '/api/dict/multi/'+root;

            if(customData != undefined){
                dictData = customData; //自定义数据
            }else{
                dictData = localData.get(remoteUrl);//本地存储数据
            }
            if(dictData != null){
                initTreeDict(target, dictData);//初始化树形字典
            }else{
                getDictDataFromRemote(remoteUrl, target, initTreeDict); //服务器查询数据后初始化
            }
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
        //链式调用 o 代表 <dict></dict>对象
        var type = $(o).attr('dict-type') || $(o).parent().attr('dict-type') || $(o).parent().parent().attr('dict-type');
        var root = $(o).attr('root') || $(o).parent().attr('root') || $(o).parent().parent().attr('root');
        var returnValue = $(o).attr('return-value') || $(o).parent().attr('return-value') || $(o).parent().parent().attr('return-value');
        var multiple = $(o).attr('dict-multiple') || $(o).parent().attr('dict-multiple') || $(o).parent().parent().attr('dict-multiple');

        if(type === 'select'){
            $(o).find('option[value="'+initValue+'"]').attr("selected", true);
        }else{
            if(root === 'custom'){
               alert('自定义数据树形字典初始化值暂未开发');
            }else{
                if(returnValue === 'true'){
                    if($(o).attr('dict-type')){
                        $(o).find('input[type="text"]').val(initValue);
                        $(o).find('input[type="hidden"]').val(initValue);
                    }else{
                        $(o).parent().find('input[type="text"]').val(initValue);
                        $(o).parent().find('input[type="hidden"]').val(initValue);
                    }
                }
                if(multiple === 'true'){
                    getDictListByKeys(root, initValue, function(list){
                        if(list.length > 0){
                            var values = ''
                            $.each(list, function(i, dict){
                                values += dict.value + '、';
                            });
                            if(values.indexOf('、')>-1){
                                values = values.substring(0, values.length-1);
                            }
                            if($(o).attr('dict-type')){
                                $(o).find('input[type="text"]').val(values);
                                $(o).find('input[type="hidden"]').val(initValue);
                            }else{
                                $(o).parent().find('input[type="text"]').val(values);
                                $(o).parent().find('input[type="hidden"]').val(initValue);
                            }
                        }
                    });
                }else{
                    getDictByKey(root, initValue, function(dict){
                        if(dict){
                            if($(o).attr('dict-type')){
                                $(o).find('input[type="text"]').val(dict.value);
                                $(o).find('input[type="hidden"]').val(initValue);
                            }else{
                                $(o).parent().find('input[type="text"]').val(dict.value);
                                $(o).parent().find('input[type="hidden"]').val(initValue);
                            }
                        }
                    });
                }

            }
        }
    });
}



/**
 * 服务器查询字典数据
 * @param url 查询URL
 * @param target 字典对象
 * @param cb 回调
 */
function getDictDataFromRemote(url, target, cb){
    $.ajax({
        type: 'get',
        url:  url,
        data: {},
        success: function (remoteData) {
            cb(target, remoteData);
            if(remoteData !=null && remoteData.length > 0){
                localData.set(url, remoteData);
            }
        }
    });
}

/**
 * 根据key查询字典信息
 * @param root
 * @param key
 * @param cb
 */
function getDictByKey(root, key, cb){
    if(root==null || key==null) return null;
    $.ajax({
        type: 'get',
        url:  '/api/dict/'+root+'/'+key,
        data: {},
        success: function (dict) {
            cb(dict);
        }
    });
}

/**
 * 根据key查询字典信息
 * @param root
 * @param key
 * @param cb
 */
function getDictListByKeys(root, keys, cb){
    if(root==null || keys==null) return null;
    $.ajax({
        type: 'get',
        url:  '/api/dict/'+root+'/keys/'+keys,
        data: {},
        success: function (list) {
            cb(list);
        }
    });
}




/**
 * 初始化下拉字典
 * @param target
 * @param data
 */
function initSelectDict(target, data){
    var target_id = target.attr('id') || 'id_'+ Math.floor(Math.random()*100000);
    var target_name = target.attr('name') || 'name_' + Math.floor(Math.random()*100000);
    target.attr('id', 'select_'+target_id);
    target.attr('name' , 'select_'+target_name);
    var isEmpty = target.attr('empty');
    var returnValue = target.attr('return-value');
    var template = '<select name="{name}" id="{id}">';
    if(isEmpty !== 'false'){
       template += '<option value=""></option>';
    }
    var _value = returnValue === 'true'?'value':'key';
    template += '{{items:#<option class="abc" value="{' + _value + '}">{value}</option>#}}';
    template += '</select>';
    data = {
        id: target_id,
        name: target_name,
        items: data
    };
    target.html($compile(template,data));
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
            var key = treeNode.key;
            var value = treeNode.value;
            if(currentDictMultiple){
                var oldValue = $('#selectedValues').val();
                var oldKey = $('#selectedKeys').val();
                if(oldKey.indexOf(key)==-1 ){//&& oldValue.indexOf(value)==-1
                    var newValue = "";
                    var newKey = "";
                    if(oldValue==""){
                        newValue = value ;
                    }else{
                        newValue = oldValue + "、" + value ;
                    }
                    if(oldKey==""){
                        newKey = key ;
                    }else{
                        newKey = oldKey + "," + key ;
                    }
                    jQuery("#selectedValues").val(newValue);
                    jQuery("#selectedValues").attr("title", newValue);
                    jQuery("#selectedKeys").val(newKey);
                }
            }else{
                if(window.currentDictReturn){
                    key = treeNode.value;
                }
                $('#'+currentDictId).val(key);
                $('#'+currentDictId + '_displayValue').val(treeNode.value);
                window.currentDictNode = null;
                window.currentDictReturn = null;
                window.dictWin.$close();
            }

        },
        onClick:function(event, treeId, treeNode){ //鼠标单击展开
            zTreeObj.expandNode(treeNode, true, false, true);
            window.currentDictNode = treeNode;
        }
    },
    view: {
        showIcon: false,
        dblClickExpand: false
    }
};

function initTreeDict(target, data){
        var target_id = target.attr('id') || 'id_'+ Math.floor(Math.random()*100000);
        var target_name = target.attr('name') || 'name_' + Math.floor(Math.random()*100000);
        var template = '<input type="text" readonly="readonly" name="{target_name}_displayValue" id="{target_id}_displayValue">\
                        <input type="hidden" name="{target_name}" id="{target_id}">\
                        <a href="#" id="{target_id}_treeButton"><i class="icon-circle-arrow-right"></i></a>';
        target.attr('id', 'tree_'+target_id);
        target.attr('name' , 'tree_'+target_name);
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
        $('#multipleDiv').remove();
        window.currentDictId = target_id;
        window.currentDictReturn = target.attr('return-value')==='true'?true:false;
        window.currentDictMultiple = target.attr('dict-multiple')==='true'?true:false;
        window.dictWin = $open(top.path + '/dist/plugin/dict/dict-tree.html', {title:'多级字典',width:320,height:500, top:y,left:x}, true, function(){
            if($.ztree){
                initDictZtree(target, data);
            }else{
                importing('ztree',function() {
                    initDictZtree(target, data);
                });
            }
            if(window.currentDictMultiple){
                $('#multipleDiv').show();
            }

        });
    });
}

/**
 * 字典Ztree初始化
 * @param target
 * @param data
 */
function initDictZtree(target, data){
    zTreeObj = $.ztree.init($('#baseTree'), setting, data);
    if(target.attr('root').toUpperCase() === 'GXSDM1'){
        var nodes = zTreeObj.getNodes();
        zTreeObj.expandNode(nodes[0]);
    }
}

/**
 * 多级字典确认
 */
function treeDictOk(){
    var returnKey = '';
    var returnValue = '';
    if(window.currentDictMultiple){
        returnKey = $('#selectedKeys').val();
        returnValue = $('#selectedValues').val();
    }else{
        if(window.currentDictNode != undefined){
            returnKey = window.currentDictNode.key;
            returnValue = window.currentDictNode.value
        }
    }
    if(currentDictReturn){
        returnKey = returnValue;
    }
    if(returnKey == ''){
        alert('请选择字典');
        return;
    }
    $('#'+currentDictId).val(returnKey);
    $('#'+currentDictId + '_displayValue').val(returnValue);
    window.currentDictNode = null;
    window.currentDictReturn = null;
    window.dictWin.$close();

}

/**
 * 多级字典选择空值
 */
function  treeDictEmpty(){
    $('#'+currentDictId).val('');
    $('#'+currentDictId + '_displayValue').val('');
    window.dictWin.$close();
}

function clearMultipleDict(){
    $('#selectedValues').val('');
    $('#selectedValues').attr('title','');
    $('#selectedKeys').val('');
}