import React from 'react';
import values from 'lodash/fp/values';

import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useUserSubcollection } from '../components/Firebase';
import ApplicationTracker from '../components/applicationTracker/ApplicationTracker';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function ApplicationTrackerPage() {
  const { user } = useAuth();
  const allApplicationLogEntries = useUserSubcollection('applicationLogEntries', {
    orderBy: ['lastUpdateTimestamp', 'desc'],
  });

  const props = {
    allApplicationLogEntries,
  };

  return fullyLoaded(user, ...values(props)) ? (
    <ApplicationTracker {...props} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(ApplicationTrackerPage, 'Application Tracker'));
