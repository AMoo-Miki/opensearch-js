/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict';

const { test } = require('tap');
const { CloudConnectionPool } = require('../../lib/pool');
const Connection = require('../../lib/Connection');

test('Should expose a cloudConnection property', (t) => {
  const pool = new CloudConnectionPool({ Connection });
  pool.addConnection('http://localhost:9200/');
  t.ok(pool.cloudConnection instanceof Connection);
  t.end();
});

test('Get connection should always return cloudConnection', (t) => {
  const pool = new CloudConnectionPool({ Connection });
  const conn = pool.addConnection('http://localhost:9200/');
  t.same(pool.getConnection(), conn);
  t.end();
});

test('pool.empty should reset cloudConnection', (t) => {
  const pool = new CloudConnectionPool({ Connection });
  pool.addConnection('http://localhost:9200/');
  t.ok(pool.cloudConnection instanceof Connection);
  pool.empty(() => {
    t.equal(pool.cloudConnection, null);
    t.end();
  });
});

test('empty with no callback', (t) => {
  const pool = new CloudConnectionPool({ Connection });
  pool.addConnection('http://localhost:9200/');
  t.ok(pool.cloudConnection instanceof Connection);
  pool.empty();
  t.equal(pool.cloudConnection, null);
  t.end();
});
