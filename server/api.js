const express = require('express');
const app = express();
const fs = require('fs');
const config = require('../config');

const log = (item, fn) => {
  console.log('Not found: ', item); // eslint-disable-line no-console
  return fn;
};

const posts = app.get('/:name/:name.json', (req, res) => {
  const path = `${config.output}/posts/${req.params.name}/${req.params.name}.json`;
  fs.readFile(path, (err, file) => err ? log(path, res.sendStatus(404)) : res.send(file));
});

const images = app.get('/:post/images/:image', (req, res) => {
  const path = `${config.output}/posts/${req.params.post}/images/${req.params.image}`;
  fs.readFile(path, (err, file) => err ? log(path, res.sendStatus(404)) : res.send(file));
});

const index = app.get('/index.json', (req, res) => {
  const path = `${config.output}/index.json`;
  fs.readFile(path, (err, file) => err ? log(path, res.sendStatus(404)) : res.send(file));
});

module.exports = {
  posts,
  images,
  index,
};
