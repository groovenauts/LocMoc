import _ from 'lodash'
import { types } from '../actions/index'

const initialState = {
  room: null,
}

const summary = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COUNT_PER_10MIN: {
      const { results } = action
      return {
        ...state,
        room: _.groupBy(results, 'room')
      }
    }
    default:
      return state
  }
}

export default summary
