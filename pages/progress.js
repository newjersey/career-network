import React from 'react';
import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useUserSubcollection } from '../components/Firebase';
import History from '../components/history/History';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function HistoryPage() {
  const { user } = useAuth();
  const allUserActivities = useUserSubcollection('activityLogEntries', {
    orderBy: ['timestamp', 'desc'],
  });

  const completedTasks = useUserSubcollection(
    'taskDispositionEvents',
    { where: ['type', '==', 'done'] },
    { orderBy: ['timestamp', 'desc'] }
  );

  const allApplicationLogEntries = useUserSubcollection('applicationLogEntries', {
    orderBy: ['lastUpdateTimestamp', 'desc'],
  });

  return fullyLoaded(user, allUserActivities, completedTasks, allApplicationLogEntries) ? (
    <History
      activities={allUserActivities}
      completedTasks={completedTasks}
      applications={allApplicationLogEntries}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(HistoryPage, 'Your History'));
