import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { DialogTitle, DialogContent } from './DialogComponents';

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(2, 6, 4),
    maxWidth: '90%',
  },
}));

function AcknowledgementDialog({ onClose }) {
  const classes = useStyles();

  return (
    <Dialog open aria-labelledby="browser-alert-title">
      <DialogTitle onClose={onClose} />
      <DialogContent className={classes.content}>
        <Typography variant="body1" style={{ fontWeight: 500 }}>
          On behalf of everyone at New Jersey Career Network, we want to acknowledge that it has
          been an extraordinary few weeks of historic challenges with the COVID-19 pandemic. <br />
          <br />
          During this time of great uncertainty, it is vital that we stay informed and connected,
          even as we practice social distancing and prioritize keeping each other safe and healthy.{' '}
          <br />
          <br />
          We are here to support you with the latest information and resources to support you and
          your job search during this difficult time. <br />
          <br />
          Thank You!
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

AcknowledgementDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(AcknowledgementDialog);
