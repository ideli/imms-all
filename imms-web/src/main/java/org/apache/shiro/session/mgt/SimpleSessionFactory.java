/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.shiro.session.mgt;

import org.apache.shiro.session.Session;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.apache.shiro.web.session.mgt.DefaultWebSessionContext;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;

/**
 * {@code SessionFactory} implementation that generates {@link SimpleSession} instances.
 *
 * @since 1.0
 */
public class SimpleSessionFactory implements SessionFactory {

    /**
     * Creates a new {@link SimpleSession SimpleSession} instance retaining the context's
     * {@link SessionContext#getHost() host} if one can be found.
     *
     * @param initData the initialization data to be used during {@link Session} creation.
     * @return a new {@link SimpleSession SimpleSession} instance
     */
    public Session createSession(SessionContext initData) {
        SimpleSession ss = null;
        if (initData != null) {
            String host = initData.getHost();
            if (host != null) {
                ss = new SimpleSession(host);
            }
        }
        if (null == ss) {
            ss = new SimpleSession();
        }

        if (initData instanceof DefaultWebSessionContext) {
            DefaultWebSessionContext dwc = (DefaultWebSessionContext) initData;
            ss.setAttribute("RESPONSE", dwc.getServletResponse());
            ss.setAttribute("REQUEST", dwc.getServletRequest());
        }
        return ss;
    }
}