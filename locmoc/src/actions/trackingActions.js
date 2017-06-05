import _ from 'lodash'
import { types } from './index'
import { runStartQuery } from './ajax'
import { project_id, dataset_id, table_id } from '../const/dataset.json'
import { selectFilterAddr } from '../const/query'
import { dateToTimestamp } from '../utils/index'

export const resizeContent = (width, height) => {
  return {
    type: types.RESIZE_TRACKING_CONTENT,
    width,
    height,
  }
}
export const resizeHeader = (width, height) => {
  return {
    type: types.RESIZE_TRACKING_HEADER,
    width,
    height,
  }
}
export const changeText = value => {
  return {
    type: types.TRACKING_CHANGE_TEXT,
    value
  }
}

export const changeSlider = index => {
  return {
    type: types.TRACKING_CHANGE_SLIDER,
    index
  }
}

export const selectPoint = index => {
  return {
    type: types.TRACKING_SELECT_POINT,
    index
  }
}

export const search = (macAddr) => (dispatch, getState) => {
  dispatch({
    type: types.TRACKING_SEARCH_START,
  })
  const state = getState()
  const { timeMap } = state.tracking
  const day1SrcDate = _.find(timeMap, o => o.day === 1).date
  const day1DstDate = _.findLast(timeMap, o => o.day === 1).date
  const day2SrcDate = _.find(timeMap, o => o.day === 2).date
  const day2DstDate = _.findLast(timeMap, o => o.day === 2).date
  const query = _.template(selectFilterAddr)({
    projectId: project_id,
    datasetId: dataset_id,
    tableId: table_id,
    macAddress: macAddr,
    srcTimestamp1: dateToTimestamp(day1SrcDate),
    dstTimestamp1: dateToTimestamp(day1DstDate),
    srcTimestamp2: dateToTimestamp(day2SrcDate),
    dstTimestamp2: dateToTimestamp(day2DstDate),
  })
  return runStartQuery(query).then((results) => {
    dispatch({
      type: types.TRACKING_SEARCH_FINISHED,
      results,
    })
  }).catch((error) => {
    dispatch({
      type: types.ERROR,
      error: error
    })
  })
}
