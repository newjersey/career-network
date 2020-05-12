import React, { useState, useEffect } from 'react';
import { useUserSubcollection } from '../components/Firebase';
import { fullyLoaded, getQuestionResponse } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import Profile from '../components/profile/Profile';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function ProfilePage() {
  const [initialized, setInitialized] = useState(false);
  const { user, userDocRef } = useAuth();
  const allQuestionResponses = useUserSubcollection('questionResponses');

  const copyInitialProfileValues = () => ({
    goal: getQuestionResponse(allQuestionResponses, 'goal'),
    educationItems: [
      ['school', 'study-field', 'education-start-year', 'education-end-year'].reduce(
        (current, slug) => ({
          ...current,
          [slug]: getQuestionResponse(allQuestionResponses, slug),
        }),
        {}
      ),
    ],
    employmentItems: [
      [
        'most-recent-title',
        'most-recent-org',
        'most-recent-start-month',
        'most-recent-start-year',
        'most-recent-end-month',
        'most-recent-end-year',
      ].reduce(
        (current, slug) => ({
          ...current,
          [slug.replace('most-recent-', '')]: getQuestionResponse(allQuestionResponses, slug),
        }),
        {}
      ),
    ],
  });

  const handleInitialize = () => {
    const profileQuestionResponsesFromAssessment = copyInitialProfileValues();
    userDocRef.set(
      {
        userProfile: { ...profileQuestionResponsesFromAssessment, creationTimestamp: new Date() },
      },
      { merge: true }
    );
    setInitialized(true);
  };

  useEffect(() => {
    if (user.hasInitializedProfile) {
      setInitialized(true);
    } else {
      handleInitialize();
    }
  }, [initialized]);

  return fullyLoaded(user, allQuestionResponses) && initialized ? (
    <Profile initialize={handleInitialize} profileData={user.userData.userProfile} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(ProfilePage, 'Profile'));
