/*
 *
 * Post reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_POST,
  LOAD_POST_SUCCESS,
} from './constants';

const initialState = fromJS({});

function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POST:
      return state
        .set('name', action.name);
    case LOAD_POST_SUCCESS:
      return state
        .set('data', action.post);
    default:
      return state;
  }
}

export default postReducer;
