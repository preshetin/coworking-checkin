import React from 'react'
import Timer from './Timer'

const VisitEntry = ({ visit, onCheckouting }) => {
  const handleClick = e => {
    e.preventDefault()
    console.log('VisitEntry handleClick')
    onCheckouting(visit)
  }

  const checkoutButton = <button className='button' onClick={handleClick}> Checkout </button>

  return (<li style={{ fontSize: '200%' }} key={visit.id}>
    {visit.visitorName} &nbsp;
    |&nbsp;
    <Timer start={new Date(visit.startAt.seconds * 1000)} />
  </li>)
}

export default VisitEntry
