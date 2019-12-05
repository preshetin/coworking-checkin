import React from 'react'
import VisitCard from './VisitCard'

const PastVisits = ({ visits }) => {
  return (
    <div>
      <h1 className='title'>Recent Visits</h1>
      {visits.map(visit => <VisitCard key={visit.uid} visit={visit} />)}

    </div>
  )
}

export default PastVisits
