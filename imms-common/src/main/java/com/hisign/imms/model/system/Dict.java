package com.hisign.imms.model.system;

import java.io.Serializable;

/**
 * Created by Administrator on 2016/5/25.
 */
public class Dict implements Serializable {

    private String root;

    private String key;

    private String[] keys;

    private String value;

    private String parentKey;


    public String getRoot() {
        return root;
    }

    public void setRoot(String root) {
        this.root = root;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getParentKey() {
        return parentKey;
    }

    public void setParentKey(String parentKey) {
        this.parentKey = parentKey;
    }

    public String[] getKeys() {
        return keys;
    }

    public void setKeys(String[] keys) {
        this.keys = keys;
    }
}
