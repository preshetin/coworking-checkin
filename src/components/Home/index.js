import React, { Component } from 'react';
import { selectTickets } from '../../reducers/tickets';
import TicketsList from '../Tickets/TicketsList';
import { setTickets } from '../../actions/ticketActions';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import Messages from '../Messages';

class HomePage extends Component {

  componentDidMount() {

    const uid = this.props.authUser.uid;

    this.unsubscribe = this.props.firebase
      .ticketsForUser(uid)
      .onSnapshot(snapshot => {
        let tickets = {};
        snapshot.forEach(doc => (tickets[doc.id] = doc.data()));
        this.props.onSetTickets(tickets);
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    const { tickets } = this.props;
    console.log('tickets', tickets);

    if (this.props.tickets === null) {
      return null;
    }

    return (
      <div className="container">

<div class="dropdown is-hoverable">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
      <span>Добавить билет</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu4" role="menu">
    <div class="dropdown-content">
      <a href="#" class="dropdown-item">
        Одноразовый билет 
      </a>
      <a class="dropdown-item">
        Многоразовый билет 
      </a>
    </div>
  </div>
</div>
<br />
<br />
        <div className="columns">
          <div className="column">
            <TicketsList tickets={tickets} />
          </div>
          <div className="column">
            <h1 className="title"> Недавние посещения </h1>
          </div>
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: selectTickets(state.tickets),
});

const mapDispatchToProps = dispatch => ({
  onSetTickets: tickets => dispatch(setTickets(tickets)),
});

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
