import isEmpty from 'lodash/isEmpty';

const employmentInputValidation = values => {
  const errors = {};
  if (isEmpty(values.occupation)) errors.occupation = 'Please select occupation.';
  if (isEmpty(values.county)) errors.county = 'Please select county.';

  return errors;
};

export default employmentInputValidation;
