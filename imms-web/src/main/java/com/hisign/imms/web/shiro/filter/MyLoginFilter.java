package com.hisign.imms.web.shiro.filter;

import com.hisign.imms.web.bind.CommonMap;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.util.WebUtils;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * 
 * @author wangping
 * @version 1.0
 * @since 2016/5/24 13:22
 */
public class MyLoginFilter extends FormAuthenticationFilter {

    @Resource
    private CommonMap commonMap;

    @Resource
    private SimpleCookie sessionIdCookie;

    public void issueSuccessRedirect(ServletRequest request, ServletResponse response) throws Exception {
        String sessionId = (String) this.getSubject(request, response).getSession().getId();
        // clear JSESSIONID in URL if session id is not null
        if(sessionId != null){
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID_SOURCE,ShiroHttpServletRequest.COOKIE_SESSION_ID_SOURCE);
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID, sessionId);
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID_IS_VALID, Boolean.TRUE);
        }
        //TODO 多用户共享变量问题
        //同一个操作系统中，开启多个页面进行登录（有可能会出现问题）
        String clientAddr = request.getLocalAddr();
        commonMap.getMap().put(clientAddr + "_loginSuccess", true);
        super.issueSuccessRedirect(request, response);
    }

    @Override
    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request, ServletResponse response) throws Exception {
        return super.onLoginSuccess(token, subject, request, response);
    }
}
