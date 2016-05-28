package com.hisign.imms.web.action.sys.dlyhgl;


import com.hisign.imms.api.sys.DlyhglService;
import com.hisign.imms.model.sys.DlyhglFilter;
import com.hisign.imms.web.bind.annotation.TranslateObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Map;

/**
 *登录用户管理action
 * @author jiangpeng
 * @version 1.0
 * @since 2016/5/28 10:15
 */
@Controller
@RequestMapping(value="/api")
public class DlyhglListAction {
    @Resource
    private DlyhglService dlyhglService;

    /**
     * 获得登录用户管理列表数据
     * @param filter
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/sys/getDlyhglPage", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public Map<String,Object> getDlyhglList(@TranslateObject DlyhglFilter filter) throws InterruptedException {
        Map<String,Object> map = dlyhglService.findDLyhglListByFilter(filter);
        return map;
    }


}
