#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const fastify = require('fastify')({logger: true});

const {
  baseDir,
  routes,
} = require('./utils');

// check that data dir for mocks exists
if (!fs.existsSync(path.join(baseDir, 'data'))) throw Error(`No mock data found at ${baseDir}. Please use the create command first.`);

// for each route serve the json file of the same name
routes.map(route => fastify.get(`/${route}`, (_, reply) => {
  const data = require(`${baseDir}/data/${encodeURIComponent(route)}`); // eslint-disable-line

  reply.send(data);
}));

// Run the server
const start = async () => {
  try {
    await fastify.listen(3001);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
