import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';

import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import Question from './Question';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: theme.spacing(5),
  },
  formControl: {
    width: '100%',
  },
  label: {
    marginBottom: theme.spacing(2),
  },
  footerText: {
    marginTop: theme.spacing(2),
  },
}));

const isValidRange = (startValue, endValue) => new Date(startValue) <= new Date(endValue);

export default function RangeQuestionGroup(props) {
  const classes = useStyles();
  const { questionGroup, allQuestions, onValidationChange, ...restProps } = props;
  const questions = allQuestions.filter(question =>
    questionGroup.fields.Questions.includes(question.id)
  );

  const validationStates = useRef(Array.from(Array(questions.length)));
  const valueStates = useRef(Array.from(Array(questions.length)));
  const wasValid = useRef();

  // keep track of each Question validation status (in a way that doesn't trigger a rerender)
  const handleDateRangeValidationChange = useCallback(
    index => (isValid, newValue) => {
      valueStates.current[index] = newValue;
      validationStates.current[index] = isValid;
    },
    []
  );

  // this will fire once after handleValidationChange() fires for each Question
  useEffect(() => {
    // determine if the QuestionGroup as a whole is valid
    const isValid =
      validationStates.current.map(a => !!a).reduce((a, b) => a && b, true) &&
      isValidRange(valueStates.current[0], valueStates.current[1]);

    // fire parent callback if validation has changed
    if (wasValid.current !== isValid) {
      onValidationChange(isValid);
    }

    // keep track of validation status so we can detect changes
    wasValid.current = isValid;
  });

  const [startDateQuestion, endDateQuestion] = questions;
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl} error={!wasValid.current}>
        <Question
          key={startDateQuestion.id}
          question={startDateQuestion}
          onValidationChange={handleDateRangeValidationChange(0)}
          groupIsValid={wasValid.current}
          {...restProps}
          isInGroup
        />
        <FormGroup />
        <Question
          key={endDateQuestion.id}
          question={endDateQuestion}
          onValidationChange={handleDateRangeValidationChange(1)}
          {...restProps}
          isInGroup
          groupIsValid={wasValid.current}
          isLastInGroup
        />
        <FormGroup />
      </FormControl>
    </div>
  );
}

RangeQuestionGroup.propTypes = {
  questionGroup: AirtablePropTypes.questionGroup.isRequired,
  allQuestions: AirtablePropTypes.questions.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  optional: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  reflectValidity: PropTypes.bool.isRequired,
};
