package com.hisign.imms.service.impl.system;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.hisign.imms.api.system.SysDictService;
import com.hisign.imms.api.system.SysUserService;
import com.hisign.imms.model.SysUser;
import com.hisign.imms.model.system.Dict;
import com.hisign.imms.persist.mapper.system.SysDictMapper;
import com.hisign.imms.persist.mapper.system.user.SysUserMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import java.util.ArrayList;
import java.util.List;

@Service("sysDictService")
public class SysDictServiceImpl implements SysDictService {

    @Resource
    private SysDictMapper sysDictMapper;


    @Override
    public List<Dict> querySingleDictByRoot(String root) {
        List<Dict> list = sysDictMapper.querySingleDictByRoot(root.toUpperCase());
        return list;
    }

    @Override
    public List<Dict> queryMultiDictByRoot(String root) {
        List<Dict> list = sysDictMapper.queryMultiDictByRoot(root.toUpperCase());
        return list;
    }
}
