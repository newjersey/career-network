import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseContext } from '../Firebase';
import { withFirebase } from '../Firebase';
import ScaffoldContainer from '../ScaffoldContainer';
import Search from './Search';
import SignInButton from './SignInButton';
import Snackbar from './Snackbar';
import UserButton from './UserButton';

class User extends React.Component {
  state = {
    authStateChangeCount: 0,
    snackbarMessage: null,
    user: null,
  };

  componentWillMount() {
    this.firebaseUnsubscribe = this.props.firebase.onAuthStateChanged(user => {
      // suppress snack bar on initial page load
      if (this.state.authStateChangeCount) {
        this.showSnackbar(user ? 'Welcome back!' : 'You have signed out.');
      }

      this.setState(state => ({
        authStateChangeCount: state.authStateChangeCount + 1,
        user
      }));
    });
  }

  componentWillUnmount() {
    this.firebaseUnsubscribe && this.firebaseUnsubscribe();
  }

  showSnackbar = (message) => {
    this.setState({
      snackbarMessage: message,
    });
  };

  render() {
    const { snackbarMessage, user } = this.state;

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

          {snackbarMessage && <Snackbar message={snackbarMessage} />}
        </React.Fragment>
      </ScaffoldContainer>
    );
  }
}

User.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default withFirebase(User);
