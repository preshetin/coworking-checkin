import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withEmailVerification } from '../Session';
import { selectVisitors } from '../../reducers/visitors';
import { setVisitors } from '../../actions/visitorActions';
import VisitorRow from './VisitorRow';


class VisitorsListContainer extends React.Component {

  componentDidMount() {
    const userId = this.props.authUser.uid;
    this.unsubscribe = this.props.firebase
      .visitorsForUser(userId)
      .onSnapshot(snapshot => {
        let visitors = {};
        snapshot.forEach(doc => (visitors[doc.id] = { ...doc.data() }))
        this.props.onSetVisitors(visitors);
      })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const visitors = this.props.visitors;
    return visitors.map((visitor, id) => <VisitorRow key={id} visitor={visitor}/>);
  }
}

const mapStateToProps = state => ({
  visitors: selectVisitors(state.visitors)
});

const mapDispatchToProps = dispatch => ({
  onSetVisitors: visitors => dispatch(setVisitors(visitors))
})

export default compose(
  withFirebase,
  connect(mapStateToProps,mapDispatchToProps),
  withEmailVerification
)(VisitorsListContainer);

