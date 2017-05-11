import { createAction } from 'redux-actions';
import _ from 'lodash';


export const BQ_UPDATE_TIME_WINDOW_ACTION = "BQ_UPDATE_TIME_WINDOW_ACTION";
export const BQ_LOAD_REQUEST_COUNT_ACTION = "BQ_LOAD_REQUEST_COUNT_ACTION";
export const BQ_LOADED_REQUEST_COUNT_ACTION = "BQ_LOADED_REQUEST_COUNT_ACTION";

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
 * 指定時間帯内のリクエスト数を取得する。
 * @param {Date|number} start - 開始日時
 * @param {Date|number} end - 終了日時
 * @return {object}
 */
export const bqLoadRequestCountAction = createAction(BQ_LOAD_REQUEST_COUNT_ACTION, (start, end, callback) => {
  return { start, end, callback };
})

/**
 * 指定時間帯内のリクエスト数を取得した。
 * @param {object[]} data - データ
 * @return {object}
 */
export const bqLoadedRequestCountAction = createAction(BQ_LOADED_REQUEST_COUNT_ACTION, (data) => {
  return { data };
})
