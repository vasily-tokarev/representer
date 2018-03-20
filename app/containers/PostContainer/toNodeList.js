import React from 'react';
import SyntaxHighLighter from 'react-syntax-highlighter/prism';
import shortid from 'shortid';
import styled from 'styled-components';
import rshStyle from './rsh-style';

const Img = styled.img`
  max-width: 100%;
`;

const Span = styled.span`
   font-family: monospace, monospace;
   font-weight: 500;
`;

const config = require('../../../config.json');

const element = (m, fn) => (
  {
    type: 'jsx',
    match: m.map(I),
    jsx: fn,
    index: m.index,
    length: m[0].length,
  }
);

const backtick = (m) => <Span className="backtick" key={id()}>{m[1]}</Span>;
const bold = (m) => <strong key={id()}>{m[1]}</strong>;
const code = (m) => <SyntaxHighLighter key={id()} language={m[1]} style={rshStyle}>{m[2]}</SyntaxHighLighter>;
const h1 = (m) => <h1 key={id()}>{m[2]}</h1>;
const h2 = (m) => <h2 key={id()}>{m[1]}</h2>;
const newline = () => <br key={id()}/>;
const url = (m) => <a key={id()} href={m[1]}>{m[2]}</a>;
const italic = (m) => <i key={id()}>{m[1]}</i>;
const image = (postName) => (m) => (
  <Img
    alt={m[1]}
    src={`${config.env === 'prod' ? `/${config.mountPoint}` : ''}/posts/${postName}/images/${m[2]}`}
    key={id()}
  />
);

const id = shortid.generate;
const I = (identity) => identity;
const match = (text, m) => text.match(m[1]);
const matched = (text) => (m) => match(text, m) ? element(match(text, m), m[0]) : false;
const byIndexAsc = (a, b) => a.index - b.index;
const jsxs = (text, matchers) => matchers.map(matched(text));

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

const toNodeList = (postName, text) => (rendered) => {
  if (!text || text.length === 0) return rendered;

  const matchers = [
    [italic, /_(.*?)_/],
    [bold, /\*\*(.*?)\*\*/],
    // [url, /\[(.*)]\((.*)\)/],
    [url, /\[(.*?)]\((.*?)\)/],
    [h1, /(^|\n)#\s(.*)/],
    [h2, /##\s(.*)\n/],
    [newline, /\n/],
    [image(postName), /(?:!\[(.*?)\]\((.*?)\))/],
    [code, /```(.*)((.|\n)*?)```/],
    [backtick, /`(.*?)`/],
  ];

  const sortedJSXs = jsxs(text, matchers)
    .filter(I)
    .sort(byIndexAsc);

  const fstJSX = sortedJSXs[0];
  const sndJSX = sortedJSXs[1];

  const next = nextJSX(text, fstJSX) || nextText(text, fstJSX, sndJSX);
  const convertWithRemaining = toNodeList(postName, remainingText(text, next));

  return next.type === 'jsx' ?
    convertWithRemaining(rendered.concat(nextJSX(text, next)))
    :
    convertWithRemaining(rendered.concat(nextText(text, false, fstJSX)));
};

export default toNodeList;
