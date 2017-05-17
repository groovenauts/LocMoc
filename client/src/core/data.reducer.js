import { handleActions } from 'redux-actions';
import _ from 'lodash';
import logger from 'js-logger';
import { fn } from './util/function';
import {
  DATA_SRC_MAC_ADDRESSES_ACTION,
  DATA_RASPI_REQUEST_COUNT_ACTION,
  DATA_SRC_REQUEST_COUNT_ACTION,
} from './data.action';


const initState = {
  srcMacAddresses: {},
  raspiRequestCount: {},
  srcRequestCount: {},
};


export function srcMacAddresses(state, action) {
  const { data } = action.payload;
  return { ...state, srcMacAddresses: data };
}

export function raspiRequestCount(state, action) {
  const { data } = action.payload;
  return { ...state, raspiRequestCount: data };
}

export function srcRequestCount(state, action) {
  const { data } = action.payload;
  return { ...state, srcRequestCount: data };
}

const handlers = handleActions({
  [DATA_SRC_MAC_ADDRESSES_ACTION]: srcMacAddresses,
  [DATA_RASPI_REQUEST_COUNT_ACTION]: raspiRequestCount,
  [DATA_SRC_REQUEST_COUNT_ACTION]: srcRequestCount,
}, initState);

export default handlers;
