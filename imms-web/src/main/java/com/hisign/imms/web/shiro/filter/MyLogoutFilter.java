package com.hisign.imms.web.shiro.filter;

import com.hisign.imms.web.bind.CommonMap;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.session.SessionException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.filter.authc.LogoutFilter;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

/**
 * @author wangping
 * @version 1.0
 * @since 2016/5/24 13:22
 */
public class MyLogoutFilter extends LogoutFilter {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        Subject subject = SecurityUtils.getSubject();
        String redirectUrl = getRedirectUrl(request, response, subject);
        //try/catch added for SHIRO-298:
        try {
            subject.logout();
        } catch (SessionException ise) {
            logger.debug("Encountered session exception during logout.  This can generally safely be ignored.", ise);
        }
//        request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID, UUID.randomUUID().toString());
        issueRedirect(request, response, redirectUrl);
        return false;
    }

    private void changeSession(ServletRequest request, ServletResponse servletResponse) {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String sessionId = UUID.randomUUID().toString();
        String name = request.getServletContext().getSessionCookieConfig().getName();

        if (StringUtils.isEmpty(name)) {
            name = "JSESSIONID";
        }
        Cookie cookie = new Cookie(name, sessionId);
        response.addCookie(cookie);
    }

    @Override
    protected void issueRedirect(ServletRequest request, ServletResponse response, String redirectUrl) throws Exception {
        changeSession(request, response);
        super.issueRedirect(request, response, redirectUrl);
    }
}
