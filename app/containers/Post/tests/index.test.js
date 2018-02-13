import React from 'react';
import { shallow } from 'enzyme';

import { mapDispatchToProps, Post } from '../index';

describe('<Post />', () => {
  const match = {
    params: {
      name: 'Post',
    },
  };

  it('should render the posts list', () => {
    const onLoad = jest.fn();
    const renderedComponent = shallow(
      <Post onLoad={onLoad} match={match} post={{}} />
    );
    expect(renderedComponent.find(<Post />));
  });
});

describe('mapDispatchToProps', () => {
  describe('onLoad', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    expect(result.onLoad).toBeDefined();
  });
});
