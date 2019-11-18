import { useState, useEffect } from 'react';
import useAuth from '../Auth/useAuth';

/**
 * Custom hook that returns flag if sentiment was already submitted today
 */
export default function useIsSentimentSubmittedToday(
  sentimentEventsCollection = process.env.firebase.sentimentEventsCollection
) {
  const { userDocRef } = useAuth();
  const [isSubmittedToday, setIsSubmittedToday] = useState(true);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const build = async () => {
      const sentimentEventsQuery = await userDocRef
        .collection(sentimentEventsCollection)
        .where('timestamp', '>=', today)
        .get();

      return !sentimentEventsQuery.empty;
    };

    async function fetch() {
      setIsSubmittedToday(await build());
    }

    fetch();
  }, [userDocRef, sentimentEventsCollection]);

  return isSubmittedToday;
}
