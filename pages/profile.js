import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
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
  const copyInitialProfileValues = () => {
    // create education and employment objects -- if no fields were answered
    // they will be empty {}
    const educationItemsValue = [
      'school',
      'study-field',
      'education-start-year',
      'education-end-year',
    ].reduce((current, slug) => {
      const slugValue = getQuestionResponse(allQuestionResponses, slug);
      return {
        ...current,
        ...(slugValue && { [slug]: slugValue }),
      };
    }, {});

    const employmentItemsValue = [
      'most-recent-title',
      'most-recent-org',
      'most-recent-start',
      'most-recent-end',
    ].reduce((current, slug) => {
      const slugValue = getQuestionResponse(allQuestionResponses, slug);
      return {
        ...current,
        ...(slugValue && { [slug.replace('most-recent-', '')]: slugValue }),
      };
    }, {});

    return {
      goal: getQuestionResponse(allQuestionResponses, 'goal') || '',
      phone: getQuestionResponse(allQuestionResponses, 'phone') || '',
      educationItems: isEmpty(educationItemsValue) ? [] : [educationItemsValue],
      employmentItems: isEmpty(employmentItemsValue) ? [] : [employmentItemsValue],
      supportServices: [
        { slug: 'unemployment-insurance', label: 'Unemployment Insurance' },
        { slug: 'health-insurance', label: 'Health Insurance' },
        { slug: 'housing-assistance', label: 'Housing Assistance' },
        { slug: 'food-assistance', label: 'Food Assistance' },
        { slug: 'energy-assistance', label: 'Energy Assistance' },
        { slug: 'transportation', label: 'Transportation' },
        { slug: 'child-care', label: 'Child & Family Care' },
        { slug: 'budgeting', label: 'Budgeting' },
      ]
        .map(item => getQuestionResponseDetails(allQuestionResponses, item))
        .filter(item => item !== null),
    };
  };

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
  }, [allQuestionResponses]); // eslint-disable-line react-hooks/exhaustive-deps

  return fullyLoaded(user, allQuestionResponses, user.userData.userProfile) && initialized ? (
    <Profile profileData={user.userData.userProfile} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(ProfilePage, 'Profile'));
