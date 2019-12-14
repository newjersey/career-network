import { useEffect, useRef, useState } from 'react';

import useAuth from '../Auth/useAuth';

// Adapted from JSum implementation: https://github.com/fraunhoferfokus/JSum
// Foregoing a full library to avoid the weight, since this is such a narrow need.
// Note that this just serializes (doesn't create an actual hash) as we don't
// expect large objects and therefore don't need to worry about a long string.
function hash(obj) {
  if (Array.isArray(obj)) {
    const stringifiedArr = [];
    for (let i = 0; i < obj.length; i += 1) {
      stringifiedArr[i] = hash(obj[i]);
    }

    return JSON.stringify(stringifiedArr);
  }

  if (typeof obj === 'object' && obj !== null) {
    const acc = [];
    const sortedKeys = Object.keys(obj).sort();

    for (let i = 0; i < sortedKeys.length; i += 1) {
      const k = sortedKeys[i];
      acc[i] = `${k}:${hash(obj[k])}`;
    }

    return acc.join('|');
  }

  return obj;
}

// see: https://firebase.google.com/docs/reference/js/firebase.firestore.Query.html
const SUPPORTED_QUERY_METHODS = [
  'endAt',
  'endBefore',
  'limit',
  'limitToLast',
  'orderBy',
  'startAfter',
  'startAt',
  'where',
];

// const friends = useUserSubcollection('friends', { where: ['state', '==', 'CA'] }, { limit: 10 });
export default function useUserSubcollection(subcollectionName, ...queryMethods) {
  const cleanupRef = useRef();
  const { userDocRef } = useAuth();
  const [subcollection, setSubcollection] = useState(undefined);

  // Home grown memoization to reduce the risk of a render loop, because ...queryMethods will always
  // have a new identity thus causing the below effect to run on each render. Alternate approach is
  // to accept an array (rather than a "rest parameter"), but in that case it's clunky (and dangerous)
  // to require the caller to be responsible for ensuring consistent object identity of that array.
  const [memoizedQueryMethods, setMemoizedQueryMethods] = useState(undefined);
  const [memoizedQueryMethodsHash, setMemoizedQueryMethodsHash] = useState(undefined);
  const queryMethodsHash = hash(queryMethods);
  if (queryMethodsHash !== memoizedQueryMethodsHash) {
    setMemoizedQueryMethods(queryMethods);
    setMemoizedQueryMethodsHash(queryMethodsHash);
  }

  useEffect(() => {
    (async () => {
      const collectionRef = userDocRef.collection(subcollectionName);
      let query = collectionRef;

      memoizedQueryMethods.forEach(queryMethod => {
        const methodName = Object.keys(queryMethod)[0];
        let methodArgs = queryMethod[methodName];

        if (!SUPPORTED_QUERY_METHODS.includes(methodName)) {
          throw new Error(`Unsupported query method: ${methodName}`);
        }

        if (!Array.isArray(methodArgs)) {
          methodArgs = [methodArgs];
        }

        query = query[methodName](...methodArgs);
      });

      const unsubscribe = query.onSnapshot(querySnapshot => {
        setSubcollection(querySnapshot.docs);
      });

      cleanupRef.current = unsubscribe;
    })();

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [memoizedQueryMethods, subcollectionName, userDocRef]);

  return subcollection;
}
