/*
 *
 * Post reducer
 *
 */

import { fromJS } from 'immutable';
import {
  HELP_TOGGLE,
} from './constants';

const initialState = fromJS({ helpIsActive: false });

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case HELP_TOGGLE:
      return state
        .set('helpIsActive', !state.get('helpIsActive'));
    default:
      return state;
  }
}

export default headerReducer;
