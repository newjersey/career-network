import React from 'react';
import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import YourHistory from '../components/your-history/YourHistory';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function YourHistoryPage() {
  const { user } = useAuth();
  const props = {
    activities: [],
  };

  return fullyLoaded(user) ? <YourHistory {...props} /> : <FullPageProgress />;
}

export default withAuthRequired(withTitle(YourHistoryPage, 'Your History'));
