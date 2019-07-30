import { useCallback } from 'react';
import useFirebase from './useFirebase';
import User from '../../src/User';

/**
 * Custom hook that allows managing a user
 */
export default function useUser(
  userCollection = process.env.firebase.userCollection,
  userPreathorizationCollection = process.env.firebase.userPreauthorizationCollection,
) {
  const { db } = useFirebase();
  const userDocument = useCallback(uid => db.collection(userCollection).doc(uid), [
    db,
    userCollection,
  ]);

  const userPreauthorizationDocument = useCallback(
    email => db.collection(userPreathorizationCollection).doc(email),
    [db, userPreathorizationCollection],
  );

  /**
   * Builds a User object from a Firestore document reference
   */
  const buildUser = useCallback(
    async (userRef) => {
      const userDoc = await userDocument(userRef.id).get();
      const preauthorizationDoc = await userPreauthorizationDocument(
        userDoc.data().authProfile.email,
      ).get();

      return new User(userDoc, preauthorizationDoc);
    },
    [userDocument, userPreauthorizationDocument],
  );

  /**
   * Updates the user document in Firestore
   */
  const updateUser = (email, data) => userPreauthorizationDocument(email)
    .set(data, { merge: true });

  return {
    userDocument, userPreauthorizationDocument, buildUser, updateUser,
  };
}
