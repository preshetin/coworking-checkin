import React from 'react';
import moment from 'moment';

const getHumanReadable = duration => {
  var hours = parseInt(duration.asHours());
  var minutes = parseInt(duration.asMinutes())%60;
  var seconds = parseInt(duration.seconds());
  if (hours === 0 && minutes === 0) {
    return `${seconds} seconds`;
    return 'less than a minute';
  }
  if (hours === 0) {
    return `${minutes} min`;
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

const TicketEntry = ({ ticket }) => 
  (<li style={{ fontSize: "200%" }} key={ticket.id}>
    {ticket.visitorName} &nbsp;
    <button className="button"> Checkout </button>&nbsp;
    |
     &nbsp;<Timer start={new Date(ticket.startAt.seconds*1000)} /> 
   </li>);

const TicketsList = ({ tickets }) => {

  return (
    <div className="Tickets-list">
      <h1 className="title">Сейчас коворкают (tickets):</h1>
      <ul>
        {tickets.map(v => <TicketEntry key={v.id} ticket={v} />)}
      </ul>
    </div>
  );

}

export default TicketsList;
