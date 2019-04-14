import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import Nav from './header/Nav'
import Statewide from './header/Statewide'
import User from './header/User'

const styles = {
    root: {
        flexGrow: 1,
    },
    statewide: {
        backgroundColor: '#363636'
    },
    navBar: {
        backgroundColor: '#FFFFFF'
    },
    userBar: {
        backgroundColor: '#1982C8'
    }
};

function Header(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar className={classes.statewide} variant="dense">
                    <Statewide />
                </Toolbar>
                <Toolbar className={classes.navBar}>
                    <Nav />
                </Toolbar>
                <Toolbar className={classes.userBar}>
                    <User />
                </Toolbar>
            </AppBar>
        </div>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
