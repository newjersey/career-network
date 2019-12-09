import React from 'react';
import { fullyLoaded, allPropsLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useUserSubcollection } from '../components/Firebase';
import { useRecords } from '../components/Airtable';
import YourHistory from '../components/your-history/YourHistory';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function YourHistoryPage() {
  const { user } = useAuth();
  const allUserActivities = useUserSubcollection('activityLogEntries');
  const recordProps = {
    allTasks: useRecords('Tasks'),
  };

  return fullyLoaded(user, allUserActivities, allPropsLoaded(recordProps)) ? (
    <YourHistory activities={allUserActivities} completedTasks={recordProps.allTasks} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(YourHistoryPage, 'Your History'));
