package com.hisign.imms.web.shiro.authc;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationListener;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author wangping
 * @version 1.0
 * @since 2016/5/16 13:04
 */
public class MyAuthenticationListener implements AuthenticationListener {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void onSuccess(AuthenticationToken token, AuthenticationInfo info) {
        logger.debug("onSuccess,token.Principal:{},token.Credentials:{},info.Principals:{},info.Credentials:{}",
                token.getPrincipal(), token.getCredentials(), info.getPrincipals(), info.getCredentials());
    }

    @Override
    public void onFailure(AuthenticationToken token, AuthenticationException ae) {
        logger.debug("onFailure,token.Principal:{},token.Credentials:{},ae:{}", token.getPrincipal(),
                token.getCredentials(), ae.toString());
    }

    @Override
    public void onLogout(PrincipalCollection principals) {
        logger.debug("onLogout,principals:{}", principals);
    }
}
