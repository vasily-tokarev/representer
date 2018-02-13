/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_POSTS,
  POSTS_LOAD_SUCCESS,
} from './constants';

const initialState = fromJS({});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return state;
    case POSTS_LOAD_SUCCESS:
      return state
        .set('data', action.posts);
    default:
      return state;
  }
}

export default homePageReducer;
