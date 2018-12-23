import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import Messages from '../Messages';

class HomePage extends Component {
  componentDidMount() {
    this.props.firebase.users().get().then( querySnapshot => {
      const result = [];
      querySnapshot.forEach(doc => {
        result.push({
          ...doc.data(),
          id: doc.id
        });
      });
      this.props.onSetUsers(result);
    })

    //   this.props.firebase.users().on('value', snapshot => {
    //     this.props.onSetUsers(snapshot.val());
    //   });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    if (this.props.users === null) {
      return null;
    }

    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        {this.props.users.map(user => {
          return <p key={user.id}>{user.id}</p>
        })}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userState.users,
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
