import _ from 'lodash';
import logger from 'js-logger';
import { fn } from './util/function';


/**
 * Client ID
 * @const
 * @type {string}
 */
export const $GOOGLE_CLIENT_ID = "ここにクライアントIDを埋め込む";

/**
 * Scope for API
 * @const
 * @type {string}
 */
export const $GOOGLE_SCOPE = 'https://www.googleapis.com/auth/bigquery.readonly';

/**
 * GCP Project ID
 * @const
 * @type {string}
 */
export const $GOOGLE_PROJECT_ID = "blocks-next-2017";


/**
 * Google の OAuth 認証を行う。
 * @param {function} callback - コールバック
 */
export function oauthInit(callback) {
  global.gapi.load('client:auth2', () => {
    global.gapi.client.load('bigquery', 'v2', () => {
      global.gapi.client.init({
        client_id: $GOOGLE_CLIENT_ID,
        scope: $GOOGLE_SCOPE,
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(fn(callback));
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          fn(callback)(true);
        } else {
          fn(callback)(false);
        }
      })
    })
  });
}

export function oauth(callback) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 * Query を実行する。
 */
export function bqRunQuery(query, callback) {
  let req = global.gapi.client.bigquery.jobs.query({
    projectId: $GOOGLE_PROJECT_ID,
    query: query
  });
  req.execute((response) => {
    fn(callback)(response);
  });
}
