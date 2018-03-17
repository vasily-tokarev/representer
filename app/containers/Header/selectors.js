import { createSelector } from 'reselect';

/**
 * Direct selector to the post state domain
 */
const selectHeaderDomain = (state) => state.get('header');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Post
 */

const makeSelectHelpToggle = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.get('helpIsActive'),
);

export {
  makeSelectHelpToggle,
};
