import React from 'react'
import imaguruLogo from '../Navigation/logo-imaguru.png'
import QRCode from 'qrcode.react'

const TicketPreview = ({ ticket, visitor }) => {
  return (
    <div class='box ticket'>
      <div className='columns'>
        <div className='column is-narrow'>
          <QRCode value='http://facebook.github.io/react/' />
        </div>
        <div className='column'>
          <b>

            {visitor.firstName} { visitor.lastName }
          </b>
          <br />
          <b>
            {ticket.hoursRemaining || ' -  '} часов
          </b>
          <br />
          <br />
          <br />
          <img src={imaguruLogo} />

        </div>
      </div>
    </div>
  )
  return 'TicketPreview'
}

export default TicketPreview
