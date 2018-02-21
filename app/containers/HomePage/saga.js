import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { postsLoaded } from './actions';
import { LOAD_POSTS } from './constants';

export function* getPosts() {
  const requestURL = './index.json';
  try {
    const posts = yield call(request, requestURL);
    yield put(postsLoaded(posts));
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

export default function* postsData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_POSTS, getPosts);
}
