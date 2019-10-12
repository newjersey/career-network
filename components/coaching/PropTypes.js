import PropTypes from 'prop-types';

import FirebasePropTypes from '../Firebase/PropTypes';
import AirtablePropTypes from '../Airtable/PropTypes';

const AuthProfileType = PropTypes.shape({
  displayName: PropTypes.string,
  email: PropTypes.string,
  emailVerified: PropTypes.bool,
  isAnonymous: PropTypes.bool,
  phoneNumber: PropTypes.string,
  photoURL: PropTypes.string,
});

const Assignment = PropTypes.shape({
  authProfile: AuthProfileType,
  assessmentConfiguration: PropTypes.shape({
    assessmentSections: AirtablePropTypes.assessmentSections.isRequired,
    allAssessmentEntries: AirtablePropTypes.assessmentEntries.isRequired,
    allQuestions: AirtablePropTypes.questions.isRequired,
    allQuestionGroups: AirtablePropTypes.questionGroups.isRequired,
    allQuestionResponseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  }),
  questionResponses: PropTypes.oneOfType([
    FirebasePropTypes.querySnapshot,
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.func)),
  ]),
});

export default {
  assignments: PropTypes.arrayOf(Assignment).isRequired,
};
