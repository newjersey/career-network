import React from 'react';
import values from 'lodash/fp/values';

import { useAuth, withAuthRequired } from '../components/Auth';
import FullPageProgress from '../components/FullPageProgress';
import { fullyLoaded } from '../src/app-helper';
import useAllCoaches from '../components/Firebase/useAllCoaches';
import CoachAssignments from '../components/coaching/CoachAssignments';
import useAllJobSeekers from '../components/Firebase/useAllJobSeekers';

function CoachAssignmentsPage() {
  const { user } = useAuth();
  const props = {
    allCoaches: useAllCoaches(),
    allJobSeekers: useAllJobSeekers(),
  };

  return fullyLoaded(user, ...values(props)) ? (
    <CoachAssignments {...props} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(CoachAssignmentsPage);
