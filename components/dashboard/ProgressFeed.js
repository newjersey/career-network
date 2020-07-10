import React from 'react';
import PropTypes from 'prop-types';
import { compareDesc } from 'date-fns';
import NextLink from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
  ACTION_TYPES,
  COMPLETION_EVENT_TYPES,
  WEEKLY_ACTION_PLAN_COMPLETE,
  INITIAL_ASSESSMENT_COMPLETE,
} from '../constants';
import FirebasePropTypes from '../Firebase/PropTypes';
import ProgressFeedItem from './ProgressFeedItem';

const useStyles = makeStyles({
  lightButtonRoot: {
    backgroundColor: 'RGBA(24,129,197,0.06)',
  },
  lightButtonLabel: {
    color: '#1881C5',
  },
});
export default function ProgressFeed(props) {
  const classes = useStyles();
  const { activities, completedTasks, applications, completionEvents, limit } = props;

  // protect against immediately-created items that don't yet have a server-generated timestamp
  const getTimestamp = item =>
    (item.data().timestamp && item.data().timestamp.toDate()) || new Date();

  const getApplicationTimestamp = item =>
    (item.data().statusEntries[0].timestamp && item.data().statusEntries[0].timestamp.toDate()) ||
    new Date();

  const sorted = [
    ...activities.map(item => ({
      timestamp: getTimestamp(item),
      props: {
        title: item.data().briefDescription,
        date: item.data().dateCompleted,
        timeSpentInMinutes: item.data().timeSpentInMinutes,
        key: item.id,
        ...ACTION_TYPES.activity,
      },
    })),
    ...applications.map(item => ({
      timestamp: getApplicationTimestamp(item),
      props: {
        title: `Application Opened for ${item.data().jobTitle} at ${item.data().company}`,
        date: item.data().statusEntries[0].timestamp,
        key: item.id,
        ...ACTION_TYPES.application,
      },
    })),
    ...completedTasks.map(item => ({
      timestamp: getTimestamp(item),
      props: {
        title: item.data().task.fields.Title,
        subheader: item.data().task.fields.Category,
        date: item.data().timestamp,
        key: item.id,
        ...ACTION_TYPES.goal,
      },
    })),
    ...completionEvents.map(item => {
      // set default to support old assessment complete activity
      const { type = INITIAL_ASSESSMENT_COMPLETE, timestamp } = item.data();

      const eventData = COMPLETION_EVENT_TYPES[type];
      const title =
        type === WEEKLY_ACTION_PLAN_COMPLETE ? `Weekly Action Plan Completed` : eventData.label;

      return {
        timestamp: getTimestamp(item),
        props: {
          title,
          date: timestamp,
          key: item.id,
          ...COMPLETION_EVENT_TYPES[type],
        },
      };
    }),
  ].sort((a, b) => compareDesc(a.timestamp, b.timestamp));

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" px={2} pb={2}>
      {!sorted.length && <Typography color="textSecondary">None</Typography>}
      {sorted.slice(0, limit).map(item => (
        <ProgressFeedItem {...item.props} />
      ))}
      {!!sorted.length && (
        <Box width={1} mt={1}>
          <NextLink href="/progress">
            <Button
              classes={{ root: classes.lightButtonRoot, label: classes.lightButtonLabel }}
              size="large"
              data-intercom="all-progress-button"
              fullWidth
            >
              View All Actions
            </Button>
          </NextLink>
        </Box>
      )}
    </Box>
  );
}

ProgressFeed.propTypes = {
  activities: FirebasePropTypes.querySnapshot.isRequired,
  applications: FirebasePropTypes.querySnapshot.isRequired,
  completedTasks: FirebasePropTypes.querySnapshot.isRequired,
  completionEvents: FirebasePropTypes.querySnapshot.isRequired,
  limit: PropTypes.number.isRequired,
};
