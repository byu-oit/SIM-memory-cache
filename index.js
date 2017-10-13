/*
 * Copyright 2016 Brigham Young University
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

"use strict"

module.exports = function ()
{
    function isString (value) {
        return typeof value === 'string' || value instanceof String;
    }

    function isNumber (value) {
        return typeof value === 'number' && isFinite(value);
    }

    function isDate (value) {
        return value instanceof Date;
    }

    function getTimeExpires(expires)
    {
        if (isNumber(expires))
        {
            return expires
        }
        if (isDate(expires))
        {
            return expires.getTime()
        }
        if (isString(expires))
        {
            const parsed = Date.parse(expires)
            if (isNaN(parsed))
            {
                return null
            }
            return parsed
        }

        return null
    }

    const cache = {};
    return {
        //path is an array of one or more key values
        get: function (path)
        {
            let valuePath = cache
            let val = null
            for (const key of path)
            {
                if (valuePath.hasOwnProperty(key))
                {
                    valuePath = valuePath[key]
                    val = valuePath
                }
                else
                {
                    return null
                }
            }
            //check if expired
            if (val.expires)
            {
                if (val.expires < Date.now())
                {
                    val.value = null
                }
            }
            return val.value;
        },
        set: function (path, val, expires)
        {
            const timeExpires = getTimeExpires(expires)
            let valuePath = cache
            let nkeys = path.length
            for (const key of path)
            {
                if (nkeys === 1)
                {
                    valuePath[key] = {value: val, expires: timeExpires}
                }
                else
                {
                    valuePath[key] = {}
                    valuePath = valuePath[key]
                }
                nkeys -= 1
            }
        }
    }
}();
