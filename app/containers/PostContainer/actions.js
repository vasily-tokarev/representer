/*
 *
 * Post actions
 *
 */

import {
  LOAD_POST_SUCCESS,
  LOAD_POST,
  UNMOUNT_POST,
  WS_PAYLOAD,
} from './constants';

export function loadPost(name) {
  return {
    type: LOAD_POST,
    name,
  };
}

export function unmountPost() {
  return {
    type: UNMOUNT_POST,
  };
}

export function postLoaded(post) {
  return {
    type: LOAD_POST_SUCCESS,
    post,
  };
}

export function WSPayload(data) {
  return {
    type: WS_PAYLOAD,
    data,
  };
}
