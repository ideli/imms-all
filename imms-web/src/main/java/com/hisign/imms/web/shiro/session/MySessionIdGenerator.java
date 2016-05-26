package com.hisign.imms.web.shiro.session;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.SimpleSession;
import org.apache.shiro.session.mgt.eis.SessionIdGenerator;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.crazycake.shiro.SerializeUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Serializable;
import java.net.HttpCookie;
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
        ShiroHttpServletRequest req = (ShiroHttpServletRequest) session.getAttribute("REQUEST");
        String sessionId = null;
        if (null != req) {
            sessionId = req.getRequestedSessionId();
        }
        if (null == req || StringUtils.isEmpty(req.getRequestedSessionId())) {
            sessionId = UUID.randomUUID().toString();
            HttpServletResponse response = (HttpServletResponse) session.getAttribute("RESPONSE");
            if (null != response) {
                String name = req.getServletContext().getSessionCookieConfig().getName();

                if (StringUtils.isEmpty(name)) {
                    name = "JSESSIONID";
                }
                Cookie cookie = new Cookie(name, sessionId);
                response.addCookie(cookie);
            }
        }

        session.removeAttribute("REQUEST");
        session.removeAttribute("RESPONSE");
        return sessionId;
    }

    public static void main(String[] args) {
        SimpleSession session = new SimpleSession();
        try {
            SerializeUtils.serialize(session);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
