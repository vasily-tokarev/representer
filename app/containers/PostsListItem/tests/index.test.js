import React from 'react';
import { shallow } from 'enzyme';

import ListItem from 'components/ListItem';
import { PostsListItem } from '../index';

describe('<PostsListItem />', () => {
  let item;

  beforeEach(() => {
    item = {
      id: 1,
      name: '/post-1.html',
      text: 'Post One text.',
      title: 'Post One',
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(
      <PostsListItem item={item} />
    );
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });
});
