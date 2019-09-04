import { useCallback } from 'react';
import useFirebase from './useFirebase';
import User from '../../src/User';

/**
 * Custom hook that allows managing a user
 */
export default function useUser(userCollection = process.env.firebase.userCollection) {
  const { db } = useFirebase();
  const userDocument = useCallback(uid => db.collection(userCollection).doc(uid), [
    db,
    userCollection,
  ]);

  /**
   * Builds a User object from a Firestore document reference
   */
  const buildUser = useCallback(
    async userRef => {
      const userDoc = await userDocument(userRef.id).get();

      return new User(userDoc);
    },
    [userDocument]
  );

  /**
   * Updates the user document in Firestore
   */
  const updateUser = (uid, data) => userDocument(uid).set(data, { merge: true });

  return {
    userDocument,
    buildUser,
    updateUser,
  };
}
