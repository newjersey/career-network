import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ScaffoldContainer from '../ScaffoldContainer';
import BackgroundHeader from '../BackgroundHeader';
import ApplicationDialog from './ApplicationDialog/ApplicationDialog';

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

const DIALOG_INITIAL_CONFIG = {
  applicationData: undefined,
  open: false,
};

export default function ApplicationTracker() {
  const classes = useStyles();
  const [dialogConfig, setDialogConfig] = useState(DIALOG_INITIAL_CONFIG);

  const handleAddApplication = () => {
    setDialogConfig(prevConfig => ({ ...prevConfig, open: true }));
  };

  const handleCloseDialog = () => {
    setDialogConfig(DIALOG_INITIAL_CONFIG);
  };

  return (
    <div className={classes.root}>
      <BackgroundHeader className={classes.backgroundHeader}>
        <ScaffoldContainer className={classes.header}>
          <Typography variant="h5">Application Tracker</Typography>
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            onClick={handleAddApplication}
          >
            + Add Application
          </Button>
        </ScaffoldContainer>
      </BackgroundHeader>
      <ApplicationDialog {...dialogConfig} handleClose={handleCloseDialog} />
    </div>
  );
}

ApplicationTracker.propTypes = {};
