import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useUser } from '../components/User';
import ScaffoldContainer from '../components/ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(10),
  },
}));

export default function Assessment() {
  const classes = useStyles();
  const user = useUser();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography>
          {user && user.displayName}
          {' '}
          Assessment
        </Typography>
      </ScaffoldContainer>
    </div>
  );
}
