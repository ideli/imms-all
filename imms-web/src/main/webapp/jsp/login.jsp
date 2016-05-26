<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%
    String message_login = (String) request.getAttribute("message_login");
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>登录页</title>
    <link rel="stylesheet" href="<%=path%>/dist/css/login.css">
</head>
<body>
msgLogin:<%=message_login%>
<%--<form id="login-form" action="<%=path%>/login" method="POST">--%>
    <%--用户名：<input type="text" name="username"/><br/>--%>
    <%--密码：<input type="password" name="password"/><br/>--%>
    <%--自动登录：<input type="checkbox" name="rememberMe" value="true"><br/>--%>
    <%--<input type="submit" value="登录"/>--%>
<%--</form>--%>
<%--<p id="browser-tip"></p>--%>
<%--<div id="chrome-download">--%>
    <%--<a href="<%=path%>/ftp/chrome.zip">点此下载chrome浏览器</a>--%>
<%--</div>--%>
<header>
    刑技平台实施管理系统
</header>
<div class="back-img">
    <form id="login-form" action="<%=path%>/login" method="POST">
        <div class="login-div">
            <input name="username" type="text" class="login-info" placeholder="请输入用户名">
            <input name="password" type="password" class="login-info" placeholder="请输入密码">
            <input type="submit" class="login-btn" value="登 录">
            <div class="other-operation">
                <p id="download-cr">
                    <span> | </span>
                    <a href="<%=path%>/ftp/chrome.zip">点此下载chrome浏览器</a>
                </p>
                <p>
                    <label for="rememberMe">自动登录：</label>
                    <input id="rememberMe" name="rememberMe" type="checkbox"  value="true">
                </p>
            </div>
            <p id="browser-tip"></p>
        </div>
    </form>
</div>

<footer>
    <p>北京海鑫科金高科技股份有限公司</p>
    <p>版本号 v1.1</p>
</footer>
</body>
<script>
    if(!window.chrome){
        document.getElementById('browser-tip').innerHTML='检测到您的浏览器非chrome, 请下载chrome谷歌浏览器后, 再打开本系统!';
        document.getElementById('download-cr').style.display='block';
    }
</script>
</html>