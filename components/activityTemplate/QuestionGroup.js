import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import QuestionItem from './QuestionItem';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    backgroundColor: '#fefdf8',
  },
  stepsContainer: {
    display: 'flex',
    padding: 4,
    flexDirection: 'column',
    width: '100%',
  },
}));

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

QuestionGroup.defaultProps = {};

export default QuestionGroup;
