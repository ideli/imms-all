package com.hisign.imms.persist.mapper.basic.modstate;

import com.hisign.imms.model.basic.modstate.ModState;

import java.util.List;

/**
 * Created by Jiang on 2016/5/26.
 */
public interface ModStateMapper {
    List<ModState> findModStateListByFilter(ModState modState);

    List<ModState> findModState();
}
