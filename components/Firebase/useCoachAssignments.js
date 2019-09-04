import { useState, useEffect } from 'react';
import compact from 'lodash/fp/compact';
import useFirebase from './useFirebase';

/**
 * Custom hook that builds the details of coach assignments from a list of identifiers.
 */
export default function useCoachAssignments(
  assignmentIds,
  userCollection = process.env.firebase.userCollection
) {
  const [assignments, setAssignments] = useState([]);
  const { db } = useFirebase();

  useEffect(() => {
    const build = async () => {
      const assignmentPromises = assignmentIds.map(async assignmentId => {
        const assignmentDoc = await db.collection(userCollection).doc(assignmentId);
        const userData = (await assignmentDoc.get()).data();
        if (!userData) {
          return {
            authProfile: [],
            questionResponses: [],
          };
        }

        return {
          authProfile: userData.authProfile,
          questionResponses: (await assignmentDoc.collection('questionResponses').get()).docs,
        };
      });

      return compact(await Promise.all(assignmentPromises));
    };

    async function fetch() {
      setAssignments(await build());
    }

    fetch();
  }, [assignmentIds, db, userCollection]);

  return assignments;
}
