import PropTypes from 'prop-types';

function recordShape(fieldsShape) {
  return PropTypes.shape({
    id: PropTypes.string.isRequired,
    fields: PropTypes.shape(fieldsShape).isRequired,
  });
}

const TASK_CATEGORIES = {
  marketing: {
    color: '#d0f0fd',
    name: 'Marketing Materials',
    legacyNames: ['Marketing yourself', 'Marketing Yourself'],
  },
  relationship: {
    color: '#d2f7c5',
    name: 'Relationship-Building',
    legacyNames: ['Relationship building', 'Relationship Building'],
  },
  apply: {
    color: '#ffeab6',
    name: 'Finding Openings/Applying',
    legacyNames: ['Searching/applying for jobs', 'Searching / Posting / Applying Online'],
  },
  research: {
    color: '#ffdce5',
    name: 'Researching People & Organizations',
    legacyNames: ['Researching people & companies', 'Researching People & Companies'],
  },
  mindset: {
    color: '#ede2fe',
    name: 'Success Mindset',
    legacyNames: [],
  },
  other: {
    color: '#eeeeee',
    name: 'Other',
    legacyNames: [],
  },
};

const TASK_TRIGGERING_EVENT_TYPES = {
  INTERVIEW_IN_PERSON: 'in-person',
  INTERVIEW_LIVE_VIDEO: 'live-video',
  INTERVIEW_RECORDED_VIDEO: 'recorded-video',
  INTERVIEW_PHONE_SCREEN: 'phone-screen',
};

const findTaskCategory = name => {
  const result =
    Object.values(TASK_CATEGORIES).find(cat => cat.name === name) ||
    Object.values(TASK_CATEGORIES).find(cat => cat.legacyNames.includes(name));

  if (!result) {
    throw new Error(`Unrecognized task cateogry name: ${name}`);
  }

  return result;
};

const questionResponseType = PropTypes.oneOf([
  'Option',
  'Text',
  'Number',
  'Phone',
  'Email',
  'Binary',
  'Date',
  'Textarea',
]);

const questionResponseNumberControl = PropTypes.oneOf(['Input', 'Slider']);
const questionResponseOptionsControl = PropTypes.oneOf(['Dropdown', 'Radios']);
const questionResponseDateControl = PropTypes.oneOf(['Year', 'Month', 'Day', 'Time']);

const assessmentSection = recordShape({
  Name: PropTypes.string.isRequired,
  'Short Name': PropTypes.string.isRequired,
  Description: PropTypes.string,
  Order: PropTypes.number.isRequired,
  'Assessment Subsections': PropTypes.arrayOf(PropTypes.string).isRequired,
});

const assessmentSubsection = recordShape({
  'Assessment Section': PropTypes.arrayOf(PropTypes.string).isRequired,
  Order: PropTypes.number.isRequired,
  Title: PropTypes.string,
  Description: PropTypes.string,
  Icon: PropTypes.string,
  'Icon Color': PropTypes.string,
  'Assessment Entries': PropTypes.arrayOf(PropTypes.string).isRequired,
});

const assessmentEntry = recordShape({
  Name: PropTypes.string.isRequired,
  'Assessment Subsection': PropTypes.arrayOf(PropTypes.string).isRequired,
  Order: PropTypes.number.isRequired, // CHANGED
  Question: PropTypes.arrayOf(PropTypes.string),
  'Question Group': PropTypes.arrayOf(PropTypes.string),
  'Show If Question': PropTypes.arrayOf(PropTypes.string),
  'Show If Question Response Options': PropTypes.arrayOf(PropTypes.string),
  Optional: PropTypes.bool,
});

const question = recordShape({
  Name: PropTypes.string.isRequired,
  Label: PropTypes.string.isRequired,
  Disabled: PropTypes.bool,
  Hidden: PropTypes.bool,
  Slug: PropTypes.string,
  'Date Input Options': PropTypes.arrayOf(questionResponseDateControl),
  'Helper Text': PropTypes.string,
  'Response Type': questionResponseType.isRequired,
  'Response Number Min': PropTypes.number,
  'Response Number Max': PropTypes.number,
  'Response Number Step': PropTypes.number,
  'Response Number Control': questionResponseNumberControl,
  'Response Options': PropTypes.arrayOf(PropTypes.string),
  'Response Options Control': questionResponseOptionsControl,
  Group: PropTypes.arrayOf(PropTypes.string),
  'Order Within Group': PropTypes.number,
  Icon: PropTypes.string,
  'Icon Color': PropTypes.string,
});

const questionGroup = recordShape({
  Name: PropTypes.string.isRequired,
  Label: PropTypes.string.isRequired,
  'Footer Text': PropTypes.string,
  Questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  Slug: PropTypes.string,
});

const questionResponseOption = recordShape({
  Name: PropTypes.string.isRequired,
  Order: PropTypes.number.isRequired,
});

const action = recordShape({
  'Action ID': PropTypes.number.isRequired,
  Title: PropTypes.string.isRequired,
  How: PropTypes.string.isRequired,
  Order: PropTypes.number.isRequired,
  'Task IDs': PropTypes.arrayOf(PropTypes.number).isRequired,
  'Quality Check IDs': PropTypes.arrayOf(PropTypes.number),
});

const qualityCheck = recordShape({
  'Quality Check ID': PropTypes.number.isRequired,
  'Action ID': PropTypes.arrayOf(PropTypes.number).isRequired,
  Order: PropTypes.number.isRequired,
  Imperative: PropTypes.string.isRequired,
  Indicative: PropTypes.string.isRequired,
});

const task = recordShape({
  'Task ID': PropTypes.number.isRequired,
  Priority: PropTypes.number.isRequired,
  'Time Estimate': PropTypes.number.isRequired,
  'Triggering Event': PropTypes.oneOf(Object.values(TASK_TRIGGERING_EVENT_TYPES)),
  'Highlight Label': PropTypes.string,
  Category: PropTypes.oneOf(Object.values(TASK_CATEGORIES).map(category => category.name)),
  Audience: PropTypes.oneOf(['Everyone', 'Conditions']).isRequired,
  Frequency: PropTypes.oneOf(['Once', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'])
    .isRequired,
  Title: PropTypes.string.isRequired,
  Why: PropTypes.string.isRequired,
  // Conditions: PropTypes.arrayOf(PropTypes.string).isRequired,
  'Action IDs': PropTypes.arrayOf(PropTypes.number).isRequired,
});

const condition = recordShape({
  Name: PropTypes.string.isRequired,
  Predicates: PropTypes.arrayOf(PropTypes.string).isRequired,
  Tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const predicate = recordShape({
  Name: PropTypes.string.isRequired,
  Question: PropTypes.arrayOf(PropTypes.string).isRequired,
  Operator: PropTypes.oneOf([
    'TRUE',
    'FALSE',
    'is',
    'is not',
    '<',
    '>',
    'contains',
    'does not contain',
  ]).isRequired,
  'Question Response Type': questionResponseType.isRequired,
  'Constant Value': PropTypes.string,
  'Option Value': PropTypes.arrayOf(PropTypes.string),
});

export default {
  action,
  actions: PropTypes.arrayOf(action),
  assessmentEntry,
  assessmentEntries: PropTypes.arrayOf(assessmentEntry),
  assessmentSection,
  assessmentSections: PropTypes.arrayOf(assessmentSection),
  assessmentSubsection,
  assessmentSubsections: PropTypes.arrayOf(assessmentSubsection),
  condition,
  conditions: PropTypes.arrayOf(condition),
  predicate,
  predicates: PropTypes.arrayOf(predicate),
  qualityCheck,
  qualityChecks: PropTypes.arrayOf(qualityCheck),
  question,
  questions: PropTypes.arrayOf(question),
  questionGroup,
  questionGroups: PropTypes.arrayOf(questionGroup),
  questionResponseOption,
  questionResponseOptions: PropTypes.arrayOf(questionResponseOption),
  questionResponseOptionsControl,
  questionResponseNumberControl,
  task,
  tasks: PropTypes.arrayOf(task),
  TASK_CATEGORIES,
  findTaskCategory,
  TASK_TRIGGERING_EVENT_TYPES,
};
