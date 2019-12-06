import PropTypes from 'prop-types';
import FirebasePropTypes from '../Firebase/PropTypes';

export const ActivityPropTypes = PropTypes.shape({
  dateCompleted: FirebasePropTypes.timestamp,
  timestamp: FirebasePropTypes.timestamp,
  description: PropTypes.string.isRequired,
  difficultyLevel: PropTypes.string,
  activityType: PropTypes.string,
  timeSpentInMinutes: PropTypes.number,
  activityFeeling: PropTypes.arrayOf(PropTypes.string),
  whyIFeelThisWay: PropTypes.string,
});

export default {
  activities: FirebasePropTypes.querySnapshot.isRequired,
};
