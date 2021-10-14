import '@firebase/analytics';
import firebase from 'firebase/app';
import React from 'react';
import { useRouter } from 'next/router';
import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import { useUserSubcollection, useAllActivityTemplates } from '../components/Firebase';
import ActivityTemplate from '../components/activityTemplate/ActivityTemplate';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';

function ActivityTemplatePage() {
  const { user } = useAuth();
  const { query } = useRouter();

  const activityTemplates = useAllActivityTemplates();
  // Once we have the cms, use the template-id param to retrieve the
  // page template and user inputs
  const activityTemplate = activityTemplates.find(template => template.slug === query.template);
  const allPracticeQuestionInputs = useUserSubcollection('practiceQuestionInputs');
  const title = activityTemplate && activityTemplate.title;

  if (title) {
    firebase.analytics().logEvent('screen_view', {
      screen_name: title,
    });
  }

  return fullyLoaded(user, activityTemplate, allPracticeQuestionInputs) ? (
    <ActivityTemplate
      templateId={query.template}
      activityTemplate={activityTemplate}
      allPracticeQuestionInputs={allPracticeQuestionInputs}
    />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(ActivityTemplatePage, 'Activity'));
