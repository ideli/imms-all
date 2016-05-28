package com.hisign.imms.model.sys;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Jiang on 2016/5/26.
 */
public class Dlyhgl implements Serializable {
    private static final long serialVersionUID = 424834830L;

    public Dlyhgl(){
    }
    /**
     * 构造方法
     * @param trueName 真名
     */
    public Dlyhgl(String trueName){
        setTrueName(trueName);
        setUsername(trueName);
    }

    /**
     * 用户是否有效
     * @return 有效标志true or false
     */
    public boolean isEnabled() {
        return (this.getOpenFlag() != null && !"0".equals(this.getOpenFlag()));
    }


    /**
     * 相等判断，如果帐号相同，则相同
     */
    public boolean equals(Object o) {
        Dlyhgl user = (Dlyhgl) o;
        if (this.getUsername().equals(user.getUsername()) == false) {
            return false;
        }
        return true;
    }

    /**
     * 获得散列值
     */
    public int hashCode() {
        return this.getUsername().hashCode() ^ this.getUsername().hashCode();
    }

    private String organName;//单位名称
    private String openState;//启用状态
    private String roleNameString;//角色名字符串
    private List roles = new ArrayList(0);//用户所在角色信息
    private String userLevel;//用户级别

    private String oldPassword;//原密码
    private String newPassword;//新密码
    private String newPasswordConfig;//新密码确认

    private String techId = null;//技术人员表ID
    private String remark = null;//备注
    private String username = null;//用户帐号
    private String password = null;//用户密码
    private String trueName = null;//真实姓名
    private String openFlag = null;//启用标志
    private String defaultModule = null;//默认登录后第一个看见的模块
    /*以下为新增字段*/
    private String policeId;//警号
    private String cardId;//身份证号
    private String userTel;//联系方式
    private String userUnit;//所在单位
    private String rownum;//序号

    public String getOrganName() {
        return organName;
    }

    public void setOrganName(String organName) {
        this.organName = organName;
    }

    public String getOpenState() {
        return openState;
    }

    public void setOpenState(String openState) {
        this.openState = openState;
    }

    public String getRoleNameString() {
        return roleNameString;
    }

    public void setRoleNameString(String roleNameString) {
        this.roleNameString = roleNameString;
    }

    public List getRoles() {
        return roles;
    }

    public void setRoles(List roles) {
        this.roles = roles;
    }

    public String getUserLevel() {
        return userLevel;
    }

    public void setUserLevel(String userLevel) {
        this.userLevel = userLevel;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewPasswordConfig() {
        return newPasswordConfig;
    }

    public void setNewPasswordConfig(String newPasswordConfig) {
        this.newPasswordConfig = newPasswordConfig;
    }

    public String getTechId() {
        return techId;
    }

    public void setTechId(String techId) {
        this.techId = techId;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getDefaultModule() {
        return defaultModule;
    }

    public void setDefaultModule(String defaultModule) {
        this.defaultModule = defaultModule;
    }

    public String getPoliceId() {
        return policeId;
    }

    public void setPoliceId(String policeId) {
        this.policeId = policeId;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public String getUserTel() {
        return userTel;
    }

    public void setUserTel(String userTel) {
        this.userTel = userTel;
    }

    public String getUserUnit() {
        return userUnit;
    }

    public void setUserUnit(String userUnit) {
        this.userUnit = userUnit;
    }

    public String getRownum() {
        return rownum;
    }

    public void setRownum(String rownum) {
        this.rownum = rownum;
    }
}
