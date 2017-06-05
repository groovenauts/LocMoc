import _ from 'lodash'
import { types } from './index'
import { runStartQuery } from './ajax'
import { project_id, dataset_id, table_id } from '../const/dataset.json'
import { selectPredictionsWithFilterByTime, numberOfBeforeYesterday } from '../const/query'
import {  HEATMAP_ROOM_NUMBER } from '../const'
import { dateToTimestamp } from '../utils'

export const resizeContent = (width, height) => {
  return {
    type: types.RESIZE_HEATMAP_CONTENT,
    width, 
    height
  }
}

export const check2ndDay = () => dispatch => {
  const query = _.template(numberOfBeforeYesterday)({
    projectId: project_id,
    datasetId: dataset_id,
    tableId: table_id,
  })
  return runStartQuery(query).then((results) => {
    dispatch({
      type: types.CHECK_2ND_DAYS,
      result: _.get(results, '0.count', 0) > 0
    })
  }).catch((error) => {
    dispatch({
      type: types.ERROR,
      error: error
    })
  })
}

export const getPredictionsPerHours = (date, rangeHours=1) => dispatch => {
  const dstDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()+rangeHours)
  const query = _.template(selectPredictionsWithFilterByTime)({
    projectId: project_id,
    datasetId: dataset_id,
    tableId: table_id,
    srcTimestamp: _.toNumber(dateToTimestamp(date)),
    dstTimestamp: _.toNumber(dateToTimestamp(dstDate)),
    roomNumber: HEATMAP_ROOM_NUMBER,
  })
  return runStartQuery(query).then((results) => {
    dispatch({
      type: types.GET_PREDICTIONS_PER_HOURS,
      results,
    })
  }).catch((error) => {
    dispatch({
      type: types.ERROR,
      error: error
    })
  })
}
