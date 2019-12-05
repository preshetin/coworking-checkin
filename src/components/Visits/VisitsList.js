import React from 'react'
import VisitEntry from './VisitEntry'

const VisitsList = ({ visits, onCheckouting }) => {
  return (
    <div className='Visits-list'>
      <h1 className='title'>Checked In Visitors</h1>
      <ul>
        {visits.map(v => <VisitEntry
          onCheckouting={onCheckouting}
          key={v.uid}
          visit={v}
        />)}
      </ul>
    </div>
  )
}

export default VisitsList
