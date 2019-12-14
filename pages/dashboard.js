import React from 'react';

import { allPropsLoaded, fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import { useUserSubcollection, useCompletedTasks } from '../components/Firebase';
import Dashboard from '../components/dashboard/Dashboard';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function DashboardPage() {
  const { user } = useAuth();
  const allQuestionResponses = useUserSubcollection('questionResponses');
  const allActionDispositionEvents = useUserSubcollection('actionDispositionEvents');
  const allTaskDispositionEvents = useUserSubcollection('taskDispositionEvents');
  const completedTasks = useCompletedTasks();
  const recentActivityLogEntries = useUserSubcollection(
    'activityLogEntries',
    { orderBy: ['timestamp', 'desc'] },
    { limit: 3 }
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
    allActionDispositionEvents,
    completedTasks
  ) ? (
    <Dashboard
      allQuestionResponses={allQuestionResponses}
      allActionDispositionEvents={allActionDispositionEvents}
      allTaskDispositionEvents={allTaskDispositionEvents}
      completedTasks={completedTasks}
      recentActivityLogEntries={recentActivityLogEntries}
      {...recordProps}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(DashboardPage, 'Dashboard'));
