package com.hisign.imms.web.action.system;


import com.github.pagehelper.Page;
import com.hisign.imms.api.system.SysUserService;
import com.hisign.imms.model.SysUser;
import com.hisign.imms.model.system.Dict;
import com.hisign.imms.web.bind.annotation.TranslateObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Map;

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
	public Page<SysUser> getList(@TranslateObject Map map) {
		SysUser user = new SysUser();
		Page<SysUser> page = sysUserService.findSysUserListByFilter(user);
		return page;
	}

	@RequestMapping("api/sys/users/comm")
	public void commitTets(@TranslateObject SysUser user, @TranslateObject Dict dict){

	}

}
