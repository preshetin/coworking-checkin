import { SET_VISITS } from '../constants/actionTypes'
import _ from 'lodash'

const defaultState = {
  visits: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_VISITS:
      return Object.assign({}, state, {
        visits: action.payload
      })
    default:
      return state
  }
}

export const selectVisits = (state) => {
  const result = []
  _.forOwn(state.visits, (visit, key) => {
    result.push({ ...visit, uid: key })
  })
  return result
}
