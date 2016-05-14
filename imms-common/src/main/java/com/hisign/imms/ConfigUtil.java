package com.hisign.imms;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

/**
 * 读取参数配置类
 */
public class ConfigUtil {
    private static Properties props = new Properties();   
    private static File configFile = null; 
    private static long fileLastModified = 0L; 
    
    private static String configFileName = "jdbc.properties";

    private static void init() {
        try {
	        InputStream inputStream = ConfigUtil.class.getClassLoader().getResourceAsStream(configFileName);
	        props.load(inputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
    } 
    
    private static void load() { 
        try { 
            props.load(new FileInputStream(configFile)); 
            fileLastModified = configFile.lastModified(); 
        } catch (IOException e) {            
            throw new RuntimeException(e); 
        } 
    } 

    public static String getConfig(String key) { 
        init();
        return props.getProperty(key); 
    } 
    
    public static String getConfig(String configFileName,String key){
        URL url = ConfigUtil.class.getClassLoader().getResource(configFileName); 
        File config = new File(url.getFile()); 
        Properties properties = new Properties();
        try{
            properties.load(new FileInputStream(config)); 
        }catch (IOException e) {            
            throw new RuntimeException(e); 
        } 
        return properties.getProperty(key); 
    }
   public static void main(String[] args) {
	init();
}
}
