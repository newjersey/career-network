import PropTypes from 'prop-types';
import FirebasePropTypes from '../Firebase/PropTypes';

export const ActivityPropTypes = {
  activityTypeLabel: PropTypes.string,
  activityTypeValue: PropTypes.string,
  dateCompleted: FirebasePropTypes.timestamp,
  timestamp: FirebasePropTypes.timestamp,
  description: PropTypes.string.isRequired,
  difficultyLevel: PropTypes.string,
  activityType: PropTypes.string,
  timeSpentInMinutes: PropTypes.number,
  activityFeeling: PropTypes.arrayOf(PropTypes.string),
  whyIFeelThisWay: PropTypes.string,
  briefDescription: PropTypes.string,
};

export default {
  activities: FirebasePropTypes.querySnapshot,
};
