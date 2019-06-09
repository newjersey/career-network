import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import Firebase, { withFirebase } from '../Firebase';
import ScaffoldContainer from '../ScaffoldContainer';
import Search from './Search';
import SignInButton from './SignInButton';
import Snackbar from './Snackbar';
import UserButton from './UserButton';

function User(props) {
  const { firebase } = props;
  const { onAuthStateChanged } = firebase;
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [user, setUser] = useState(null);
  const cleanupRef = useRef();
  const authStateChangedOnceRef = useRef();

  useEffect(() => {
    (async () => {
      // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
      cleanupRef.current = await onAuthStateChanged((fbUser) => {
        if (authStateChangedOnceRef.current) {
          setSnackbarMessage(fbUser ? 'Welcome back!' : 'You have signed out.');
        } else {
          authStateChangedOnceRef.current = true;
        }

        setUser(fbUser);
      });
    })();

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [onAuthStateChanged]);

  const handleSnackbarClose = () => setSnackbarMessage(null);

  return (
    <ScaffoldContainer padding={false}>
      <React.Fragment>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Search />
          </Grid>
          <Hidden xsDown implementation="css">
            <Grid item>
              {user
                ? <UserButton displayName={user.displayName} photoURL={user.photoURL} />
                : <SignInButton />
              }
            </Grid>
          </Hidden>
        </Grid>

        {snackbarMessage && <Snackbar message={snackbarMessage} onClose={handleSnackbarClose} />}
      </React.Fragment>
    </ScaffoldContainer>
  );
}

User.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

export default withFirebase(User);
