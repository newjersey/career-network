import { useEffect, useRef, useState } from 'react';
import useAuth from '../Auth/useAuth';

export default function useCompletedTasks() {
  const cleanupRef = useRef();
  const { userDocRef } = useAuth();
  const [taskDispositionEvents, setTaskDispositionEvents] = useState(undefined);

  function filterDoneFromTaskDispositionEvents(events) {
    // TODO: remove duplicates and prefer most recent task timestamp
    if (!events || events.length < 1) return [];
    const taskIds = events.reduce(
      (unique, item) =>
        unique.includes(item.data().taskId) ? unique : [...unique, item.data().taskId],
      []
    );
    return taskIds
      .map(
        tId =>
          events
            .filter(event => event.data().taskId === tId)
            .sort((a, b) => b.data().timestamp.seconds - a.data().timestamp.seconds)[0]
      )
      .map(taskEvent => {
        if (taskEvent.data().type === 'done') {
          return taskEvent;
        }
        return null;
      });
  }

  useEffect(() => {
    (async () => {
      const collectionRef = userDocRef.collection('taskDispositionEvents');
      const unsubscribe = collectionRef.onSnapshot(querySnapshot => {
        setTaskDispositionEvents(querySnapshot.docs);
      });

      cleanupRef.current = unsubscribe;
    })();

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [setTaskDispositionEvents, userDocRef]);

  return filterDoneFromTaskDispositionEvents(taskDispositionEvents);
}
