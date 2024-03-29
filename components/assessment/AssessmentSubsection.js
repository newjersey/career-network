import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';
import AssessmentEntry from './AssessmentEntry';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3, 5, 3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3, 10, 3),
    },
  },
  title: {
    marginTop: theme.spacing(2),
    color: '#0c4163',
  },
  description: {
    marginTop: theme.spacing(1),
  },
  divider: {
    height: theme.spacing(5),
  },
}));

export default function AssessmentSubsection(props) {
  const classes = useStyles();
  const {
    assessmentSubsection,
    allAssessmentEntries,
    allQuestionResponses,
    onValidationChange,
    ...restProps
  } = props;
  const assessmentEntries = allAssessmentEntries.filter(entry =>
    assessmentSubsection.fields['Assessment Entries'].includes(entry.id)
  );

  // bool: is the response to the given Question any of the given Question Response Options
  const isQuestionResponse = (questionId, questionResponseOptionIds) => {
    const questionResponse = allQuestionResponses.find(doc => doc.id === questionId);

    // unanswered questions
    if (questionResponse === undefined) {
      return false;
    }

    return questionResponseOptionIds.includes(questionResponse.data().value);
  };

  // bool: should the given Assessment Entry be shown
  const shouldShow = assessmentEntry => {
    const showIfQuestions = assessmentEntry.fields['Show If Question'] || [];
    const showIfQuestionResponseOptions =
      assessmentEntry.fields['Show If Question Response Options'] || [];

    switch (showIfQuestions.length) {
      case 0:
        return true;
      case 1:
        if (!showIfQuestionResponseOptions.length) {
          throw new Error(
            `Missing "Show If Question Response Options" in AssessmentEntry ${assessmentEntry.id}`
          );
        }
        return isQuestionResponse(showIfQuestions[0], showIfQuestionResponseOptions);
      default:
        throw new Error(
          `Unexpected multiple "Show If Question" in AssessmentEntry ${assessmentEntry.id}`
        );
    }
  };

  const assessmentEntriesToShow = assessmentEntries.filter(ae => shouldShow(ae));
  const validationStates = useRef(Array.from(Array(assessmentEntriesToShow.length)));
  const wasValid = useRef(null);

  // keep track of each AssessmentEntry validation status (in a way that doesn't trigger a rerender)
  const handleValidationChange = useCallback(
    index => isValid => {
      validationStates.current[index] = isValid;
    },
    []
  );

  // this will fire once after handleValidationChange() fires for each AssessmentEntry
  useEffect(() => {
    // remove any array entries beyond how many we expect (use case: dynamically hide a question)
    validationStates.current.splice(assessmentEntriesToShow.length);

    // determine if the AssessmentSection as a whole is valid
    const isValid = validationStates.current.map(a => !!a).reduce((a, b) => a && b, true);

    // fire parent callback if validation has changed
    if (wasValid.current !== isValid) {
      onValidationChange(isValid);
    }

    // keep track of validation status so we can detect changes
    wasValid.current = isValid;
  });

  return (
    <Paper className={classes.root} data-intercom="assessment-section">
      {assessmentSubsection.fields.Title && (
        <Typography component="h3" variant="h6" className={classes.title}>
          {assessmentSubsection.fields.Title}
        </Typography>
      )}
      {assessmentSubsection.fields.Description && (
        <Typography variant="body2" className={classes.description}>
          {assessmentSubsection.fields.Description}
        </Typography>
      )}
      {assessmentSubsection.fields.Title && <div className={classes.divider} />}
      {assessmentEntriesToShow.map((assessmentEntry, index) => (
        <AssessmentEntry
          key={assessmentEntry.id}
          assessmentEntry={assessmentEntry}
          allQuestionResponses={allQuestionResponses}
          onValidationChange={handleValidationChange(index)}
          {...restProps}
        />
      ))}
    </Paper>
  );
}

AssessmentSubsection.propTypes = {
  assessmentSubsection: AirtablePropTypes.assessmentSubsection.isRequired,
  allAssessmentEntries: AirtablePropTypes.assessmentEntries.isRequired,
  allQuestions: AirtablePropTypes.questions.isRequired,
  allQuestionGroups: AirtablePropTypes.questionGroups.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  readOnly: PropTypes.bool.isRequired,
  reflectValidity: PropTypes.bool.isRequired,
  onValidationChange: PropTypes.func.isRequired,
};
