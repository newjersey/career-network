import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import User from './User';
import UserContext from './UserContext';

export default function UserProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const cleanupRef = useRef();

  useEffect(() => {
    (async () => {
      // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
      cleanupRef.current = await firebase.auth().onAuthStateChanged((authUser) => {
        setUser(authUser ? new User(authUser) : null);
      });
    })();

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
