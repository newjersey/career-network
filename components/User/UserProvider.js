import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import UserContext from './UserContext';

export default function UserProvider(props) {
  const { children, user } = props;

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.instanceOf(User),
};

UserProvider.defaultProps = {
  user: null,
};
