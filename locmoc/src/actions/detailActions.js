import _ from 'lodash'
import { types } from './index'
import { runStartQuery } from './ajax'
import { project_id, dataset_id, table_id } from '../const/dataset.json'
import { numberOfHoursPerRoom } from '../const/query'
import { dateToTimestamp } from '../utils/index'

export const showDetail = (roomNumber) => {
  return {
    type: types.SHOW_DETAIL,
    roomNumber,
  }
}

export const hiddenDetail = () => {
  return {
    type: types.HIDDEN_DETAIL
  }
}

export const getCountPerHours = () => (dispatch, getState) => {
  const state = getState()
  const { timeMap } = state.tracking
  const day1SrcDate = _.find(timeMap, o => o.day === 1).date
  const day1DstDate = _.findLast(timeMap, o => o.day === 1).date
  const day2SrcDate = _.find(timeMap, o => o.day === 2).date
  const day2DstDate = _.findLast(timeMap, o => o.day === 2).date
  const query = _.template(numberOfHoursPerRoom)({
    projectId: project_id,
    datasetId: dataset_id,
    tableId: table_id,
    srcTimestamp1: dateToTimestamp(day1SrcDate),
    dstTimestamp1: dateToTimestamp(day1DstDate),
    srcTimestamp2: dateToTimestamp(day2SrcDate),
    dstTimestamp2: dateToTimestamp(day2DstDate),
  })
  return runStartQuery(query).then((results) => {
    dispatch({
      type: types.GET_COUNT_PER_HOURS,
      results,
    })
  }).catch((error) => {
    dispatch({
      type: types.ERROR,
      error: error
    })
  })
}
