package com.hisign.imms.web.action.login;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import javax.servlet.http.HttpServletRequest;

/**
 * 登录action
 * @author wangping
 * @version 1.0
 * @since 2016/4/20 9:39
 */
@Controller
public class LoginAction {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/intoLogin", method = RequestMethod.GET)
    public String intoLogin() {
        return "/jsp/login";
    }

    /**
     * 用户登录
     * @param request
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(HttpServletRequest request) {
        String resultPageURL = "";
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        token.setRememberMe(true);
        logger.info("为了验证登录用户而封装的token为{}", ReflectionToStringBuilder.toString(token, ToStringStyle.MULTI_LINE_STYLE));
        //获取当前的Subject
        Subject currentUser = SecurityUtils.getSubject();
        try {
            //在调用了login方法后,SecurityManager会收到AuthenticationToken,并将其发送给已配置的Realm执行必须的认证检查
            //每个Realm都能在必要时对提交的AuthenticationTokens作出反应
            //所以这一步在调用login(token)方法时,它会走到MyRealm.doGetAuthenticationInfo()方法中,具体验证方式详见此方法
            logger.info("对用户[{}}]进行登录验证..验证开始", username);
            currentUser.login(token);//进行登录验证
        }catch(UnknownAccountException uae){
            logger.error("对用户[{}]进行登录验证..验证未通过,未知账户", username, uae);
            request.setAttribute("message_login", "未知账户");
        }catch(IncorrectCredentialsException ice){
            logger.error("对用户[{}}]进行登录验证..验证未通过,错误的凭证", username, ice);
            request.setAttribute("message_login", "密码不正确");
        }catch(LockedAccountException lae){
            logger.error("对用户[{}}]进行登录验证..验证未通过,账户已锁定", username, lae);
            request.setAttribute("message_login", "账户已锁定");
        }catch(ExcessiveAttemptsException eae){
            logger.error("对用户[{}}]进行登录验证..验证未通过,错误次数过多", username, eae);
            request.setAttribute("message_login", "用户名或密码错误次数过多");
        }catch(AuthenticationException ae){
            //通过处理Shiro的运行时AuthenticationException就可以控制用户登录失败或密码错误时的情景
            logger.error("对用户[{}}]进行登录验证..验证未通过,堆栈轨迹如下", username, ae);
            request.setAttribute("message_login", "用户名或密码不正确");
        }
        //验证是否登录成功
        if(currentUser.isAuthenticated()){
            System.out.println("用户[" + username + "]登录认证通过(这里可以进行一些认证通过后的一些系统参数初始化操作)");
        }else{
            token.clear();
            resultPageURL = "/jsp/login";
        }
        return resultPageURL;
    }
}
