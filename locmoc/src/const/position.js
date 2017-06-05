import _ from 'lodash'
import realPositionOffice from './realPosition.office.json'
import realPositionNext from './realPosition.next.json'

let targetPosition = realPositionOffice
// todo
// let targetPosition = realPositionNext

// add center positions
targetPosition.rooms = _.map(targetPosition.rooms, room => {
  if (_.has(room, 'center')) {
    return {
      ...room
    }
  } else {
    return {
      ...room,
      center: {
        x: ((room.rightBottom.x - room.leftTop.x) / 2) + room.leftTop.x,
        y: ((room.rightBottom.y - room.leftTop.y) / 2) + room.leftTop.y
      }
    }
  }
})

export { targetPosition as realPosition }
