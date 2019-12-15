import { compareDesc } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import FeedCard from './FeedCard';
import FirebasePropTypes from '../Firebase/PropTypes';

export default function ActivityList(props) {
  const { activities, completedTasks, limit } = props;
  const sorted = [
    ...(!activities.empty &&
      activities.map(a => ({
        ...a.data(),
        dateCmp: a.data().dateCompleted.toDate(),
        cardType: 'ACTIVITY',
      }))),
    ...(!completedTasks.empty &&
      completedTasks.map(t => ({
        ...t.data(),
        dateCmp: t.data().timestamp.toDate(),
        cardType: 'TASK',
      }))),
  ].sort((a, b) => compareDesc(new Date(a.dateCmp), new Date(b.dateCmp)));

  return (
    <div>
      {!sorted.length && <Typography color="textSecondary">None</Typography>}
      {sorted
        .slice(0, limit)
        .map(item =>
          item.cardType === 'ACTIVITY' ? (
            <FeedCard
              cardType={item.cardType}
              title={item.briefDescription}
              subheader={item.activityTypeLabel}
              date={item.dateCompleted}
              timeSpentInMinutes={item.timeSpentInMinutes}
              key={item.timestamp}
            />
          ) : (
            <FeedCard
              cardType={item.cardType}
              title={item.task.fields.Title}
              subheader={item.task.fields.Category}
              date={item.timestamp}
              key={item.taskId}
            />
          )
        )}
    </div>
  );
}

ActivityList.propTypes = {
  activities: FirebasePropTypes.querySnapshot.isRequired,
  completedTasks: FirebasePropTypes.querySnapshot.isRequired,
  limit: PropTypes.number.isRequired,
};
