import React from 'react';
import { shallow } from 'enzyme';

import ListItem from 'components/ListItem';
import { PostingListItem } from '../index';

describe('<PostingListItem />', () => {
  let item;

  beforeEach(() => {
    item = {
      id: 1,
      href: '/posting-1.html',
      text: 'Posting One text.',
      title: 'Posting One',
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(
      <PostingListItem item={item} />
    );
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });
});
