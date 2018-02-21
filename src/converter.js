/*
- Creates `index.json` file containing all posts from input directory with id, name and title.
- Creates `post-name` directory for each post with:
 - HTML containing instant redirect to the app.
 - JSON file containing the whole post including the text.
*/

// Node imports.
const fs = require('fs');
const p = require('path');
const promisify = require('util').promisify;

// Unsorted imports.
const co = require('co');
const rimraf = require('rimraf');
const config = require('../config');

// Promisify.
const appendFile = promisify(fs.appendFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);
const rmrf = promisify(rimraf);

const HTMLTemplate = (post, mountPoint) => (`
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Representer</title>
    <meta http-equiv="refresh" content="0;URL='/${mountPoint}/?post=${post.name}'" />
  </head>
</html>
`);

const withoutExtension = (str) => str.replace(/\..*/, '');

const title = (text) => text.split('\n')[0].replace(/#\s/, '');

const postsJSON = (names, texts) => names.map((name, index) => {
  const text = texts[index];
  return {
    id: index, // React key
    name,
    text,
    title: title(text),
  };
});

const postWithoutText = (post) => (
  {
    id: post.id,
    name: post.name,
    title: post.title,
  }
);

const errHandler = (err) => {
  // eslint-disable-next-line no-console
  console.log(err.stack);
  throw new Error(err);
};

class Converter {
  constructor(input, output, mountPoint = '', clean = false) {
    this.input = input;
    this.output = output;
    this.clean = clean;
    this.mountPoint = mountPoint;
  }

  convert() {
    co(() => this.main()).catch(errHandler);
  }

  * main() {
    const names = yield this.names(this.input);
    const texts = yield this.texts(names);
    const namesWithoutExtension = names.map(withoutExtension);
    const posts = postsJSON(namesWithoutExtension, texts);

    if (this.clean) yield this.cleanOutputDir();
    yield this.createOutputDirs();
    yield this.writeDirs(namesWithoutExtension);
    yield this.writePosts(posts);
    yield this.writeIndexFile(posts);
  }

  * names(dir) {
    return Promise.resolve(yield readdir(dir));
  }

  * text(name) {
    return Promise.resolve(yield readFile(p.join(this.input, name), 'utf8'));
  }

  * texts(names) {
    return Promise.resolve(yield names.map(this.text.bind(this)));
  }

  * writePost(post) {
    Promise.resolve(yield appendFile(
      p.join(this.output, 'posts', post.name, `${post.name}.json`),
      JSON.stringify(post)),
    );

    Promise.resolve(yield appendFile(
      p.join(this.output, 'posts', post.name, 'index.html'),
      HTMLTemplate(post, this.mountPoint)),
    );
  }

  * writePosts(files) {
    if (!(yield exists(`${this.output}/posts/`))) yield this.writeDir('posts');
    yield Promise.resolve(yield files.map(this.writePost.bind(this)));
  }

  * writeIndexFile(posts) {
    yield Promise.resolve(yield appendFile(
      `${this.output}/index.json`,
      JSON.stringify(posts.map(postWithoutText))),
    );
  }

  * writeDir(dir) {
    const path = p.join(this.output, dir || '');
    return (yield exists(path)) ? false : Promise.resolve(yield mkdir(path));
  }

  * writeDirs(dirs) {
    yield Promise.resolve(yield dirs
      .map((dir) => p.join('posts', dir))
      .map(this.writeDir.bind(this)));
  }

  * cleanOutputDir() {
    return Promise.resolve(rmrf(p.join(this.output, '*')));
  }

  * createOutputDirs() {
    Promise.resolve(yield this.writeDir());
    Promise.resolve(yield this.writeDir('posts'));
  }
}


const converter = new Converter(
  config.input,
  config.output,
  config.mountPoint,
  config.clean);

converter.convert();
