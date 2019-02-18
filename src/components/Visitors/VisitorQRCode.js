import React from 'react'
import imaguruLogo from '../Navigation/logo-imaguru.png'
import QRCode from 'qrcode.react'

const VisitorQRCode = ({ visitor }) => {
  const hoursAmount = visitor.hoursAmount ? visitor.hoursAmount.toFixed(2) : '-'
  return (
    <div className='box ticket'>
      <div className='columns'>
        <div className='column is-narrow'>
          <QRCode value={visitor.id} />
        </div>
        <div className='column'>
          <b>

            {visitor.firstName} { visitor.lastName }
          </b>
          <br />
          <b>
            {hoursAmount} часов
          </b>
          <br />
          <br />
          <br />
          <img src={imaguruLogo} />

        </div>
      </div>
    </div>
  )
}

export default VisitorQRCode
