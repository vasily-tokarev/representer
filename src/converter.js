// Node imports.
const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;

// Unsorted imports.
const co = require('co');
const rimraf = require('rimraf');

// Promisify.
const appendFile = promisify(fs.appendFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const rmrf = promisify(rimraf);

// TODO: JSDoc.
// TODO: Tests.

const withoutExtension = (str) => str.replace(/\..*/, '');

const title = (text) => text.split('\n')[0].replace(/#\s/, '');

const posts = (names, texts) => names.map((name, index) => {
  const text = texts[index];
  return {
    name,
    text,
    title: title(text),
  };
});

const errHandler = (err) => {
  // eslint-disable-next-line no-console
  console.log(err.stack);
  throw new Error(err);
};

class Converter {
  constructor(input, output) {
    this.input = input;
    this.output = output;
  }

  convert() {
    return co(() => this.main()).catch(errHandler);
  }

  * main() {
    const names = yield this.names(this.input);
    const texts = yield this.texts(names);
    const namesWithoutExtension = names.map(withoutExtension);
    yield this.clean();
    yield this.writeDirs(namesWithoutExtension);
    yield this.writePosts(posts(namesWithoutExtension, texts));
  }

  * names(dir) {
    return Promise.resolve(yield readdir(dir));
  }

  * text(name) {
    return Promise.resolve(yield readFile(path.join(this.input, name), 'utf8'));
  }

  * texts(names) {
    return Promise.resolve(yield names.map(this.text.bind(this)));
  }

  * writePost(post) {
    return Promise.resolve(yield appendFile(
      path.join(this.output, post.name, `${post.name}.json`),
      JSON.stringify(post)),
    );
  }

  * writePosts(files) {
    yield Promise.resolve(yield files.map(this.writePost.bind(this)));
  }

  * writeDir(dir) {
    return Promise.resolve(yield mkdir(path.join(this.output, dir)));
  }

  * writeDirs(dirs) {
    yield Promise.resolve(yield dirs.map(this.writeDir.bind(this)));
  }

  * clean() {
    return Promise.resolve(rmrf(path.join(this.output, '*')));
  }
}

const converter = new Converter('tmp/input', 'tmp/output');
converter.convert();