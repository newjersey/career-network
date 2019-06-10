import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useUser } from '../components/User';
import { useSnackbar } from '../components/Snackbar';
import ScaffoldContainer from '../components/ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(10),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const user = useUser();
  const showMessage = useSnackbar();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography>{user ? user.displayName : 'Logged Out'}</Typography>
        <button onClick={() => showMessage('hello')}>Click me</button>
      </ScaffoldContainer>
    </div>
  );
}
