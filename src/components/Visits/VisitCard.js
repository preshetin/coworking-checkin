import React from 'react'

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

export default VisitCard;