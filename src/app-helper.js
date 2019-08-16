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
