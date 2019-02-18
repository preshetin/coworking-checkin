import React from 'react'
import { Link } from 'react-router-dom'

const VisitorRow = ({ visitor }) => {
  return (
    <div className='box'>
      {visitor.firstName} {visitor.lastName}
      <br />
      <Link to={`/visitors/${visitor.uid}`}>
        Edit
      </Link>
    </div>
  )
}

export default VisitorRow
