package com.hisign.imms.service.impl.system;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.hisign.imms.api.system.SysUserService;
import com.hisign.imms.model.SysUser;
import com.hisign.imms.persist.mapper.system.user.SysUserMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 用户信息接口实现
 * @author wangping
 * @version 1.0
 * @since 2016/4/22 14:53
 */
@Service("sysUserService")
public class SysUserServiceImpl implements SysUserService {

    @Resource
    private SysUserMapper sysUserMapper;

    @Override
    public Page<SysUser> findSysUserListByFilter(SysUser user) {
        PageHelper.startPage(1, 10);
        List<SysUser> list = sysUserMapper.findSysUserListByFilter(user);
        return (Page<SysUser>) list;
    }

    @Override
    public SysUser findSysUserByUserName(String userName) {
        return sysUserMapper.findSysUserByUserName(userName);
    }
}
