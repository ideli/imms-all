package com.hisign.imms.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 登录后的准备action
 * @author wangping
 * @version 1.0
 * @since 2016/4/20 9:45
 */
@Controller
public class IndexAction {

    @RequestMapping("/index")
    public String index() {
        return "index";
    }
}
