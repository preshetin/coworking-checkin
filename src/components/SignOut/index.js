import React from 'react'

import { withFirebase } from '../Firebase'

const SignOutButton = ({ firebase }) => (
  <button className='button is-light' type='button' onClick={firebase.doSignOut}>
    Sign Out
  </button>
)

export default withFirebase(SignOutButton)
