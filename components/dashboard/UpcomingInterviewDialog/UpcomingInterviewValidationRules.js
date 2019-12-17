import isEmpty from 'lodash/isEmpty';

const upcomingInterviewValidation = values => {
  const errors = {};
  if (isEmpty(values.type)) errors.type = 'Please select interview type.';
  if (!values.date) errors.date = 'Please select interview date.';
  if (isEmpty(values.organization)) errors.company = 'Organization is required.';
  if (isEmpty(values.role)) errors.role = 'Role is required.';

  return errors;
};

export default upcomingInterviewValidation;
