import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';

import { useUser } from '../User';
import ScaffoldContainer from '../ScaffoldContainer';
import Search from './Search';
import SignInButton from './SignInButton';
import UserButton from './UserButton';

import { useSnackbar } from '../Snackbar';

export default function User() {
  const user = useUser();
  const showMessage = useSnackbar();

  const handleSignOut = () => {
    user.signOut();
    showMessage('Signed out');
  };

  return (
    <ScaffoldContainer padding={false}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Search />
        </Grid>
        <Hidden xsDown implementation="css">
          <Grid item>
            {user
              ? (
                <UserButton
                  displayName={user.displayName}
                  onSignOut={handleSignOut}
                  photoURL={user.photoURL}
                />
              )
              : <SignInButton />
            }
          </Grid>
        </Hidden>
      </Grid>
    </ScaffoldContainer>
  );
}
