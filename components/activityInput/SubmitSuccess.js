import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const SubmitSuccess = ({ message, show }) =>
  show ? (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      py={3}
      mb={2}
    >
      <CheckCircleIcon style={{ fontSize: 100, color: 'green' }} />
      <Typography variant="h4">{message}</Typography>
    </Box>
  ) : null;

SubmitSuccess.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool,
};

SubmitSuccess.defaultProps = {
  show: false,
};

export default SubmitSuccess;
