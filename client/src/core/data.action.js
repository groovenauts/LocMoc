import { createAction } from 'redux-actions';
import _ from 'lodash';


export const DATA_SRC_MAC_ADDRESSES_ACTION = "DATA_SRC_MAC_ADDRESSES_ACTION";
export const DATA_RASPI_REQUEST_COUNT_ACTION = "DATA_RASPI_REQUEST_COUNT_ACTION";
export const DATA_SRC_REQUEST_COUNT_ACTION = "DATA_SRC_REQUEST_COUNT_ACTION";


export const dataSrcMacAddressesAction = createAction(DATA_SRC_MAC_ADDRESSES_ACTION, (data) => {
  return { data }
});

export const dataRaspiRequestCountAction = createAction(DATA_RASPI_REQUEST_COUNT_ACTION, (data) => {
  return { data }
});

export const dataSrcRequestCountAction = createAction(DATA_SRC_REQUEST_COUNT_ACTION, (data) => {
  return { data }
});
