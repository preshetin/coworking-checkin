import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withEmailVerification } from '../Session';
import { selectTickets } from '../../reducers/tickets';
import { setTickets } from '../../actions/ticketActions';
import { selectVisitors } from '../../reducers/visitors';
import { setVisitors } from '../../actions/visitorActions';
import TicketRow from './TicketRow';

const getVisitorById = (visitors, ticketId) => {
  const visitorsArr = [];

}

class TicketsListContainer extends React.Component {

  componentDidMount() {
    const userId = this.props.authUser.uid;
    this.unsubscribeTickets = this.props.firebase
      .ticketsForUser(userId)
      .onSnapshot(snapshot => {
        let tickets = {};
        snapshot.forEach(doc => (tickets[doc.id] = { ...doc.data() }))
        this.props.onSetTickets(tickets);
      })
    this.unsubscribeVisitors = this.props.firebase
      .visitorsForUser(userId)
      .onSnapshot(snapshot => {
        let visitors = {};
        snapshot.forEach(doc => (visitors[doc.id] = { ...doc.data() }))
        this.props.onSetVisitors(visitors);
      })
  }

  componentWillUnmount() {
    this.unsubscribeTickets();
    this.unsubscribeVisitors();
  }

  render() {
    const { tickets, visitors } = this.props;


    return (
      <div className="container">
      {tickets.map((ticket, id) => {
        console.log('visitors', visitors, ticket.visitorId,  visitors[ticket.visitorId]);
        return <TicketRow key={id} visitor={visitors[ticket.visitorId]} foo="bar" ticket={ticket}/>;
      } )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: selectTickets(state.tickets),
  visitors: state.visitors.visitors
});

const mapDispatchToProps = dispatch => ({
  onSetTickets: tickets => dispatch(setTickets(tickets)),
  onSetVisitors: visitors => dispatch(setVisitors(visitors))
})

export default compose(
  withFirebase,
  connect(mapStateToProps,mapDispatchToProps),
  withEmailVerification
)(TicketsListContainer);

