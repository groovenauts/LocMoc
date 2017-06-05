import _ from 'lodash'
import { types } from '../actions/index'
import { realPosition } from '../const/position'
import { HEATMAP_ROOM_NUMBER } from '../const'
import { createTimeMaps, addCoordinates } from './util'

const initialState = {
  content: {
    width: 0,
    height: 0,
  },
  map: {
    width: 0,
    height: 0,
    pxPermm: 0,
  },
  real: {
    width: realPosition.rooms[HEATMAP_ROOM_NUMBER].rightBottom.x,
    height: realPosition.rooms[HEATMAP_ROOM_NUMBER].rightBottom.y,
    rooms: realPosition.rooms
  },
  predictions: [],
  view: {
    startTimestamp: 0,
    lastTimestamp: 0,
  },
  timeMap: null,
  currentIndex: 0,
  limitIndex: 0,
  predict: {
    oldestTimestamp: 0,
    latestTimestamp: 0,
  },
  error: null,
}

const map = (state = initialState, action) => {
  switch (action.type) {
    case types.RESIZE_HEATMAP_CONTENT: {
      const { width, height } = action
      const { predictions, real } = state
      let pxPermm = 0
      let mapHeight = height
      let mapWidth = width
      // let offsetHeight = 0
      // let offsetWidth = 0
      const fitHorizontal = real.width > real.height
      if (fitHorizontal) {
        pxPermm = real.width / width
        mapHeight = real.height / pxPermm
        // offsetHeight = (height - mapHeight) / 2
      } else {
        pxPermm = real.height / height
        mapWidth = real.width / pxPermm
        // offsetWidth = (width - mapWidth) / 2
      }
      // const pxPermm = real.height / height
      // const mapWidth = real.width / pxPermm
      // let mapHeight = height
      // let mapWidth = width
      // let offsetHeight = 0
      // let offsetWidth = 0
      // const fitHorizontal = real.width > real.height
      // if (fitHorizontal) {
      //   mapHeight = real.height / pxPermm
      //   offsetHeight = (height - mapHeight) / 2
      // }
      return {
        ...state,
        content: {
          width,
          height,
        },
        map: {
          width: mapWidth,
          height: mapHeight,
          pxPermm,
          // offsetWidth,
          // offsetHeight,
        },
        predictions: addCoordinates(predictions, real.rooms, pxPermm),
      }
    }
    case types.CHECK_2ND_DAYS: {
      const { result } = action
      const timeMap = createTimeMaps(result)
      const currentIndex = _.findLastIndex(timeMap, o => o.possible)
      return {
        ...state,
        timeMap,
        currentIndex,
        limitIndex: currentIndex,
      }
    }
    case types.GET_PREDICTIONS_PER_HOURS: {
      const { results } = action
      const { map, real } = state
      return {
        ...state,
        predictions: addCoordinates(results, real.rooms, map.pxPermm),
      }
    }
    case types.ERROR: {
      return {
        error: action.error
      }
    }
    default:
      return state
  }
}

export default map
