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
  const recordProps = {
    allActions: useRecords('Actions?view=API'),
    allConditions: useRecords('Conditions?view=API'),
    allPredicates: useRecords('Predicates?view=API'),
    allResources: useRecords('Resources?view=API%20Dashboard'),
    allTheories: useRecords('Theories?view=API'),
  };

  return fullyLoaded(
    user,
    allPropsLoaded(recordProps),
    allQuestionResponses,
    allActionDispositionEvents
  ) ? (
    <Dashboard
      allQuestionResponses={allQuestionResponses || []}
      allActionDispositionEvents={allActionDispositionEvents || []}
      {...recordProps}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(DashboardPage);
