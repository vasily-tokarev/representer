
import {
  loadPost,
} from '../actions';
import {
  LOAD_POST,
} from '../constants';

describe('Post actions', () => {
  describe('load post', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = 'Post';
      const expected = {
        type: LOAD_POST,
        name: fixture,
      };
      expect(loadPost(fixture)).toEqual(expected);
    });
  });
});
