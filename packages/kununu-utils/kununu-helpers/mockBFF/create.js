#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

require('isomorphic-fetch');

const {
  baseDir,
  routes,
  apiUrl,
} = require('./utils');

// create data dir if not available
if (!fs.existsSync(path.join(baseDir, 'data'))) {
  fs.mkdirSync(path.join(baseDir, 'data'));
}

routes.map(async (route) => {
  // fetch data from real api
  const data = await fetch(`${apiUrl}/${route}`);
  const result = await data.json();

  const mockFilePath = path.join('data', `${encodeURIComponent(route)}.json`);
  const filePath = path.join(baseDir, mockFilePath);

  // save data as json file into mock dir
  fs.writeFileSync(filePath, JSON.stringify(result));
  console.log(`Created ${mockFilePath}`); // eslint-disable-line
});
