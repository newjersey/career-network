import { compareDesc } from 'date-fns';
import Button from '@material-ui/core/Button';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import VpnKey from '@material-ui/icons/VpnKey';

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
        key: item.data().timestamp,
      },
    })),
    ...completedTasks.map(item => ({
      timestamp: getTimestamp(item),
      props: {
        icon: <VpnKey />,
        title: item.data().task.fields.Title,
        subheader: item.data().task.fields.Category,
        date: item.data().timestamp,
        key: item.data().taskId,
      },
    })),
  ].sort((a, b) => compareDesc(a.timestamp, b.timestamp));

  return (
    <div>
      {!sorted.length && <Typography color="textSecondary">None</Typography>}
      {sorted.slice(0, limit).map(item => (
        <ProgressFeedItem {...item.props} />
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

ProgressFeed.propTypes = {
  activities: FirebasePropTypes.querySnapshot.isRequired,
  completedTasks: FirebasePropTypes.querySnapshot.isRequired,
  limit: PropTypes.number.isRequired,
};
