import PropTypes from 'prop-types';
import React from 'react';

import FullPageProgress from '../FullPageProgress';
import useAuth from './useAuth';
import useAuthRequired from './useAuthRequired';

export default function AuthRequired(props) {
  const { children } = props;
  const { user } = useAuth();

  useAuthRequired();

  return <>{user ? children : <FullPageProgress />}</>;
}

AuthRequired.propTypes = {
  children: PropTypes.node.isRequired,
};
