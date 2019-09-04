import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';

import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import Question from './Question';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: theme.spacing(5),
  },
  formControl: {
    margin: theme.spacing(5, 0, 0),
    width: '100%',
  },
}));

export default function QuestionGroup(props) {
  const classes = useStyles();
  const { questionGroup, allQuestions, ...restProps } = props;

  const questions = allQuestions.filter(question =>
    questionGroup.fields.Questions.includes(question.id)
  );

  return (
    <div className={classes.root}>
      {/* <Typography component="h3" variant="h6">{questionGroup.fields.Label}</Typography> */}

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{questionGroup.fields.Label}</FormLabel>
        <FormGroup>
          {questions.map(question => (
            <Question key={question.id} question={question} {...restProps} />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}

QuestionGroup.propTypes = {
  questionGroup: AirtablePropTypes.questionGroup.isRequired,
  allQuestions: AirtablePropTypes.questions.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
};
