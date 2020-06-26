import { makeStyles } from '@material-ui/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Router from 'next/router';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Flags } from 'react-feature-flags';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  name: {
    fontWeight: 500,
    color: '#000',
    cursor: 'pointer',
    marginRight: '1em',
    whiteSpace: 'nowrap',
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
    <>
      <Grid container alignItems="center" wrap="nowrap">
        <Grid item>
          <Typography
            variant="h6"
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
          <MenuItem onClick={() => Router.push('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="My Dashboard" />
          </MenuItem>
        ) : (
          <MenuItem onClick={() => Router.push('/assessment')}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Questionnaire" />
          </MenuItem>
        )}
        <Flags authorizedFlags={['userProfile']}>
          <MenuItem onClick={() => Router.push('/profile')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
        </Flags>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </MenuItem>
      </Menu>
    </>
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
