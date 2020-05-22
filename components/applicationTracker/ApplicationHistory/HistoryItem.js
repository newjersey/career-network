import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import formatDate from 'date-fns/format';
import clsx from 'clsx';
import FirebasePropTypes from '../../Firebase/PropTypes';
import HistoryItemLabel from './HistoryItemLabel';

const useStyles = makeStyles(theme => ({
  stepContent: {
    marginTop: 8,
    marginLeft: 12, // half icon
    paddingLeft: 8 + 12, // margin + half icon
    paddingRight: 8,
    borderLeft: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
    }`,
  },
  last: {
    borderLeft: 'none',
  },
}));

const HistoryItem = ({ index, notes, status, timestamp, showInactive, isLast }) => {
  const date = formatDate(timestamp.toDate(), 'EEEE, MMM do');
  const classes = useStyles();
  return (
    <>
      {index !== 0 && <StepConnector orientation="vertical" />}
      <HistoryItemLabel status={status} timestamp={timestamp} showInactive={showInactive} />
      <div className={clsx(classes.stepContent, isLast && classes.last)}>
        <Typography
          variant="caption"
          display="block"
          color="textSecondary"
          style={{ marginBottom: 12 }}
        >
          {date}
        </Typography>
        <Typography variant="body1">{notes}</Typography>
      </div>
    </>
  );
};

HistoryItem.propTypes = {
  index: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  showInactive: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  timestamp: FirebasePropTypes.timestamp.isRequired,
};

export default HistoryItem;
