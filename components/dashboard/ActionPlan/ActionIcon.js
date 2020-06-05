import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import StarIcon from '@material-ui/icons/Star';
import ActionPlan from '@material-ui/icons/LocalActivity';

import {
  ACTION_TYPES,
  WEEKLY_ACTION_PLAN_COMPLETE,
  INITIAL_ASSESSMENT_COMPLETE,
} from '../../constants';

const useStyles = makeStyles(theme => ({
  iconContainer: {
    border: `1px solid`,
    borderRadius: '50%',
    lineHeight: 0,
    padding: theme.spacing(0.6),
    fontSize: '14px',
  },
}));

function ActionIcon({ value, color, iconClassName }) {
  const classes = useStyles();

  const getIcon = () => {
    switch (value) {
      case ACTION_TYPES.goal.value:
        return <StarIcon fontSize="inherit" />;
      case ACTION_TYPES.application.value:
        return <NextWeekIcon fontSize="inherit" />;
      case ACTION_TYPES.activity.value:
        return <AssignmentTurnedInIcon fontSize="inherit" />;
      case INITIAL_ASSESSMENT_COMPLETE:
        return <AccountCircleIcon fontSize="inherit" />;
      case WEEKLY_ACTION_PLAN_COMPLETE:
        return <ActionPlan fontSize="inherit" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={clsx(classes.iconContainer, iconClassName)}
      style={{
        color,
        borderColor: color,
        backgroundColor: fade(color, 0.08),
      }}
    >
      {getIcon()}
    </div>
  );
}

ActionIcon.propTypes = {
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  iconClassName: PropTypes.string,
};

ActionIcon.defaultProps = {
  iconClassName: undefined,
};

export default ActionIcon;
