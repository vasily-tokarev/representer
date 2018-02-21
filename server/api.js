const express = require('express');
const app = express();
const fs = require('fs');
const p = require('path');

const posts = app.get('/:name/:name.json', (req, res) => {
  const path = p.join(process.cwd(), 'tmp', 'output', 'posts', req.params.name, `${req.params.name}.json`);
  fs.readFile(path, (err, file) => err ? res.sendStatus(404) : res.send(file));
});

const index = app.get('/index.json', (req, res) => {
  const path = p.join(process.cwd(), 'tmp', 'output', 'index.json');
  fs.readFile(path, (err, file) => err ? res.sendStatus(404) : res.send(file));
});

module.exports = {
  posts,
  index,
};
