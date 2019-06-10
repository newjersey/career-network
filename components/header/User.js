import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';

import { useUser } from '../User';
import ScaffoldContainer from '../ScaffoldContainer';
import Search from './Search';
import SignInButton from './SignInButton';
import UserButton from './UserButton';

export default function User() {
  const user = useUser();

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
                  onSignOut={user.signOut}
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
