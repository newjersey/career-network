import isEmpty from 'lodash/isEmpty';

const upcomingInterviewValidation = values => {
  const errors = {};

  if (isEmpty(values.type)) errors.type = 'Please select interview type.';
  if (isEmpty(values.date)) errors.type = 'Date is required.';
  if (isEmpty(values.company)) errors.type = 'Company is required.';
  if (isEmpty(values.role)) errors.type = 'Role is required.';

  return errors;
};

export default upcomingInterviewValidation;
