package com.hisign.imms.model.basic.modstate;

import java.io.Serializable;

/**
 * Created by Jiang on 2016/5/25.
 */
public class ModState implements Serializable {
    private static final long serialVersionUID = 424834830L;

    private String mainId;


    private String stateUse;


    private String ssmk;


    private String ssmkZw;


    private String content;


    private String createId;


    private String modifyId;

    public String getMainId() {
        return mainId;
    }

    public void setMainId(String mainId) {
        this.mainId = mainId;
    }

    public String getStateUse() {
        return stateUse;
    }

    public void setStateUse(String stateUse) {
        this.stateUse = stateUse;
    }

    public String getSsmk() {
        return ssmk;
    }

    public void setSsmk(String ssmk) {
        this.ssmk = ssmk;
    }

    public String getModifyId() {
        return modifyId;
    }

    public void setModifyId(String modifyId) {
        this.modifyId = modifyId;
    }

    public String getCreateId() {
        return createId;
    }

    public void setCreateId(String createId) {
        this.createId = createId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSsmkZw() {
        return ssmkZw;
    }

    public void setSsmkZw(String ssmkZw) {
        this.ssmkZw = ssmkZw;
    }
}
