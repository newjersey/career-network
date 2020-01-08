import React from 'react';
import PropTypes from 'prop-types';
import { compareDesc } from 'date-fns';
import NextLink from 'next/link';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import FirebasePropTypes from '../Firebase/PropTypes';
import ProgressFeedItem from './ProgressFeedItem';

export default function ProgressFeed(props) {
  const { activities, completedTasks, limit } = props;

  // protect against immediately-created items that don't yet have a server-generated timestamp
  const getTimestamp = item =>
    (item.data().timestamp && item.data().timestamp.toDate()) || new Date();

  const sorted = [
    ...activities.map(item => ({
      timestamp: getTimestamp(item),
      props: {
        title: item.data().briefDescription,
        subheader: item.data().activityTypeLabel,
        date: item.data().dateCompleted,
        timeSpentInMinutes: item.data().timeSpentInMinutes,
        key: item.id,
      },
    })),
    ...completedTasks.map(item => ({
      timestamp: getTimestamp(item),
      props: {
        title: item.data().task.fields.Title,
        subheader: item.data().task.fields.Category,
        date: item.data().timestamp,
        key: item.id,
      },
    })),
  ].sort((a, b) => compareDesc(a.timestamp, b.timestamp));

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" p={2}>
      {!sorted.length && <Typography color="textSecondary">None</Typography>}
      {sorted.slice(0, limit).map(item => (
        <ProgressFeedItem {...item.props} />
      ))}
      {!!sorted.length && (
        <Box width={1} mt={1}>
          <NextLink href="/progress">
            <Button
              color="primary"
              variant="contained"
              data-intercom="all-progress-button"
              fullWidth
            >
              See All
            </Button>
          </NextLink>
        </Box>
      )}
    </Box>
  );
}

ProgressFeed.propTypes = {
  activities: FirebasePropTypes.querySnapshot.isRequired,
  completedTasks: FirebasePropTypes.querySnapshot.isRequired,
  limit: PropTypes.number.isRequired,
};
