import { makeStyles } from '@material-ui/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NextLink from 'next/link';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  name: {
    color: 'inherit',
    cursor: 'pointer',
    marginRight: '1em',
  },
  avatar: {
    cursor: 'pointer',
  },
}));

export default function UserButton(props) {
  const { displayName, email, onSignOut, photoURL, isAssessmentComplete } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickUser = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    onSignOut();
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
          <Avatar
            src={photoURL}
            alt={displayName}
            className={classes.avatar}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClickUser}
          >
            <PersonIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseUser}>
        <MenuItem disabled>{email}</MenuItem>
        {isAssessmentComplete ? (
          <NextLink href="/dashboard">
            <MenuItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="My dashboard" />
            </MenuItem>
          </NextLink>
        ) : (
          <NextLink href="/assessment">
            <MenuItem>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Questionnaire" />
            </MenuItem>
          </NextLink>
        )}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

UserButton.propTypes = {
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onSignOut: PropTypes.func.isRequired,
  isAssessmentComplete: PropTypes.bool.isRequired,
  photoURL: PropTypes.string,
};

UserButton.defaultProps = {
  photoURL: undefined,
};
