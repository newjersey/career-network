import React from 'react';
import { useRouter } from 'next/router';
import { fullyLoaded } from '../src/app-helper';
import useTemplate from '../components/activityTemplate/useTemplate';
import { useAuth, withAuthRequired } from '../components/Auth';
import ActivityTemplate from '../components/activityTemplate/ActivityTemplate';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';
// import activityTemplateJSON from '../data/activity-pages.json';

function ActivityTemplatePage() {
  const { user } = useAuth();
  const { query } = useRouter();
  const activityTemplate = useTemplate(query.template);
  // Once we have the cms, use the template-id param to retrieve the
  // page template and user inputs

  return fullyLoaded(user, activityTemplate) ? (
    <ActivityTemplate templateId={query.template} activityTemplate={activityTemplate} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(ActivityTemplatePage, 'Activity'));
