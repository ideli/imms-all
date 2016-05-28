package com.hisign.imms.api.sys;

import com.github.pagehelper.Page;
import com.hisign.imms.model.sys.Dlyhgl;
import com.hisign.imms.model.sys.DlyhglFilter;

import java.util.Map;

/**
 * Created by Jiang on 2016/5/26.
 */
public interface DlyhglService {
    Map<String,Object> findDLyhglListByFilter(DlyhglFilter dlyhgl);

}

