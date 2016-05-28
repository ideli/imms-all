package com.hisign.imms.model.sys;

import java.io.Serializable;

/**
 * Created by Jiang on 2016/5/27.
 */
public class DlyhglFilter  implements Serializable {
    /**
     * 用户名
     */
    private String username;/**
     * 启用状态
     */
    private String openFlag;

    /**
     * 用户姓名
     */
    private String trueName;

    /**
     * 用户所在单位
     */
    private String userUnit;

    /**
     * 开始条数
     */
    private int begin;

    /**
     * 结束条数
     */
    private int end;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserUnit() {
        return userUnit;
    }

    public void setUserUnit(String userUnit) {
        this.userUnit = userUnit;
    }

    public String getTrueName() {
        return trueName;
    }

    public void setTrueName(String trueName) {
        this.trueName = trueName;
    }

    public String getOpenFlag() {
        return openFlag;
    }

    public void setOpenFlag(String openFlag) {
        this.openFlag = openFlag;
    }

    public int getBegin() {
        return begin;
    }

    public void setBegin(int begin) {
        this.begin = begin;
    }

    public int getEnd() {
        return end;
    }

    public void setEnd(int end) {
        this.end = end;
    }
}
