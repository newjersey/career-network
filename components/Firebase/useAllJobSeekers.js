import { useState, useEffect } from 'react';
import useFirebase from './useFirebase';
import useUser from './useUser';

/**
 * Custom hook that returns all the job seekers (no admins and no coaches)
 */
export default function useAllJobSeekers(userCollection = process.env.firebase.userCollection) {
  const [jobSeekers, setJobSeekers] = useState([]);
  const { db } = useFirebase();
  const { buildUser } = useUser(userCollection);

  useEffect(() => {
    const build = async () => {
      const jobSeekersQuery = await db
        .collection(userCollection)
        .where('isAdmin', '==', false)
        .where('isCoach', '==', false)
        .orderBy('authProfile.displayName')
        .get();

      const jobSeekerDocs = [];
      jobSeekersQuery.forEach(jobSeeker => jobSeekerDocs.push(jobSeeker));

      return Promise.all(jobSeekerDocs.map(async jobSeekerRef => buildUser(jobSeekerRef)));
    };

    async function fetch() {
      setJobSeekers(await build());
    }

    fetch();
  }, [buildUser, db, userCollection]);

  return jobSeekers;
}
