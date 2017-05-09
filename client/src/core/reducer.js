import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import googleReducer from './google.reducer';

const reducers = combineReducers({
  routing: routerReducer,
  google: googleReducer,
});
export default reducers;
