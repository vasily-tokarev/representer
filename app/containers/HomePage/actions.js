/*
 *
 * HomePage actions
 *
 */

import {
  LOAD_POSTS,
  POSTS_LOAD_SUCCESS,
} from './constants';

export function loadPosts() {
  return {
    type: LOAD_POSTS,
  };
}

export function postsLoaded(posts) {
  return {
    type: POSTS_LOAD_SUCCESS,
    posts,
  };
}
