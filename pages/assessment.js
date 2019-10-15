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
import { allPropsLoaded, fullyLoaded } from '../src/app-helper';

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
  const assessmentConfiguration = {
    assessmentSections: useRecords('Assessment Sections'),
    allAssessmentEntries: useRecords('Assessment Entries'),
    allQuestions: useRecords('Questions'),
    allQuestionGroups: useRecords('Question Groups'),
    allQuestionResponseOptions: useRecords('Question Response Options'),
  };

  const handleComplete = () => {
    setIsFinished(true);

    // save a complete copy of the exact configassessment configuration answered
    // (for a paper trail, and for using to display a read-only view of answers)
    userDocRef
      .collection('assessmentConfigurationsLog')
      .doc('initialAssessment')
      .set(assessmentConfiguration);

    // set flag on user: initial assessment is complete
    // (will need refactor when introducing multiple assessments)
    userDocRef.set({ isAssessmentComplete: true }, { merge: true });
    window.Intercom('update', { 'Initial assessment completed': new Date() });

    // a bit hacky to update at runtime this way (vs. binding to DB) but quick and easy:
    user.isAssessmentComplete = true;

    Router.push('/dashboard');
  };

  const scrollToRef = useCallback(node => {
    if (node !== null) {
      setScrollToY(node.offsetTop - 24);
    }
  }, []);

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        {fullyLoaded(user, allPropsLoaded(assessmentConfiguration), allQuestionResponses) &&
        !isFinished ? (
          <React.Fragment>
            <Typography ref={scrollToRef} component="h1" variant="h2" gutterBottom>
              Hi, {user && user.firstName}!
            </Typography>

            <AssessmentSectionList
              scrollToY={scrollToY}
              onComplete={handleComplete}
              {...assessmentConfiguration}
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
