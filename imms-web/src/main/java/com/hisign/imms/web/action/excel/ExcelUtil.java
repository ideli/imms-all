package com.hisign.imms.web.action.excel;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 导出excel工具类
 * @author wangping
 * @version 1.0
 * @since 2016/5/23 8:58
 */
public class ExcelUtil {

    /**
     * 默认excel导出文件名-excelExport
     */
    private static final String DEFAULT_EXCEL_NAME = "excelExport";

    /**
     * 将工作表对象写入输出流
     * @param wb       工作表对象
     * @param request  请求对象
     * @param response 响应对象
     * @param fileNames 导出文件名
     * @throws IOException
     * @throws
     */
    public static void writeWorkbook(HSSFWorkbook wb, HttpServletRequest request, HttpServletResponse response, String... fileNames) throws Exception {
        String contentType = "application/vnd.ms-excel";
        response.setContentType(contentType);
        response.setCharacterEncoding("UTF-8");
        ServletOutputStream sos = response.getOutputStream();
        try {
            response.setHeader("Content-Disposition", "attachment; filename=\"" + new String(((fileNames != null ? fileNames[0] : DEFAULT_EXCEL_NAME) + ".xls").getBytes(), "ISO8859-1") + "\"");
            response.resetBuffer();
            sos.flush();
            wb.write(sos);
        } finally {
            if (null != sos) {
                sos.close();
                sos = null;
            }
            wb = null;
        }
    }
}
