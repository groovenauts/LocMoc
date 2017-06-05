import _ from 'lodash'
import { types } from './index'

export const select = (index) => {
  return {
    type: types.SELECT_NAVI,
    index,
  }
}
