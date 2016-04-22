package com.hisign.shiro;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicInteger;

/**
 *
 * @author wangping
 * @version 1.0
 * @since 2016/4/22 22:16
 */
@Service
public class MyMd5CredentialsMatcher extends SimpleCredentialsMatcher {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public boolean doCredentialsMatch(AuthenticationToken authcToken, AuthenticationInfo info) {
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        String pwd = null;
        try {
            pwd = Md5Helper.getMD5(String.valueOf(token.getPassword()));
        } catch (Exception e) {
            logger.error("md5 transfer error!psd:{}", String.valueOf(token.getPassword()), e);
        }
        Object tokenCredentials = pwd;
        Object accountCredentials = getCredentials(info);
        //将密码加密与系统加密后的密码校验，内容一致就返回true,不一致就返回false
        return equals(tokenCredentials, accountCredentials);
    }
}
