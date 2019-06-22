import React, { useEffect, useState } from 'react';

import { useAuth } from '../../Auth';
import AirtablePropTypes from '../../Airtable/PropTypes';
import BinaryQuestion from './BinaryQuestion';
import FirebasePropTypes from '../../Firebase/PropTypes';
import OptionQuestion from './OptionQuestion';
import TextQuestion from './TextQuestion';

function getDefaultValue(question, user) {
  // special cases
  switch (question.fields.Slug) {
    case 'preferredFirstName':
      return user.firstName;
    case 'preferredEmail':
      return user.email;
    default:
  }

  switch (question.fields['Response Type']) {
    case 'Text':
    case 'Number':
    case 'Email':
    case 'Phone':
    case 'Date':
    case 'Option':
      return '';
    case 'Binary':
      return false;
    default:
      return undefined;
  }
}

export default function Question(props) {
  const { user, userDocRef } = useAuth();
  const { question, allQuestionResponseOptions, allQuestionResponses } = props;
  const responseType = question.fields['Response Type'];

  // get response persisted in database
  const response = allQuestionResponses.find(doc => doc.id === question.id);
  const persistedValue = response && response.data().value;
  const defaultValue = getDefaultValue(question, user);
  const value = persistedValue || defaultValue;

  // specific to text inputs (we don't want to update any Firebase doc more than once per second)
  const [localValue, setLocalValue] = useState(value);

  // get options for radio / select
  const { 'Response Options': responseOptionIds } = question.fields;
  const responseOptions = responseOptionIds
    && allQuestionResponseOptions.filter(responseOption => (
      responseOptionIds.includes(responseOption.id)
    ));

  const setValue = async (_value) => {
    const docRef = userDocRef.collection('questionResponses').doc(question.id);
    const data = {
      question, // save a copy of the question responded to
      value: _value,
    };

    // save a copy of the question's options, if it has any
    if (responseOptions) {
      Object.assign(data, {
        responseOptions,
      });
    }

    try {
      return docRef.set(data);
    } catch (error) {
      // TODO: better error UX, and reporting solution
      // eslint-disable-next-line no-alert
      alert(`There was a problem saving your data:\n\n${error.message}`);
      throw error;
    }
  };

  useEffect(() => {
    if (persistedValue) {
      setLocalValue(persistedValue);
    }
  }, [persistedValue]);

  const textQuestionProps = {
    onBlur: _value => setValue(_value),
    onChange: _value => setLocalValue(_value),
    question,
    value: localValue,
  };

  const nonTextQuestionProps = {
    onChange: _value => setValue(_value),
    question,
    value,
  };

  switch (responseType) {
    case 'Text':
      return <TextQuestion {...textQuestionProps} />;
    case 'Number':
      return <TextQuestion {...textQuestionProps} type="number" />;
    case 'Email':
      return <TextQuestion {...textQuestionProps} type="email" autoComplete="email" />;
    case 'Phone':
      // currently assumes USA-only numbers
      return <TextQuestion {...textQuestionProps} type="tel" autoComplete="tel-national" />;
    case 'Date':
      return <TextQuestion {...textQuestionProps} type="date" InputLabelProps={{ shrink: true }} />;
    case 'Binary':
      return <BinaryQuestion {...nonTextQuestionProps} />;
    case 'Option':
      return <OptionQuestion {...nonTextQuestionProps} responseOptions={responseOptions} />;
    default:
      return null;
  }
}

Question.propTypes = {
  question: AirtablePropTypes.question.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
};
