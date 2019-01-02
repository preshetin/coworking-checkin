import * as types from '../constants/actionTypes';

export const setTickets = (tickets) => ({
  type: types.SET_TICKETS,
  payload: tickets
})
