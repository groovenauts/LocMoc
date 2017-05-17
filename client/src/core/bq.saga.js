import { takeEvery, takeLatest, delay } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import _ from 'lodash';
import logger from 'js-logger';
import { fn } from './util/function';
import {
  BQ_LOAD_SRC_MAC_ADDRESSES,
  BQ_LOAD_RASPI_REQUEST_COUNT_ACTION,
  BQ_LOAD_SRC_REQUEST_COUNT_ACTION,
} from './bq.action';
import {
  dataSrcMacAddressesAction,
  dataRaspiRequestCountAction,
  dataSrcRequestCountAction,
} from './data.action';
import { runQuery } from './bigquery';
import {
  $BQ_SRC_MAC_ADDRESS_LIST_QUERY,
  $BQ_RASPI_REQUEST_COUNT_QUERY,
  $BQ_SRC_REQUEST_COUNT_QUERY,
} from './queries';



/**
 * MACアドレスの一覧を取得する。
 * @param {object} action - Action object
 * @param {string} action.type - Action type
 * @param {object} action.payload - Action payload
 * @param {number} action.payload.start - 開始タイムスタンプ
 * @param {number} action.payload.end - 終了タイムスタンプ
 */
export function* loadSrcMacAddresses(action) {
  const { start, end, callback } = action.payload;
  const [ success, data, response ] = yield call(runQuery, $BQ_SRC_MAC_ADDRESS_LIST_QUERY, start, end);
  yield put(dataSrcMacAddressesAction(data));
  fn(callback)(success, data);
}

/**
 * リクエスト数をカウントする。
 * @param {object} action - Action object
 * @param {string} action.type - Action type
 * @param {object} action.payload - Action payload
 * @param {number} action.payload.start - 開始タイムスタンプ
 * @param {number} action.payload.end - 終了タイムスタンプ
 */
export function* loadRaspiRequestCount(action) {
  const { start, end, callback } = action.payload;
  const [ success, data, response ] = yield call(runQuery, $BQ_RASPI_REQUEST_COUNT_QUERY, start, end);
  yield put(dataRaspiRequestCountAction(data));
  fn(callback)(success, data);
}

/**
 * リクエスト数をカウントする。
 * @param {object} action - Action object
 * @param {string} action.type - Action type
 * @param {object} action.payload - Action payload
 * @param {number} action.payload.start - 開始タイムスタンプ
 * @param {number} action.payload.end - 終了タイムスタンプ
 */
export function* loadSrcRequestCount(action) {
  const { start, end, src_mac, callback } = action.payload;
  const [ success, data, response ] = yield call(runQuery, $BQ_SRC_REQUEST_COUNT_QUERY, start, end, src_mac);
  yield put(dataSrcRequestCountAction(data));
  fn(callback)(success, data);
}

// saga
function* loadSrcMacAddressesSaga() { yield takeEvery(BQ_LOAD_SRC_MAC_ADDRESSES, loadSrcMacAddresses) }
function* loadRaspiRequestCountSaga() { yield takeEvery(BQ_LOAD_RASPI_REQUEST_COUNT_ACTION, loadRaspiRequestCount) }
function* loadSrcRequestCountSaga() { yield takeEvery(BQ_LOAD_SRC_REQUEST_COUNT_ACTION, loadSrcRequestCount) }


/**
 * Saga
 */
export default function* saga() {
  yield fork(loadSrcMacAddressesSaga);
  yield fork(loadRaspiRequestCountSaga);
  yield fork(loadSrcRequestCountSaga);
}
