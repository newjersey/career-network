import React from 'react';
import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useUserSubcollection } from '../components/Firebase';
import YourHistory from '../components/your-history/YourHistory';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function YourHistoryPage() {
  const { user } = useAuth();
  const allUserActivities = useUserSubcollection('activityLogEntries');
  const allTaskDispositionEvents = useUserSubcollection('taskDispositionEvents');

  return fullyLoaded(user, allUserActivities, allTaskDispositionEvents) ? (
    <YourHistory activities={allUserActivities} taskDispositionEvents={allTaskDispositionEvents} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(YourHistoryPage, 'Your History'));
