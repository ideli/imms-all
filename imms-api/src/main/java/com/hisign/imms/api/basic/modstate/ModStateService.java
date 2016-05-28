package com.hisign.imms.api.basic.modstate;

import com.github.pagehelper.Page;
import com.hisign.imms.model.basic.modstate.ModState;

/**
 * Created by Jiang on 2016/5/25.
 */
public interface ModStateService {
    Page<ModState> findModStateListByCondition(ModState modState);
}
