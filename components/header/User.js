import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { withFirebase } from '../Firebase';
import ScaffoldContainer from '../ScaffoldContainer';
import Search from './Search';
import SignInButton from './SignInButton';
import Snackbar from './Snackbar';
import UserButton from './UserButton';

function User(props) {
  const { firebase } = props;
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [user, setUser] = useState(null);
  const cleanupRef = useRef();
  const authStateChangedOnceRef = useRef();

  useEffect(() => {
    (async () => {
      // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
      cleanupRef.current = await firebase.onAuthStateChanged((fbUser) => {
        if (authStateChangedOnceRef.current) {
          setSnackbarMessage(fbUser ? 'Welcome back!' : 'You have signed out.');
        } else {
          authStateChangedOnceRef.current = true;
        }

        setUser(fbUser);
      });
    })();

    return () => cleanupRef.current();
  }, []);

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
  firebase: PropTypes.object.isRequired,
};

export default withFirebase(User);
