import React from 'react';

import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import Profile from '../components/profile/Profile';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function ProfilePage() {
  const { user } = useAuth();

  return fullyLoaded(user) ? <Profile /> : <FullPageProgress />;
}

export default withAuthRequired(withTitle(ProfilePage, 'Profile'));
