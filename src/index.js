const fs = require('fs');
const marked = require('marked');

// Local.
const markup = require('./markup');
const config = {
  inputDir: 'entries',
  outputDir: 'html',
};

// Posting with HTML.
const HTML = (posting) =>
  `${markup.htmlBefore(posting.title, markup.style)}
        ${posting.text}
        ${markup.htmlAfter}`;

const cleanDir = (dir) => fs.readdirSync(dir).forEach((path) => fs.unlinkSync(`${dir}/${path}`));

const writeToFS = (posting) => fs.appendFileSync(
  posting.path
  , HTML(posting)
);

const title = (text) => text.split('\n')[0].replace(/#\s/, '');
const content = (text) => marked(text);
const replaceExtension = (filename, outputDir = config.outputDir) => `./${outputDir}/${filename.replace(/\.md/, '.html')}`;

const main = (inputDir = config.inputDir, outputDir = config.outputDir) => {
  // Clean directory.
  cleanDir(outputDir);
  // Main script.
  fs.readdirSync(inputDir)
  .filter((filename) => filename.match(/\.md/))
  .forEach((filename) => {
    const text = fs.readFileSync(`./${inputDir}/${filename}`, 'utf8');
    const outputFilename = replaceExtension(filename, outputDir);
    writeToFS({
      path: outputFilename,
      title: title(text),
      text: content(text),
    });
  });
};

module.exports = { main };
