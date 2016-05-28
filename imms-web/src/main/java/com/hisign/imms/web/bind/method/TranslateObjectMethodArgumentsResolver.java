package com.hisign.imms.web.bind.method;

import com.alibaba.fastjson.JSON;
import com.hisign.imms.web.bind.annotation.CurrentUser;
import com.hisign.imms.web.bind.annotation.TranslateObject;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * 用于绑定@TranslateObject的方法参数解析器
 * @author wangping
 * @version 1.0
 * @since 2016/5/28 10:19
 */
public class TranslateObjectMethodArgumentsResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(TranslateObject.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        TranslateObject translateObjectAnnotation = parameter.getParameterAnnotation(TranslateObject.class);
        Object obj = JSON.parseObject(webRequest.getParameter(translateObjectAnnotation.valueName()), Class.forName(translateObjectAnnotation.className()));
        return obj;
    }
}
