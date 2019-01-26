import React from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import VisitorForm from './VisitorForm'

const EditForm = ({ id, history, visitor, firebase }) => {
  const handleSubmit = values => {
    firebase.updateVisitor(id, values).then(
      updatedUser => {
        history.push('/visitors')
      },
      error => {
        console.log('eroor when updating', error)
      }
    )
  }

  return (
    <VisitorForm
      buttonName='Update'
      id={id}
      visitor={visitor}
      onSubmit={handleSubmit}
    />
  )
}

export default compose(
  withRouter,
  withFirebase
)(EditForm)
