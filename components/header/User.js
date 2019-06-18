import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import React from 'react';

import ScaffoldContainer from '../ScaffoldContainer';
import Search from './Search';
import SignInButton from './SignInButton';
import UserClass from '../../src/User';
import UserButton from './UserButton';

export default function User(props) {
  const { isAuthDetermined, onSignOut, user } = props;

  return (
    <ScaffoldContainer padding={false}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Search />
        </Grid>
        <Hidden xsDown implementation="css">
          <Grid item>
            {isAuthDetermined && (
              user
                ? (
                  <UserButton
                    displayName={user.displayName}
                    onSignOut={onSignOut}
                    photoURL={user.photoURL}
                  />
                )
                : (
                  <SignInButton />
                )
            )}
          </Grid>
        </Hidden>
      </Grid>
    </ScaffoldContainer>
  );
}

User.propTypes = {
  isAuthDetermined: PropTypes.bool.isRequired,
  onSignOut: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(UserClass),
};

User.defaultProps = {
  user: null,
};
