import { fromJS } from 'immutable';
import {
  selectPostDomain,
  makeSelectPost,
  makeSelectPostName,
} from '../selectors';

describe('selectPostDomain', () => {
  it('should select Post domain', () => {
    const postState = fromJS({});
    const mockedState = fromJS({
      post: postState,
    });
    expect(selectPostDomain(mockedState)).toEqual(postState);
  });
});

describe('makeSelectPostName', () => {
  const postNameSelector = makeSelectPostName();
  it('should select the post name', () => {
    const postName = 'post-1.json';
    const mockedState = fromJS({
      post: {
        data: {},
        name: postName,
      },
    });
    expect(postNameSelector(mockedState)).toEqual(postName);
  });
});

describe('makeSelectPost', () => {
  const postSelector = makeSelectPost();
  it('should select the post', () => {
    const data = {};
    const mockedState = fromJS({
      post: {},
    });
    expect(postSelector(mockedState)).toEqual(data);
  });
});
