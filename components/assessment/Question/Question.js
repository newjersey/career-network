import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import { useAuth } from '../../Auth';
import AirtablePropTypes from '../../Airtable/PropTypes';
import BinaryQuestion from './BinaryQuestion';
import FirebasePropTypes from '../../Firebase/PropTypes';
import OptionQuestion from './OptionQuestion';
import SliderQuestion from './SliderQuestion';
import TextQuestion from './TextQuestion';
import DateQuestion from './DateQuestion';

function getDefaultValue(question, user) {
  // special cases
  switch (question.fields.Slug) {
    case 'email':
      return user.email;
    case 'preferred-name':
      return user.displayName;
    default:
  }

  switch (question.fields['Response Type']) {
    case 'Text':
    case 'Email':
    case 'Phone':
    case 'Date':
    case 'Number':
    case 'Option':
    case 'Link':
      return '';
    case 'Binary':
      return false;
    case 'File':
      return null;
    default:
      return undefined;
  }
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function Question(props) {
  const { user, userDocRef } = useAuth();
  const {
    question,
    allQuestionResponseOptions,
    allQuestionResponses,
    isInGroup,
    isLastInGroup,
    onValidationChange,
    optional,
    readOnly,
    reflectValidity,
  } = props;
  const {
    Disabled: disabled,
    Hidden: hidden,
    'Response Options': responseOptionIds,
    'Response Options Control': responseOptionsControl,
    'Response Type': responseType,
    'Response Number Control': responseNumberControl,
    'Response Number Min': responseNumberMin,
    'Response Number Max': responseNumberMax,
    'Response Number Step': responseNumberStep,
    'Date Input Options': dateInputOptions,
  } = question.fields;

  // get response persisted in database
  const response = allQuestionResponses.find(doc => doc.id === question.id);
  const persistedValue = response && response.data().value;
  const defaultValue = getDefaultValue(question, user);
  const value = persistedValue || defaultValue;

  // specific to text inputs (we don't want to update any Firebase doc more than once per second)
  const [localValue, _setLocalValue] = useState(value);

  // get options for radio / select
  const responseOptions =
    responseOptionIds &&
    allQuestionResponseOptions.filter(responseOption =>
      responseOptionIds.includes(responseOption.id)
    );

  const setLocalValue = useCallback(
    _value => {
      if (readOnly) {
        return;
      }

      _setLocalValue(_value);
    },
    [readOnly]
  );

  const setValue = useCallback(
    async _value => {
      if (readOnly) {
        return;
      }

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
        docRef.set(data);
      } catch (error) {
        // TODO: better error UX, and reporting solution
        // eslint-disable-next-line no-alert
        alert(`There was a problem saving your data:\n\n${error.message}`);
        throw error;
      }

      // special cases
      if (question.fields.Slug === 'phone' && _value) {
        const usaRegEx = /^\D*(?:\+?1)?\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
        const matches = _value.match(usaRegEx);
        const phone = matches ? `+1-${matches[1]}-${matches[2]}-${matches[3]}` : _value;

        window.Intercom('update', { phone });
      }
    },
    [question, readOnly, responseOptions, userDocRef]
  );

  // set value in DB immediately if the user can't do it
  useEffect(() => {
    if (disabled || hidden) {
      setValue(value);
    }
  }, [disabled, hidden, setValue, value]);

  // update UI when database changes
  useEffect(() => {
    if (persistedValue) {
      setLocalValue(persistedValue);
    }
  }, [persistedValue, setLocalValue]);

  const commonQuestionProps = {
    isInGroup,
    optional,
    question,
    onValidationChange,
    reflectValidity,
  };

  const textQuestionProps = {
    ...commonQuestionProps,
    onBlur: _value => setValue(_value),
    onChange: _value => setLocalValue(_value),
    value: localValue,
  };

  const dateQuestionProps = {
    ...commonQuestionProps,
    views: dateInputOptions,
    onChange: _value => setLocalValue(_value),
    onChangeCommitted: _value => setValue(_value),
    value,
  };

  const discreteQuestionProps = {
    ...commonQuestionProps,
    onChange: _value => setValue(_value),
    value,
  };

  const numberQuestionProps = {
    min: responseNumberMin,
    max: responseNumberMax,
    step: responseNumberStep,
  };

  const sliderProps = {
    ...commonQuestionProps,
    ...numberQuestionProps,
    onChange: _localValue => setLocalValue(_localValue),
    onChangeCommitted: _value => setValue(_value),
    value: localValue ? parseFloat(localValue) : undefined,
    isLastInGroup,
  };

  switch (responseType) {
    case 'Text':
      return <TextQuestion {...textQuestionProps} />;
    case 'Textarea':
      return <TextQuestion {...textQuestionProps} multiline rows={7} />;
    case 'Number':
      switch (responseNumberControl) {
        case 'Input':
          return (
            <TextQuestion {...textQuestionProps} type="number" inputProps={numberQuestionProps} />
          );
        case 'Slider':
          return <SliderQuestion {...sliderProps} />;
        default:
          return null;
      }
    case 'Email':
      return <TextQuestion {...textQuestionProps} type="email" autoComplete="email" />;
    case 'Phone':
      // currently assumes USA-only numbers
      return <TextQuestion {...textQuestionProps} type="tel" autoComplete="tel-national" />;
    case 'Date':
      return dateInputOptions && dateInputOptions.length > 0 ? (
        <DateQuestion {...dateQuestionProps} InputLabelProps={{ shrink: true }} />
      ) : (
        <TextQuestion {...textQuestionProps} type="date" InputLabelProps={{ shrink: true }} />
      );
    case 'Binary':
      return <BinaryQuestion {...discreteQuestionProps} />;
    case 'Option':
      return (
        <>
          <OptionQuestion
            {...discreteQuestionProps}
            responseOptions={responseOptions}
            responseOptionsControl={responseOptionsControl}
            isLastInGroup={isLastInGroup}
          />
        </>
      );
    case 'Link':
      return null; // TODO: implement a LinkQuestion component
    case 'File':
      return null; // TODO: implement a FileQuestion component
    default:
      return null;
  }
}

function hideable(Component) {
  return props => {
    const { question } = props;
    const component = <Component {...props} />;

    if (question.fields.Hidden) {
      return <Box display="none">{component}</Box>;
    }

    return component;
  };
}

export default hideable(Question);

Question.propTypes = {
  question: AirtablePropTypes.question.isRequired,
  allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  isInGroup: PropTypes.bool,
  isLastInGroup: PropTypes.bool,
  onValidationChange: PropTypes.func.isRequired,
  optional: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  reflectValidity: PropTypes.bool.isRequired,
};

Question.defaultProps = {
  isInGroup: false,
  isLastInGroup: false,
};
