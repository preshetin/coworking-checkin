import React from 'react';
import { Link } from 'react-router-dom';

const TicketRow = ({ticket, visitor}) => {
  if (!visitor) {
    return null;
  }
  return (
    <div className="box">
      {ticket.uid} 
      <br />
      Visitor: {visitor.firstName} { visitor.lastName }
      <br />
      Hours capacity: {ticket.hoursCapacity || " - "}
      <br />
      Hours remaining: {ticket.hoursRemaining || " -  "}
      <br />
      <Link to={`/tickets/${ticket.uid}`}>
        Edit
      </Link>
    </div>
  )
}

export default TicketRow;
