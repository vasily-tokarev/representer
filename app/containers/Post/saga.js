import { call, put, select, takeLatest } from 'redux-saga/effects';

import { postLoaded } from 'containers/Post/actions';
import request from 'utils/request';
import { LOAD_POST } from './constants';

// import { makeSelectPost, makeSelectPostName } from './selectors';
import { makeSelectPostName } from './selectors';

export function* getPost() {
  // Select username from store
  const name = yield select(makeSelectPostName());
  const requestURL = `/api/output/${name}/${name}`;
  try {
    const post = yield call(request, requestURL);
    yield put(postLoaded(post));
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

export default function* postData() {
  yield takeLatest(LOAD_POST, getPost);
}
