export const INITIAL_ASSESSMENT_COMPLETE = 'initial-assessment-complete';
export const WEEKLY_ACTION_PLAN_COMPLETE = 'weekly-action-plan-complete';
export const COMPLETED_ASSESSMENT_ACTIVITY_DEPRECATED = 'assessment-complete';

export const ACTION_TYPES = {
  goal: {
    value: 'goal',
    label: 'Goal Completed',
    color: '#1980c8',
  },
  activity: {
    value: 'activity',
    label: 'Activity Logged',
    color: '#f29a38',
  },
  application: {
    value: 'application',
    label: 'Application Added',
    color: '#7ea94f',
  },
};

export const COMPLETION_EVENT_TYPES = {
  [INITIAL_ASSESSMENT_COMPLETE]: {
    value: INITIAL_ASSESSMENT_COMPLETE,
    label: 'Upfront Assessment Completed',
    color: '#9f90ff',
  },
  [WEEKLY_ACTION_PLAN_COMPLETE]: {
    value: WEEKLY_ACTION_PLAN_COMPLETE,
    label: 'Action Plan',
    color: '#d09d09',
  },
};

export const JOB_SEARCH_BASICS_TYPES = {
  search: {
    value: 'search',
    label: 'Finding Job Opportunities',
    color: '#244cd2',
  },
  apply: {
    value: 'apply',
    label: 'Applying for Jobs',
    color: '#f5bc17',
  },
  health: {
    value: 'health',
    label: 'Taking Care of Yourself',
    color: '#a647cb',
  },
};

export default {
  ACTION_TYPES,
  INITIAL_ASSESSMENT_COMPLETE,
  WEEKLY_ACTION_PLAN_COMPLETE,
  COMPLETION_EVENT_TYPES,
  COMPLETED_ASSESSMENT_ACTIVITY_DEPRECATED,
  JOB_SEARCH_BASICS_TYPES,
};
