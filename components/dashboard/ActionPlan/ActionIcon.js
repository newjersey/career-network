import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CakeIcon from '@material-ui/icons/Cake';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import StarIcon from '@material-ui/icons/Star';

import { ACTION_TYPES } from './constants';

const ASSESSMENT_COMPLETE_COLOR = '#9f90ff';

const useStyles = makeStyles(theme => ({
  iconContainer: {
    border: `1px solid`,
    borderRadius: '50%',
    lineHeight: 0,
    padding: theme.spacing(0.6),
    fontSize: '14px',
  },
}));

function ActionIcon({ actionType, iconClassName, isAssessmentCompleteAction }) {
  const classes = useStyles();

  const mainColor = isAssessmentCompleteAction ? ASSESSMENT_COMPLETE_COLOR : actionType.color;

  const getIcon = () => {
    switch (actionType.value) {
      case ACTION_TYPES.goal.value:
        return <StarIcon fontSize="inherit" />;
      case ACTION_TYPES.application.value:
        return <NextWeekIcon fontSize="inherit" />;
      case ACTION_TYPES.activity.value:
        return isAssessmentCompleteAction ? (
          <CakeIcon fontSize="inherit" />
        ) : (
          <AssignmentTurnedInIcon fontSize="inherit" />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={clsx(classes.iconContainer, iconClassName)}
      style={{
        color: mainColor,
        borderColor: mainColor,
        backgroundColor: fade(mainColor, 0.08),
      }}
    >
      {getIcon()}
    </div>
  );
}

ActionIcon.propTypes = {
  actionType: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  iconClassName: PropTypes.string,
  isAssessmentCompleteAction: PropTypes.bool,
};

ActionIcon.defaultProps = {
  iconClassName: undefined,
  isAssessmentCompleteAction: false,
};

export default ActionIcon;
