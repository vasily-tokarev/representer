/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PostingsList from 'components/PostingsList';

const postings = [
  {
    id: 1,
    href: '/posting-1.html',
    text: 'Posting One text.',
    title: 'Posting One',
  },
  {
    id: 2,
    href: '/posting-2.html',
    text: 'Posting Two text.',
    title: 'Posting Two',
  },
];

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <PostingsList postings={postings} />
    );
  }
}
