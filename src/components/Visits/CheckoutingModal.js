import React from 'react'
import moment from 'moment'

const CheckoutingModal = ({ visit, onDoCheckout, onCheckoutCancel }) => {
  const endAt = new Date()
  
  const startAtFormatted = moment.unix(visit.startAt.seconds).format('MMMM Do YYYY, h:mm:ss a')
  const endAtFormatted = moment(endAt).format('MMMM Do YYYY, h:mm:ss a')

  return (
    <div className='modal is-active'>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{visit.visitorName}</p>
          <button className='delete' aria-label='close' onClick={onCheckoutCancel} />
        </header>
        <section className='modal-card-body'>
          <h1 className='title is-1'> 11.11 BYN </h1>
          <h2 className='subtitle'>Start: {startAtFormatted}	</h2>
          <h2 className='subtitle'>End: {endAtFormatted}	</h2>
        </section>
        <footer className='modal-card-foot'>
          <button
            className='button is-large is-success'
            onClick={() => onDoCheckout({ ...visit, endAt })}
          >
            Выписать
          </button>
          <button className='button is-large' onClick={onCheckoutCancel}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

export default CheckoutingModal
