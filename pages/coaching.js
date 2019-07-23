import React from 'react';

import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import FullPageProgress from '../components/FullPageProgress';
import Coaching from '../components/coaching/Coaching';
import useCoachAssignments from '../components/Firebase/useCoachAssignments';

function CoachingPage() {
  const { user } = useAuth();
  const props = {
    assignments: useCoachAssignments(user.coachAssignments),
    assessmentSections: useRecords('appPhpA6Quf0pCBDm/Assessment%20Sections?view=API'),
  };

  // TODO: move to helper function
  const fullyLoaded = user && Object.values(props)
    .map(array => array.length)
    .reduce((accum, length) => accum && !!length, true);

  return fullyLoaded ? <Coaching {...props} /> : <FullPageProgress />;
}

export default withAuthRequired(CoachingPage);
