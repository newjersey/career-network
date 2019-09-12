import React from 'react';

import values from 'lodash/fp/values';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useRecords } from '../components/Airtable';
import FullPageProgress from '../components/FullPageProgress';
import Coaching from '../components/coaching/Coaching';
import useCoachAssignments from '../components/Firebase/useCoachAssignments';
import { fullyLoaded } from '../src/app-helper';

function CoachingPage() {
  const { user } = useAuth();
  const props = {
    assignments: useCoachAssignments(user.coachAssignments),
    assessmentSections: useRecords('Assessment%20Sections?view=API'),
  };

  return fullyLoaded(user, ...values(props)) ? <Coaching {...props} /> : <FullPageProgress />;
}

export default withAuthRequired(CoachingPage);
