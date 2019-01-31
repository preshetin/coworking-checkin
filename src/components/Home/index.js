import React, { Component } from 'react'
import VisitsListContainer from '../Visits/VisitsListContainer'
import VisitCreator from '../Visits/VisitCreator'

class HomePage extends Component {
  render () {
    return (
      <div className='container'>
        <VisitsListContainer />
      </div>
    )
  }
}

export default HomePage
