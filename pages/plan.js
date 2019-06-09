import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(10),
  },
}));

function Plan() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h1">Build your plan.</Typography>
      </ScaffoldContainer>
    </div>
  );
}

export default Plan;
