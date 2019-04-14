import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Statewide from './Statewide'
import Nav from './Nav'

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
                </Toolbar>
            </AppBar>
        </div>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);