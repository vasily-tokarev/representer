import { createSelector } from 'reselect';

/**
 * Direct selector to the post state domain
 */
const selectPostDomain = (state) => state.get('post');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Post
 */

const makeSelectPostName = () => createSelector(
  selectPostDomain,
  (substate) => substate.get('name'),
);

const makeSelectPost = () => createSelector(
  selectPostDomain,
  (substate) => substate.toJS(),
);

// Need this?
export default makeSelectPost;
export {
  makeSelectPost,
  selectPostDomain,
  makeSelectPostName,
};
