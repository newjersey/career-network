import React from 'react';

import AirtablePropTypes from '../Airtable/PropTypes';
import Question from './Question';
import QuestionGroup from './QuestionGroup';

export default function AssessmentEntry(props) {
  const {
    assessmentEntry,
    allQuestions,
    allQuestionGroups,
    ...restProps
  } = props;

  // Only one of these arrays should be populated,
  // and with only one item; naming them plurally
  // as a reminder that they are, in fact, arrays.
  const {
    'Question Group': questionGroups,
    Question: questions,
  } = assessmentEntry.fields;

  if (questionGroups && questionGroups.length) {
    const id = questionGroups[0];
    const questionGroup = allQuestionGroups.find(qg => qg.id === id);

    return (
      <QuestionGroup
        questionGroup={questionGroup}
        allQuestions={allQuestions}
        {...restProps}
      />
    );
  }

  if (questions && questions.length) {
    const id = questions[0];
    const question = allQuestions.find(q => q.id === id);

    return <Question question={question} {...restProps} />;
  }

  throw new Error(`Missing child reference in AssessmentEntry ${assessmentEntry.id}`);
}

AssessmentEntry.propTypes = {
  assessmentEntry: AirtablePropTypes.assessmentEntry.isRequired,
  allQuestions: AirtablePropTypes.questions.isRequired,
  allQuestionGroups: AirtablePropTypes.questionGroups.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
};
