package com.hisign.imms.web.shiro.session;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.SessionIdGenerator;

import java.io.Serializable;
import java.util.UUID;

/**
 * session生成器
 * @author wangping
 * @version 1.0
 * @since 2016/5/25 12:30
 */
public class MySessionIdGenerator implements SessionIdGenerator {

    @Override
    public Serializable generateId(Session session) {
//        return session.getId();
        return UUID.randomUUID().toString();
    }
}
