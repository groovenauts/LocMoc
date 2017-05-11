import { handleActions } from 'redux-actions';
import _ from 'lodash';
import logger from 'js-logger';
import { fn } from './util/function';
import {
  DATA_REQUEST_COUNT_ACTION
} from './data.action';


const initState = {
  requestCount: {}
};


export function requestCount(state, action) {
  const { data } = action.payload;
  return { ...state, requestCount: data };
}

const handlers = handleActions({
  [DATA_REQUEST_COUNT_ACTION]: requestCount,
}, initState);

export default handlers;
