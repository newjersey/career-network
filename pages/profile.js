import React, { useState, useEffect } from 'react';
import { useUserSubcollection } from '../components/Firebase';
import { fullyLoaded, getQuestionResponse, getQuestionResponseDetails } from '../src/app-helper';
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
    phone: getQuestionResponse(allQuestionResponses, 'phone'),
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
      ['most-recent-title', 'most-recent-org', 'most-recent-start', 'most-recent-end'].reduce(
        (current, slug) => ({
          ...current,
          [slug.replace('most-recent-', '')]: getQuestionResponse(allQuestionResponses, slug),
        }),
        {}
      ),
    ],
    supportServices: [
      'unemployment-insurance',
      'health-insurance',
      'housing-assistance',
      'food-assistance',
      'energy-assistance',
      'transportation',
      'child-care',
      'budgeting',
    ].map(slug => getQuestionResponseDetails(allQuestionResponses, slug)),
  });

  useEffect(() => {
    const handleInitialize = async () => {
      const profileQuestionResponsesFromAssessment = copyInitialProfileValues();
      await userDocRef.set(
        {
          userProfile: { ...profileQuestionResponsesFromAssessment, creationTimestamp: new Date() },
        },
        { merge: true }
      );
      setInitialized(true);
    };

    if (user.hasInitializedProfile) {
      setInitialized(true);
    } else if (fullyLoaded(allQuestionResponses)) {
      handleInitialize();
    }
  }, [allQuestionResponses]);

  return fullyLoaded(user, allQuestionResponses, user.userData.userProfile) && initialized ? (
    <Profile profileData={user.userData.userProfile} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(ProfilePage, 'Profile'));
