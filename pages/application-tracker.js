import React from 'react';
import values from 'lodash/fp/values';

import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import ApplicationTracker from '../components/applicationTracker/ApplicationTracker';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function ApplicationTrackerPage() {
  const { user } = useAuth();
  const props = {
    applications: [],
  };

  return fullyLoaded(user, ...values(props)) ? (
    <ApplicationTracker {...props} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(ApplicationTrackerPage, 'Application Tracker'));
