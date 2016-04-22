package com.hisign.system.users.action;


import com.github.pagehelper.Page;
import com.hisign.model.SysUser;
import com.hisign.system.users.service.SysUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 用户action
 * @author wangping
 * @version 1.0
 * @since 2016/4/21 11:54
 */
@Controller
public class SysUserAction {

	@Resource
	private SysUserService sysUserService;

	@RequestMapping("api/users/getUserPage")
	@ResponseBody
	public Page<SysUser> getList() {
		SysUser user = new SysUser();
		Page<SysUser> page = sysUserService.findSysUserListByFilter(user);
		return page;
	}
}
