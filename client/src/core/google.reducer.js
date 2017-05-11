import { handleActions } from 'redux-actions';
import _ from 'lodash';
import logger from 'js-logger';

import {
  GOOGLE_OAUTH_ACTION
} from './google.action';

const initState = {
  authorized: false,
};


/**
 * Googleの認証情報を保持する。
 * @param {object} state - State
 * @param {object} action - Action object
 * @param {string} action.type - Action type
 * @param {object} action.payload - Action payload
 * @param {boolean} action.payload.auth - Google の認証情報
 * @return {object} New State
 */
export function oauth(state, action) {
  const { auth } = action.payload;
  return { ...state, authorized: auth };
}



const handlers = handleActions({
  [GOOGLE_OAUTH_ACTION]: oauth,
}, initState);

export default handlers;
