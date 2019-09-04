import { useEffect, useRef, useState } from 'react';

import useAuth from '../Auth/useAuth';

export default function useUserSubcollection(subcollectionName) {
  const cleanupRef = useRef();
  const { userDocRef } = useAuth();
  const [subcollection, setSubcollection] = useState(undefined);

  useEffect(() => {
    (async () => {
      const collectionRef = userDocRef.collection(subcollectionName);
      const unsubscribe = collectionRef.onSnapshot(querySnapshot => {
        setSubcollection(querySnapshot.docs);
      });

      cleanupRef.current = unsubscribe;
    })();

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [subcollectionName, userDocRef]);

  return subcollection;
}
