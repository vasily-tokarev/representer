const representer = require('./../src/index.js');
const cheerio = require('cheerio');
const fs = require('fs');

// TODO: Watch script.

test('writes HTML files from markdown', () => {
  const inputDir = './tests/fixtures/markdown/';
  const outputDir = './tests/output/';
  const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  // Clean up .DS_Store and such.
  fs.readdirSync(inputDir).forEach((path) => {
    if (!/\.md/.test(path)) {
      fs.unlinkSync(`${inputDir}/${path}`);
    }
  });

  representer.main(inputDir, outputDir);

  const correctNumberOfFiles = fs.readdirSync(inputDir).length === fs.readdirSync(outputDir).length;
  expect(correctNumberOfFiles).toBe(true);

  const article1 = cheerio.load(fs.readFileSync(`${outputDir}/article-1.html`));
  expect(article1('title').text()).toBe('Blog Post 1');
  expect(article1('article').text().trim()).toBe(`Blog Post 1\n${loremIpsum}`);
  expect(article1('em').text().trim()).toBe(loremIpsum);

  const article2 = cheerio.load(fs.readFileSync(`${outputDir}/article-2.html`));
  expect(article2('title').text()).toBe('Blog Post 2');
  expect(article2('article').text().trim()).toBe(`Blog Post 2\n${loremIpsum}`);
  expect(article2('strong').text().trim()).toBe(loremIpsum);
});

