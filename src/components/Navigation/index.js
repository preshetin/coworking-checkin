import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from './logo.png'
// import logo from './logo-imaguru.png';
// import logo from './logo-johnwalt.png';

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

const Navigation = ({ authUser }) => {
  const itemsStart = authUser ? (
    <div className='navbar-start'>
      <Link className='navbar-item' to={ROUTES.VISITORS}>Коворкеры</Link>
      <Link className='navbar-item' to={ROUTES.ACCOUNT}>Account</Link>
      {authUser.roles.includes(ROLES.ADMIN) && (
        <Link className='navbar-item' to={ROUTES.ADMIN}>Admin</Link>
      )}
    </div>
  ) : (
    <div className='navbar-start'>
      <Link className='navbar-item' to={ROUTES.SIGN_IN}>Sign In</Link>
    </div>
  )

  const itemsEnd = authUser ? (
    <div className='navbar-end'>
      <div className='navbar-item'>
        <div className='buttons'>
          <SignOutButton />
        </div>
      </div>
    </div>

  ) : (
    <div className='navbar-end'>
      <div className='navbar-item'>
        <div className='buttons'>
          <Link className='button is-primary' to={ROUTES.SIGN_UP}>Sign Up</Link>
          <Link className='button is-light' to={ROUTES.SIGN_IN}>Sign In</Link>
        </div>
      </div>
    </div>

  )

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to={ROUTES.HOME}>
          <img src={logo} />
        </Link>

        <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </a>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>

        {itemsStart}

        {itemsEnd}

      </div>
    </nav>

  )
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
})

export default connect(mapStateToProps)(Navigation)
