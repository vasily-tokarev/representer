/*
Moves everything from the build folder to mount point folder.
 */

const fs = require('fs');
const p = require('path');
const shelljs = require('shelljs');
const config = require('../config');

const files = fs.readdirSync(config.output)
  .filter((f) => f !== config.mountPoint)
  .map((f) => p.join(config.output, f));

shelljs.mv(files, `${config.output}/${config.mountPoint}/`);
