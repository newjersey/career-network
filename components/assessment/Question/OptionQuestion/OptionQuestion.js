import PropTypes from 'prop-types';
import React from 'react';
import ToggleButtonQuestion from './ToggleButtonQuestion';
import DropdownQuestion from './DropdownQuestion';
import AirtablePropTypes from '../../../Airtable/PropTypes';

export default function OptionQuestion(props) {
  const { isInGroup, isLastInGroup, responseOptionsControl, ...restProps } = props;

  switch (responseOptionsControl) {
    case 'Dropdown':
      return <DropdownQuestion {...restProps} />;
    case 'Radios':
      return <ToggleButtonQuestion useFullWidthButton {...restProps} />;
    default:
      return null;
  }
}

OptionQuestion.propTypes = {
  isInGroup: PropTypes.bool,
  isLastInGroup: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  reflectValidity: PropTypes.bool,
  responseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  responseOptionsControl: AirtablePropTypes.questionResponseOptionsControl.isRequired,
  value: PropTypes.string,
};

OptionQuestion.defaultProps = {
  isInGroup: false,
  isLastInGroup: false,
  reflectValidity: false,
  value: null,
};
