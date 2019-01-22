import React, { Component } from 'react'
import { VISITOR_CREATE } from '../../constants/routes';
import { Link } from 'react-router-dom';
import VisitorsListContainer from './VisitorsListContainer';

export default class VisitorsPage extends Component {

  render() {
    return (
      <div>
        <div className="title">
          Visitors <Link to={VISITOR_CREATE} className="button">Create</Link>
        </div>
        
        <VisitorsListContainer />
      </div>
    )
  }
}

