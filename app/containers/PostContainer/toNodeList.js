import React from 'react';
import shortid from 'shortid';

// TODO: Implement `re.exec` version.
// https://stackoverflow.com/questions/6323417/how-do-i-retrieve-all-matches-for-a-regular-expression-in-javascript

const element = (m, fn) => (
  {
    type: 'jsx',
    match: m.map(I),
    jsx: fn,
    index: m.index,
    length: m[0].length,
  }
);

const url = (m) => <a key={id()} href={m[1]}>{m[2]}</a>;
const bold = (m) => <strong key={id()}>{m[1]}</strong>;
const italic = (m) => <i key={id()}>{m[1]}</i>;
const h1 = (m) => <strong key={id()}>{m[1]}<br/></strong>;
const newline = () => <br key={id()}/>;

const id = shortid.generate;

const matchers = [
  [italic, /_(.*?)_/],
  [bold, /\*\*(.*?)\*\*/],
  [url, /\[(.*)]\((.*)\)/],
  [h1, /#(.*)\n/],
  [newline, /\n/],
];

const match = (text, m) => text.match(m[1]);
const matched = (text) => (m) => match(text, m) ? element(match(text, m), m[0]) : false;

const I = (identity) => identity;
const byIndexAsc = (a, b) => a.index - b.index;

const jsxs = (text) => matchers.map(matched(text));

const nextText = (text, fstJSX, sndJSX) =>
  fstJSX ? { type: 'text', match: text.substring(0, fstJSX.index) }
    : sndJSX ? { type: 'text', match: text.substring(0, sndJSX.index) }
    : text.length > 0 ? { type: 'text', match: text }
      : false;

const nextJSX = (text, jsx) => jsx && text.substring(0, jsx.index).length === 0 ? jsx : false;

const remainingText = (text, next) => {
  switch (next.type) {
    case 'jsx':
      return text.substring(next.index + next.length, text.length);
    case 'text':
      return text.substring(next.match.length);
    default:
      return '';
  }
};

const toNodeList = (text) => (rendered) => {
  if (text.length === 0) return rendered;

  const sortedJSXs = jsxs(text)
    .filter(I)
    .sort(byIndexAsc);

  const fstJSX = sortedJSXs[0];
  const sndJSX = sortedJSXs[1];

  const next = nextJSX(text, fstJSX) || nextText(text, fstJSX, sndJSX);
  const convertWithRemaining = toNodeList(remainingText(text, next));

  return next.type === 'jsx' ?
    convertWithRemaining(rendered.concat(nextJSX(text, next)))
    :
    convertWithRemaining(rendered.concat(nextText(text, false, fstJSX)));
};

export default toNodeList;
