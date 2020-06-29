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
import ApplicationDialog from './ApplicationDialog';
import ApplicationTable from './ApplicationTable';
import ApplicationUpdateDialog from './ApplicationUpdateDialog/ApplicationUpdateDialog';
import ApplicationHistoryDialog from './ApplicationHistory/ApplicationHistoryDialog';
import FirebasePropTypes from '../Firebase/PropTypes';
import { APPLICATION_STATUS_TYPES, SUBMITTED, STATUS_LABEL } from './constants';

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
  open: false,
};

const DIALOGS = {
  ADD_APPLICATION: 'ADD_APPLICATION',
  UPDATE_APPLICATION: 'UPDATE_APPLICATION',
  APPLICATION_HISTORY: 'APPLICATION_HISTORY',
};

const applicationStatusConfig = APPLICATION_STATUS_TYPES.map(statusValue => ({
  label: STATUS_LABEL[statusValue],
  value: statusValue,
}));

export async function logApplication(userDocRef, applicationDetails) {
  const data = {
    config: {
      applicationStatusTypes: applicationStatusConfig,
    },
    lastUpdateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    ...applicationDetails,
  };
  userDocRef.collection('applicationLogEntries').add(data);

  const weeklyStats = {
    applications: firebase.firestore.FieldValue.increment(1),
    applicationsLatestTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  userDocRef.set({ weeklyStats }, { merge: true });
}

export default function ApplicationTracker({ allApplicationLogEntries }) {
  const classes = useStyles();
  const { userDocRef } = useAuth();
  const [activeDialog, setActiveDialog] = useState();
  const [dialogConfig, setDialogConfig] = useState(DIALOG_INITIAL_CONFIG);
  const [updateDialogConfig, setUpdateDialogConfig] = useState(UPDATE_DIALOG_INITIAL_CONFIG);
  const applications = allApplicationLogEntries.map(item => ({
    id: item.id,
    document: item.data(),
  }));
  const activeApplications = applications.filter(item => item.document.isActive);
  const closedApplications = applications.filter(item => !item.document.isActive);
  const activeApplicationCount = activeApplications.length;
  const closedApplicationCount = closedApplications.length;

  const handleOpenApplicationDialog = () => {
    setDialogConfig(prevConfig => ({ ...prevConfig }));
    setActiveDialog(DIALOGS.ADD_APPLICATION);
  };

  const handleCloseDialog = () => {
    setActiveDialog();
    setDialogConfig(DIALOG_INITIAL_CONFIG);
    setUpdateDialogConfig(UPDATE_DIALOG_INITIAL_CONFIG);
  };

  const handleOpenApplicationHistoryDialog = (applicationId, document) => {
    setDialogConfig({ application: document });
    setActiveDialog(DIALOGS.APPLICATION_HISTORY);
  };

  const handleAddApplication = async applicationData => {
    const { jobTitle, company, dateApplied, notes } = applicationData;

    const statusEntry = {
      id: 1,
      notes,
      status: SUBMITTED,
      timestamp: new Date(),
    };

    const applicationEntry = {
      jobTitle,
      company,
      dateApplied,
      statusEntries: [statusEntry],
      currentStatusEntryId: 1,
      currentStatus: SUBMITTED,
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
    setActiveDialog(DIALOGS.UPDATE_APPLICATION);
  };

  return (
    <div className={classes.root}>
      <BackgroundHeader className={classes.backgroundHeader}>
        <ScaffoldContainer className={classes.header}>
          <Typography variant="h3">Application Tracker</Typography>
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
        open={activeDialog === DIALOGS.ADD_APPLICATION}
        handleClose={handleCloseDialog}
        handleSave={handleAddApplication}
      />
      <ScaffoldContainer>
        <Paper className={classes.tableCard}>
          <Typography variant="h6" gutterBottom color="textPrimary">
            Active Applications ({activeApplicationCount})
          </Typography>
          <ApplicationTable
            applications={activeApplications}
            openApplicationHistory={handleOpenApplicationHistoryDialog}
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
            openApplicationHistory={handleOpenApplicationHistoryDialog}
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
        handleClose={handleCloseDialog}
        open={activeDialog === DIALOGS.UPDATE_APPLICATION}
      />
      <ApplicationHistoryDialog
        {...dialogConfig}
        handleClose={handleCloseDialog}
        open={activeDialog === DIALOGS.APPLICATION_HISTORY}
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
