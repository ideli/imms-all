package com.hisign.imms.web.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.adapter.standard.StandardWebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * 事件处理监听
 * @author wangping
 * @version 1.0
 * @since 2016/5/23 13:54
 */
@Component
public class MyWebSocketHandler extends TextWebSocketHandler {
    private static Map<String,MyWebSocketClient> socketClients = new HashMap<String,MyWebSocketClient>();

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        //接收到客户端消息时调用
        //获取发送消息的昵称和ip
        MyWebSocketClient sendClient = socketClients.get(session.getId());
        String nickName = sendClient.getNickName();
        String clientIp = sendClient.getClientIp();

        logger.info("handleTextMessage: {}", session.getId());

        //向所有客户端群发收到的消息
        Set<String> sessionIDs = socketClients.keySet();
        Iterator<String> i = sessionIDs.iterator();
        while(i.hasNext()) {
            String sessionID = i.next();
            MyWebSocketClient client = socketClients.get(sessionID);
            WebSocketSession clientSession = client.getSocketSession();
            try {
                clientSession.sendMessage(new TextMessage((nickName + "(" + clientIp + ")\n" + message.getPayload()).getBytes("UTF-8")));
            } catch (IOException e) {
                logger.error("handleTextMessage error!clientIP:{}, sessionID:{}", clientIp, sessionID, e);
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session)
            throws Exception {
        // 与客户端完成连接后调用
        //获取连接的唯一session id
        String sessionID = session.getId();
        //获取昵称
        String nickName = "";

        String path = URLDecoder.decode(session.getUri().getPath(),"UTF-8");
        String[] paths = path.split("\\/");
        for (int i=0; i<paths.length; ++i) {
            if (paths[i].equalsIgnoreCase("nickname")) {
                if (i < paths.length-1)
                    nickName = paths[i+1];
                break;
            }
        }

        logger.info("afterConnectionEstablished: {}", sessionID);

        //获取客户端ip地址
        String clientIp = session.getRemoteAddress().getAddress().getHostAddress();
        //将已连接的socket客户端保存
        MyWebSocketClient client = new MyWebSocketClient();
        client.setClientIp(clientIp);
        client.setNickName(nickName);
        client.setSocketSession(session);

        //保存已连接的客户端信息
        socketClients.put(sessionID, client);
    }

    @Override
    public void handleTransportError(WebSocketSession session,
                                     Throwable exception) throws Exception {
        // 消息传输出错时调用
        System.out.println("handleTransportError");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session,
                                      CloseStatus closeStatus) throws Exception {
        // 一个客户端连接断开时关闭
        logger.info("afterConnectionClosed！sessionId:{}", session.getId());

        //从保存的客户端集合中删除关闭的客户端
        String sessionID = session.getId();
        socketClients.remove(sessionID);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

}
