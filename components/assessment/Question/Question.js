import React from 'react';

import AirtablePropTypes from '../../Airtable/PropTypes';
import OptionQuestion from './OptionQuestion';
import TextQuestion from './TextQuestion';
import BinaryQuestion from './BinaryQuestion';

export default function Question(props) {
  const {
    question,
    allQuestionAnswerOptions,
  } = props;

  const { 'Answer Options': answerOptionIds } = question.fields;
  const answerOptions = answerOptionIds
    && allQuestionAnswerOptions.filter(answerOption => (
      answerOptionIds.includes(answerOption.id)
    ));

  switch (question.fields['Answer Type']) {
    case 'Binary':
      return <BinaryQuestion question={question} />;
    case 'Text':
      return <TextQuestion question={question} />;
    case 'Email':
      return <TextQuestion question={question} type="email" autoComplete="email" />;
    case 'Number':
      return <TextQuestion question={question} type="number" />;
    case 'Option':
      return <OptionQuestion question={question} answerOptions={answerOptions} />;
    default:
      return null;
  }
}

Question.propTypes = {
  question: AirtablePropTypes.question.isRequired,
  allQuestionAnswerOptions: AirtablePropTypes.questionAnswerOptions.isRequired,
};
