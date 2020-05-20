import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import firebase from 'firebase/app';

import { useAuth } from '../Auth';
import ScaffoldContainer from '../ScaffoldContainer';
import BackgroundHeader from '../BackgroundHeader';
import ApplicationDialog from './ApplicationDialog/ApplicationDialog';
import ApplicationTable from './ApplicationTable';
import FirebasePropTypes from '../Firebase/PropTypes';

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

const APPLICATION_STATUS_TYPES = [
  {
    value: 'submitted',
    label: 'Application Submitted',
  },
  {
    value: 'phone-screen',
    label: 'Phone Screen',
  },
  {
    value: 'interview',
    label: 'Interviews',
  },
  {
    value: 'offer-received',
    label: 'Offer Received',
  },
  {
    value: 'in-negation',
    label: 'In Negation',
  },
  {
    value: 'offer-accepted',
    label: 'Offer Accepted',
  },
  {
    value: 'offer-rejected',
    label: 'Offer Rejected',
  },
];

export async function logApplication(userDocRef, applicationDetails) {
  const data = {
    config: {
      applicationStatusTypes: APPLICATION_STATUS_TYPES,
    },
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    ...applicationDetails,
  };

  return userDocRef.collection('applicationLogEntries').add(data);
}

export default function ApplicationTracker({ allApplicationLogEntries }) {
  const classes = useStyles();
  const { userDocRef } = useAuth();
  const applications = allApplicationLogEntries.map(item => ({
    id: item.id,
    document: item.data(),
  }));
  const [dialogConfig, setDialogConfig] = useState(DIALOG_INITIAL_CONFIG);

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
    };

    return logApplication(userDocRef, applicationEntry);
  };

  const handleUpdate = (documentId, document) => {
    const currentIndex = document.currentStatusEntryId;

    const statusEntry = {
      id: currentIndex + 1,
      status: 'the number I have to phone is 555 123 4567',
      notes: 'Phone_Screen',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const statusEntries = [...document.statusEntries, statusEntry];
    const updates = {
      statusEntries,
      currentStatusEntryId: currentIndex + 1,
    };

    userDocRef
      .collection('applicationLogEntries')
      .doc(documentId)
      .update(updates);
    console.log('updated!');
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
      <ApplicationTable applications={applications} />
      {applications.map(item => (
        <>
          <Box m={5}>
            <Card variant="outlined">
              <Box display="flex" justifyContent="space-between">
                <div>
                  {item.document.jobTitle} at {item.document.company}
                </div>
                <Button
                  className={classes.button}
                  onClick={() => handleUpdate(item.id, item.document)}
                  variant="contained"
                  size="large"
                >
                  Update
                </Button>
              </Box>
            </Card>
          </Box>
          <Box m={5}>
            HISTORY
            <Card variant="outlined">{JSON.stringify(item.document.statusEntries)}</Card>
          </Box>
        </>
      ))}
    </div>
  );
}

ApplicationTracker.propTypes = {
  allApplicationLogEntries: FirebasePropTypes.querySnapshot,
};

ApplicationTracker.defaultProps = {
  allApplicationLogEntries: [],
};
