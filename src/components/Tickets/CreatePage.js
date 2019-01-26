import React from 'react'
import CreateForm from './CreateForm'
import BackButton from '../common/BackButton'
import TicketForm from './TicketForm'
import { compose } from 'recompose'
import { withAuthorization, withAuthentication } from '../Session'

const TicketCreatePage = ({ firebase, history, authUser }) => {
  const handleSubmit = values => {
    firebase.createTicket({ ...values, userId: authUser.uid })
      .then(() => history.push('/tickets'))
  }

  const visitors = [
    { value: '111', title: '111 visitor' },
    { value: '222', title: '222 visitor' }
  ]

  return (
    <div>
      <BackButton />
      <h1 className='title'>Create Ticket</h1>
      <TicketForm
        buttonName='Create Ticket'
        onSubmit={handleSubmit}
        visitors={visitors}
        ticket={{ visitorId: 'empty', hoursCapacity: null, hoursRemaining: null }}
      />
    </div>
  )
}

const condition = authUser => authUser !== null

export default compose(
  withAuthentication,
  withAuthorization(condition)
)(TicketCreatePage)
