package com.hisign.imms.web.shiro.filter;

import com.hisign.imms.web.bind.CommonMap;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.session.Session;
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
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession(false);
        if (null == session) {
            session = subject.getSession();
        }
        String sessionId = (String) session.getId();
        // clear JSESSIONID in URL if session id is not null
        if(sessionId != null){
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID_SOURCE,ShiroHttpServletRequest.COOKIE_SESSION_ID_SOURCE);
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID, sessionId);
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID_IS_VALID, Boolean.TRUE);
        }
        commonMap.getMap().put(sessionId + "_loginSuccess", true);
        super.issueSuccessRedirect(request, response);
    }

    @Override
    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request, ServletResponse response) throws Exception {
        return super.onLoginSuccess(token, subject, request, response);
    }
}
