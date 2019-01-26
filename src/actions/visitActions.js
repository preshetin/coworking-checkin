import * as types from '../constants/actionTypes'

export const setVisits = (tickets) => ({
  type: types.SET_VISITS,
  payload: tickets
})
