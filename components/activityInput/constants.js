import AirtablePropTypes from '../Airtable/PropTypes';

export const TIME_SPENT_OPTIONS = [
  {
    label: 'Less than 30 Minutes',
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
    label: 'Searched for Job Openings',
    category: AirtablePropTypes.TASK_CATEGORIES.apply,
  },
  {
    value: 'materials',
    label: 'Worked on Marketing Materials',
    category: AirtablePropTypes.TASK_CATEGORIES.marketing,
  },
  {
    value: 'networking-virtual',
    label: 'Had a Virtual Networking Interaction (via Email, LinkedIn, Meeting)',
    category: AirtablePropTypes.TASK_CATEGORIES.relationship,
  },
  {
    value: 'contact',
    label: 'Had a Meeting/Call with a Contact',
    category: AirtablePropTypes.TASK_CATEGORIES.relationship,
  },
  {
    value: 'research-company-industry',
    label: 'Researched Target Organizations and Contacts',
    category: AirtablePropTypes.TASK_CATEGORIES.research,
  },
  {
    value: 'organization',
    label: 'Organized My Search',
    category: AirtablePropTypes.TASK_CATEGORIES.mindset,
  },
  {
    value: 'self-care',
    label: 'Self-Care to Deal with Stress of the Search',
    category: AirtablePropTypes.TASK_CATEGORIES.mindset,
  },
  {
    value: 'other',
    label: 'Other',
    category: AirtablePropTypes.TASK_CATEGORIES.other,
  },
];

export default { ACTIVITY_TYPES, TIME_SPENT_OPTIONS, DIFFICULTY_LEVELS, FEELINGS };
