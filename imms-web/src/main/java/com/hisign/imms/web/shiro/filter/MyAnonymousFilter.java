package com.hisign.imms.web.shiro.filter;

import org.apache.shiro.web.filter.PathMatchingFilter;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * 自定义的允许任意路径的过滤器
 * @author wangping
 * @version 1.0
 * @since 2016/5/24 21:50
 */
public class MyAnonymousFilter extends PathMatchingFilter {
    @Override
    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        ShiroHttpServletRequest req = (ShiroHttpServletRequest) request;
        String uri = req.getRequestURI();
        if (uri.contains("/api/")) {
            //TODO 在这里加入记录操作日志的信息，可使用username和uri
            String username = req.getRemoteUser();
        }

        return super.onPreHandle(request, response, mappedValue);
    }
}
