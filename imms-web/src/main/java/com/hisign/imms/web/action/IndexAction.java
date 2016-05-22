package com.hisign.imms.web.action;

import com.alibaba.fastjson.JSON;
import com.hisign.imms.model.SysUser;
import com.hisign.imms.web.action.excel.Person;
import com.hisign.imms.web.bind.annotation.CurrentUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

/**
 * 登录后的准备action
 * @author wangping
 * @version 1.0
 * @since 2016/4/20 9:45
 */
@Controller
public class IndexAction {

    @RequestMapping("/index")
    public String index(@CurrentUser SysUser user, Model model) {
        List<Person> list = new ArrayList<>();
        list.add(new Person("name1", 1, "01"));
        list.add(new Person("name2", 2, "02"));
        model.addAttribute("menus", JSON.toJSONString(list));
        return "index";
    }
}
