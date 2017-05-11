import { takeEvery, takeLatest, delay } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import _ from 'lodash';
import logger from 'js-logger';
import { fn } from './util/function';
import {
  BQ_LOAD_REQUEST_COUNT_ACTION,
} from './bq.action';
import {
  dataRequestCountAction,
} from './data.action';
import { runQuery } from './bigquery';
import { $BQ_REQUEST_COUNT_QUERY } from './queries';


/**
 * リクエスト数をカウントする。
 * @param {object} action - Action object
 * @param {string} action.type - Action type
 * @param {object} action.payload - Action payload
 * @param {number} action.payload.start - 開始タイムスタンプ
 * @param {number} action.payload.end - 終了タイムスタンプ
 */
export function* loadRequestCount(action) {
  const { start, end, callback } = action.payload;
  const [ success, data, response ] = yield call(runQuery, $BQ_REQUEST_COUNT_QUERY, start, end);
  yield put(dataRequestCountAction(data));
  fn(callback)(success, data);
}

// saga
function* loadRequestCountSaga() { yield takeEvery(BQ_LOAD_REQUEST_COUNT_ACTION, loadRequestCount) }


/**
 * Saga
 */
export default function* saga() {
  yield fork(loadRequestCountSaga);
}
