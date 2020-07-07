import React from 'react';

import { allPropsLoaded, fullyLoaded, getActivitiesAndCompletionEvents } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import { useUserSubcollection, useAllActivityTemplates } from '../components/Firebase';

import Dashboard from '../components/dashboard/Dashboard';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

const HISTORY_LIMIT = 3;

function DashboardPage() {
  const { user } = useAuth();
  const allActivityTemplates = useAllActivityTemplates();
  const allQuestionResponses = useUserSubcollection('questionResponses');
  const allActionDispositionEvents = useUserSubcollection('actionDispositionEvents');
  const allTaskDispositionEvents = useUserSubcollection('taskDispositionEvents');
  const allCompletionEvents = useUserSubcollection('completionEvents');
  const interviewLogEntries = useUserSubcollection('interviewLogEntries');
  const completedTasks = useUserSubcollection(
    'taskDispositionEvents',
    { where: ['type', '==', 'done'] },
    { orderBy: ['timestamp', 'desc'] }
  );

  const allActivityLogEntries = useUserSubcollection('activityLogEntries', {
    orderBy: ['timestamp', 'desc'],
  });

  const allApplicationLogEntries = useUserSubcollection('applicationLogEntries', {
    orderBy: ['lastUpdateTimestamp', 'desc'],
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
    allActivityLogEntries,
    allApplicationLogEntries,
    allCompletionEvents,
    allActivityTemplates,
    completedTasks
  ) ? (
    <Dashboard
      allActivityTemplates={allActivityTemplates}
      allQuestionResponses={allQuestionResponses}
      allActionDispositionEvents={allActionDispositionEvents}
      allTaskDispositionEvents={allTaskDispositionEvents}
      allApplicationLogEntries={allApplicationLogEntries}
      completedTasks={completedTasks}
      historyLimit={HISTORY_LIMIT}
      interviewLogEntries={interviewLogEntries}
      {...getActivitiesAndCompletionEvents(allActivityLogEntries, allCompletionEvents)}
      {...recordProps}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(DashboardPage, 'Dashboard'));
