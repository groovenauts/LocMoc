import _ from 'lodash';
import logger from 'js-logger';
import { fn } from './util/function';


/**
 * Client ID
 * @const
 * @type {string}
 */
export const $GOOGLE_CLIENT_ID = "424906329885-uh8ji8vt9hh20ieblevnbaae215ro8dj.apps.googleusercontent.com";

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
export function oauth(callback) {
  global.gapi.auth.authorize({
    client_id: $GOOGLE_CLIENT_ID,
    scope: $GOOGLE_SCOPE,
  }, (auth) => {
    global.gapi.client.load('bigquery', 'v2', () => {
      fn(callback)(auth);
    });
  })
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
