import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../ScaffoldContainer';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
}));

function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography component="h1" variant="h2" gutterBottom>
          Profile
        </Typography>
      </ScaffoldContainer>
    </div>
  );
}

export default Profile;
