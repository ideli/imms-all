package com.hisign.imms.imms.imms.system.users.dao;

import com.hisign.imms.imms.model.SysUser;

import java.util.List;

/**
 * 用户管理
 * @author wangping
 * @version 1.0
 * @since 2016/4/22 14:46
 */
public interface SysUserMapper {

    /**
     * 根据用户信息取得对应的列表
     * @param user
     * @return
     */
    List<SysUser> findSysUserListByFilter(SysUser user);

    /**
     * 根据用户名取得对应的用户信息
     * @param userName
     * @return
     */
    SysUser findSysUserByUserName(String userName);
}
