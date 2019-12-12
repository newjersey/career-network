import React from 'react';
import Typography from '@material-ui/core/Typography';
import FeedCard from './FeedCard';
import FirebasePropTypes from '../Firebase/PropTypes';

export default function ActivityList(props) {
  const { activities, completedTasks } = props;

  return (
    <div>
      {!completedTasks.length && <Typography color="textSecondary">No completed tasks</Typography>}
      {!activities.length && <Typography color="textSecondary">None</Typography>}
      {activities.map(a => {
        const activity = a.data();
        return (
          <FeedCard
            title={activity.activityTypeLabel}
            subheader={activity.briefDescription}
            date={activity.dateCompleted}
            timeSpentInMinutes={activity.timeSpentInMinutes}
            key={a.id}
          />
        );
      })}
    </div>
  );
}

ActivityList.propTypes = {
  activities: FirebasePropTypes.querySnapshot.isRequired,
  completedTasks: FirebasePropTypes.querySnapshot.isRequired,
};
