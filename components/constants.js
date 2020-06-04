export const INITIAL_ASSESSMENT_COMPLETE = 'initial-assessment-complete';
export const WEEKLY_ACTION_PLAN_COMPLETE = 'weekly-action-plan-complete';

export const COMPLETION_EVENT_LABELS = {
  [INITIAL_ASSESSMENT_COMPLETE]: 'Upfront Assessment Completed',
  [WEEKLY_ACTION_PLAN_COMPLETE]: 'Weekly Action Plan Completed',
};

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
    label: 'Weekly Action Plan Completed',
    color: '#9f90ff',
  },
};

export default {
  ACTION_TYPES,
  COMPLETION_EVENT_LABELS,
  INITIAL_ASSESSMENT_COMPLETE,
  WEEKLY_ACTION_PLAN_COMPLETE,
  COMPLETION_EVENT_TYPES,
};
