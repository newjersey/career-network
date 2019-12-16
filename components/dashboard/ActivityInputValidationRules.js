export default function validate(formValues) {
  const REQUIRED_FIELDS = {
    activityTypeValue: 'Activity',
    description: 'Description',
    timeSpentInMinutes: 'Time Spent',
    difficultyLevel: 'Difficulty Level',
  };

  return Object.entries(REQUIRED_FIELDS)
    .filter(pair => !formValues[pair[0]])
    .map(pair => ({
      key: pair[0],
      error: `${pair[1]} is required.`,
    }))
    .reduce((formErrors, { key, error }) => {
      const result = { ...formErrors };
      result[key] = error;
      return result;
    }, {});
}
