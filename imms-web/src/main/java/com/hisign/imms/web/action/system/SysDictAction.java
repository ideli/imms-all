package com.hisign.imms.web.action.system;


import com.github.pagehelper.Page;
import com.hisign.imms.api.system.SysDictService;
import com.hisign.imms.api.system.SysUserService;
import com.hisign.imms.model.SysUser;
import com.hisign.imms.model.system.Dict;
import com.hisign.imms.web.bind.annotation.CurrentUser;
import org.apache.shiro.cache.Cache;
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

	@Resource
	private  CacheManager cachePool;

	@RequestMapping(value="/api/dict/single/{root}", method= RequestMethod.GET)
	@ResponseBody
	public List<Dict> singleDict(@PathVariable("root") String root) {
		List<Dict> list = sysDictService.querySingleDictByRoot(root);
		return list;
	}

	@RequestMapping(value="/api/dict/multi/{root}", method= RequestMethod.GET)
	@ResponseBody
	public List<Dict> multiDict(@PathVariable("root") String root) {
		Cache cache = cachePool.getCache("xjpt:");
		List<Dict> list = (List<Dict>)cache.get(root);
		if(list == null){
			list = sysDictService.queryMultiDictByRoot(root);
			cache.put(root, list);
		}
		return list;
	}

	@RequestMapping(value="/api/dict/{root}/{key}", method= RequestMethod.GET)
	@ResponseBody
	public Dict getDictByKey(@PathVariable("root") String root, @PathVariable("key") String key) {
		Dict dict = this.sysDictService.queryDictByKey(root, key);
		return dict;
	}

	@RequestMapping(value="/api/dict/{root}/keys/{keys}", method= RequestMethod.GET)
	@ResponseBody
	public List<Dict> getDicstByKeys(@PathVariable("root") String root, @PathVariable("keys") String keys) {
		List<Dict> list = this.sysDictService.queryDictListByKeys(root, keys);
		return list;
	}




}
