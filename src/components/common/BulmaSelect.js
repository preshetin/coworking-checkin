import React from 'react'

const BulmaSelect = ({ name, selectValues, onChange, label,
  onBlur, value, error, touched }) => {
  const errorClass = error ? 'is-danger' : ''

  return (
    <div className='field'>
      <label className='label'>{label}</label>
      <div className='control'>
        <div className='select'>
          <select
            onChange={onChange}
            value={value}
            name={name}
            onBlur={onBlur}
          >
            <option value='empty'>Select...</option>
            {selectValues.map(el => <option key={el.value} value={el.value}>{el.title}</option>)}
          </select>
        </div>
        {error && touched &&
        <p className='help is-danger'>{error}</p>}
      </div>
    </div>
  )

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

export default BulmaSelect
