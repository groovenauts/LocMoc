import _ from 'lodash'
import { types } from './index'
import { runStartQuery } from './ajax'
import { project_id, dataset_id, table_id } from '../const/dataset.json'
import { selectPredictionsWithFilterByTime, numberOfBeforeYesterday } from '../const/query'

const check2ndDay = () => dispatch => {
  const query = _.template(numberOfBeforeYesterday)({
    projectId: project_id,
    datasetId: dataset_id,
    tableId: table_id,
  })
  return runStartQuery(query).then((res) => {
    dispatch({
      type: types.INIT_FINISHED,
      result: _.get(results, '0.count', 0) > 0
    })
    dispatch({
      results: res[0]
    })
  }).catch((error) => {
    dispatch({
      type: types.INIT_FINISHED,
      error: error
    })
  })
}

export const init = () => dispatch => {
  dispatch({
    type: types.INIT_START
  })
  return dispatch(check2ndDay())
}
