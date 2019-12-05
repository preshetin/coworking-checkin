import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => (
  <section class="hero is-medium is-light is-fullheight-with-navbar is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-1">
          Coworking Visitor Tracker
        </h1>
        <h2 class="subtitle">
          Check in and check out your visitors with confidence.
        </h2>
        <Link to="/signin" className="button is-large">Sign In</Link>
      </div>
    </div>
  </section>
)

export default Landing
