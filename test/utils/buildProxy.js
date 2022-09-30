/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 */

// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict';

const proxy = require('proxy');
const { readFileSync } = require('fs');
const { join } = require('path');
const http = require('http');
const https = require('https');

const ssl = {
  key: readFileSync(join(__dirname, '..', 'fixtures', 'https.key')),
  cert: readFileSync(join(__dirname, '..', 'fixtures', 'https.cert')),
};

function createProxy() {
  return new Promise((resolve) => {
    const server = proxy(http.createServer());
    server.listen(0, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

function createSecureProxy() {
  return new Promise((resolve) => {
    const server = proxy(https.createServer(ssl));
    server.listen(0, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

function createServer() {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.listen(0, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

function createSecureServer() {
  return new Promise((resolve) => {
    const server = https.createServer(ssl);
    server.listen(0, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

module.exports = {
  ssl,
  createProxy,
  createSecureProxy,
  createServer,
  createSecureServer,
};
