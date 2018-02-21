import React from 'react';
import { mount } from 'enzyme';

import Post from '../index';

describe('<Post />', () => {
  it('should render the post passed to it', () => {
    const name = 'post';
    const title = 'post';
    const text = ['hello', 'world'];
    const renderedComponent = mount(
      <Post title={title} name={name} text={text}/>,
    );
    expect(renderedComponent.text()).toBe('posthelloworld');
  });
});
