import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import Nav from './header/Nav';
import StatusBar from './StatusBar';
import User from './header/User';
import UserClass from '../src/User';

const useStyles = makeStyles(theme => ({
  navBar: {
    backgroundColor: '#FFFFFF',
  },
  userBar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <header>
      <StatusBar />
      <AppBar position="static" color="primary">
        <Toolbar className={classes.navBar}>
          <Nav {...props} />
        </Toolbar>
        <Toolbar className={classes.userBar}>
          <User {...props} />
        </Toolbar>
      </AppBar>
    </header>
  );
}

Header.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(UserClass),
};

Header.defaultProps = {
  user: null,
};
