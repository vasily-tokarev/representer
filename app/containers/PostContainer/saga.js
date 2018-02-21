import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { postLoaded } from './actions';
import { LOAD_POST } from './constants';
import { makeSelectPostName } from './selectors';

const config = require('../../../config');

export function* getPost() {
  const name = yield select(makeSelectPostName());
  const requestURL = config.env === 'prod' ? `${name}/${name}.json` : `/posts/name/${name}.json`;

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
