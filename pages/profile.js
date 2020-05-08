import React from 'react';

import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useUserSubcollection } from '../components/Firebase';
import Profile from '../components/profile/Profile';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function ProfilePage() {
  const { user } = useAuth();
  const allQuestionResponses = useUserSubcollection('questionResponses');

  return fullyLoaded(user, allQuestionResponses) ? (
    <Profile allQuestionResponses={allQuestionResponses} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(ProfilePage, 'Profile'));
