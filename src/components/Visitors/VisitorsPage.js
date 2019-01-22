import React, { Component } from 'react'
import { VISITOR_CREATE } from '../../constants/routes';
import { Link } from 'react-router-dom';
import VisitorsListContainer from './VisitorsListContainer';

export default class VisitorsPage extends Component {

  render() {
    return (
      <div>
        <div class="title">
          Visitors <Link to={VISITOR_CREATE} class="button">Create</Link>
        </div>
        
        <VisitorsListContainer />
      </div>
    )
  }
}

