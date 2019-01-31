import React from 'react'
import { withRouter } from 'react-router-dom'

const BackButton = ({ history }) => (
  <button className='button no-print' onClick={() => history.goBack()}>
    Back
  </button>
)

export default withRouter(BackButton)
