//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {JarsConnectorRefs} from "../jcad/JarsConnectorRefs";
import {JcadContext, JcadContextManager, DecoratorConnectorManager} from "jec-commons";
import {HttpMethodParams} from "./core/HttpMethodParams";

////////////////////////////////////////////////////////////////////////////////
// CAD API API
////////////////////////////////////////////////////////////////////////////////

const DCM:DecoratorConnectorManager = DecoratorConnectorManager.getInstance();
const CTXM:JcadContextManager = JcadContextManager.getInstance();

/**
 * The <code>@TRACE</code> decorator defines a <code>TRACE</code> HTTP method in
 * the JARS specification.
 *
 * ```javascript
TRACE()
public traceMethod(Exit exit:Function):void {
  // Code here...
}
```
 *
 * @param {HttpMethodParams} [params] the parameters for the associated HTTP
 *                                    method.
 */
export function TRACE(params?:HttpMethodParams):Function {

  return function(target:any, key:string,
                                       descriptor:PropertyDescriptor):Function {
    
    ////////////////////////////////////////////////////////////////////////////
    // CAD API
    ////////////////////////////////////////////////////////////////////////////

    var ctx:JcadContext = 
                         CTXM.getContext(JarsConnectorRefs.TRACE_CONNECTOR_REF);
    return DCM.getDecorator(JarsConnectorRefs.TRACE_CONNECTOR_REF, ctx)
              .decorate(target, key, descriptor, params);
  }
}