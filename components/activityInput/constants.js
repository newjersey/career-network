import AirtablePropTypes from '../Airtable/PropTypes';

export const TIME_SPENT_OPTIONS = [
  {
    label: '15 minutes',
    value: 15,
  },
  {
    label: '30 minutes',
    value: 30,
  },
  {
    label: '1 hour',
    value: 60,
  },
  {
    label: '1.5 hours',
    value: 90,
  },
  {
    label: '2+ hours',
    value: 120,
  },
];

export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

export const FEELINGS = [
  'Confident',
  'Discouraged',
  'Frustrated',
  'Optimistic',
  'Motivated',
  'Overwhelmed',
];

export const ACTIVITY_TYPES = [
  {
    value: 'openings',
    label: 'Searched for job openings (Indeed, LinkedIn, Monster, CareerBuilder, etc.)',
    category: AirtablePropTypes.TASK_CATEGORIES.apply,
  },
  {
    value: 'application',
    label: 'Completed a job application',
    category: AirtablePropTypes.TASK_CATEGORIES.apply,
  },
  {
    value: 'materials',
    label: 'Worked on marketing materials (resume, cover letter, LinkedIn profile/activity, etc.)',
    category: AirtablePropTypes.TASK_CATEGORIES.marketing,
  },
  {
    value: 'interview-prep',
    label: 'Prepared for an interview',
    category: AirtablePropTypes.TASK_CATEGORIES.apply,
  },
  {
    value: 'networking-irl',
    label: 'Attended a networking event/job fair',
    category: AirtablePropTypes.TASK_CATEGORIES.relationship,
  },
  {
    value: 'networking-virtual',
    label: 'Had a virtual networking interaction (via email, LinkedIn, etc.)',
    category: AirtablePropTypes.TASK_CATEGORIES.relationship,
  },
  {
    value: 'contact',
    label: 'Had a meeting/call with a contact',
    category: AirtablePropTypes.TASK_CATEGORIES.relationship,
  },
  {
    value: 'research-company-industry',
    label: 'Researched a target company/industry',
    category: AirtablePropTypes.TASK_CATEGORIES.research,
  },
  {
    value: 'research-contacts',
    label: 'Researched contacts at target company',
    category: AirtablePropTypes.TASK_CATEGORIES.research,
  },
  {
    value: 'organization',
    label: 'Organized my search & routines',
    category: AirtablePropTypes.TASK_CATEGORIES.mindset,
  },
  {
    value: 'self-care',
    label: 'Self-care to deal with stress of the search',
    category: AirtablePropTypes.TASK_CATEGORIES.mindset,
  },
  {
    value: 'other',
    label: 'Other',
    category: AirtablePropTypes.TASK_CATEGORIES.other,
  },
  {
    value: 'assessment-complete',
    label: 'Completed assessment',
    category: AirtablePropTypes.TASK_CATEGORIES.other,
  },
];

export default { ACTIVITY_TYPES, TIME_SPENT_OPTIONS, DIFFICULTY_LEVELS, FEELINGS };
