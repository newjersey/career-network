import { useState, useEffect } from 'react';
import useFirebase from './useFirebase';
import useUser from './useUser';

/**
 * Custom hook that returns all the users that are coaches
 */
export default function useAllCoaches(
  userCollection = process.env.firebase.userCollection,
  userPreathorizationCollection = process.env.firebase.userPreauthorizationCollection,
) {
  const [coaches, setCoaches] = useState([]);
  const { db } = useFirebase();
  const { buildUser } = useUser(userCollection, userPreathorizationCollection);

  useEffect(() => {
    const build = async () => {
      const coachesQuery = await db
        .collection(userCollection)
        .where('isCoach', '==', true)
        .where('isAdmin', '==', false)
        .orderBy('authProfile.displayName')
        .get();

      const coachDocs = [];
      coachesQuery.forEach(coach => coachDocs.push(coach));

      return Promise.all(coachDocs.map(async coachRef => buildUser(coachRef)));
    };

    async function fetch() {
      setCoaches(await build());
    }

    fetch();
  }, [buildUser, db, userCollection]);

  return coaches;
}
