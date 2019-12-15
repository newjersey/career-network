import { compareDesc } from 'date-fns';
import Button from '@material-ui/core/Button';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import FeedCard from './FeedCard';
import FirebasePropTypes from '../Firebase/PropTypes';

export default function ActivityList(props) {
  const { activities, completedTasks, limit } = props;
  const sorted = [
    ...activities.map(item => ({
      timestamp: item.data().timestamp,
      feedItemProps: {
        cardType: 'ACTIVITY',
        title: item.data().briefDescription,
        subheader: item.data().activityTypeLabel,
        date: item.data().dateCompleted,
        timeSpentInMinutes: item.data().timeSpentInMinutes,
        key: item.data().timestamp,
      },
    })),
    ...completedTasks.map(item => ({
      timestamp: item.data().timestamp,
      feedItemProps: {
        cardType: 'TASK',
        title: item.data().task.fields.Title,
        subheader: item.data().task.fields.Category,
        date: item.data().timestamp,
        key: item.data().taskId,
      },
    })),
  ].sort((a, b) => compareDesc(a.timestamp.toDate(), b.timestamp.toDate()));

  return (
    <div>
      {!sorted.length && <Typography color="textSecondary">None</Typography>}
      {sorted.slice(0, limit).map(item => (
        <FeedCard {...item.feedItemProps} />
      ))}
      {!!sorted.length && (
        <NextLink href="/progress">
          <Button color="primary" variant="contained" fullWidth>
            See All Progress
          </Button>
        </NextLink>
      )}
    </div>
  );
}

ActivityList.propTypes = {
  activities: FirebasePropTypes.querySnapshot.isRequired,
  completedTasks: FirebasePropTypes.querySnapshot.isRequired,
  limit: PropTypes.number.isRequired,
};
