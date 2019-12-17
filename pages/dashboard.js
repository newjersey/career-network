import React from 'react';
import startOfDay from 'date-fns/startOfDay';

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
  const recentActivityLogEntries = useUserSubcollection(
    'activityLogEntries',
    { orderBy: ['timestamp', 'desc'] },
    { limit: HISTORY_LIMIT }
  );
  const nonPastInterviewLogEntries = useUserSubcollection('interviewLogEntries', {
    where: ['date', '>=', startOfDay(new Date())],
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
    completedTasks
  ) ? (
    <Dashboard
      allQuestionResponses={allQuestionResponses}
      allActionDispositionEvents={allActionDispositionEvents}
      allTaskDispositionEvents={allTaskDispositionEvents}
      completedTasks={completedTasks}
      historyLimit={HISTORY_LIMIT}
      nonPastInterviewLogEntries={nonPastInterviewLogEntries}
      recentActivityLogEntries={recentActivityLogEntries}
      {...recordProps}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(DashboardPage, 'Dashboard'));
