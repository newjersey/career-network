import React from 'react';
import Typography from '@material-ui/core/Typography';
import { compareDesc } from 'date-fns';
import FeedCard from './FeedCard';
import FirebasePropTypes from '../Firebase/PropTypes';

export default function ActivityList(props) {
  const { activities, completedTasks } = props;
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
      {!completedTasks.length && <Typography color="textSecondary">No completed tasks</Typography>}
      {!activities.length && <Typography color="textSecondary">None</Typography>}
      {sorted.map(item =>
        item.cardType === 'ACTIVITY' ? (
          <FeedCard
            cardType={item.cardType}
            title={item.activityTypeLabel}
            subheader={item.briefDescription}
            date={item.dateCompleted}
            timeSpentInMinutes={item.timeSpentInMinutes}
            key={item.id}
          />
        ) : (
          <FeedCard
            cardType={item.cardType}
            title={item.task.fields.Category}
            subheader={item.task.fields.Title}
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
};
