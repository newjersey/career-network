import PropTypes from 'prop-types';

function recordShape(fieldsShape) {
  return PropTypes.shape({
    id: PropTypes.string.isRequired,
    fields: PropTypes.shape(fieldsShape).isRequired,
  });
}

const assessmentSection = recordShape({
  Name: PropTypes.string.isRequired,
  'Short Name': PropTypes.string.isRequired,
  'Assessment Entries': PropTypes.arrayOf(PropTypes.string).isRequired,
});

const assessmentEntry = recordShape({
  Name: PropTypes.string.isRequired,
  'Assessment Section': PropTypes.arrayOf(PropTypes.string).isRequired,
  Question: PropTypes.arrayOf(PropTypes.string),
  'Question Group': PropTypes.arrayOf(PropTypes.string),
});

const question = recordShape({
  Name: PropTypes.string.isRequired,
  'Helper Text': PropTypes.string,
  'Response Type': PropTypes.oneOf([
    'Option',
    'Text',
    'Number',
    'Phone',
    'Email',
    'Binary',
    'Date',
  ]).isRequired,
  'Response Options': PropTypes.arrayOf(PropTypes.string),
  Group: PropTypes.arrayOf(PropTypes.string),
  'Order Within Group': PropTypes.number,
});

const questionGroup = recordShape({
  Name: PropTypes.string.isRequired,
  Questions: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const questionResponseOption = recordShape({
  Name: PropTypes.string.isRequired,
  Order: PropTypes.number.isRequired,
});

const action = recordShape({
  Name: PropTypes.string.isRequired,
  What: PropTypes.string.isRequired,
  Why: PropTypes.string.isRequired,
  How: PropTypes.string.isRequired,
  Elaboration: PropTypes.string,
  Priority: PropTypes.number.isRequired,
  'Icon ID': PropTypes.number.isRequired,
  Resources: PropTypes.arrayOf(PropTypes.string).isRequired,
  'Elaboration Resources': PropTypes.arrayOf(PropTypes.string),
});

const resource = recordShape({
  Name: PropTypes.string.isRequired,
  Description: PropTypes.string,
  URL: PropTypes.string.isRequired,
});

export default {
  action,
  actions: PropTypes.arrayOf(action),
  assessmentEntry,
  assessmentEntries: PropTypes.arrayOf(assessmentEntry),
  assessmentSection,
  assessmentSections: PropTypes.arrayOf(assessmentSection),
  question,
  questions: PropTypes.arrayOf(question),
  questionGroup,
  questionGroups: PropTypes.arrayOf(questionGroup),
  questionResponseOption,
  questionResponseOptions: PropTypes.arrayOf(questionResponseOption),
  resource,
  resources: PropTypes.arrayOf(resource),
};
