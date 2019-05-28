import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withFirebase } from '../Firebase';

const styles = theme => ({
  name: {
    color: 'inherit',
    cursor: 'pointer',
    marginRight: '1em',
  },
  avatar: {
    cursor: 'pointer',
  },
});

class UserButton extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClickUser = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseUser = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({ anchorEl: null });

    this.props.firebase.signOut();
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, displayName, photoURL } = this.props;

    return (
      <React.Fragment>
        <Grid container alignItems="center">
          <Grid item>
            <Typography
              className={classes.name}
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClickUser}
            >
              {displayName}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar src={photoURL} alt={displayName} className={classes.avatar}
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClickUser}>
              <PersonIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseUser}
        >
          <MenuItem onClick={this.handleLogout}>Sign out</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

UserButton.propTypes = {
  firebase: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
};

export default withFirebase(withStyles(styles)(UserButton));
