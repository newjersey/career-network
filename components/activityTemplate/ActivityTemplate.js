import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

export default function ActivityTemplate(props) {
  const { activityTemplate } = props;
  const practiceData = activityTemplate.sections.find(sec => sec.slug === 'practice');

  return (
    <div>
      <Section sectionData={practiceData} />
    </div>
  );
}

ActivityTemplate.propTypes = {
  activityTemplate: PropTypes.objectOf(PropTypes.any).isRequired,
};
