import React from 'react'
import moment from 'moment';
import { getHumanReadableDuration } from '../../utils';

const VisitCard = ({ visit }) => {

  const start = moment(visit.startAt.seconds * 1000);
  const end = moment(visit.endAt.seconds * 1000);

  const duration = moment.duration(end.diff(start));

  return (
<div className="box">
  <article className="media">
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{visit.visitorName}</strong> 
          <br/>
          {getHumanReadableDuration(duration)}
          <br/>
          {start.format('dddd, MMMM Do')}
          <br/>
          From {start.format("HH:mm")} to {end.format("HH:mm")}
        </p>
      </div>
    </div>
  </article>
</div>
  );
}

export default VisitCard;