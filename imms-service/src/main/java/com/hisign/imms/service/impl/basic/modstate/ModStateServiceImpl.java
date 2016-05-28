package com.hisign.imms.service.impl.basic.modstate;

import com.github.pagehelper.Page;
import com.hisign.imms.api.basic.modstate.ModStateService;
import com.hisign.imms.model.basic.modstate.ModState;
import com.hisign.imms.persist.mapper.basic.modstate.ModStateMapper;
import org.springframework.stereotype.Service;
import com.github.pagehelper.PageHelper;

import javax.annotation.Resource;
import javax.ws.rs.Path;
import java.util.List;

/**
 * Created by Jiang on 2016/5/26.
 */
@Service("modStateService")
public class ModStateServiceImpl implements ModStateService {
    @Resource
    private ModStateMapper modStateMapper;

    @Override
    public Page<ModState> findModStateListByCondition(ModState modState) {
        PageHelper.startPage(1, 10);
        List<ModState> list = modStateMapper.findModState();
        return (Page<ModState>) list;
    }
}
