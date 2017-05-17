import { createAction } from 'redux-actions';
import _ from 'lodash';


export const BQ_UPDATE_TIME_WINDOW_ACTION = "BQ_UPDATE_TIME_WINDOW_ACTION";
export const BQ_UPDATE_SOURCE_TYPE_ACTION = "BQ_UPDATE_SOURCE_TYPE_ACTION";
export const BQ_LOAD_SRC_MAC_ADDRESSES = "BQ_LOAD_SRC_MAC_ADDRESSES";
export const BQ_LOAD_RASPI_REQUEST_COUNT_ACTION = "BQ_LOAD_RASPI_REQUEST_COUNT_ACTION";
export const BQ_LOAD_SRC_REQUEST_COUNT_ACTION = "BQ_LOAD_SRC_REQUEST_COUNT_ACTION";

/**
 * 時間帯を更新する。
 * @param {Date|number} start - 開始日時
 * @param {Date|number} end - 終了日時
 * @return {object}
 */
export const bqUpdateTimeWindowAction = createAction(BQ_UPDATE_TIME_WINDOW_ACTION, (start, end, callback) => {
  return { start, end, callback };
})

/**
 * ソースタイプを更新する。
 * @param {string} type - ソースタイプ
 * @return {object}
 */
export const bqUpdateSourceTypeAction = createAction(BQ_UPDATE_SOURCE_TYPE_ACTION, (type, callback) => {
  return { type, callback };
})

/**
 * 指定時間帯内のMACアドレスのリストを取得する。
 * @param {Date|number} start - 開始日時
 * @param {Date|number} end - 終了日時
 * @return {object}
 */
export const bqLoadSrcMacAddressesAction = createAction(BQ_LOAD_SRC_MAC_ADDRESSES, (start, end, callback) => {
  return { start, end, callback };
})

/**
 * 指定時間帯内のリクエスト数を取得する。
 * @param {Date|number} start - 開始日時
 * @param {Date|number} end - 終了日時
 * @return {object}
 */
export const bqLoadRaspiRequestCountAction = createAction(BQ_LOAD_RASPI_REQUEST_COUNT_ACTION, (start, end, callback) => {
  return { start, end, callback };
})

/**
 * 指定時間帯内のリクエスト数を取得する。
 * @param {Date|number} start - 開始日時
 * @param {Date|number} end - 終了日時
 * @return {object}
 */
export const bqLoadSrcRequestCountAction = createAction(BQ_LOAD_SRC_REQUEST_COUNT_ACTION, (start, end, callback) => {
  return { start, end, callback };
})
