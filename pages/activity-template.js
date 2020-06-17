import React from 'react';
import { useRouter } from 'next/router';
import { fullyLoaded } from '../src/app-helper';
import { useAuth, withAuthRequired } from '../components/Auth';
import ActivityTemplate from '../components/activityTemplate/ActivityTemplate';
import FullPageProgress from '../components/FullPageProgress';
import withTitle from '../components/withTitle';
import activityTemplateJSON from '../data/activity-pages.json';

function ActivityTemplatePage() {
  const { user } = useAuth();
  const { query } = useRouter();

  const activityTemplate = activityTemplateJSON;

  return fullyLoaded(user, activityTemplate) ? (
    <ActivityTemplate templateId={query['template-id']} activityTemplate={activityTemplate} />
  ) : (
    <FullPageProgress />
  );
}

export default withAuthRequired(withTitle(ActivityTemplatePage, 'Activity'));
