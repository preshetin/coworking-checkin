import React from 'react'
import './EditPage.css'
import TicketPreview from './TicketPreview'
import TicketCard from './TicketCard'
import BackButton from '../common/BackButton'
import EditForm from './EditForm'
import { selectTicket } from '../../reducers/tickets'
import { selectVisitor } from '../../reducers/visitors'
import { setTicket } from '../../actions/ticketActions'
import { setVisitor } from '../../actions/visitorActions'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withAuthorization, withEmailVerification } from '../Session'
import { withFirebase } from '../Firebase'

class EditPage extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
        ticket: null,
        visitor: null
      }
    
  }
  componentDidMount () {
    const ticketId = this.props.match.params.id
    const { firebase } = this.props
    firebase.ticket(ticketId).get().then(ticketSnapshot => {
      const visitorId = ticketSnapshot.data().visitorId
      console.log('done', visitorId)
      this.setState({ticket: { ...ticketSnapshot.data(), id:ticketSnapshot.id }})
      firebase.visitor(visitorId).get().then(visitorSnapshot => {
        this.setState({ visitor: { ...visitorSnapshot.data(), id: visitorSnapshot.id }  })
          })
        })
  }

  render () {
    const { id } = this.props.match.params
    const { ticket, visitor } = this.state

    if (ticket === null || visitor == null) {
      return <h1 className='title'>Loading...</h1>
    }

    return (
      <div className='columns'>
        <div className='column '>
          <BackButton />
          <TicketPreview ticket={ticket} visitor={visitor} />
        </div>
      </div>
    )
  }
}

export default compose(
  withFirebase,
  withEmailVerification
)(EditPage)
