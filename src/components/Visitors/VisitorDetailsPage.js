import React from 'react';
import BackButton from '../common/BackButton';
import {selectVisitor} from '../../reducers/visitors';
import { setVisitor } from '../../actions/visitorActions';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

class VisitorDetailsPage extends React.Component {

  componentDidMount() {
    const {id} = this.props.match.params;
    this.unsubscribe = this.props.firebase.visitor(id)
      .onSnapshot(snapshot => {
        this.props.onSetVisitor(snapshot.data());
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {id} = this.props.match.params;
    const {visitor} = this.props;

    if (visitor === undefined) {
      return <h1 class="title">Loading...</h1>;
    }

    return (
      <div>
        <BackButton />
        <h1 class="title">
          {'Edit ' + id}
        </h1>
        <br />
        {visitor.firstName}
      </div>
    );
  }
} 

const mapStateToProps = (state, ownProps) => ({
  visitor: selectVisitor(state.visitors, ownProps.match.params.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSetVisitor: visitor => dispatch(setVisitor(visitor, ownProps.match.params.id))
})

export default compose(
  withFirebase,
  connect(mapStateToProps,mapDispatchToProps),
  withEmailVerification
)(VisitorDetailsPage);

