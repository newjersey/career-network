import { useState, useEffect } from 'react';
import useFirebase from './useFirebase';

/**
 * Custom hook that returns all the job seekers (no admins and no coaches)
 */
export default function useAllActivityTemplates() {
  const [activityTemplates, setActivityTemplates] = useState([]);
  const { db } = useFirebase();

  useEffect(() => {
    const build = async () => {
      const templatesQuery = await db.collection('activityTemplates').get();

      const templateDocs = [];
      templatesQuery.forEach(template => templateDocs.push(template));

      return Promise.all(templateDocs.map(async templateRef => templateRef.data()));
    };

    async function fetch() {
      setActivityTemplates(await build());
    }

    fetch();
  }, [db]);

  return activityTemplates;
}
