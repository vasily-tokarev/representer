/*
- Creates `post-name` directory for each post with:
 - HTML containing instant redirect to the app.
 - JSON file containing the whole post including the text.
 - Images from the source directory.
- Creates `index.json` file containing all posts from input directory with id, name and title.
*/

// Node.
const fs = require('fs');
const p = require('path');
const promisify = require('util').promisify;

// Unsorted.
const rimraf = require('rimraf');
const config = require('../config');
const shortid = require('shortid');

// Promisify.
const appendFile = promisify(fs.appendFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);
const rmrf = promisify(rimraf);

const id = shortid.generate;
const I = (identity) => identity;
const map = (fn) => (data) => data.map(fn);
const filter = (fn) => (data) => data.filter(fn);
const mapAsync = (fn) => (data) => Promise.all(data.map(fn));

const errHandler = (err) => {
  // eslint-disable-next-line no-console
  console.log(err.stack);
  throw new Error(err);
};


const HTMLTemplate = (postName, mountPoint) => (`
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Representer</title>
    <meta http-equiv="refresh" content="0;URL='/${mountPoint}/?post=${postName}'" />
  </head>
</html>
`);

const title = (text) => text.split('\n')[0].replace(/#\s/, '');
const notASystemFile = (path) => path !== '.DS_Store';
const imageFile = (fileName) => fileName.match(/.jpg|.jpeg|.png/) ? fileName : false;
const mdFile = (fileName) => fileName.match(/.md/) ? fileName : false;

const postsWithContent = (postFolder) => ({
  // [ [ 'img.png', 'post-1' ], [ 'post-2' ] ]
  images: postFolder.map(imageFile).filter(I),
  name: postFolder.map(mdFile).filter(I)[0].replace(/\..*/, ''), // Remove extension.
});


class Converter {
  constructor(input, output, mountPoint = '', clean = false) {
    this.input = input;
    this.output = output;
    this.clean = clean;
    this.mountPoint = mountPoint;
  }

  convert() {
    this.main().catch(errHandler);
  }

  async main() {
    if (this.clean) await this.eraseOutputDir();
    await this.createOutputDirs();

    await this.readdir(this.input)
      .then(filter(notASystemFile))
      .then(map((dir) => p.join(this.input, dir)))
      .then(mapAsync(this.readdir))
      .then(map(postsWithContent))
      .then(mapAsync(this.postWithText.bind(this)))
      .then(mapAsync(this.createPostDir.bind(this)))
      .then(mapAsync(this.createImageDirs.bind(this)))
      .then(map(this.copyImage.bind(this)))
      .then(mapAsync(this.createPostFiles.bind(this)))
      .then((posts) => this.createIndexFile(posts));
  }

  async readdir(dir) {
    return await readdir(dir); // eslint-disable-line no-return-await
  }

  copyImage(path) {
    path.images.map((i) => fs.createReadStream(`${this.input}/${path.name}/${i}`)
        .pipe(fs.createWriteStream(`${this.output}/posts/${path.name}/images/${i}`)));
    return path;
  }

  async postWithText(post) {
    return {
      ...post,
      ...{ text: await readFile(`${this.input}/${post.name}/${post.name}.md`, 'utf8') },
    };
  }

  async createPostFiles(post) {
    await appendFile(
      p.join(this.output, 'posts', post.name, `${post.name}.json`),
      JSON.stringify({
        name: post.name,
        text: post.text,
        title: title(post.text),
      }));

    await appendFile(
      p.join(this.output, 'posts', post.name, 'index.html'),
      HTMLTemplate(post.name, this.mountPoint));

    return post;
  }

  async createIndexFile(posts) {
    // TODO: [] and comma
    // console.log('POSTS', posts);
    await appendFile(
      `${this.output}/index.json`,
      JSON.stringify(
        posts.map((post) => (
          {
            id: id(),
            name: post.name,
            title: title(post.text),
          }
        )),
      ),
    );
    return posts;
  }

  async createDirInOutput(dir) {
    // TODO: Recursive create.
    const path = p.join(this.output, dir || '');
    if (!(await exists(path))) await mkdir(path);
    return dir;
  }

  async createImageDirs(post) {
    await this.createDirInOutput(p.join('posts', post.name, 'images'));
    return post;
  }

  async createPostDir(post) {
    await this.createDirInOutput(p.join('posts', post.name));
    return post;
  }

  async eraseOutputDir() {
    await rmrf(p.join(this.output));
  }

  async createOutputDirs() {
    await this.createDirInOutput();
    await this.createDirInOutput('posts');
  }
}


const converter = new Converter(
  config.input,
  config.output,
  config.mountPoint,
  config.clean);

converter.convert();
