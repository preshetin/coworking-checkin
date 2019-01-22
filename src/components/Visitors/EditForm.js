import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import BulmaInput from '../common/BulmaInput';
import VisitorSchema from './VisitorSchema';

const EditForm = ({ id, history, visitor, firebase }) => {
  return (
    <Formik
      initialValues={visitor}
      validationSchema={VisitorSchema}
      onSubmit={(values, actions) => {
        firebase.updateVisitor(id, values).then(
          updatedUser => {
            history.push('/visitors')
          },
          error => {
            console.log('eroor when updating', error);
          }
        );
      }}
      render={({values, errors, status, touched, handleBlur,
        handleChange, handleSubmit, isSubmitting,}) => (
           <form onSubmit={handleSubmit}>
             <BulmaInput
               name="email"
               label="Email"
               onChange={handleChange}
               onBlur={handleBlur}
               error={errors.email}
               touched={touched.email}
               value={values.email}
             />
             <BulmaInput
               name="firstName"
               label="First Name"
               onChange={handleChange}
               onBlur={handleBlur}
               error={errors.firstName}
               touched={touched.firstName}
               value={values.firstName}
             />
             <BulmaInput
               name="lastName"
               label="LastName"
               onChange={handleChange}
               onBlur={handleBlur}
               error={errors.lastName}
               touched={touched.lastName}
               value={values.lastName}
             />
            {status && status.msg && <div>{status.msg}</div>}
            <button className="button is-primary" type="submit" disabled={isSubmitting}>
              Update
            </button>
          </form>
      )}
    />
  );
}

export default compose(
  withRouter,
  withFirebase,
)(EditForm); 
