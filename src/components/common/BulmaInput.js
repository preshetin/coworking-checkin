import React from 'react'

const BulmaInput = ({ name, onChange, label, onBlur, value, error, touched }) => {
  const errorClass = error ? 'is-danger' : ''

  return (
    <div className='field'>
      <label className='label'>{label}</label>
      <div className='control'>
        <input
          className={`input ${errorClass}`}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      </div>
      {error && touched &&
      <p className='help is-danger'>{error}</p>}
    </div>
  )
}

export default BulmaInput
