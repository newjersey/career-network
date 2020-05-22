import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import { STATUS_COLOR, SUBMITTED, STATUS_LABEL } from '../constants';

const useStyles = makeStyles(() => ({
  labelContainer: {
    marginLeft: 12,
  },
  stepLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 6,
    flexShrink: 0, // Fix IE 11 issue
    display: 'flex',
    paddingRight: 0,
  },
}));

const HistoryItemLabel = ({ status, showInactive }) => {
  const classes = useStyles();
  const color = showInactive ? '#b5b5be' : STATUS_COLOR[status];
  const label = showInactive ? 'Application Closed' : STATUS_LABEL[status];

  return (
    <span className={classes.stepLabel}>
      <span className={classes.iconContainer}>
        <CircleIcon style={{ width: 14, height: 14, fill: color }} />
      </span>
      <span className={classes.labelContainer}>
        <Typography variant="h6" color="textPrimary">
          {status !== SUBMITTED && !showInactive && 'Status Updated to'} {label}
        </Typography>
      </span>
    </span>
  );
};

HistoryItemLabel.propTypes = {
  status: PropTypes.string.isRequired,
  showInactive: PropTypes.bool.isRequired,
};

export default HistoryItemLabel;
