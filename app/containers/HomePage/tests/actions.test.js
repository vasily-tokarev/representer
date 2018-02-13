import {
  loadPosts,
} from '../actions';
import {
  LOAD_POSTS,
} from '../constants';

describe('HomePage actions', () => {
  describe('loadPosts', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const fixture = 'post';
      const expected = {
        type: LOAD_POSTS,
        posts: fixture,
      };
      expect(loadPosts(fixture)).toEqual(expected);
    });
  });
});
