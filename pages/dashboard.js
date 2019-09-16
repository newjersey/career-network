import React from 'react';

import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import { useUserSubcollection } from '../components/Firebase';
import Dashboard from '../components/dashboard/Dashboard';
import FullPageProgress from '../components/FullPageProgress';
import { allPropsLoaded, fullyLoaded } from '../src/app-helper';

function DashboardPage() {
  const { user } = useAuth();
  const allQuestionResponses = useUserSubcollection('questionResponses');
  const allActionDispositionEvents = useUserSubcollection('actionDispositionEvents');
  const allTaskDispositionEvents = useUserSubcollection('taskDispositionEvents');
  const recordProps = {
    allPredicates: useRecords('Predicates?view=API'),
    allConditions: useRecords('Conditions?view=API'),
    allTasks: useRecords('Tasks?view=API'),
    allActions: useRecords('Actions?view=API'),
    allQualityChecks: useRecords('Quality Checks?view=API'),
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
      {...recordProps}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(DashboardPage);
