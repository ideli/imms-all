<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%
    String message_login = (String) request.getAttribute("message_login");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录页</title>
</head>
<body>
msgLogin:<%=message_login%>
<form action="<%=request.getContextPath()%>/login" method="POST">
    用户名：<input type="text" name="username"/><br/>
    密码：<input type="text" name="password"/><br/>
    &nbsp;&nbsp;
    <input type="submit" value="登录"/>
</form>
</body>
</html>