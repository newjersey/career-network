import PropTypes from 'prop-types';

function recordShape(fieldsShape) {
  return PropTypes.shape({
    id: PropTypes.string.isRequired,
    fields: PropTypes.shape(fieldsShape).isRequired,
  });
}

const questionResponseType = PropTypes.oneOf([
  'Option',
  'Text',
  'Number',
  'Phone',
  'Email',
  'Binary',
  'Date',
]);

const questionResponseNumberControl = PropTypes.oneOf(['Input', 'Slider']);
const questionResponseOptionsControl = PropTypes.oneOf(['Dropdown', 'Radios']);

const assessmentSection = recordShape({
  Name: PropTypes.string.isRequired,
  'Short Name': PropTypes.string.isRequired,
  Order: PropTypes.number.isRequired,
  'Assessment Entries': PropTypes.arrayOf(PropTypes.string).isRequired,
});

const assessmentEntry = recordShape({
  Name: PropTypes.string.isRequired,
  'Assessment Section': PropTypes.arrayOf(PropTypes.string).isRequired,
  'Order Within Section': PropTypes.number.isRequired,
  Question: PropTypes.arrayOf(PropTypes.string),
  'Question Group': PropTypes.arrayOf(PropTypes.string),
});

const question = recordShape({
  Name: PropTypes.string.isRequired,
  Label: PropTypes.string.isRequired,
  Disabled: PropTypes.bool,
  Hidden: PropTypes.bool,
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
});

const questionGroup = recordShape({
  Name: PropTypes.string.isRequired,
  Label: PropTypes.string.isRequired,
  Questions: PropTypes.arrayOf(PropTypes.string).isRequired,
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

const resource = recordShape({
  Name: PropTypes.string.isRequired,
  Description: PropTypes.string,
  URL: PropTypes.string.isRequired,
});

const task = recordShape({
  'Task ID': PropTypes.number.isRequired,
  Priority: PropTypes.number.isRequired,
  'Time Estimate': PropTypes.number.isRequired,
  Category: PropTypes.oneOf([
    'Searching / Posting / Applying Online',
    'Researching People & Companies',
    'Relationship Building',
    'Marketing Yourself',
  ]).isRequired,
  Trigger: PropTypes.oneOf([
    'Everyone',
    'Initial assessment ',
    'External event',
    'Ongoing assessment',
  ]).isRequired,
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
  condition,
  conditions: PropTypes.arrayOf(condition),
  predicate,
  predicates: PropTypes.arrayOf(predicate),
  question,
  questions: PropTypes.arrayOf(question),
  questionGroup,
  questionGroups: PropTypes.arrayOf(questionGroup),
  questionResponseOption,
  questionResponseOptions: PropTypes.arrayOf(questionResponseOption),
  questionResponseOptionsControl,
  questionResponseNumberControl,
  resource,
  resources: PropTypes.arrayOf(resource),
  task,
  tasks: PropTypes.arrayOf(task),
};
