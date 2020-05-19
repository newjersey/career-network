import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ScaffoldContainer from '../ScaffoldContainer';
import BackgroundHeader from '../BackgroundHeader';

const useStyles = makeStyles(theme => ({
  backgroundHeader: {
    background: '#f1f8e7',
    boxShadow: `0 1px 0 0 rgba(226, 226, 234, 0.5)`,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    backgroundColor: theme.palette.background.dark,
  },
}));

export default function ApplicationTracker() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BackgroundHeader className={classes.backgroundHeader}>
        <ScaffoldContainer className={classes.header}>
          <Typography variant="h5">Application Tracker</Typography>
          <Button className={classes.button} variant="contained" size="large">
            + Add Application
          </Button>
        </ScaffoldContainer>
      </BackgroundHeader>
    </div>
  );
}

ApplicationTracker.propTypes = {};
