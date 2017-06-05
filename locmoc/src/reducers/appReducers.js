import _ from 'lodash'
import { types } from '../actions/index'

const initialState = {
  progress: false,
  message: null,
}
const app = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_START:
      return {
        ...state,
        progress: true
      }
    case types.INIT_FINISHED:
      return {
        ...state,
        progress: false
      }
    default:
      return state
  }
}

export default app
