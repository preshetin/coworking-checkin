import React, { useState } from 'react'
import { handleQRCode } from '../../api'

const CheckoutButton = ({ visitorId }) => {
  const [ loading, setLoading ] = useState(false)

  const handleClick = () => {
    setLoading(true)
    handleQRCode(visitorId)
  }

  const loadingClass = loading ? 'is-loading' : ''

  return (
    <button
      className={`button ${loadingClass}`}
      onClick={handleClick}
    >
      Checkout
    </button>
  )
}

export default CheckoutButton
