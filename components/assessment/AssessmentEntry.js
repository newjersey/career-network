import PropTypes from 'prop-types';
import React from 'react';

import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import Question from './Question';
import QuestionGroup from './QuestionGroup';
import RangeQuestionGroup from './RangeQuestionGroup';

export default function AssessmentEntry(props) {
  const { assessmentEntry, allQuestions, allQuestionGroups, ...restProps } = props;

  // Only one of these arrays should be populated,
  // and with only one item; naming them plurally
  // as a reminder that they are, in fact, arrays.
  const { 'Question Group': questionGroups, Question: questions } = assessmentEntry.fields;
  const optional = !!assessmentEntry.fields.Optional;

  if (questionGroups && questionGroups.length) {
    const id = questionGroups[0];
    const questionGroup = allQuestionGroups.find(qg => qg.id === id);
    if (questionGroup.fields.Slug === 'job-date-range') {
      return (
        <RangeQuestionGroup
          questionGroup={questionGroup}
          allQuestions={allQuestions}
          optional={optional}
          {...restProps}
        />
      );
    }

    return (
      <QuestionGroup
        questionGroup={questionGroup}
        allQuestions={allQuestions}
        optional={optional}
        {...restProps}
      />
    );
  }

  if (questions && questions.length) {
    const id = questions[0];
    const question = allQuestions.find(q => q.id === id);

    return <Question question={question} optional={optional} {...restProps} />;
  }

  throw new Error(`Missing child reference in AssessmentEntry ${assessmentEntry.id}`);
}

AssessmentEntry.propTypes = {
  assessmentEntry: AirtablePropTypes.assessmentEntry.isRequired,
  allQuestions: AirtablePropTypes.questions.isRequired,
  allQuestionGroups: AirtablePropTypes.questionGroups.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  reflectValidity: PropTypes.bool.isRequired,
};
