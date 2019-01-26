import React from 'react'
import { Formik } from 'formik'
import BulmaInput from '../common/BulmaInput'
import VisitorSchema from './VisitorSchema'

const VisitorForm = ({ id, visitor, onSubmit, buttonName }) => (
  <Formik
    initialValues={visitor}
    validationSchema={VisitorSchema}
    onSubmit={values => onSubmit(values)}
    render={({ values, errors, status, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit}>
        <BulmaInput
          name='email'
          label='Email'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          value={values.email}
        />
        <BulmaInput
          name='firstName'
          label='First Name'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.firstName}
          touched={touched.firstName}
          value={values.firstName}
        />
        <BulmaInput
          name='lastName'
          label='LastName'
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lastName}
          touched={touched.lastName}
          value={values.lastName}
        />
        {status && status.msg && <div>{status.msg}</div>}
        <button className='button is-primary' type='submit' disabled={isSubmitting}>
          {buttonName}
        </button>
      </form>
    )}
  />
)

export default VisitorForm
