import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import VisitorsPage from '../Visitors/VisitorsPage'
import VisitorDetailsPage from '../Visitors/VisitorDetailsPage'
import VisitorCreatePage from '../Visitors/VisitorCreatePage'
import TicketsPage from '../Tickets/TicketsPage'
import TicketsEditPage from '../Tickets/EditPage'
import TicketsCreatePage from '../Tickets/CreatePage'
import MessagesPage from '../Messages/MessagesPage'
import AccountPage from '../Account'
import AdminPage from '../Admin'

import * as ROUTES from '../../constants/routes'
import { withAuthentication } from '../Session'

const App = () => (
  <Router>
    <div>
      <Navigation />

      <section className='section'>
        <div className='container'>
          <Switch>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />

            <Route exact path={ROUTES.VISITORS} component={VisitorsPage} />
            <Route exact path={ROUTES.VISITOR_CREATE} component={VisitorCreatePage} />
            <Route exact path={ROUTES.VISITOR_DETAILS} component={VisitorDetailsPage} />

            <Route exact path={ROUTES.TICKETS} component={TicketsPage} />
            <Route exact path={ROUTES.TICKETS_CREATE} component={TicketsCreatePage} />
            <Route exact path={ROUTES.TICKETS_EDIT} component={TicketsEditPage} />

            <Route path={ROUTES.MESSAGES} component={MessagesPage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
          </Switch>
        </div>
      </section>

    </div>
  </Router>
)

export default withAuthentication(App)
