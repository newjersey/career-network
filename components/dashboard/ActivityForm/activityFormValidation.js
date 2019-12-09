const activityValidation = values => {
  const errors = {};

  if (!values.description) {
    errors.description = 'Field is required';
  }

  return errors;
};

export default activityValidation;
