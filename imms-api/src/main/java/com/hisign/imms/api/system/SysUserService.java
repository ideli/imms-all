package com.hisign.imms.api.system;

import com.github.pagehelper.Page;
import com.hisign.imms.model.SysUser;

/**
 * 用户信息接口
 * @author wangping
 * @version 1.0
 * @since 2016/4/22 14:51
 */
public interface SysUserService {
    /**
     * 根据用户信息取得对应的列表
     * @param user
     * @return
     */
    Page<SysUser> findSysUserListByFilter(SysUser user);

    /**
     * 根据用户名取得对应的用户信息
     * @param userName
     * @return
     */
    SysUser findSysUserByUserName(String userName);
}
