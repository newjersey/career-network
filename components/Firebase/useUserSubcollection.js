import { useEffect, useRef, useState } from 'react';

import useAuth from '../Auth/useAuth';

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

/*
 * Example usage:
 *
 * // Do not define in the render function, or a render loop will occur:
 * const FRIENDS_QUERY_METHODS = [{ where: ['state', '==', 'CA'] }, { limit: 10 }];
 *
 * function MyComponent() {
 *   const friends = useUserSubcollection('friends', FRIENDS_QUERY_METHODS);
 *   ...
 * }
 */
export default function useUserSubcollection(subcollectionName, queryMethods) {
  const cleanupRef = useRef();
  const { userDocRef } = useAuth();
  const [subcollection, setSubcollection] = useState(undefined);

  useEffect(() => {
    (async () => {
      const collectionRef = userDocRef.collection(subcollectionName);
      let query = collectionRef;

      if (queryMethods) {
        queryMethods.forEach(queryMethod => {
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
      }

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
  }, [queryMethods, subcollectionName, userDocRef]);

  return subcollection;
}
