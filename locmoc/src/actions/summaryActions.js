import _ from 'lodash'
import { types } from './index'
import { runStartQuery } from './ajax'
import { project_id, dataset_id, table_id } from '../const/dataset.json'
import { numberOfEvery10minPerRoom } from '../const/query'

export const getCountPerRoom = () => dispatch => {
  const query = _.template(numberOfEvery10minPerRoom)({
    projectId: project_id,
    datasetId: dataset_id,
    tableId: table_id,
  })
  return runStartQuery(query).then((results) => {
    dispatch({
      type: types.GET_COUNT_PER_10MIN,
      results,
    })
  }).catch((error) => {
    dispatch({
      type: types.ERROR,
      error: error
    })
  })
}
