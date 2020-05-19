import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';

import { useAuth } from '../Auth';
import ScaffoldContainer from '../ScaffoldContainer';
import BackgroundHeader from '../BackgroundHeader';
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
  const applications = allApplicationLogEntries.map(item => item.data());

  const handleSave = async () => {
    const statusEntry = {
      id: 1,
      notes: 'i liked the recruiter, jody',
      status: 'application_submitted',
    };
    const application = {
      jobTitle: 'software engineer',
      company: 'two bulls',
      dateApplied: new Date(), // should be user input
      statusEntries: [statusEntry],
      currentStatusEntryId: 1,
    };

    try {
      await logApplication(userDocRef, application);
      console.log('success');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={classes.root}>
      <BackgroundHeader className={classes.backgroundHeader}>
        <ScaffoldContainer className={classes.header}>
          <Typography variant="h5">Application Tracker</Typography>
          <Button className={classes.button} onClick={handleSave} variant="contained" size="large">
            + Add Application
          </Button>
        </ScaffoldContainer>
      </BackgroundHeader>
      {JSON.stringify(applications)}
    </div>
  );
}

ApplicationTracker.propTypes = {
  allApplicationLogEntries: FirebasePropTypes.querySnapshot,
};

ApplicationTracker.defaultProps = {
  allApplicationLogEntries: [],
};
