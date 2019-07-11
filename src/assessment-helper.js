export function getActiveQuestions(sections, questions) {
  if (!sections) {
    return [];
  }

  return questions.filter((question) => {
    const entry = question.fields['Question Assessment Entry'] || question.fields['Group Assessment Entry'];
    const isActive = sections.fields['Assessment Entries'].includes(entry[0]);
    const isNotBinary = question.fields['Response Type'] !== 'Binary';

    return entry && isActive && isNotBinary;
  });
}

export function getDefaultValue(question, user) {
  // special cases
  switch (question.fields.Slug) {
    case 'email':
      return user.email;
    case 'preferredFirstName':
      return user.firstName;
    default:
  }

  switch (question.fields['Response Type']) {
    case 'Text':
    case 'Number':
    case 'Email':
    case 'Phone':
    case 'Date':
    case 'Option':
      return '';
    case 'Binary':
      return false;
    default:
      return undefined;
  }
}

export function retrieveActiveResponses(sections, questions, responses, user) {
  return getActiveQuestions(sections, questions).reduce((activeResponses, question) => {
    const activeResponse = responses.find(response => response.data().question.id === question.id);
    const defaultValue = getDefaultValue(question, user);
    // eslint-disable-next-line no-param-reassign
    activeResponses[question.id] = activeResponse ? activeResponse.data().value : defaultValue;

    return activeResponses;
  }, {});
}
