package com.hisign.imms.web.action.excel;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
@RequestMapping(value = "/api")
public class ExcelAction {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 导出excel的action(单表导出)
     *
     * @param request  请求
     * @param response 响应
     * @throws InterruptedException
     * @throws
     */
    @RequestMapping(value = "/excel/export", method = RequestMethod.GET, produces = {"application/vnd.ms-excel;charset=UTF-8"})
    public void excelExport(HttpServletRequest request, HttpServletResponse response) throws InterruptedException {
        String fileName = "excelTemplates/table.vm";
        Map<String, Object> map = new HashMap<String, Object>();
        //类Person必须是public的，也就是说必须是一个单独的类文件***
        List<Person> temp = new ArrayList<Person>();
        temp.add(new Person("111", 1, "no1"));
        temp.add(new Person("222", 2, "no2"));
        map.put("list", temp);

        String result = TemplateUtil.parseTemplate(map, fileName);
        System.out.println(result);
        try {
            String htmlStr = result;
            String sheetName = "222";
            //生成Excel工作薄对象
            HSSFWorkbook wb = ParseHtmlToXls.parseHtmlToXlsForMultiTitle(htmlStr, sheetName);
            ExcelUtil.writeWorkbook(wb, request, response, "我的文件名");
        } catch (Exception e) {
            logger.error("excel export error!", e);
        }
    }



}
