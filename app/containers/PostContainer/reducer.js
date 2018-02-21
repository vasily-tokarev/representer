/*
 *
 * Post reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_POST,
  LOAD_POST_SUCCESS,
  UNMOUNT_POST,
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
    case UNMOUNT_POST:
      return state
        .set('data', { id: 0, text: '', name: '', title: 'Loading' });
    default:
      return state;
  }
}

export default postReducer;
