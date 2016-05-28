package com.hisign.imms.web.bind.annotation;

import com.hisign.imms.Constants;

import java.lang.annotation.*;

/**
 * 将json字符串转换为对象
 * @author wangping
 * @version 1.0
 * @since 2016/5/28 10:17
 */
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface TranslateObject {

    /**
     * json字符串对应的对象类型名
     * @return
     */
    String className() default "java.util.HashMap";

    /**
     * 传入的json字符串
     * @return
     */
    String valueName() default "jsonStr";
}
