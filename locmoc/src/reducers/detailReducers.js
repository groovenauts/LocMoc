import _ from 'lodash'
import { types } from '../actions/index'

const initialState = {
  isShow: false,
  roomNumber: -1,
  room: null,
}

const detail = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_DETAIL:
      return {
        ...state,
        roomNumber: action.roomNumber,
        isShow: true,
      }
    case types.HIDDEN_DETAIL:
      return {
        ...state,
        isShow: false,
      }
    case types.GET_COUNT_PER_HOURS: {
      const { results } = action
      // todo reject
      return {
        ...state,
        room: _.groupBy(results, 'room')
      }
    }
    default:
      return state
  }
}

export default detail
