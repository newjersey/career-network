import every from 'lodash/fp/every';
import identity from 'lodash/fp/identity';

/**
 * Checks that all values in the props are truthy, meaning they've loaded
 */
export function allPropsLoaded(props) {
  return Object.values(props)
    .map(array => array.length)
    .reduce((accum, length) => accum && !!length, true);
}

/**
 * Accepts a list of arguments and returns true when they're all truthy
 */
export function fullyLoaded(...items) {
  return every(identity)(items);
}

/**
 * Given a Firestore entry that might have a property 'timestamp',
 * return the timestamp's value in seconds or 0 if not set.
 */
export function timestampSeconds(docRef) {
  return docRef.data().timestamp ? docRef.data().timestamp.seconds : 0;
}

/**
 * Given a Firestore collection snapshot, returns the entry that has the
 * greatest 'timestamp' property.
 */
export function mostRecent(snapshot) {
  return snapshot.map(event => timestampSeconds(event)).reduce((a, b) => Math.max(a, b), 0);
}

/**
 * Returns whether or not the current disposition of a given
 * dispositionable object is 'done' given an array of disposition events
 * and an ID key with which to match the dispositionable to these events.
 *
 * TODO: refactor into a more elegant "dispositionable" module
 */
export function isDone(dispositionable, allDispositionEvents, idKey) {
  // persistance model allows for future disposition states (snooze, skip, etc.)
  // TODO: sort on the server
  const currentDispositionEvent = allDispositionEvents
    .filter(e => e.data()[idKey] === dispositionable.id)
    .sort((a, b) => timestampSeconds(b) - timestampSeconds(a))[0];

  return !!currentDispositionEvent && currentDispositionEvent.data().type === 'done';
}

/**
 * Returns the response value to a question with a given slug.
 *
 * @param {QueryDocumentSnapshot[]} allQuestionResponses An array of QueryDocumentSnapshot objects.
 * @param {string} slug The slug of the question to which we seek the response.
 * @returns {*} The response value as entered by the user.
 * @example getQuestionResponse(allQuestionResponses, 'most-recent-title')
 */
export function getQuestionResponse(allQuestionResponses, slug) {
  const response = allQuestionResponses.find(qr => qr.data().question.fields.Slug === slug);

  if (!response) {
    throw new Error(`Could not find response to question with slug ${slug}`);
  }

  return response.data().value;
}

/**
 *
 * @param {*} array An array of any types that have string representations.
 * @returns A string joining the array items with commas and "and" before final item.
 */
export function englishList(array, oxfordComma = true) {
  switch (array.length) {
    case 0:
      return '';
    case 1:
      return array[0];
    case 2:
      return array.join(' and ');
    default:
      return `${array.slice(0, array.length - 1).join(', ')}${oxfordComma ? ',' : ''} and ${
        array[array.length - 1]
      }`;
  }
}
