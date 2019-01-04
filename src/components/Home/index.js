import React, { Component } from 'react';
import VisitsListContainer from '../Visits';
import VisitCreator from '../Visits/VisitCreator';

class HomePage extends Component {

  render() {

    return (
      <div className="container">
        <VisitCreator />
        <br />
        <br />
        <VisitsListContainer />
      </div>
    );
  }
}

export default HomePage;
