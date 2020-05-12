import { makeStyles } from '@material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
}));

function Profile({ profileData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography component="h1" variant="h2" gutterBottom>
          Profile
        </Typography>
        <div>{JSON.stringify(profileData)}</div>
      </ScaffoldContainer>
    </div>
  );
}

Profile.propTypes = {
  profileData: PropTypes.shape({
    goal: PropTypes.string,
    phone: PropTypes.string,
    educationItems: PropTypes.arrayOf(
      PropTypes.shape({
        school: PropTypes.string,
        'study-field': PropTypes.string,
        'education-start-year': PropTypes.string,
        'education-end-year': PropTypes.string,
      })
    ),
    employmentItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        org: PropTypes.string,
        'start-month': PropTypes.string,
        'start-year': PropTypes.string,
        'end-month': PropTypes.string,
        'end-year': PropTypes.string,
      })
    ),
  }),
};

Profile.defaultProps = {
  profileData: {
    educationItems: [],
    employmentItems: [],
  },
};

export default Profile;
