import React from 'react';

import AirtablePropTypes from '../../Airtable/PropTypes';
import OptionQuestion from './OptionQuestion';
import TextQuestion from './TextQuestion';
import BinaryQuestion from './BinaryQuestion';

export default function Question(props) {
  const {
    question,
    allQuestionResponseOptions,
  } = props;

  const { 'Response Options': ResponseOptionIds } = question.fields;
  const ResponseOptions = ResponseOptionIds
    && allQuestionResponseOptions.filter(ResponseOption => (
      ResponseOptionIds.includes(ResponseOption.id)
    ));

  switch (question.fields['Response Type']) {
    case 'Binary':
      return <BinaryQuestion question={question} />;
    case 'Text':
      return <TextQuestion question={question} />;
    case 'Email':
      return <TextQuestion question={question} type="email" autoComplete="email" />;
    case 'Number':
      return <TextQuestion question={question} type="number" />;
    case 'Option':
      return <OptionQuestion question={question} ResponseOptions={ResponseOptions} />;
    default:
      return null;
  }
}

Question.propTypes = {
  question: AirtablePropTypes.question.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
};
