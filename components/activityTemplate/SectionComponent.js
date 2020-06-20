import React from 'react';
import PropTypes from 'prop-types';
import TextBlock from './components/TextBlock';
import ListBlock from './components/ListBlock';
import QuestionGroup from './components/QuestionGroup';

const COMPONENT_TYPES = {
  text: TextBlock,
  list: ListBlock,
  practice_question_group: QuestionGroup,
};

function SectionComponent({ type, ...props }) {
  const Component = COMPONENT_TYPES[type];
  return <Component {...props} />;
}

SectionComponent.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SectionComponent;
