import * as types from '../constants/actionTypes'

export const setTickets = (tickets) => ({
  type: types.SET_TICKETS,
  payload: tickets
})

export const setTicket = (ticket, id) => ({
  type: types.SET_VISITOR,
  id,
  payload: ticket
})
