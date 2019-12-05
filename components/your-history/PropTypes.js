import FirebasePropTypes from '../Firebase/PropTypes';

// const Activity = PropTypes.shape({
//   dateCompleted: PropTypes.string,
//   description: PropTypes.string.isRequired,
//   difficultyLevel: PropTypes.string,
//   activityType: PropTypes.string,
//   timeSpentInMinutes: PropTypes.number,
//   activityFeeling: PropTypes.arrayOf(PropTypes.string),
//   whyIFeelThisWay: PropTypes.string,
// });

export default {
  activities: FirebasePropTypes.querySnapshot.isRequired,
};
