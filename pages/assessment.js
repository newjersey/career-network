import { makeStyles } from '@material-ui/styles';
import Router from 'next/router';

import React, { useCallback, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import { useUserSubcollection } from '../components/Firebase';
import AssessmentSectionList from '../components/assessment/AssessmentSectionList';
import FullPageProgress from '../components/FullPageProgress';
import ScaffoldContainer from '../components/ScaffoldContainer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
}));

function Assessment() {
  const classes = useStyles();
  const allQuestionResponses = useUserSubcollection('questionResponses');
  const [scrollToY, setScrollToY] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { user, userDocRef } = useAuth();
  const recordProps = {
    assessmentSections: useRecords('appPhpA6Quf0pCBDm/Assessment%20Sections?view=API'),
    allAssessmentEntries: useRecords('appPhpA6Quf0pCBDm/Assessment%20Entries?view=API'),
    allQuestions: useRecords('appPhpA6Quf0pCBDm/Questions?view=API'),
    allQuestionGroups: useRecords('appPhpA6Quf0pCBDm/Question%20Groups?view=API'),
    allQuestionResponseOptions: useRecords(
      'appPhpA6Quf0pCBDm/Question%20Response%20Options?view=API'
    ),
  };

  const fullyLoaded =
    user &&
    Object.values(recordProps)
      .map(array => array.length)
      .reduce((accum, length) => accum && !!length, true) &&
    allQuestionResponses; // for initial hydration (use case: incomplete assessment)

  const handleComplete = () => {
    setIsFinished(true);
    Router.push('/dashboard');
    userDocRef.set({ isAssessmentComplete: true }, { merge: true });
    // a bit hacky to update at runtime this way (vs. binding to DB) but quick and easy:
    user.isAssessmentComplete = true;
  };

  const scrollToRef = useCallback(node => {
    if (node !== null) {
      setScrollToY(node.offsetTop - 24);
    }
  }, []);

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        {fullyLoaded && !isFinished ? (
          <React.Fragment>
            <Typography ref={scrollToRef} component="h1" variant="h2" gutterBottom>
              Hi, {user && user.firstName}!
            </Typography>

            <AssessmentSectionList
              scrollToY={scrollToY}
              onComplete={handleComplete}
              {...recordProps}
              allQuestionResponses={allQuestionResponses}
            />
          </React.Fragment>
        ) : (
          <FullPageProgress />
        )}
      </ScaffoldContainer>
    </div>
  );
}

export default withAuthRequired(Assessment);
