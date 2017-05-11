import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import googleReducer from './google.reducer';
import bqReducer from './bq.reducer';
import dataReducer from './data.reducer';

const reducers = combineReducers({
  routing: routerReducer,
  google: googleReducer,
  bq: bqReducer,
  data: dataReducer,
});
export default reducers;
