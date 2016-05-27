package com.hisign.imms.persist.mapper.system;

import com.hisign.imms.model.SysUser;
import com.hisign.imms.model.system.Dict;

import java.util.List;

/**
 * 字典查询
 */
public interface SysDictMapper {

    List<Dict> querySingleDictByRoot(String root);

    List<Dict> queryMultiDictByRoot(String root);

}


