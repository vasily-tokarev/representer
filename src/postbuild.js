/*
Moves everything from the build folder to mount point folder.
TODO: Find a way to do this using Webpack.
 */

const fs = require('fs');
const p = require('path');
const shelljs = require('shelljs');
const config = require('../config');

const files = fs.readdirSync('./build')
  .filter((f) => f !== config.mountPoint)
  .map((f) => p.join(process.cwd(), 'build', f));

shelljs.mv(files, p.join(process.cwd(), 'build', config.mountPoint));

