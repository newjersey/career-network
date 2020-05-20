import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import { APPLICATION_STATUS_TYPES } from './constants';

const StatusChip = ({ status }) => {
  const statusObj = APPLICATION_STATUS_TYPES.find(s => s.value === status);
  return (
    <Chip
      style={{
        backgroundColor: fade(statusObj.color, 0.04),
        borderColor: statusObj.color,
        borderWidth: 0.5,
        borderStyle: 'solid',
      }}
      avatar={<CircleIcon style={{ height: 8, width: 8, fill: statusObj.color }} />}
      label={statusObj.label}
    />
  );
};

StatusChip.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusChip;
