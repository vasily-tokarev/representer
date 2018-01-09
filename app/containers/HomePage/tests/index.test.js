import React from 'react';
import { shallow } from 'enzyme';

import PostingsList from 'components/PostingsList';
import HomePage from '../index';

describe('<HomePage />', () => {
  it('should render the postings list', () => {
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
    const renderedComponent = shallow(
      <HomePage />,
    );
    expect(renderedComponent.contains(<PostingsList postings={postings} />)).toEqual(true);
  });
});
