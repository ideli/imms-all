package com.hisign.system.service.impl;

import com.hisign.system.dao.Person;
import com.hisign.system.service.PersonService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 *
 * @author wangping
 * @version 1.0
 * @since 2016/4/7 16:40
 */
@Service
public class PersonServiceImpl implements PersonService {

    @Resource
    private Person person;

    @Override
    public Integer selectCount() {
        return person.selectCount();
    }
}
