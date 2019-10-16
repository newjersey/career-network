import React from 'react';
import values from 'lodash/fp/values';

import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import Coaching from '../components/coaching/Coaching';
import FullPageProgress from '../components/FullPageProgress';
import useCoachAssignments from '../components/Firebase/useCoachAssignments';
import withTitle from '../components/withTitle';

function CoachingPage() {
  const { user } = useAuth();
  const props = {
    assignments: useCoachAssignments(user.coachAssignments),
  };

  return fullyLoaded(user, ...values(props)) ? <Coaching {...props} /> : <FullPageProgress />;
}

export default withAuthRequired(withTitle(CoachingPage, 'Coaching'));
