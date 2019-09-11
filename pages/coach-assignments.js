import React from 'react';

import { useAuth, withAuthRequired } from '../components/Auth';
import FullPageProgress from '../components/FullPageProgress';
import { allPropsLoaded, fullyLoaded } from '../src/app-helper';
import useAllCoaches from '../components/Firebase/useAllCoaches';
import CoachAssignments from '../components/coaching/CoachAssignments';
import useAllJobSeekers from '../components/Firebase/useAllJobSeekers';

function CoachAssignmentsPage() {
  const { user } = useAuth();
  const props = {
    allCoaches: useAllCoaches(),
    allJobSeekers: useAllJobSeekers(),
  };

  return fullyLoaded(user, allPropsLoaded(props)) ? (
    <CoachAssignments {...props} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(CoachAssignmentsPage);
