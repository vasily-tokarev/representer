import React from 'react';
import { shallow } from 'enzyme';

import List from 'components/List';
import PostListItem from 'containers/PostsListItem';
import PostsList from '../index';

describe('<PostsList />', () => {
  it('should render posts', () => {
    const posts = [
      {
        id: 1,
        href: '/post-1.html',
        text: 'Post One text.',
        title: 'Post One',
      },
    ];
    const renderedComponent = shallow(
      <PostsList
        posts={posts}
      />,
    );
    expect(renderedComponent.contains(<List items={posts} component={PostListItem} />)).toEqual(true);
  });
});
