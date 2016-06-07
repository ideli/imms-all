package com.hisign.imms.web.action.basic.modstate;

import com.github.pagehelper.Page;
import com.hisign.imms.api.basic.modstate.ModStateService;
import com.hisign.imms.model.basic.modstate.ModState;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * Created by Jiang on 2016/5/25.
 */
@Controller
public class ModelStateListAction {



    @RequestMapping("api/modState/getModStatePage")
    @ResponseBody
    public Page<ModState> getList() {
       // ModState user = new ModState();
      //  Page<ModState> page = modStateService.findModStateListByCondition(user);
        return null;
    }
}
