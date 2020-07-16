import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import compareDesc from 'date-fns/compareDesc';

import ActivityTemplateCard from './ActivityTemplateCard';
import FirebasePropTypes from '../../Firebase/PropTypes';
import { getQuestionResponse } from '../../../src/app-helper';

const ACTIVITY_DISPLAY = 3;

const EXCLUDED_ACTIVITIES_BY_ASSESSMENT = {
  'master-resume': [
    'activity-template-0',
    'activity-template-14',
    'activity-template-17',
    'activity-template-18',
  ],
  'networking-introduction': ['activity-template-11'],
  'linkedin-profile': ['activity-template-29', 'activity-template-31'],
  'list-of-references': ['activity-template-26'],
  'list-of-target-organizations': ['activity-template-40'],
  birthday: ['activity-template-14'],
};

export default function ActivityList(props) {
  const { allActivityTemplates, completedTasks, allQuestionResponses } = props;

  const birthdayResponse = getQuestionResponse(allQuestionResponses, 'birthday', 'Birthday');
  const keyDocumentResponses = [
    { slug: 'list-of-target-organizations', label: 'List of target organizations' },
    { slug: 'master-resume', label: 'Master resume' },
    { slug: 'linkedin-profile', label: 'LinkedIn profile' },
    { slug: 'networking-introduction', label: 'Networking introduction' },
    { slug: 'list-of-references', label: 'List of references' },
  ].reduce((current, item) => {
    const value = getQuestionResponse(allQuestionResponses, item.slug, item.label);
    return {
      ...current,
      ...(value && { [item.slug]: value }),
    };
  }, {});

  const excludeList = [];
  Object.entries(keyDocumentResponses).forEach(entry => {
    if (entry[1] === 'I Have This') {
      excludeList.push(...EXCLUDED_ACTIVITIES_BY_ASSESSMENT[entry[0]]);
    }
  });

  if (new Date(birthdayResponse) >= new Date('1980-01-01')) {
    excludeList.push(...EXCLUDED_ACTIVITIES_BY_ASSESSMENT.birthday);
  }

  const nextActivities = useMemo(() => {
    const completedActivities = completedTasks
      .map(task => task.data())
      .filter(taskData => taskData.taskId.startsWith('activity-template'))
      .sort((a, b) => compareDesc(a.timestamp, b.timestamp));

    const incompleteActivities = allActivityTemplates
      .filter(template => !excludeList.includes(template.slug))
      .filter(
        template => !completedActivities.map(activity => activity.taskId).includes(template.slug)
      )
      .sort((a, b) => a.priority - b.priority);
    console.log(incompleteActivities.length);
    const nextHealthActivity = incompleteActivities.find(
      template => template.category === 'health'
    );
    const nonHealthActivities = incompleteActivities.filter(
      template => template.category !== 'health'
    );

    if (nextHealthActivity) {
      const display = nonHealthActivities.slice(0, ACTIVITY_DISPLAY - 1);
      display.push(nextHealthActivity);
      return display;
    }
    return nonHealthActivities.slice(0, ACTIVITY_DISPLAY);
  }, [allActivityTemplates, completedTasks, excludeList]);

  return (
    <div>
      {nextActivities.map(template => (
        <ActivityTemplateCard key={template.slug} totalTime={template.total_time} {...template} />
      ))}
    </div>
  );
}

ActivityList.propTypes = {
  allActivityTemplates: PropTypes.arrayOf(PropTypes.object).isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  completedTasks: FirebasePropTypes.querySnapshot.isRequired,
};
