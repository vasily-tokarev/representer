import React from 'react';
import { shallow } from 'enzyme';

import PostsList from 'components/PostsList';
import { Redirect } from 'react-router-dom';
import { HomePage } from '../index';

describe('<HomePage />', () => {
  it('should render the posts list', () => {
    const posts = {
      data: [
        {
          name: 'Post',
        },
      ],
    };

    const renderedComponent = shallow(
      <HomePage posts={posts}/>,
    );
    expect(renderedComponent.contains(<PostsList posts={[posts.data[0]]} />)).toEqual(true);
    // expect(renderedComponent.find(<PostsList posts={posts} />)).toBeDefined();
  });

  it('render redirect if match is present', () => {
    Object.defineProperty(window.location, 'search', {
      value: 'post=first-post',
    });
    const posts = {
      data: [],
    };
    const renderedComponent = shallow(
      <HomePage posts={posts}/>,
    );
    expect(renderedComponent.contains(<Redirect to={'posts/first-post'}/>)).toEqual(true);
  });
});

