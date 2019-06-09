import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

function UserButton(props) {
  const { classes, displayName, firebase, photoURL } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickUser = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    firebase.signOut();
  };

  return (
    <React.Fragment>
      <Grid container alignItems="center">
        <Grid item>
          <Typography
            className={classes.name}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClickUser}
          >
            {displayName}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar src={photoURL} alt={displayName} className={classes.avatar}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClickUser}>
            <PersonIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseUser}
      >
        <MenuItem onClick={handleLogout}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

UserButton.propTypes = {
  firebase: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
};

export default withFirebase(withStyles(styles)(UserButton));
