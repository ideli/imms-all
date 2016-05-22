<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%
    String message_login = (String) request.getAttribute("message_login");
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录页</title>
</head>
<body>
msgLogin:<%=message_login%>
<form id="login-form" action="<%=path%>/login" method="POST">
    用户名：<input type="text" name="username"/><br/>
    密码：<input type="password" name="password"/><br/>
    自动登录：<input type="checkbox" name="rememberMe" value="true"><br/>
    <input type="submit" value="登录"/>
</form>
<p id="browser-tip"></p>
<div id="chrome-download">
    <a href="<%=path%>/ftp/chrome.zip">点此下载chrome浏览器</a>
</div>
</body>
<script>
    if(!window.chrome){
        document.getElementById('browser-tip').innerHTML='检测到您到浏览器非chrome, 请下载chrome谷歌浏览器后, 再打开本系统!';
    }
</script>
</html>