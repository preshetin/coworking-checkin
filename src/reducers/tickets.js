import { SET_TICKETS } from '../constants/actionTypes';
import _ from 'lodash';

const defaultState = {
  tickets: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_TICKETS:
      return Object.assign({}, state, {
        tickets: action.payload
      });
    default:
      return state;
  }
}

export const selectTickets = (state) => {
  const result = [];
  _.forOwn(state.tickets, (ticket, key) => {
    result.push({ ...ticket, uid: key });
  });
  return result;
}

export const selectTicket = (state, id) => {
  return state.tickets[id];
}
