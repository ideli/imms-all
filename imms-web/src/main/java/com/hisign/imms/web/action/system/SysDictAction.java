package com.hisign.imms.web.action.system;


import com.github.pagehelper.Page;
import com.hisign.imms.api.system.SysDictService;
import com.hisign.imms.api.system.SysUserService;
import com.hisign.imms.model.SysUser;
import com.hisign.imms.model.system.Dict;
import com.hisign.imms.web.bind.annotation.CurrentUser;
import org.apache.shiro.cache.CacheManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * 字典
 */
@Controller
public class SysDictAction {

	@Resource
	private SysDictService sysDictService;

	@RequestMapping(value="/api/dict/{root}", method= RequestMethod.GET)
	@ResponseBody
	public List<Dict> singleDict(@PathVariable("root") String root,@CurrentUser SysUser user) {
		List<Dict> list = sysDictService.querySingleDictByRoot(root);
		return list;
	}

}
