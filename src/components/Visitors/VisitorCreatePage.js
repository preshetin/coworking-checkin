import React from 'react';
import CreateForm from './CreateForm';
import BackButton from '../common/BackButton';

const VisitorCreatePage = () => {
  return (
    <div>
      <BackButton />
      <h1 className="title">Create Visitor</h1>
      <CreateForm />
    </div>
  );
}


export default VisitorCreatePage;
