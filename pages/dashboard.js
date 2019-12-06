import React from 'react';

import { allPropsLoaded, fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import { useUserSubcollection } from '../components/Firebase';
import Dashboard from '../components/dashboard/Dashboard';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

// Do not define in the render function, or a render loop will occur:
const ACTIVITY_LOG_ENTRIES_QUERY_METHODS = [{ orderBy: ['timestamp', 'desc'] }, { limit: 3 }];

function DashboardPage() {
  const { user } = useAuth();
  const allQuestionResponses = useUserSubcollection('questionResponses');
  const allActionDispositionEvents = useUserSubcollection('actionDispositionEvents');
  const allTaskDispositionEvents = useUserSubcollection('taskDispositionEvents');
  const recentActivityLogEntries = useUserSubcollection(
    'activityLogEntries',
    ACTIVITY_LOG_ENTRIES_QUERY_METHODS
  );
  const recordProps = {
    allPredicates: useRecords('Predicates'),
    allConditions: useRecords('Conditions'),
    allTasks: useRecords('Tasks'),
    allActions: useRecords('Actions'),
    allQualityChecks: useRecords('Quality Checks'),
  };

  return fullyLoaded(
    user,
    allPropsLoaded(recordProps),
    allQuestionResponses,
    allActionDispositionEvents
  ) ? (
    <Dashboard
      allQuestionResponses={allQuestionResponses}
      allActionDispositionEvents={allActionDispositionEvents}
      allTaskDispositionEvents={allTaskDispositionEvents}
      recentActivityLogEntries={recentActivityLogEntries}
      {...recordProps}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(DashboardPage, 'Dashboard'));
