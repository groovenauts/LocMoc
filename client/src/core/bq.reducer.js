import { handleActions } from 'redux-actions';
import _ from 'lodash';
import logger from 'js-logger';
import { fn } from './util/function';
import {
  BQ_UPDATE_TIME_WINDOW_ACTION,
  BQ_UPDATE_SOURCE_TYPE_ACTION,
} from './bq.action';
import { $TIME_WIDTH } from './data';

let now = new Date();
let currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0);
let timestamp = Math.floor(currentDate.getTime() / 1000);

const initState = {
  type: "raspi",
  timeWindow: {
    start: Math.floor(currentDate.getTime() / 1000),
    end: Math.floor((currentDate.getTime() / 1000) + $TIME_WIDTH),
  },
};

/**
 * 時間帯を更新する
 * @param {object} state - State
 * @param {object} action - Action object
 * @param {string} action.type - Action type
 * @param {object} action.payload - Action payload
 * @param {object} action.payload.start - 開始時刻
 * @param {object} action.payload.end - 終了時刻
 * @return {object} New State
 */
export function updateTimeWindow(state, action) {
  const { timeWindow } = state;
  const { start, end, callback } = action.payload;
  const startTime = (_.isDate(start)) ? start.getTime() / 1000 : ((_.isNumber(start)) ? start : timeWindow.start);
  const endTime = (_.isDate(end)) ? end.getTime() / 1000 : ((_.isNumber(end)) ? end : timeWindow.end);
  const newTimeWIndow = { start: startTime, end: endTime };
  fn(callback)(newTimeWIndow);
  return { ...state, timeWindow: newTimeWIndow }
}

export function updateSourceType(state, action) {
  const { type } = action.payload;
  return { ...state, type: type };
}

const handlers = handleActions({
  [BQ_UPDATE_TIME_WINDOW_ACTION]: updateTimeWindow,
  [BQ_UPDATE_SOURCE_TYPE_ACTION]: updateSourceType,
}, initState);

export default handlers;
