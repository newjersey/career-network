import isEmpty from 'lodash/isEmpty';

const editProfileValidation = values => {
  const errors = {};
  console.log(values);
  // if (isEmpty(values.type)) errors.type = 'Please select interview type.';
  // if (!values.date) errors.date = 'Please select interview date.';
  // if (isEmpty(values.organization)) errors.organization = 'Organization is required.';
  // if (isEmpty(values.role)) errors.role = 'Role is required.';

  return errors;
};

export default editProfileValidation;
