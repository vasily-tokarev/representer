import React from 'react';
import { shallow } from 'enzyme';

import List from 'components/List';
import PostingListItem from 'containers/PostingListItem';
import PostingsList from '../index';

describe('<PostingsList />', () => {
  it('should render postings', () => {
    const postings = [
      {
        id: 1,
        href: '/posting-1.html',
        text: 'Posting One text.',
        title: 'Posting One',
      },
    ];
    const renderedComponent = shallow(
      <PostingsList
        postings={postings}
      />,
    );
    expect(renderedComponent.contains(<List items={postings} component={PostingListItem} />)).toEqual(true);
  });
});
