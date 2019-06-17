import React from 'react';
import PropTypes from 'prop-types';

import useAuth from './useAuth';
import useAuthRequired from './useAuthRequired';

export default function AuthRequired(props) {
  const { children } = props;
  const { user } = useAuth();

  useAuthRequired();

  return (
    <React.Fragment>
      {!!user && children}
    </React.Fragment>
  );
}

AuthRequired.propTypes = {
  children: PropTypes.node.isRequired,
};
