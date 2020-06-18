import { makeStyles } from '@material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import QuestionItem from './QuestionItem';

const useStyles = makeStyles({
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

function QuestionGroup({ questions }) {
  const classes = useStyles();
  return (
    <div className={classes.stepsContainer}>
      {questions.map(question => (
        <QuestionItem
          key={question.questionId}
          index={question.order}
          title={question.title}
          isLast={question.order + 1 === questions.length}
        />
      ))}
    </div>
  );
}

QuestionGroup.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuestionGroup;
