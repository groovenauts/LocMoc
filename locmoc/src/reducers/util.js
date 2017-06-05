import _ from 'lodash'

const START_HOUR = 8
const END_HOUR = 20
const TIME_MAP = _.concat(_.range(START_HOUR, END_HOUR+1), _.range(START_HOUR, END_HOUR+1)) // 2days

export const createTimeMaps = (exist2days=false) => {
  return _.map(TIME_MAP, (hours, i) => {
    let day = null
    let date = null
    let possible = false
    const now = new Date()
    const nowHours = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours())
    if (exist2days) {
      if (i < _.size(TIME_MAP)/2) {
        day = 1
        date = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1, hours)
        possible = true
      } else {
        day = 2
        date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours)
        possible = date.getTime() <= nowHours.getTime()
      }
    } else {
      if (i < _.size(TIME_MAP)/2) {
        day = 1
        date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours)
        possible = date.getTime() <= nowHours.getTime()
      } else {
        day = 2
        date = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, hours)
      }
    }
    return { day, date, possible }
  })
}

const toPixel = (aliasCoord, realCoordCenter, pxPermm, isCoordX) => {
  const COORDINATE_UNIT = isCoordX ? 1000 : -1000
  return Math.floor((realCoordCenter + (aliasCoord * COORDINATE_UNIT)) / pxPermm)
}

const toPixelX = (aliasCoord, realCoordCenter, pxPermm) => {
  return toPixel(aliasCoord, realCoordCenter, pxPermm, true)
}

const toPixelY = (aliasCoord, realCoordCenter, pxPermm) => {
  return toPixel(aliasCoord, realCoordCenter, pxPermm, false)
}

export const addCoordinates = (data, realRooms, pxPermm) => _.reduce(data, (acc, o) => {
  const realRoom = realRooms[o.room]
  if (realRoom) {
    if (_.isNull(realRoom.center.x) && _.isNull(realRoom.center.y)) {
      acc.push(o)
    } else {
      let pxPosition = {}
      if (_.isNull(o.aliasX) || _.isNull(o.aliasY)) {
        pxPosition = {
          x: toPixelX(0, realRoom.center.x, pxPermm),
          y: toPixelY(0, realRoom.center.y, pxPermm),
        }
      } else {
        pxPosition = {
          x: toPixelX(o.aliasX, realRoom.center.x, pxPermm),
          y: toPixelY(o.aliasY, realRoom.center.y, pxPermm),
        }
      }
      acc.push({
        ...o,
        ...pxPosition
      })
    }
    return acc
  }
}, [])

