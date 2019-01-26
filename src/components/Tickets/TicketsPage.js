import React, { Component } from 'react'
import { TICKETS_CREATE } from '../../constants/routes'
import { Link } from 'react-router-dom'
import TicketsListContainer from './TicketsListContainer'

export default class TicketsPage extends Component {
  render () {
    return (
      <div>
        <div className='title'>
          Абонементы <Link to={TICKETS_CREATE} className='button'>Create</Link>
        </div>

        <TicketsListContainer />
      </div>
    )
  }
}
