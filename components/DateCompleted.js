import React from 'react';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';
import FirebasePropTypes from './Firebase/PropTypes';

function getFormattedDateCompleted(timestamp) {
  const date = timestamp.toDate();
  return format(date, 'MMMM do');
}

const DateCompleted = ({ children, ...props }) => (
  <Typography {...props}>{getFormattedDateCompleted(children)}</Typography>
);

DateCompleted.propTypes = {
  children: FirebasePropTypes.timestamp.isRequired,
};

export default DateCompleted;
