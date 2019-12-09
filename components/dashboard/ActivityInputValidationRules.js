export default function validate(formValues) {
  const formErrors = {};
  if (!formValues.activityTypeValue) {
    formErrors.activityTypeValue = 'Activity is required.';
  }
  if (!formValues.description) {
    formErrors.description = 'Description is required.';
  }
  if (!formValues.timeSpentInMinutes) {
    formErrors.timeSpentInMinutes = 'Time Spent is required.';
  }
  if (!formValues.difficultyLevel) {
    formErrors.difficultyLevel = 'Difficulty Level is required.';
  }
  return formErrors;
}
