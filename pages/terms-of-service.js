import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
}));

function TOS() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h3" component="h1">
          Terms of Service
        </Typography>
      </ScaffoldContainer>
    </div>
  );
}

export default TOS;
