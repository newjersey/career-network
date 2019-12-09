import FirebasePropTypes from '../Firebase/PropTypes';
import AirtablePropTypes from '../Airtable/PropTypes';

export default {
  activities: FirebasePropTypes.querySnapshot,
  completedTasks: AirtablePropTypes.tasks,
};
