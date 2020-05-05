import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useState } from 'react';
import Router from 'next/router';

import { allPropsLoaded, englishList, fullyLoaded } from '../src/app-helper';
import { logActivity } from '../components/activityInput/ActivityInputDialog';
import { useAnalytics } from '../components/Analytics';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import { useUserSubcollection } from '../components/Firebase';
import AssessmentSectionList from '../components/assessment/AssessmentSectionList';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  assessmentContainer: {
    marginTop: theme.spacing(-24),
  },
}));

function Assessment() {
  const classes = useStyles();
  const allQuestionResponses = useUserSubcollection('questionResponses');
  const [scrollToY, setScrollToY] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { user, userDocRef } = useAuth();
  const analytics = useAnalytics();
  const assessmentConfiguration = {
    assessmentSections: useRecords('Assessment Sections'),
    allAssessmentSubsections: useRecords('Assessment Subsections'),
    allAssessmentEntries: useRecords('Assessment Entries'),
    allQuestions: useRecords('Questions'),
    allQuestionGroups: useRecords('Question Groups'),
    allQuestionResponseOptions: useRecords('Question Response Options'),
  };

  // kind of a hacky one-off
  const sendOtherServicesDescriptionToIntercom = () => {
    const { allQuestionGroups } = assessmentConfiguration;
    const resourcesQuestionGroup = allQuestionGroups.find(qg => qg.fields.Slug === 'basic-needs');
    const resourceQuestionIds = resourcesQuestionGroup.fields.Questions;
    const positiveResourceQuestionResponses = allQuestionResponses.filter(
      // all "additional resources" questions checked in assessment
      doc => resourceQuestionIds.includes(doc.id) && doc.data().value === true
    );
    const englishListOfResourcesRequested = englishList(
      positiveResourceQuestionResponses.map(doc => doc.data().question.fields.Label)
    ).toLowerCase();

    if (englishListOfResourcesRequested) {
      window.Intercom('update', { 'basic-resources-requested': englishListOfResourcesRequested });
    }
  };

  const handleComplete = () => {
    setIsFinished(true);

    logActivity(userDocRef, {
      activityTypeValue: 'assessment-complete',
      activityTypeLabel: 'Completed assessment',
      briefDescription: 'Completed assessment',
      dateCompleted: new Date(),
    });

    // save a complete copy of the exact configassessment configuration answered
    // (for a paper trail, and for using to display a read-only view of answers)
    userDocRef
      .collection('assessmentConfigurationsLog')
      .doc('initialAssessment')
      .set(assessmentConfiguration);

    // set flag on user: initial assessment is complete
    // (will need refactor when introducing multiple assessments)
    userDocRef.set(
      { isAssessmentComplete: true, shouldSeeAssesssmentCompletionCelebration: true },
      { merge: true }
    );

    sendOtherServicesDescriptionToIntercom();
    analytics.updateProperties({ 'initial-assessment-complete': true });

    Router.push('/dashboard');
  };

  const scrollToRef = useCallback(node => {
    if (node !== null) {
      setScrollToY(node.offsetTop - 24);
    }
  }, []);

  return (
    <div ref={scrollToRef} className={classes.root}>
      <div>
        {fullyLoaded(user, allPropsLoaded(assessmentConfiguration), allQuestionResponses) &&
        !isFinished ? (
          <AssessmentSectionList
            scrollToY={scrollToY}
            onComplete={handleComplete}
            allQuestionResponses={allQuestionResponses}
            {...assessmentConfiguration}
            enforceValidity
          />
        ) : (
          <FullPageProgress />
        )}
      </div>
    </div>
  );
}

export default withAuthRequired(withTitle(Assessment, 'Questionnaire'));
