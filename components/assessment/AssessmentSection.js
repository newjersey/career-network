import firebase from 'firebase/app';
import 'firebase/firestore';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';
import AssessmentEntry from './AssessmentEntry';

const { QueryDocumentSnapshot } = firebase.firestore;
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    maxWidth: 780,
    margin: '0 auto',
  },
  paper: {
    padding: theme.spacing(3, 2),
  },
}));

export default function AssessmentSection(props) {
  const classes = useStyles();
  const {
    assessmentSection,
    allAssessmentEntries,
    ...restProps
  } = props;

  const assessmentEntries = allAssessmentEntries.filter(entry => (
    assessmentSection.fields['Assessment Entries'].includes(entry.id)
  ));

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h4" gutterBottom>{assessmentSection.fields.Name}</Typography>
        {assessmentSection.fields.Description && (
          <Typography variant="subtitle2">{assessmentSection.fields.Description}</Typography>
        )}
        {assessmentEntries.map(entry => (
          <AssessmentEntry key={entry.id} assessmentEntry={entry} {...restProps} />
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
  allQuestionResponses: PropTypes.arrayOf(PropTypes.instanceOf(QueryDocumentSnapshot)).isRequired,
};
