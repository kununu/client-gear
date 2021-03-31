const fs = require('fs');
const path = require('path');

const argv = require('minimist')(process.argv.slice(2));

if (!argv.dir) throw Error('Please supply a dir via --dir');

const baseDir = path.join(process.cwd(), argv.dir);
const configFile = argv.config || 'routes.json';
const apiUrl = argv.apiUrl || 'https://www.kununu.com';

if (!fs.existsSync(baseDir)) throw Error(`No valid dir found at ${baseDir}`);

if (!fs.existsSync(path.join(baseDir, configFile))) throw Error(`No config file ${configFile} found at ${baseDir}`);

const routes = require(`${baseDir}/${configFile}`); // eslint-disable-line

module.exports = {
  baseDir,
  configFile,
  routes,
  apiUrl,
};
