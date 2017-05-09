import { createAction } from 'redux-actions';
import _ from 'lodash';

export const GOOGLE_OAUTH_ACTION = "GOOGLE_OAUTH_ACTION";


export const googeOAuthAction = createAction(GOOGLE_OAUTH_ACTION, (auth) => {
  return { auth };
});
