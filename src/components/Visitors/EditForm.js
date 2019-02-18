import React from 'react'
import VisitorSchema from './VisitorSchema'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import VisitorForm from './VisitorForm'

const EditForm = ({ id, history, visitor, firebase }) => {
  const handleSubmit = values => {
    const castedValues = VisitorSchema.cast(values)
    console.log('casted values', castedValues)
    firebase.updateVisitor(id, castedValues).then(
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
