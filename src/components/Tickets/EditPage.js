import React from 'react'
import BackButton from '../common/BackButton'
import EditForm from './EditForm'
import { selectTicket } from '../../reducers/tickets'
import { setTicket } from '../../actions/ticketActions'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withAuthorization, withEmailVerification } from '../Session'
import { withFirebase } from '../Firebase'

class EditPage extends React.Component {
  componentDidMount () {
    const { id } = this.props.match.params
    this.unsubscribe = this.props.firebase.ticket(id)
      .onSnapshot(snapshot => {
        this.props.onSetTicket(snapshot.data())
      })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const { id } = this.props.match.params
    const { ticket } = this.props

    if (ticket === undefined) {
      return <h1 className='title'>Loading...</h1>
    }

    return (
      <div className='columns'>
        <div className='column is-half'>
          <BackButton />
          <h1 className='title'> {'Edit ' + ticket.firstName} </h1>
          <EditForm id={id} ticket={ticket} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ticket: selectTicket(state.tickets, ownProps.match.params.id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSetTicket: ticket => dispatch(setTicket(ticket, ownProps.match.params.id))
})

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withEmailVerification
)(EditPage)
