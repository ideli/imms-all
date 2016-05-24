package com.hisign.imms.web.bind;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 单例的公共map，保存跨过滤器、请求的临时变量
 * @author wangping
 * @version 1.0
 * @since 2016/5/24 21:15
 */
@Component
public class CommonMap {

    private CommonMap() {}

    private static Map<String, Object> map = new HashMap<>();

    public static Map<String, Object> getMap() {
        return map;
    }

    public static void setMap(Map<String, Object> map) {
        CommonMap.map = map;
    }
}
