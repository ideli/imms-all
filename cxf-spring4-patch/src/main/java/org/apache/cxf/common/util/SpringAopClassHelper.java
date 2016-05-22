//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package org.apache.cxf.common.util;

import org.apache.cxf.common.util.ClassHelper;
import org.springframework.aop.TargetSource;
import org.springframework.aop.framework.Advised;
import org.springframework.aop.support.AopUtils;
import org.springframework.beans.factory.BeanCreationException;

public class SpringAopClassHelper extends ClassHelper {
    SpringAopClassHelper() throws Exception {
        Class.forName("org.springframework.aop.support.AopUtils");
        Class.forName("org.springframework.aop.framework.Advised");
    }

    protected Class<?> getRealClassFromClassInternal(Class<?> cls) {
        return AopUtils.isCglibProxy(cls)?this.getRealClassFromClassInternal(cls.getSuperclass()):cls;
    }

    protected Object getRealObjectInternal(Object o) {
        if(o instanceof Advised) {
            try {
                Advised ex = (Advised)o;
                Object target = ex.getTargetSource().getTarget();
                return this.getRealObjectInternal(target);
            } catch (Exception var4) {
                ;
            }
        }

        return o;
    }

    protected Class<?> getRealClassInternal(Object o) {
        if(AopUtils.isAopProxy(o) && o instanceof Advised) {
            Advised advised = (Advised)o;

            try {
                TargetSource ex = advised.getTargetSource();
                Object target = null;

                try {
                    target = ex.getTarget();
                } catch (BeanCreationException var6) {
                    return this.getRealClassFromClassInternal(ex.getTargetClass());
                }

                if(target != null) {
                    return this.getRealClassInternal(target);
                }

                Class targetClass = AopUtils.getTargetClass(o);
                if(targetClass != null) {
                    return this.getRealClassFromClassInternal(targetClass);
                }
            } catch (Exception var7) {
                ;
            }
        } else if(AopUtils.isCglibProxy(o.getClass())) {
            return this.getRealClassFromClassInternal(AopUtils.getTargetClass(o));
        }

        return o.getClass();
    }
}

