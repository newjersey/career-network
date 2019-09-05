import React from 'react';

import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import FullPageProgress from '../components/FullPageProgress';
import Coaching from '../components/coaching/Coaching';
import useCoachAssignments from '../components/Firebase/useCoachAssignments';
import { allPropsLoaded, fullyLoaded } from '../src/app-helper';

function CoachingPage() {
  const { user } = useAuth();
  const props = {
    assignments: useCoachAssignments(user.coachAssignments),
    assessmentSections: useRecords('Assessment%20Sections?view=API'),
  };

  return fullyLoaded(user, allPropsLoaded(props)) ? <Coaching {...props} /> : <FullPageProgress />;
}

export default withAuthRequired(CoachingPage);
