package com.hisign.imms.web.action.websocket;

import com.hisign.imms.web.action.excel.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * 登录日志action
 * @author wangping
 * @version 1.0
 * @since 2016/5/22 21:08
 */
@Controller("loginLog")
public class LoginLogAction {
    private Logger logger = LoggerFactory.getLogger(this.getClass());


    @MessageMapping("/hello")
    @SendTo("/first/socket")
    public Person firstWebsocketHello(String message) throws Exception {
        long time = System.currentTimeMillis();
        logger.info("{}:{}", time, message);
        return new Person("person1_log", 11, "no1_log");
    }
}
