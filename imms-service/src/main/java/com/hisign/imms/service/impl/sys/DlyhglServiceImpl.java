package com.hisign.imms.service.impl.sys;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.hisign.imms.api.sys.DlyhglService;
import com.hisign.imms.model.sys.Dlyhgl;
import com.hisign.imms.model.sys.DlyhglFilter;
import com.hisign.imms.persist.mapper.sys.DlyhglMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Jiang on 2016/5/26.
 */
public class DlyhglServiceImpl implements DlyhglService {
    @Resource
    private DlyhglMapper dlyhglMapper;

    @Override
    public Map<String,Object> findDLyhglListByFilter(DlyhglFilter dlyhgl) {
        Map<String,Object> map = new HashMap<String,Object>();
        try {
            List<Dlyhgl> list = dlyhglMapper.findDLyhglListByFilter(dlyhgl);
            int count = dlyhglMapper.findDLyhglListByFilterForCount(dlyhgl);
            map.put("flag","1");
            map.put("totalCount",count);
            map.put("data",list);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            map.put("flag","0");
            return map;
        }
    }

}
