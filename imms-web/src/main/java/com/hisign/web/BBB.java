package com.hisign.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author wangping
 * @version 1.0
 * @since 2016/4/2 22:00
 */
@RequestMapping("/bbb")
@Controller
public class BBB {

    @RequestMapping("getList")
    @ResponseBody
    public List<String> getList() {
        List<String> list = new ArrayList<>();
        list.add("111");
        list.add("222");
        return list;
    }

    @RequestMapping("getMap")
    @ResponseBody
    public Map<String, Object> getMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("111", 111);
        map.put("222", 222);
        map.put("333", true);
        map.put("444", 444L);
        map.put("555", 333.55D);
        List<String> list = new ArrayList<>();
        list.add("111");
        list.add("222");
        map.put("666", list);
        return map;
    }
}
