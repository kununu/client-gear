#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

require('isomorphic-fetch');

const [,, ...args] = process.argv;

const apiUrl = 'https://www.kununu.com';

const routes = require(`${process.cwd()}/${args[0]}/routes.json`); // eslint-disable-line

routes.map(async (route) => {
  const data = await fetch(`${apiUrl}/${route}`);
  const result = await data.json();

  const mockFilePath = path.join('data', `${encodeURIComponent(route)}.json`);

  const filePath = path.join(process.cwd(), args[0], mockFilePath);

  fs.writeFileSync(filePath, JSON.stringify(result));

  console.log(`Created ${mockFilePath}`);
});
