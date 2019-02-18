import React from 'react'
import CreateForm from './CreateForm'
import VisitorSchema from './VisitorSchema'
import BackButton from '../common/BackButton'
import VisitorForm from './VisitorForm'
import { compose } from 'recompose'
import { withAuthorization, withAuthentication } from '../Session'

const VisitorCreatePage = ({ firebase, history, authUser }) => {
  const handleSubmit = values => {
    const castedValues = VisitorSchema.cast(values)
    console.log('casted values', castedValues)
    firebase.createVisitor({ ...castedValues, userId: authUser.uid })
      .then(() => history.push('/visitors'))
  }

  return (
    <div>
      <BackButton />
      <h1 className='title'>Create Visitor</h1>
      <VisitorForm
        buttonName='Create Visitor'
        onSubmit={handleSubmit}
        visitor={{ email: '', firstName: '', lastName: '' }}
      />
    </div>
  )
}

const condition = authUser => authUser !== null

export default compose(
  withAuthentication,
  withAuthorization(condition)
)(VisitorCreatePage)
