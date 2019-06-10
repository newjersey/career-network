import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import { useSnackbar } from './Snackbar';
import { useUser } from './User';
import Nav from './header/Nav';
import User from './header/User';

const useStyles = makeStyles(theme => ({
  root: {
  },
  navBar: {
    backgroundColor: '#FFFFFF',
  },
  userBar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function Header() {
  const classes = useStyles();
  const showMessage = useSnackbar();
  const user = useUser();

  const handleSignOut = () => {
    user.signOut();
    showMessage('Signed out');
  };

  return (
    <header className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.navBar}>
          <Nav />
        </Toolbar>
        <Toolbar className={classes.userBar}>
          <User user={user} onSignOut={handleSignOut} />
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
