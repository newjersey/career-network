import React from 'react';
import AuthRequired from './AuthRequired';

const withAuthRequired = WrappedComponent => props => (
  <AuthRequired>
    <WrappedComponent {...props} />
  </AuthRequired>
);

export default withAuthRequired;
