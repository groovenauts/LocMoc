import { combineReducers } from 'redux'
import app from './appReducers'
import navi from './naviReducers'
import map from './mapReducers'
import summary from './summaryReducers'
import detail from './detailReducers'
import tracking from './trackingReducers'

const rootReducer = combineReducers({
  app,
  navi,
  map,
  summary,
  detail,
  tracking,
})

export default rootReducer
