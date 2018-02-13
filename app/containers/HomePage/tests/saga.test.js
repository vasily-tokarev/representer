/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import postsData, { getPosts } from '../saga';
import { LOAD_POSTS } from '../constants';
import { postsLoaded } from '../actions';

describe('getPosts Saga', () => {
  let getPostsGenerator;
  beforeEach(() => {
    getPostsGenerator = getPosts();

    const callDescriptor = getPostsGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the postsLoaded action', () => {
    const response = [{
      name: 'First post',
    }, {
      name: 'Second post',
    }];
    const putDescriptor = getPostsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(postsLoaded(response)));
  });
});


describe('postsData Saga', () => {
  const postsDataSaga = postsData();

  it('should start task to watch for LOAD_POSTS action', () => {
    const takeLatestDescriptor = postsDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_POSTS, getPosts));
  });
});
