package com.hisign.imms.web.bind.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.http.HttpSession;

/**
 * 去掉url中的JSESSIONID
 *
 * @author wangping
 * @version 1.0
 * @since 2016/5/23 17:41
 */
public class MyDisableUrlSessionIdFilter implements Filter {

    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        // 跳过所有非http的链接
        if (!(request instanceof HttpServletRequest)) {
            chain.doFilter(request, response);
            return;
        }
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        // 若url中存在jsessionId，则去除
        if (httpRequest.isRequestedSessionIdFromURL()) {
            HttpSession session = httpRequest.getSession();
            if (session != null) {
                session.invalidate();
            }
        }
        // wrap response to remove URL encoding
        HttpServletResponseWrapper wrappedResponse = new HttpServletResponseWrapper(
                httpResponse) {

            @Override
            public String encodeRedirectURL(String url) {
                return url;
            }

            @Override
            public String encodeURL(String url) {
                return url;
            }
        };
        // process next request in chain
        chain.doFilter(request, wrappedResponse);
    }

    /**
     * Unused.
     */
    public void init(FilterConfig config) throws ServletException {
    }

    /**
     * Unused.
     */
    public void destroy() {
    }
}
