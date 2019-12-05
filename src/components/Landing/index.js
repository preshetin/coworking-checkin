import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => (
  <section className="hero is-medium is-light is-fullheight-with-navbar is-bold">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title is-1">
          Coworking Visitor Tracker
        </h1>
        <h2 className="subtitle">
          Check in and check out your visitors with confidence.
        </h2>
        <Link to="/signin" className="button is-large">Sign In</Link>
      </div>
    </div>
  </section>
)

export default Landing
