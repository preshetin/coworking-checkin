import React from 'react';
import CheckoutingModal from './CheckoutingModal';
import moment from 'moment';
import { setVisits } from '../../actions/visitActions';
import { selectVisits } from '../../reducers/visits';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

const getHumanReadable = duration => {
  var hours = parseInt(duration.asHours());
  var minutes = parseInt(duration.asMinutes())%60;
  var seconds = parseInt(duration.seconds());
  if (hours === 0 && minutes === 0) {
    return `${seconds} sec`;
    return 'less than a minute';
  }
  if (hours === 0) {
    return `${minutes} min ${seconds} sec`;
  }
  return `${hours} h ${minutes} min ${seconds} sec`;
}

class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0
    }
  }

  componentDidMount() {
    
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState({elapsed: new Date() - this.props.start});
  }

  render() {
    // Calculate elapsed to tenth of a second:
    var elapsed = Math.round(this.state.elapsed / 100);
    // This will give a number with one digit after the decimal dot (xx.x):
    var seconds = (elapsed / 10).toFixed(0);    
      
    const duration = moment.duration(parseInt(seconds), 'seconds');

    return <b>{getHumanReadable(duration)}</b>;
  }
};

const VisitEntry = ({ visit, onCheckouting }) => {

  const handleClick = e => {
    e.preventDefault();
    console.log('VisitEntry handleClick');
    onCheckouting(visit);
  }


  return (<li style={{ fontSize: "200%" }} key={visit.id}>
    {visit.visitorName} &nbsp;
    <button className="button" onClick={handleClick}> Checkout </button>&nbsp;
    |
     &nbsp;<Timer start={new Date(visit.startAt.seconds*1000)} /> 
   </li>)
};

const VisitsList = ({ visits, onCheckouting }) => {

  return (
    <div className="Visits-list">
      <h1 className="title">Сейчас коворкают (visits):</h1>
      <ul>
        {visits.map(v => <VisitEntry
          onCheckouting={onCheckouting}
          key={v.uid}
          visit={v}
        />)}
      </ul>
    </div>
  );

}


const VisitCard = ({ visit }) => {

  return (
<div className="box">
  <article className="media">
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{visit.visitorName}</strong> 
          <br/>
          From: xx, to: yy
        </p>
      </div>
    </div>
  </article>
</div>
  );
}

const PastVisits = ({ visits }) => {

  return (
    <div>
      <h1 className="title"> Недавние посещения </h1>
      {visits.map(visit => <VisitCard key={visit.uid} visit={visit}/>)}
      	
    </div>
  );
}


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
        snapshot.forEach(doc => (visits[doc.id] = doc.data()));
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
    console.log('handleDoCheckout', visit)
    firebase.checkoutVisit(visit.uid, visit.endAt);
    this.handleCheckoutCancel();
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
  pastVisits: selectVisits(state.visits).filter(visit => visit.hasOwnProperty('endAt')),
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

