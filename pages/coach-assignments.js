import React from 'react';
import values from 'lodash/fp/values';

import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import CoachAssignments from '../components/coaching/CoachAssignments';
import FullPageProgress from '../components/FullPageProgress';
import useAllCoaches from '../components/Firebase/useAllCoaches';
import useAllJobSeekers from '../components/Firebase/useAllJobSeekers';
import withTitle from '../components/withTitle';

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

export default withAuthRequired(withTitle(CoachAssignmentsPage, 'Coach Assignments'));
