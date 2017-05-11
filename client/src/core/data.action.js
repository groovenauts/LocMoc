import { createAction } from 'redux-actions';
import _ from 'lodash';


export const DATA_REQUEST_COUNT_ACTION = "DATA_REQUEST_COUNT_ACTION";


export const dataRequestCountAction = createAction(DATA_REQUEST_COUNT_ACTION, (data) => {
  return { data }
});
