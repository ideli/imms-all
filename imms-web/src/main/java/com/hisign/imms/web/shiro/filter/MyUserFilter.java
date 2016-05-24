package com.hisign.imms.web.shiro.filter;

import com.hisign.imms.Constants;
import com.hisign.imms.api.system.SysUserService;
import com.hisign.imms.model.SysUser;
import com.hisign.imms.web.bind.CommonMap;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.UserFilter;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * Created by wangping_x1 on 2016/5/22.
 */
public class MyUserFilter extends UserFilter {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private String successUrl;

    @Resource
    private CommonMap commonMap;

    @Resource
    private SysUserService sysUserService;

    @Resource
    private SimpleCookie sessionIdCookie;

    private boolean isSuccessRequest(ServletRequest request) {
        return pathsMatch(getSuccessUrl(), request);
    }

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        Subject subject = getSubject(request, response);

        if (isLoginRequest(request, response)) {
            return true;
        } else if (isSuccessRequest(request)) {
            if (null != commonMap.getMap().get("loginSuccess")) {
                commonMap.getMap().remove("loginSuccess");
                return true;
                // If principal is not null, then the user is known and should be allowed access.
            } else return subject.getPrincipal() != null;
        } else return subject.getPrincipal() != null;
    }

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        saveRequest(request);
        String sessionId = (String) this.getSubject(request, response).getSession().getId();
        // clear JSESSIONID in URL if session id is not null
        if(sessionId != null){
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID_SOURCE,ShiroHttpServletRequest.COOKIE_SESSION_ID_SOURCE);
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID, sessionId);
            request.setAttribute(ShiroHttpServletRequest.REFERENCED_SESSION_ID_IS_VALID, Boolean.TRUE);
        }
        redirectToLogin(request, response);
        return false;
    }

    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        String username = (String) SecurityUtils.getSubject().getPrincipal();
        try {
            if (null != username) {
                SysUser user = (SysUser) request.getAttribute(Constants.CURRENT_USER);
                if (null == user) {
                    user = sysUserService.findSysUserByUserName(username);
                    request.setAttribute(Constants.CURRENT_USER, user);
                }
            }
        } catch (Exception e) {
            logger.error("myUserFilter get user error!username:{}", username, e);
        }
        return super.preHandle(request, response);
    }

    public String getSuccessUrl() {
        return successUrl;
    }

    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }
}
