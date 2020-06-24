import React from 'react';
import PropTypes from 'prop-types';
import TextBlock from './components/TextBlock';
import ListBlock from './components/ListBlock';
import QuestionGroup from './components/QuestionGroup';
import Callout from './components/Callout';
import Citation from './components/Citation';

const COMPONENT_TYPES = {
  text: TextBlock,
  list: ListBlock,
  practice_question_group: QuestionGroup,
  callout: Callout,
  citation: Citation,
};

function SectionComponent({ type, ...props }) {
  const Component = COMPONENT_TYPES[type];
  return Component ? <Component {...props} /> : null;
}

SectionComponent.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SectionComponent;
