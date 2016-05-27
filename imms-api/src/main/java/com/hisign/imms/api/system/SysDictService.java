package com.hisign.imms.api.system;

import com.github.pagehelper.Page;
import com.hisign.imms.model.SysUser;
import com.hisign.imms.model.system.Dict;

import java.util.List;

/**
 * 系统字典数据服务接口
 */
public interface SysDictService {

    public List<Dict> querySingleDictByRoot(String root);

    public List<Dict> queryMultiDictByRoot(String root);

    public Dict queryDictByKey(String root, String key);

    public List<Dict> queryDictListByKeys(String root, String keys);
}
