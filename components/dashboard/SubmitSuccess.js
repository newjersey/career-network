import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const SubmitSuccess = ({ message, show }) =>
  show ? (
    <Grid container direction="column" justify="center" alignItems="center">
      <CheckCircleIcon style={{ fontSize: 100, color: 'green' }} />
      <Typography variant="h4">{message}</Typography>
    </Grid>
  ) : null;

SubmitSuccess.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool,
};

SubmitSuccess.defaultProps = {
  show: false,
};

export default SubmitSuccess;
