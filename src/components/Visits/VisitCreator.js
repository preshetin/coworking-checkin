import React from 'react';
import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';


class VisitCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      visitType: null,
      visitorName: ''
    };
  }

  handleCreateOnetime = e => {
    e.preventDefault();
    this.setState({
      isEditMode: true,
      visitType: 'onetime',
      visitorName: ''
    });
  }

  handleCancel = e => {
    e.preventDefault();
    this.toggleEditMode();
  }

  toggleEditMode = () => {
    this.setState(prevState => ({
      ...prevState,
      isEditMode: ! prevState.isEditMode
    }));
  }

  handleChange = e => {
    const value = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      visitorName: value
    }));
  }

  handleSubmit = () => {
    const { firebase, authUser } = this.props;
    firebase.createVisit({
      startAt: new Date(),
      userId: authUser.uid,
      visitorName: this.state.visitorName
    }).then(() => {
      this.toggleEditMode()
    })
  }


  componentDidMount() {
    
  }


  render() {

    const { isEditMode } = this.state;

    return (
      <div>
      { !isEditMode && 
          <a href="#" onClick={this.handleCreateOnetime} className="button is-primary is-medium">
            <i class="fas fa-plus"></i>
          </a> }
        { this.state.isEditMode
            && <input
                className="input"
                value={this.state.visitorName}
                onChange={this.handleChange}
              /> }
        { this.state.isEditMode
            && <button className="button" onClick={this.handleCancel} >x</button> }
        { this.state.isEditMode
            && <button className="button" onClick={this.handleSubmit} >Create</button> }
      </div>
    ); 
  }
}

export default compose(
  withFirebase,
  withEmailVerification,
)(VisitCreator);

