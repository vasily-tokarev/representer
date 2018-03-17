/*
 *
 * Post actions
 *
 */

import {
  HELP_TOGGLE,
} from './constants';

export function toggleHelp() {
  return {
    type: HELP_TOGGLE,
  };
}

