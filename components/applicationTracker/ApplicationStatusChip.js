import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import { STATUS_COLOR, STATUS_LABEL, SUBMITTED, APPLICATION_STATUS_TYPES } from './constants';

const StatusChip = ({ status }) => {
  const color = STATUS_COLOR[status];
  const label = STATUS_LABEL[status];

  return (
    <Chip
      style={{
        backgroundColor: fade(color, 0.04),
        borderColor: color,
        borderWidth: 0.5,
        borderStyle: 'solid',
      }}
      avatar={<CircleIcon style={{ height: 8, width: 8, fill: color }} />}
      label={label}
    />
  );
};

StatusChip.propTypes = {
  status: PropTypes.oneOf(APPLICATION_STATUS_TYPES),
};

StatusChip.defaultProps = {
  status: SUBMITTED,
};

export default StatusChip;
