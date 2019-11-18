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
    .sort((a, b) => b.data().timestamp.seconds - a.data().timestamp.seconds)[0];

  return !!currentDispositionEvent && currentDispositionEvent.data().type === 'done';
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
