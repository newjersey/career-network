import PropTypes from 'prop-types';

const Activity = PropTypes.string;

export default {
  activities: PropTypes.arrayOf(PropTypes.objectOf(Activity)).isRequired,
};
