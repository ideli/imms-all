package com.hisign.imms;

import java.util.HashMap;
import java.util.Map;

public class Constants {

	/**
	 * 行政区划代码级别(两位为一个级别)
	 */
    public static final String XZQHDM_LEVEL_MASK = "00";

	public static final String CURRENT_USER = "currentUser";
    
    /**
     * 消息级别
     * 类名称：MSG_TYPE
     * 类描述：
     * 创建人：wangping
     * 修改人：wangping
     * 修改时间： 2015年3月21日 下午3:28:05
     * 修改备注：
     */
    public enum MSG_TYPE {
        success, danger, warning, info;
    }
    
    /**
     * 用户对象需要赋值的字段
     */
    public static final Map<String, Class<?>> USER_FIELDS_MAP = new HashMap<String, Class<?>>() {
		private static final long serialVersionUID = 1785535505349043366L;
		{
	    	put("createUnit", String.class);
	    	put("createUserId", String.class);
	    	put("createUserName", String.class);
	    	put("createDate", String.class);
			put("modifyUserId", String.class);
			put("modifyUserName", String.class);
	    	put("modifyDate", String.class);
	    	put("transferTime", String.class);
	    }
	};


	/**
     * 用户对象需要赋值的字段
     */
    public static final Map<String, Class<?>> BASE_FIELDS_MAP = new HashMap<String, Class<?>>() {
		private static final long serialVersionUID = 1785535505349043366L;
		{
	    	put("startNum", int.class);
	    	put("endNum", int.class);
	    	put("property", String.class);
	    	put("sortOrder", String.class);
	    }
	};
    
}
