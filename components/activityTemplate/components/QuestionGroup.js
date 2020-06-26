import { makeStyles } from '@material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import QuestionItem from './QuestionItem';
import FirebasePropTypes from '../../Firebase/PropTypes';

const useStyles = makeStyles({
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

function QuestionGroup({ questions, templateSlug, allPracticeQuestionInputs, color }) {
  const classes = useStyles();
  const getInputValue = questionId => {
    const inputData = allPracticeQuestionInputs.find(
      input => input.data().questionId === questionId
    );
    return inputData && inputData.data().value;
  };

  return (
    <div className={classes.stepsContainer}>
      {questions.map((question, index) => (
        <QuestionItem
          color={color}
          key={question.questionId}
          templateSlug={templateSlug}
          questionId={question.questionId}
          index={index}
          order={question.order}
          title={question.title}
          isLast={index === questions.length - 1}
          inputValue={getInputValue(question.questionId) || null}
        />
      ))}
    </div>
  );
}

QuestionGroup.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  templateSlug: PropTypes.string.isRequired,
  allPracticeQuestionInputs: FirebasePropTypes.querySnapshot.isRequired,
  color: PropTypes.string.isRequired,
};

export default QuestionGroup;
