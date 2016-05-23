package com.hisign.imms.web.websocket;

import org.springframework.web.socket.WebSocketSession;

public class MyWebSocketClient {
	private WebSocketSession socketSession;
	private String nickName;
	private String clientIp;
	
	public WebSocketSession getSocketSession() {
		return socketSession;
	}
	
	public void setSocketSession(WebSocketSession socketSession) {
		this.socketSession = socketSession;
	}
	
	public String getNickName() {
		return nickName;
	}
	
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getClientIp() {
		return clientIp;
	}

	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}
}
