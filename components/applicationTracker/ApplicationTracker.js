import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase/app';

import { Box } from '@material-ui/core';
import { useAuth } from '../Auth';
import ScaffoldContainer from '../ScaffoldContainer';
import BackgroundHeader from '../BackgroundHeader';
import ApplicationDialog from './ApplicationDialog/ApplicationDialog';
import ApplicationTable from './ApplicationTable';
import ApplicationUpdateDialog from './ApplicationUpdateDialog/ApplicationUpdateDialog';
import FirebasePropTypes from '../Firebase/PropTypes';
import { APPLICATION_STATUS_TYPES } from './constants';

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
  tableCard: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    padding: theme.spacing(3, 4),
  },
}));

const DIALOG_INITIAL_CONFIG = {
  applicationData: undefined,
  open: false,
};

const UPDATE_DIALOG_INITIAL_CONFIG = {
  applicationData: undefined,
  documentId: undefined,
};

export async function logApplication(userDocRef, applicationDetails) {
  const data = {
    config: {
      applicationStatusTypes: APPLICATION_STATUS_TYPES,
    },
    lastUpdateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    ...applicationDetails,
  };
  userDocRef.collection('applicationLogEntries').add(data);

  const stats = {
    weeklyApplicationsCount: firebase.firestore.FieldValue.increment(1),
    weeklyApplicationsLatestTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  userDocRef.set({ stats }, { merge: true });
}
export default function ApplicationTracker({ allApplicationLogEntries }) {
  const classes = useStyles();
  const { userDocRef } = useAuth();
  const [dialogConfig, setDialogConfig] = useState(DIALOG_INITIAL_CONFIG);
  const [updateDialogConfig, setUpdateDialogConfig] = useState(UPDATE_DIALOG_INITIAL_CONFIG);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const applications = allApplicationLogEntries.map(item => ({
    id: item.id,
    document: item.data(),
  }));
  const activeApplications = applications.filter(item => item.document.isActive);
  const closedApplications = applications.filter(item => !item.document.isActive);
  const activeApplicationCount = activeApplications.length;
  const closedApplicationCount = closedApplications.length;

  const handleOpenApplicationDialog = () => {
    setDialogConfig(prevConfig => ({ ...prevConfig, open: true }));
  };

  const handleCloseDialog = () => {
    setDialogConfig(DIALOG_INITIAL_CONFIG);
  };

  const handleAddApplication = async applicationData => {
    const { jobTitle, company, dateApplied, notes } = applicationData;

    const statusEntry = {
      id: 1,
      notes,
      status: APPLICATION_STATUS_TYPES[0].value,
      timestamp: new Date(),
    };

    const applicationEntry = {
      jobTitle,
      company,
      dateApplied,
      statusEntries: [statusEntry],
      currentStatusEntryId: 1,
      currentStatus: APPLICATION_STATUS_TYPES[0].value,
      isActive: true,
    };

    return logApplication(userDocRef, applicationEntry);
  };

  const handleOpenUpdateDialog = (id, document) => {
    setUpdateDialogConfig(prevConfig => ({
      ...prevConfig,
      applicationData: {
        jobTitle: document.jobTitle,
        company: document.company,
        currentStatusEntryId: document.currentStatusEntryId,
        statusEntries: document.statusEntries,
        currentStatus: document.currentStatus,
        isActive: document.isActive,
      },
      documentId: id,
    }));
    setShowUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogConfig(UPDATE_DIALOG_INITIAL_CONFIG);
    setShowUpdateDialog(false);
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
            onClick={handleOpenApplicationDialog}
          >
            + Add Application
          </Button>
        </ScaffoldContainer>
      </BackgroundHeader>
      <ApplicationDialog
        {...dialogConfig}
        handleClose={handleCloseDialog}
        handleSave={handleAddApplication}
      />
      <ScaffoldContainer>
        <Paper className={classes.tableCard}>
          <Typography variant="h6" gutterBottom color="textPrimary">
            Active applications ({activeApplicationCount})
          </Typography>
          <ApplicationTable
            applications={activeApplications}
            handleUpdate={handleOpenUpdateDialog}
          />
          {activeApplicationCount < 1 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              m={5}
            >
              <Typography variant="body1" color="textSecondary" gutterBottom>
                No Active Applications.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Add an Application to start and keep your job search organized.
              </Typography>
            </Box>
          )}
        </Paper>
        <Paper className={classes.tableCard}>
          <Typography variant="h6" gutterBottom color="textPrimary">
            Closed Applications ({closedApplicationCount})
          </Typography>
          <ApplicationTable
            applications={closedApplications}
            handleUpdate={handleOpenUpdateDialog}
          />
          {closedApplicationCount < 1 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              m={5}
            >
              <Typography variant="body1" color="textSecondary" gutterBottom>
                No Closed Applications.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Update an Active Applications and keep your job search organized.
              </Typography>
            </Box>
          )}
        </Paper>
      </ScaffoldContainer>
      <ApplicationUpdateDialog
        {...updateDialogConfig}
        open={showUpdateDialog}
        handleClose={handleCloseUpdateDialog}
      />
    </div>
  );
}

ApplicationTracker.propTypes = {
  allApplicationLogEntries: FirebasePropTypes.querySnapshot,
};

ApplicationTracker.defaultProps = {
  allApplicationLogEntries: [],
};
