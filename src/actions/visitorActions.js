import * as types from '../constants/actionTypes'

export const setVisitors = (visitors) => ({
  type: types.SET_VISITORS,
  payload: visitors
})

export const setVisitor = (visitor, id) => ({
  type: types.SET_VISITOR,
  id,
  payload: visitor
})
