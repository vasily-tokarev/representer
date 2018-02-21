import React from 'react';
import { shallow } from 'enzyme';

import { mapDispatchToProps, PostContainer } from '../index';

describe('<Post />', () => {
  const match = {
    params: {
      name: 'Post',
    },
  };

  it('should render the posts list', () => {
    const onLoad = jest.fn();
    const renderedComponent = shallow(
      <PostContainer onLoad={onLoad} match={match} post={{}} />
    );
    expect(renderedComponent.find(<PostContainer />));
  });
});

describe('mapDispatchToProps', () => {
  describe('onLoad', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    expect(result.onLoad).toBeDefined();
  });
});
