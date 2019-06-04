import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import React from 'react';

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

  async componentDidMount() {
    this.firebaseUnsubscribe = await this.props.firebase.onAuthStateChanged(user => {
      this.setState(state => ({
        authStateChangeCount: state.authStateChangeCount + 1,
        snackbarMessage: state.authStateChangeCount ? (user ? 'Welcome back!' : 'You have signed out.') : state.snackbarMessage,
        user
      }));
    });
  }

  componentWillUnmount() {
    this.firebaseUnsubscribe && this.firebaseUnsubscribe();
  }

  handleSnackbarClose = () => this.setState({ snackbarMessage: null });

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

          {snackbarMessage && <Snackbar message={snackbarMessage} onClose={this.handleSnackbarClose} />}
        </React.Fragment>
      </ScaffoldContainer>
    );
  }
}

User.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default withFirebase(User);
