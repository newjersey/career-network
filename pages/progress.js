import React from 'react';
import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useUserSubcollection } from '../components/Firebase';
import History from '../components/history/History';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function HistoryPage() {
  const { user } = useAuth();
  const allUserActivities = useUserSubcollection('activityLogEntries');
  const completedTasks = useUserSubcollection(
    'taskDispositionEvents',
    { where: ['type', '==', 'done'] },
    { orderBy: ['timestamp', 'desc'] }
  );

  const confidentActivityLogEntries = useUserSubcollection('activityLogEntries', {
    where: ['activityFeeling', 'array-contains', 'Confident'],
  });

  const allActivityLogEntries = useUserSubcollection('activityLogEntries', {
    orderBy: ['timestamp', 'desc'],
  });

  return fullyLoaded(
    user,
    allUserActivities,
    completedTasks,
    confidentActivityLogEntries,
    allActivityLogEntries
  ) ? (
    <History
      activities={allUserActivities}
      completedTasks={completedTasks}
      confidentActivityLogEntries={confidentActivityLogEntries}
      allActivityLogEntries={allActivityLogEntries}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(HistoryPage, 'Your History'));
