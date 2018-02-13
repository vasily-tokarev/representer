/*
 *
 * Post actions
 *
 */

import {
  LOAD_POST_SUCCESS,
  LOAD_POST,
} from './constants';

export function loadPost(name) {
  return {
    type: LOAD_POST,
    name,
  };
}

export function postLoaded(post) {
  return {
    type: LOAD_POST_SUCCESS,
    post,
  };
}
