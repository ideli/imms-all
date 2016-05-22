package com.hisign.imms.web.shiro.filter;

import com.hisign.imms.Constants;
import com.hisign.imms.api.system.SysUserService;
import com.hisign.imms.model.SysUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.web.filter.authc.UserFilter;
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

    @Resource
    private SysUserService sysUserService;

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        return super.isAccessAllowed(request, response, mappedValue);
    }

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        return super.onAccessDenied(request, response);
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
}
