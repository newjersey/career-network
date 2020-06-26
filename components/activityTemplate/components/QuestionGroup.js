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

function QuestionGroup({ questions, templateSlug, allPracticeQuestionInputs }) {
  const classes = useStyles();
  const getInputValue = questionId => {
    const inputData = allPracticeQuestionInputs.find(
      input => input.data().questionId === questionId
    );
    return inputData && inputData.data().value;
  };

  return (
    <div className={classes.stepsContainer}>
      {questions.map(question => (
        <QuestionItem
          key={question.questionId}
          templateSlug={templateSlug}
          questionId={question.questionId}
          index={question.order}
          title={question.title}
          isLast={question.order === questions.length}
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
};

export default QuestionGroup;
