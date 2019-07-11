import Box from '@material-ui/core/Box';
import React, { useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useAuth } from '../../Auth';
import AirtablePropTypes from '../../Airtable/PropTypes';
import BinaryQuestion from './BinaryQuestion';
import FirebasePropTypes from '../../Firebase/PropTypes';
import OptionQuestion from './OptionQuestion';
import TextQuestion from './TextQuestion';
import { getDefaultValue } from '../../../src/assessment-helper';

function Question(props) {
  const { user, userDocRef } = useAuth();
  const {
    question,
    allQuestionResponseOptions,
    allQuestionResponses,
    handleChange,
    values,
    errors,
  } = props;
  const {
    Disabled: disabled,
    Hidden: hidden,
    'Response Options': responseOptionIds,
    'Response Type': responseType,
  } = question.fields;

  // get response persisted in database
  const response = allQuestionResponses.find(doc => doc.id === question.id);
  const persistedValue = response && response.data().value;
  const defaultValue = getDefaultValue(question, user);
  const value = persistedValue || defaultValue;

  // get options for radio / select
  const responseOptions = responseOptionIds
    && allQuestionResponseOptions.filter(responseOption => (
      responseOptionIds.includes(responseOption.id)
    ));

  const setValue = useCallback(async (_value) => {
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
  }, [question, responseOptions, userDocRef]);

  // set value in DB immediately if the user can't do it
  useEffect(() => {
    if (disabled || hidden) {
      setValue(value);
    }
  }, [disabled, hidden, setValue, value]);

  const textQuestionProps = {
    onBlur: _value => setValue(_value),
    question,
    handleChange,
    values,
    errors,
  };

  const nonTextQuestionProps = {
    onChange: (_value) => {
      if (responseType === 'Option') {
        handleChange(_value);
      }
      setValue(_value);
    },
    question,
    value,
    handleChange,
    values,
    errors,
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

function hideable(Component) {
  return (props) => {
    const { question } = props;
    const component = <Component {...props} />;

    if (question.fields.Hidden) {
      return (
        <Box display="none">
          {component}
        </Box>
      );
    }

    return component;
  };
}

export default hideable(Question);

Question.propTypes = {
  question: AirtablePropTypes.question.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  errors: PropTypes.objectOf(PropTypes.bool).isRequired,
};
