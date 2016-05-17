package com.hisign.imms.web.shiro.authc;

import org.apache.shiro.authc.AuthenticationListener;
import org.apache.shiro.authc.pam.FirstSuccessfulStrategy;
import org.apache.shiro.authc.pam.ModularRealmAuthenticator;

import java.util.Collection;

/**
 * 
 * @author wangping
 * @version 1.0
 * @since 2016/5/16 13:01
 */
public class MyModularRealmAuthenticator extends ModularRealmAuthenticator {
    /**
     * 构造函数
     */
    public MyModularRealmAuthenticator() {
        // 不调用父构造器,因为父构造器默认使用AtLeastOneSuccessfulStrategy,
        // 这里设置为FirstSuccessfulStrategy,
        // 返回第一个认证成功的realm
        super.setAuthenticationStrategy(new FirstSuccessfulStrategy());
    }

    /**
     * 设置认证结果监听器
     * @param listeners
     */
    public void setListeners(Collection<AuthenticationListener> listeners) {
        // TODO Auto-generated method stub
        super.setAuthenticationListeners(listeners);
    }
}
