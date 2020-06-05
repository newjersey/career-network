import FirebasePropTypes from '../Firebase/PropTypes';

export default {
  activityLogEntries: FirebasePropTypes.querySnapshot,
  completedTasks: FirebasePropTypes.querySnapshot,
  applications: FirebasePropTypes.querySnapshot,
  completionEvents: FirebasePropTypes.querySnapshot,
};
