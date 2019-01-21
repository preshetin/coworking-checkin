import React from 'react'
import CheckoutingModal from './CheckoutingModal';
import { selectVisits } from '../../reducers/visits'
import { setVisits } from '../../actions/visitActions'
import VisitsList from './VisitsList'
import PastVisits from './PastVisits'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

class VisitsListContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkoutingVisit: null 
    };
  }

  componentDidMount() {

    const uid = this.props.authUser.uid;

    this.unsubscribe = this.props.firebase
      .visitsForUser(uid)
      .onSnapshot(snapshot => {
        console.log('snapshot', snapshot);
        let visits = {};
        snapshot.forEach(doc => (visits[doc.id] = {
          ...doc.data(),
          // startAt: doc.data().startAt.seconds,
          // endAt: doc.data().endAt.seconds
        }));
        this.props.onSetVisits(visits);
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCheckouting = visit => (
    this.setState({ checkoutingVisit: visit })
  )

  handleDoCheckout = visit => {
    const { firebase } = this.props;
    firebase.checkoutVisit(visit).then( () => this.handleCheckoutCancel() );
  }

  handleCheckoutCancel = () => (
    this.setState({ checkoutingVisit: null })
  )

  render() {

    const { currentVisits, pastVisits } = this.props;
    const { checkoutingVisit } = this.state;

    if (this.props.visits === null) {
      return null;
    }

    return (
        <div className="columns">
          <div className="column">
            <VisitsList onCheckouting={this.handleCheckouting} visits={currentVisits} />
          </div>
          <div className="column">
            <PastVisits visits={pastVisits} />
          </div>
          { checkoutingVisit &&
              <CheckoutingModal
                visit={checkoutingVisit}
                onDoCheckout={this.handleDoCheckout}
                onCheckoutCancel={this.handleCheckoutCancel}  />} 
        </div>
    ); 
  }
}

const mapStateToProps = state => ({
  currentVisits: selectVisits(state.visits).filter(visit => !visit.hasOwnProperty('endAt')),
  pastVisits: selectVisits(state.visits).filter(visit => visit.hasOwnProperty('endAt'))
    .sort((a,b) => b.endAt.seconds - a.endAt.seconds),
});

const mapDispatchToProps = dispatch => ({
  onSetVisits: visits => dispatch(setVisits(visits)),
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
)(VisitsListContainer);
