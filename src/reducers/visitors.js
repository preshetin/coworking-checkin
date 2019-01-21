import { SET_VISITORS, SET_VISITOR } from '../constants/actionTypes';
import _ from 'lodash';

const defaultState = {
  visitors: {}
}

const setVisitors = (state, visitorData, id) => {
    let newVisitors = _.clone(state.visitors);
    newVisitors[id] = visitorData;
    return newVisitors;
  }

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_VISITORS:
      return Object.assign({}, state, {
        visitors: action.payload
      });
    case SET_VISITOR:
      return Object.assign({}, state, {
        visitors: setVisitors(state, action.payload, action.id)
      });
    default:
      return state;
  }
}

export const selectVisitors = (state) => {
  const result = [];
  _.forOwn(state.visitors, (visitors, key) => {
    result.push({ ...visitors, uid: key });
  });
  return result;
}

export const selectVisitor = (state, id) => {
  return state.visitors[id];
}

