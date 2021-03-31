#!/usr/bin/env node
const fastify = require('fastify')({logger: true});

const [,, ...args] = process.argv;

const baseDir = `${process.cwd()}/${args[0]}`;

const routes = require(`${baseDir}/routes.json`); // eslint-disable-line

routes.map(route => fastify.get(`/${route}`, (_, reply) => {
  const data = require(`${baseDir}/data/${encodeURIComponent(route)}`); // eslint-disable-line

  reply.send(data);
}));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3001);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
