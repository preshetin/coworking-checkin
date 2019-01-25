import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import BulmaInput from '../common/BulmaInput';
import BulmaSelect from '../common/BulmaSelect';
import TicketSchema from './TicketSchema';

const TicketForm = ({ id, ticket, onSubmit, buttonName, visitors }) => (
  <Formik
    initialValues={ticket}
    validationSchema={TicketSchema}
    onSubmit={values => onSubmit(values)}
    render={({values, errors, status, touched, handleBlur,
      handleChange, handleSubmit, isSubmitting,}) => (
         <form onSubmit={handleSubmit}>
           <BulmaSelect
             name="visitorId"
             label="Visitor"
             selectValues={visitors}
             onChange={handleChange}
             onBlur={handleBlur}
             error={errors.visitorId}
             touched={touched.visitorId}
             value={values.visitorId}
           />
           <BulmaInput
             name="hoursRemaining"
             label="Hours Remaining"
             onChange={handleChange}
             onBlur={handleBlur}
             error={errors.hoursRemaining}
             touched={touched.hoursRemaining}
             value={values.hoursRemaining}
           />
           <BulmaInput
             name="hoursCapacity"
             label="Hours Capacity"
             onChange={handleChange}
             onBlur={handleBlur}
             error={errors.hoursCapacity}
             touched={touched.hoursCapacity}
             value={values.hoursCapacity}
           />
          {status && status.msg && <div>{status.msg}</div>}
          <button className="button is-primary" type="submit" disabled={isSubmitting}>
            {buttonName}
          </button>
        </form>
    )}
  />
)

export default TicketForm;
