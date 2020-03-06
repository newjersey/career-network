import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';
import AssessmentSubsection from './AssessmentSubsection';
import FirebasePropTypes from '../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    maxWidth: 780,
    margin: '0 auto',
  },
  description: {
    marginTop: theme.spacing(2),
  },
}));

export default function AssessmentSection(props) {
  const classes = useStyles();
  const { assessmentSection, allAssessmentSubsections, onValidationChange, ...restProps } = props;
  const assessmentSubsections = allAssessmentSubsections.filter(subsection =>
    assessmentSection.fields['Assessment Subsections'].includes(subsection.id)
  );

  const validationStates = useRef(Array.from(Array(assessmentSubsections.length)));
  const wasValid = useRef(null);

  // keep track of each AssessmentSubsection validation status (in a way that doesn't trigger a rerender)
  const handleValidationChange = useCallback(
    index => isValid => {
      validationStates.current[index] = isValid;
    },
    []
  );

  // this will fire once after handleValidationChange() fires for each AssessmentSubsection
  useEffect(() => {
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
    <div className={classes.root}>
      <Typography component="h2" variant="h5">
        {assessmentSection.fields.Name}
      </Typography>
      {assessmentSection.fields.Description && (
        <Typography variant="body1" className={classes.description}>
          {assessmentSection.fields.Description}
        </Typography>
      )}
      <div data-intercom="assessment-section">
        {assessmentSubsections.map((assessmentSubsection, index) => (
          <AssessmentSubsection
            key={assessmentSubsection.id}
            assessmentSubsection={assessmentSubsection}
            onValidationChange={handleValidationChange(index)}
            {...restProps}
          />
        ))}
      </div>
    </div>
  );
}

AssessmentSection.propTypes = {
  assessmentSection: AirtablePropTypes.assessmentSection.isRequired,
  allAssessmentSubsections: AirtablePropTypes.assessmentSubsections.isRequired,
  allAssessmentEntries: AirtablePropTypes.assessmentEntries.isRequired,
  allQuestions: AirtablePropTypes.questions.isRequired,
  allQuestionGroups: AirtablePropTypes.questionGroups.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  readOnly: PropTypes.bool.isRequired,
  reflectValidity: PropTypes.bool.isRequired,
  onValidationChange: PropTypes.func.isRequired,
};
