import _ from 'lodash'
import { types } from '../actions/index'

const initialState = {
  index: 0,
}
const navi = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_NAVI:
      return {
        ...state,
        index: action.index,
      }
    default:
      return state
  }
}

export default navi
