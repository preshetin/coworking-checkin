import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './logo.png';
//import logo from './logo-imaguru.png';
//import logo from './logo-johnwalt.png';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = ({ authUser }) => {

  const itemsStart = authUser ? (
    <div class="navbar-start">
      <Link class="navbar-item" to={ROUTES.HOME}>Home</Link>
      <Link class="navbar-item" to={ROUTES.MESSAGES}>Messages</Link>
      <Link class="navbar-item" to={ROUTES.ACCOUNT}>Account</Link>
      {authUser.roles.includes(ROLES.ADMIN) && (
          <Link class="navbar-item" to={ROUTES.ADMIN}>Admin</Link>
      )}
    </div>
  ) : (
    <div class="navbar-start">
      <Link class="navbar-item" to={ROUTES.SIGN_IN}>Sign In</Link>
    </div>
  );

  const itemsEnd = authUser ? (
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <SignOutButton />
        </div>
      </div>
    </div>

  ) : (
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <Link className="button is-primary" to={ROUTES.SIGN_UP}>Sign Up</Link>
          <Link className="button is-light" to={ROUTES.SIGN_IN}>Sign In</Link>
        </div>
      </div>
    </div>

  );



  return (
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <Link class="navbar-item" to="/">
      <img src={logo}  />
    </Link>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">

    {itemsStart}

    {itemsEnd}

  </div>
</nav>

  )
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
