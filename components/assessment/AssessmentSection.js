import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';
import AssessmentEntry from './AssessmentEntry';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    maxWidth: 780,
    margin: '0 auto',
  },
  paper: {
    padding: theme.spacing(5, 4, 3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 5, 4),
    },
  },
}));

export default function AssessmentSection(props) {
  const classes = useStyles();
  const { assessmentSection, allAssessmentEntries, allQuestionResponses, ...restProps } = props;

  const assessmentEntries = allAssessmentEntries.filter(entry =>
    assessmentSection.fields['Assessment Entries'].includes(entry.id)
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} data-intercom="assessment-section">
        <Typography component="h2" variant="h4" gutterBottom>
          {assessmentSection.fields.Name}
        </Typography>
        {assessmentSection.fields.Description && (
          <Typography variant="subtitle2">{assessmentSection.fields.Description}</Typography>
        )}
        {assessmentEntries
          .filter(assessmentEntry => shouldShow(assessmentEntry))
          .map(assessmentEntry => (
            <AssessmentEntry
              key={assessmentEntry.id}
              assessmentEntry={assessmentEntry}
              allQuestionResponses={allQuestionResponses}
              {...restProps}
            />
          ))}
      </Paper>
    </div>
  );
}

AssessmentSection.propTypes = {
  assessmentSection: AirtablePropTypes.assessmentSection.isRequired,
  allAssessmentEntries: AirtablePropTypes.assessmentEntries.isRequired,
  allQuestions: AirtablePropTypes.questions.isRequired,
  allQuestionGroups: AirtablePropTypes.questionGroups.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  readOnly: PropTypes.bool.isRequired,
};
