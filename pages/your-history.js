import React from 'react';
import { fullyLoaded, allPropsLoaded, isDone } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useUserSubcollection } from '../components/Firebase';
import { useRecords } from '../components/Airtable';
import YourHistory from '../components/your-history/YourHistory';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function YourHistoryPage() {
  const { user } = useAuth();
  const allUserActivities = useUserSubcollection('activityLogEntries');
  const allTaskDispositionEvents = useUserSubcollection('taskDispositionEvents');
  const allTasks = useRecords('Tasks');

  return fullyLoaded(user, allUserActivities, allTaskDispositionEvents, allTasks) ? (
    <YourHistory
      activities={allUserActivities}
      tasks={allTasks}
      taskDispositionEvents={allTaskDispositionEvents}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(YourHistoryPage, 'Your History'));
