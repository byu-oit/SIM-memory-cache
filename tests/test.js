/*
 * Copyright 2016 Brigham Young University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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

'use strict';

let   cache = require('../index')
const expect        = require('chai').expect

describe('memory cache', function()
{
    it('setGet1Key', function()
    {
        const path = ['url']
        const val = {value: 'url', expires: '2999-12-31'}

        cache.set(path, val.value, val.expires)

        const cacheVal = cache.get(path)

        expect(cacheVal).equal(val.value)
    });

    it('setGet2Key', function()
    {
        const path = ['url','suburl']
        const val = {value: 'suburl', expires: '2999-12-31'}

        cache.set(path, val.value, val.expires)

        const cacheVal = cache.get(path)

        expect(cacheVal).equal(val.value)
    });

    it('setGet3KeyThatisExpired', function()
    {
        const path = ['url','suburl','levelthree']
        const val = {value: 'levelthree', expires: '2000-12-31'}

        cache.set(path, val.value, val.expires)

        const cacheVal = cache.get(path)

        expect(cacheVal).to.be.null
    });

    it('setGet3KeyThatisExpiredWithTime', function()
    {
        const path = ['url','suburl','levelthree']
        const val = {value: 'levelthree', expires: Date.now() - 10}

        cache.set(path, val.value, val.expires)

        const cacheVal = cache.get(path)

        expect(cacheVal).to.be.null
    });

    it('setGet3KeyThatisExpiredWithDate', function()
    {
        const path = ['url','suburl','levelthree']
        const val = {value: 'levelthree', expires: new Date('2000-09-01')}

        cache.set(path, val.value, val.expires)

        const cacheVal = cache.get(path)

        expect(cacheVal).to.be.null
    });

    it('setGet3KeyNoExpiration', function()
    {
        const path = ['url','suburl','levelthree']
        const val = {value: 'levelthree'}

        cache.set(path, val.value, val.expires)

        const cacheVal = cache.get(path)

        expect(cacheVal).equal(val.value)
    });
});