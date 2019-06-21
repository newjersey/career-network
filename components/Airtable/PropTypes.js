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
  'Response Type': PropTypes.oneOf([
    'Option',
    'Text',
    'Number',
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

export default {
  assessmentSection,
  assessmentEntry,
  question,
  questionGroup,
  questionResponseOption,
  assessmentSections: PropTypes.arrayOf(assessmentSection),
  assessmentEntries: PropTypes.arrayOf(assessmentEntry),
  questions: PropTypes.arrayOf(question),
  questionGroups: PropTypes.arrayOf(questionGroup),
  questionResponseOptions: PropTypes.arrayOf(questionResponseOption),
};
