/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { LOAD_POST } from 'containers/PostContainer/constants';
import { put, takeLatest } from 'redux-saga/effects';
import { postLoaded } from 'containers/PostContainer/actions';
import postData, { getPost } from '../saga';

const post = {
  name: 'post',
  text: 'Post text.',
  title: 'Post Title',
};

describe('getPost Saga', () => {
  let getPostGenerator;

  beforeEach(() => {
    getPostGenerator = getPost();

    const selectDescriptor = getPostGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getPostGenerator.next(post).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getPost action', () => {
    const response = [{
      name: 'first-post',
      text: 'First post text.',
      title: 'First Post Title',
    }, {
      name: 'second-post',
      text: 'Second post text.',
      title: 'Second Post Title',
    }];
    const putDescriptor = getPostGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(postLoaded(response, response)));
  });
});

describe('postData Saga', () => {
  const postDataSaga = postData();

  it('should start task to watch for LOAD_POST action', () => {
    const takeLatestDescriptor = postDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_POST, getPost));
  });
});
