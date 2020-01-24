import React from 'react';

import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import EmploymentOutlook from '../components/employmentOutlook/EmploymentOutlook';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function EmploymentOutlookPage() {
  const { user } = useAuth();

  return fullyLoaded(user) ? <EmploymentOutlook /> : <FullPageProgress />;
}

export default withAuthRequired(withTitle(EmploymentOutlookPage), 'Employment Outlook');
