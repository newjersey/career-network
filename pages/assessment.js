import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useRef } from 'react';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import { useSnackbar } from '../components/Snackbar';
import AssessmentSectionList from '../components/assessment/AssessmentSectionList';
import ScaffoldContainer from '../components/ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
  progress: {
    margin: '0 auto',
    display: 'block',
    marginTop: theme.spacing(5),
  },
}));

export default function Assessment() {
  const classes = useStyles();
  const cleanupRef = useRef();
  const showMessage = useSnackbar();
  const { showSignIn, user, wasSignedIn } = useAuth();
  const recordProps = {
    assessmentSections: useRecords('appPhpA6Quf0pCBDm/Assessment%20Sections?view=API'),
    allAssessmentEntries: useRecords('appPhpA6Quf0pCBDm/Assessment%20Entries?view=API'),
    allQuestions: useRecords('appPhpA6Quf0pCBDm/Questions?view=API'),
    allQuestionGroups: useRecords('appPhpA6Quf0pCBDm/Question%20Groups?view=API'),
    allQuestionAnswerOptions: useRecords('appPhpA6Quf0pCBDm/Question%20Answer%20Options?view=API'),
  };

  useEffect(() => {
    if (!user) {
      if (!wasSignedIn) {
        showSignIn();
        showMessage('You must be signed in to view this page');
      }

      // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
      (async () => { cleanupRef.current = await Router.push('/'); })();
    }

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  });

  const fullyLoaded = user && Object.values(recordProps)
    .map(array => array.length)
    .reduce((accum, length) => accum && !!length, true);

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        {fullyLoaded ? (
          <React.Fragment>
            <Typography component="h1" variant="h2" gutterBottom>
              Welcome,
              {' '}
              {user && user.firstName}
              !
            </Typography>

            <AssessmentSectionList {...recordProps} />
          </React.Fragment>
        ) : (
          <CircularProgress className={classes.progress} color="primary" />
        )}
      </ScaffoldContainer>
    </div>
  );
}
