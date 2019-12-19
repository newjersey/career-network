import React from 'react';

import { allPropsLoaded, fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import { useUserSubcollection } from '../components/Firebase';
import Dashboard from '../components/dashboard/Dashboard';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

const HISTORY_LIMIT = 3;

function DashboardPage() {
  const { user } = useAuth();
  const allQuestionResponses = useUserSubcollection('questionResponses');
  const allActionDispositionEvents = useUserSubcollection('actionDispositionEvents');
  const allTaskDispositionEvents = useUserSubcollection('taskDispositionEvents');
  const completedTasks = useUserSubcollection(
    'taskDispositionEvents',
    { where: ['type', '==', 'done'] },
    { orderBy: ['timestamp', 'desc'] },
    { limit: HISTORY_LIMIT }
  );

  const confidentActivityLogEntries = useUserSubcollection('activityLogEntries', {
    where: ['activityFeeling', 'array-contains', 'Confident'],
  });

  const allActivityLogEntries = useUserSubcollection('activityLogEntries', {
    orderBy: ['timestamp', 'desc'],
  });

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
    allActionDispositionEvents,
    confidentActivityLogEntries,
    allActivityLogEntries,
    completedTasks
  ) ? (
    <Dashboard
      allQuestionResponses={allQuestionResponses}
      allActionDispositionEvents={allActionDispositionEvents}
      allTaskDispositionEvents={allTaskDispositionEvents}
      allActivityLogEntries={allActivityLogEntries}
      completedTasks={completedTasks}
      confidentActivityLogEntries={confidentActivityLogEntries}
      historyLimit={HISTORY_LIMIT}
      {...recordProps}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(DashboardPage, 'Dashboard'));
