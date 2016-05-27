package com.hisign.imms.service.impl.system;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.hisign.imms.api.system.SysUserService;
import com.hisign.imms.model.SysUser;
import com.hisign.imms.persist.mapper.system.user.SysUserMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.ws.rs.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 用户信息接口实现
 * 访问方法：
 * rmi：通过spring访问
 * webservice：http://localhost:8023/com.hisign.imms.api.system.SysUserService?wsdl
 * rest：http://localhost:8022/users/sys
 * @author wangping
 * @version 1.0
 * @since 2016/4/22 14:53
 */
@Path("users")
@Service("sysUserService")
public class SysUserServiceImpl implements SysUserService {

    @Resource
    private SysUserMapper sysUserMapper;

    @Override
    public Page<SysUser> findSysUserListByFilter(SysUser user) {
        PageHelper.startPage(1, 500);
        List<SysUser> list = sysUserMapper.findSysUserListByFilter(user);
        return (Page<SysUser>) list;
    }

    @GET
    @Path("{username}")
    @Produces({"application/json;charset=UTF-8"})
    public SysUser findSysUserList(@PathParam("username") String username) {
        SysUser user = sysUserMapper.findSysUserByUserName(username);
        return user;
    }

    @GET
    @Path("list")
    @Produces({"application/json;charset=UTF-8"})
    public List<SysUser> findSysUserList2() {
        List<SysUser> list = new ArrayList<SysUser>();
        SysUser user = null;
        for(int i=0;i<10;i++){
            user = new SysUser();
            user.setId(i+"_1233456789");
            user.setUserName("test"+i);
            list.add(user);
        }
        return list;
    }

    @Override
    public SysUser findSysUserByUserName(String userName) {
        return sysUserMapper.findSysUserByUserName(userName);
    }
}
