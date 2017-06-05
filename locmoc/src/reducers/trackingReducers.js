import _ from 'lodash'
import { types } from '../actions/index'
import { realPosition } from '../const/position'
import { createTimeMaps, addCoordinates } from './util'
import { timestampToDate, toDoubleDigits } from '../utils/index'

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
  header: {
    width: 0,
    height: 0,
  },
  real: {
    width: realPosition.width,
    height: realPosition.height,
    rooms: realPosition.rooms,
  },
  macAddr: "a0:d7:95:48:66:76",//null, //todo
  timeMap: null,
  currentIndex: 0,
  limitIndex: 0,
  predictions: [],
  sliderMap: [],
  isProgress: false,
}

const tracking = (state = initialState, action) => {
  switch (action.type) {
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
    case types.RESIZE_TRACKING_CONTENT: {
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
    case types.RESIZE_TRACKING_HEADER:
      return {
        ...state,
        header: {
          width: action.width,
          height: action.height
        }
      }
    case types.TRACKING_CHANGE_TEXT: 
      return {
        ...state,
        macAddr: action.value,
      }
    case types.TRACKING_CHANGE_SLIDER: 
      return {
        ...state,
        currentIndex: action.index,
      }
    case types.TRACKING_SELECT_POINT: {
      const { index } = action
      const { sliderMap, predictions } = state
      let nextIndex = 0
      const point = _.find(sliderMap, o => o.predictionIndex === index)
      if (point) {
        return {
          ...state,
          currentIndex: point.sliderStart + ((point.sliderEnd - point.sliderStart) / 2)
        }
      }
      return {
        ...state,
      }
    }
    case types.TRACKING_SEARCH_START:
      return {
        ...state,
        isProgress: true,
      }
    case types.TRACKING_SEARCH_FINISHED: {
      const { results } = action
      const { map, real, timeMap, currentIndex } = state
      const gourpKey = (date) => `${date.getFullYear()}${toDoubleDigits(date.getMonth()+1)}${toDoubleDigits(date.getDate())}${toDoubleDigits(date.getHours())}`
      const grouped = _.groupBy(results, o => {
        const date = timestampToDate(o.timestamp)
        return gourpKey(date)
      })
      const sliderMap = _.map(results, (o, i) => {
        const date = timestampToDate(o.timestamp)
        const timeIndex = _.findIndex(timeMap, t => {
          return t.date.getFullYear() === date.getFullYear()
            && t.date.getMonth() === date.getMonth()
            && t.date.getDate() === date.getDate()
            && t.date.getHours() === date.getHours()
        })
        const base = timeIndex
        const numInGroup = _.size(grouped[gourpKey(date)])
        const indexInGroup = _.findIndex(grouped[gourpKey(date)], o2 => {
          return o2.timestamp === o.timestamp
              && o2.room === o.room
              && o2.x === o.x
              && o2.y === o.y
        })
        const sliderEnd = base + ((1 / numInGroup) * (indexInGroup + 1))
        const sliderStart = indexInGroup > 0 ? sliderEnd - (1 / numInGroup) : base
        return {
          sliderStart,
          sliderEnd,
          predictionIndex: i,
        }
      })
      return {
        ...state,
        predictions: addCoordinates(results, real.rooms, map.pxPermm),
        sliderMap,
        isProgress: false,
      }
    }
    default:
      return state
  }
}

export default tracking
