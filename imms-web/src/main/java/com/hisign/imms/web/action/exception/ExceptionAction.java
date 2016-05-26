package com.hisign.imms.web.action.exception;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 异常处理类
 * @author wangping
 * @version 1.0
 * @since 2016/5/26 22:31
 */
@Controller
public class ExceptionAction {
    /**
     * 进入404页面
     * @return
     */
    @RequestMapping(value = "/exception/404", method = RequestMethod.GET)
    public String errorFor404() {
        return "/WEB-INF/404";
    }

    /**
     * 进入405页面
     * @return
     */
    @RequestMapping(value = "/exception/405", method = RequestMethod.GET)
    public String errorFor405() {
        return "/WEB-INF/405";
    }

    /**
     * 进入500页面
     * @return
     */
    @RequestMapping(value = "/exception/500", method = RequestMethod.GET)
    public String errorFor500() {
        return "/WEB-INF/500";
    }

    /**
     * 进入异常页面
     * @return
     */
    @RequestMapping(value = "/exception/error", method = RequestMethod.GET)
    public String errorForError() {
        return "/WEB-INF/error";
    }
}
