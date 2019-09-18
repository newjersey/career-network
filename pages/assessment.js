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
  const recordProps = {
    assessmentSections: useRecords('Assessment Sections?view=API'),
    allAssessmentEntries: useRecords('Assessment Entries?view=API'),
    allQuestions: useRecords('Questions?view=API'),
    allQuestionGroups: useRecords('Question Groups?view=API'),
    allQuestionResponseOptions: useRecords('Question Response Options?view=API'),
  };

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
        {fullyLoaded(user, allPropsLoaded(recordProps), allQuestionResponses) && !isFinished ? (
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
