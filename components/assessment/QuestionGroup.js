import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';

import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import Question from './Question';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: theme.spacing(5),
  },
  formControl: {
    margin: theme.spacing(4, 0, 0),
    width: '100%',
  },
  label: {
    marginBottom: theme.spacing(2),
  },
  footerText: {
    marginTop: theme.spacing(2),
  },
}));

export default function QuestionGroup(props) {
  const classes = useStyles();
  const { questionGroup, allQuestions, onValidationChange, ...restProps } = props;

  const questions = allQuestions.filter(question =>
    questionGroup.fields.Questions.includes(question.id)
  );

  const validationStates = useRef(Array.from(Array(questions.length)));
  const wasValid = useRef(null);

  // keep track of each Question validation status (in a way that doesn't trigger a rerender)
  const handleValidationChange = useCallback(
    index => isValid => {
      validationStates.current[index] = isValid;
    },
    []
  );

  // this will fire once after handleValidationChange() fires for each Question
  useEffect(() => {
    // determine if the QuestionGroup as a whole is valid
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
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {questions.map((question, index) => (
            <Question
              key={question.id}
              question={question}
              onValidationChange={handleValidationChange(index)}
              {...restProps}
              isInGroup
              isLastInGroup={index === questions.length - 1}
            />
          ))}
        </FormGroup>

        {questionGroup.fields['Footer Text'] && (
          <Typography variant="body2" className={classes.footerText}>
            {questionGroup.fields['Footer Text']}
          </Typography>
        )}
      </FormControl>
    </div>
  );
}

QuestionGroup.propTypes = {
  questionGroup: AirtablePropTypes.questionGroup.isRequired,
  allQuestions: AirtablePropTypes.questions.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  optional: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  reflectValidity: PropTypes.bool.isRequired,
};
